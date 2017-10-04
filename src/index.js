import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// youtube api_key
const API_KEY = 'AIzaSyAzjL6FhC5oEecCXZK3wum9HFBpcmYFEb0';

// Create a new component. This component should product
// some HTML. This is a class or factory that can create many
// instances. => is a new way of declaring function.
class App extends Component {
  constructor(props){
    super(props);

    this.state = { 
      videos: [],
      selectedVideo: null
    };
    
    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      // when key and value have the same name,
      // no need to write out value
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
      });
    })
  }

  render(){
    // function is only executed every 300 ms
    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300)

    return (
      <div>
        <SearchBar onSearchTermChange={ videoSearch }/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
          videos={this.state.videos} 
        />
      </div>
    );
  }  
}

// Take this component's generated HTML and put it 
// on the page (in the DOM). <Component /> is an instance
// of component. Second argument is a target containter to
// render component

ReactDOM.render(<App />, document.querySelector('.container'));

// Curly braces after import React are syntatic sugar
// similar to setting const Component = React.Component

import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    // only use this.state = in constructor function
    // to initialize state
    this.state = { term: '' }
  }

  render() {
    return(
      <div className="search-bar">
        <input 
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  // use 'on' or 'handle' in method name for event handling
  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;

import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

export default class SearchBar extends Component {
  onEnterKeyDown = event => {
    if (event.keyCode === 13) {
      const { onSubmit } = this.props;
      onSubmit();
    }
  };

  render() {
    const { searchTerm, onSearchTermChange } = this.props;

    return (
      <TextField
        value={searchTerm}
        onChange={onSearchTermChange}
        onKeyDown={this.onEnterKeyDown}
        placeholder="Enter places to search"
      />
    );
  }
}

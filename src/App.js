import React, { Component } from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import {
  proxyURL,
  googleKey,
  autocompleteBaseURL,
  weatherBaseURL,
  weatherKey,
  placeDetailBaseURL,
  forecastBaseURL
} from "./config";
import AutoCompleteMenu from "./AutoCompleteMenu";
import DisplayMenu from "./DisplayMenu";
import ForecastMenu from "./ForecastMenu";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      predictions: [],
      displayData: null,
      forecastData: null,
      showAutoComplete: false,
      showWeatherContent: false
    };
  }

  onSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  onSubmit = () => {
    const { searchTerm } = this.state;
    const autocompleteURL = `${proxyURL}${autocompleteBaseURL}&input=${searchTerm}&key=${googleKey}`;
    fetch(autocompleteURL)
      .then(res => res.json())
      .then(res => {
        const { predictions } = res;
        this.showAutoComplete();
        this.hideWeatherContent();
        this.setState({
          predictions
        });
      });
  };

  getDisplayData = url => {
    fetch(url)
      .then(res => res.json())
      .then(myJson => {
        this.setState({ displayData: myJson });
      });
  };

  getForecastData = url => {
    fetch(url)
      .then(res => res.json())
      .then(myJson => {
        this.setState({ forecastData: myJson });
      });
  };

  hideAutoComplete = () => {
    this.setState({ showAutoComplete: false });
  };

  showAutoComplete = () => {
    this.setState({ showAutoComplete: true });
  };

  hideWeatherContent = () => {
    this.setState({ showWeatherContent: false });
  };

  showWeatherContent = () => {
    this.setState({ showWeatherContent: true });
  };

  emptySearchTerm = () => {
    this.setState({ searchTerm: "" });
  };

  handleOnClick = (event, place_id) => {
    const placeDetailURL = `${proxyURL}${placeDetailBaseURL}placeid=${place_id}&key=${googleKey}`;
    fetch(placeDetailURL)
      .then(res => res.json())
      .then(myJson => {
        const {
          result: {
            geometry: {
              location: { lat, lng }
            }
          }
        } = myJson;
        const weatherURL = `${weatherBaseURL}key=${weatherKey}&q=${lat},${lng}`;
        const forecastURL = `${forecastBaseURL}key=${weatherKey}&q=${lat},${lng}&days=7`;
        this.hideAutoComplete();
        this.showWeatherContent();
        this.emptySearchTerm();
        this.getDisplayData(weatherURL);
        this.getForecastData(forecastURL);
      });
  };

  render() {
    const {
      searchTerm,
      predictions,
      displayData,
      forecastData,
      showAutoComplete,
      showWeatherContent
    } = this.state;
    return (
      <div>
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={this.onSearchTermChange}
          onSubmit={this.onSubmit}
        />
        {showAutoComplete && (
          <AutoCompleteMenu
            predictions={predictions}
            handleOnClick={this.handleOnClick}
          />
        )}
        {showWeatherContent && (
          <React.Fragment>
            <DisplayMenu displayData={displayData} />
            <ForecastMenu forecastData={forecastData} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Typography, Paper } from "@material-ui/core";

export default class DisplayMenu extends Component {
  render() {
    const { displayData } = this.props;
    if (displayData) {
      const {
        location: { name, region, localtime },
        current: {
          condition: { icon, text },
          wind_khp,
          humidity,
          temp_f
        }
      } = displayData;
      return (
        <Paper id="todayWeather">
          <Typography id="place-name">
            {name},{region}
          </Typography>
          <div id="place-detail">
            <div id="place-detail-right">
              <Typography>{localtime}</Typography>
              <Typography>{wind_khp}</Typography>
              <Typography>{humidity}</Typography>
            </div>
            <div id="place-detail-mid">
              <img src={icon} />
              <Typography>{text}</Typography>
            </div>
            <div id="place-detail-left">
              <Typography>{temp_f}</Typography>
            </div>
          </div>
        </Paper>
      );
    }
    return null;
  }
}

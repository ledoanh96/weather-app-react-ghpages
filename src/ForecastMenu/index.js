import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { Paper } from "@material-ui/core";

const ForecastDay = ({ date, imageSrc, temperature }) => {
  return (
    <div>
      <Typography variant="h6">
        {moment(date, "YYYY-MM-DD").format("dddd")}
      </Typography>
      <img src={imageSrc} alt="Weather Icon" />
      <Typography variant="h6">{temperature}</Typography>
    </div>
  );
};

export default class ForecastMenu extends Component {
  render() {
    const { forecastData} = this.props;
    if (forecastData) {
      const {
        forecast: { forecastday }
      } = forecastData;

      return (
        <Paper>
          {forecastday.map((e, i) => (
            <ForecastDay
              key={i}
              date={e.date}
              imageSrc={e.day.condition.icon}
              temperature={e.day.avgtemp_c}
            />
          ))}
        </Paper>
      );
    }
    return null;
  }
}

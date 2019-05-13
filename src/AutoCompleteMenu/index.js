import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

const AutoCompleteMenu = ({ predictions, handleOnClick }) => {
  return (
    <List dense={false}>
      {predictions.map((prediction, i) => (
        <ListItem
          key={i}
          button
          onClick={event => handleOnClick(event, prediction.place_id)}
        >
          <ListItemText primary={prediction.description} />
        </ListItem>
      ))}
    </List>
  );
};

export default AutoCompleteMenu;

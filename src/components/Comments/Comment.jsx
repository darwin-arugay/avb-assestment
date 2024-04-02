import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { capitalize } from "utils";
import { Button, IconButton } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  actions: { display: "flex", alignItems: "center", gap: 5 },
  buttonText: {
    textTransform: "capitalize",
    width: "fit-content",
    padding: 0,
  },
  iconButton: {
    padding: theme.spacing(1),
  },
}));

export default function Comment({ name, comment, likes }) {
  const formattedName = capitalize(name);
  const classes = useStyles();
  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={formattedName} />
        </ListItemAvatar>
        <ListItemText
          primary={formattedName}
          secondary={
            <React.Fragment>
              {comment}
              <div className={classes.actions}>
                <Button variant="text" className={classes.buttonText}>
                  Reply
                </Button>
                <Button variant="text" className={classes.buttonText}>
                  Share
                </Button>
                <Typography variant="body2">{`${likes} Like${
                  likes > 1 ? "s" : ""
                }`}</Typography>
                <IconButton className={classes.iconButton}>
                  <ThumbUpAltIcon fontSize="small" />
                </IconButton>
                <IconButton className={classes.iconButton}>
                  <ThumbDownIcon fontSize="small" />
                </IconButton>
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Comment from "./Comment";
import { useSelector } from "react-redux";

import { getComments } from "store/slices/comment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    overflowY: "auto",
  },
}));

export default function Comments() {
  const classes = useStyles();
  const comments = useSelector(getComments);

  return (
    <List className={classes.root}>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </List>
  );
}

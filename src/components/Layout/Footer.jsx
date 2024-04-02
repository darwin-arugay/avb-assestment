import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    height: 40,
    // padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
}));

function Footer() {
  const className = useStyles();

  return (
    <footer className={className.root}>
      <Typography variant="body1">All rights reserved © 2024</Typography>
    </footer>
  );
}

export default Footer;

import React from "react";
import Header from "./Header";
import { Container, makeStyles } from "@material-ui/core";
import Footer from "./Footer";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "80px",
    marginBottom: "80px",
    height: "100vh",
    overflow: "auto",
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Header />
      <Container maxWidth="sm">{children}</Container>
      <Footer />
    </main>
  );
}

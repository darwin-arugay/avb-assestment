import React from "react";
import Header from "./Header";
import { Container, makeStyles } from "@material-ui/core";
import Footer from "./Footer";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "80px",
    marginBottom: "80px",
    height: "100vh",
    overflow: "hidden",
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <main>
      <Header />
      <Container maxWidth="sm" className={classes.root}>
        {children}
      </Container>
      <Footer />
    </main>
  );
}

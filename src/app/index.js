import React from "react";

import "app/App.css";
import CommentModal from "components/CommentModal";
import Comments from "components/Comments";
import Layout from "components/Layout";
import TopCommentors from "components/TopCommentors";

function App() {
  return (
    <Layout>
      <TopCommentors />
      <Comments />
      <CommentModal />
    </Layout>
  );
}

export default App;

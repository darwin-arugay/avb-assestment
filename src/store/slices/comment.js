import { createSelector, createSlice } from "@reduxjs/toolkit";
import { mockComments } from "store/api";

export const name = "comment";

const getTopThreeCommentersFn = (comments) => {
  // count the number of comments made by each commenter
  const commentCounts = comments.reduce((counts, comment) => {
    counts[comment.name] = (counts[comment.name] || 0) + 1;
    return counts;
  }, {});

  // sort commentCounts object by comment count in descending order
  const sortedCommentCounts = Object.entries(commentCounts).sort(
    ([, countA], [, countB]) => countB - countA
  );

  // get the top 3 commenters
  const topThreeCommenters = sortedCommentCounts
    .slice(0, 3)
    .map(([name, count]) => {
      return { name, count };
    });

  return topThreeCommenters;
};

// sort the intial comments in descending
// based on the comment id e.g highest the lowest (8, 7, ...)
const sortedInitialComments = mockComments.sort((a, b) => b.id - a.id);

// get the top 3 initials comments
const initialTopThree = getTopThreeCommentersFn(sortedInitialComments);

const initialState = {
  comments: sortedInitialComments,
  topThree: initialTopThree,
};

const commentSlice = createSlice({
  name,
  initialState,
  reducers: {
    addNewComment(state, action) {
      // generate an id based on the last comment id, just increment to 1
      const lastItemId = state.comments.length > 0 ? state.comments[0].id : 0;
      const newId = lastItemId + 1;

      state.comments.unshift({
        id: newId,
        likes: 0,
        ...action.payload,
      });
      // update the top 3 commenters upon succesfully add
      updateTopThree(state);
    },
  },
});

const updateTopThree = (state) => {
  // get the top 3 commenters
  const topThreeCommenters = getTopThreeCommentersFn(state.comments);

  // update state with top 3 commenters
  state.topThree = topThreeCommenters;
};

const getSlice = (state) => state[name] || {};

export const getTopThreeCommenters = createSelector(
  getSlice,
  (slice) => slice.topThree
);

export const getComments = createSelector(getSlice, (slice) => slice.comments);

export const { addNewComment } = commentSlice.actions;

export default commentSlice.reducer;

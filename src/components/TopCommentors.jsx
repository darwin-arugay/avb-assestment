import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Container,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { useSelector } from "react-redux";

import { getTopThreeCommenters } from "store/slices/comment";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

export default function TopCommentors() {
  const classes = useStyles();
  const topThreeCommentors = useSelector(getTopThreeCommenters);
  return (
    <Container className={classes.container}>
      <Box mb={1}>
        <Typography variant="h6">
          Top 3 person who comment on this post.
        </Typography>
      </Box>
      <AvatarGroup max={3} spacing={0}>
        {topThreeCommentors.map((commentor) => (
          <Tooltip title={commentor.name} arrow key={commentor.name}>
            <Badge
              badgeContent={commentor.count}
              color="primary"
              overlap="circle"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Avatar alt={commentor.name}>{commentor.name[0]}</Avatar>
            </Badge>
          </Tooltip>
        ))}
      </AvatarGroup>
    </Container>
  );
}

import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Container,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { useSelector } from "react-redux";

import { getTopThreeCommenters } from "store/slices/comment";

export default function TopCommentors() {
  const topThreeCommentors = useSelector(getTopThreeCommenters);
  return (
    <Container>
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
              <Avatar alt={commentor.name} />
            </Badge>
          </Tooltip>
        ))}
      </AvatarGroup>
    </Container>
  );
}

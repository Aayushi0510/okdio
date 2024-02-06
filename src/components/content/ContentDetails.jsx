import React from "react";
// npm
import { Grid, Container } from "@mui/material";
// component
import { CustomBackdrop } from "src/components";
import { FeaturedPostCard } from "src/components/cards";

export default function ContentDetails(props) {
  const { post } = props;

  return (
    <CustomBackdrop loading={loading}>
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          <FeaturedPostCard key={post?.id} post={post} md={6} />
        </Grid>
      </Container>
    </CustomBackdrop>
  );
}

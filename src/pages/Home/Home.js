import { Box, Typography } from "@material-ui/core";
import React from "react";
import CustomAppbar from "../../components/CustomAppbar";

function Home() {
  return (
    <Box>
      <CustomAppbar name="In stock" />
      <Typography>Home</Typography>
    </Box>
  );
}

export default Home;

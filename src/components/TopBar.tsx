import * as React from "react";
import { Button, Grid } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { fetchAsyncDataFx } from "../store";

function TopBar() {
  const handleLoadAsyncData = () => {
    fetchAsyncDataFx();
  }

  return (
    <Grid pt={2} templateColumns="1fr 1fr" columnGap="3">
      <ColorModeSwitcher />
      <Button onClick={handleLoadAsyncData}>Load</Button>
    </Grid>
  );
}

export default TopBar;

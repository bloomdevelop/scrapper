import { AppBar, Toolbar, Typography } from "@mui/material";
import ModeSwitch from "./mode-switch";

export default function Navigation() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Scrapper
        </Typography>
        <ModeSwitch />
      </Toolbar>
    </AppBar>
  );
}

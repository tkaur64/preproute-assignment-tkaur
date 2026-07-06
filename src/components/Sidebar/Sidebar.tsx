import { Box, List } from "@mui/material";

import logo from "../../assets/images/preproute-logo.svg";

import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarItems";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        borderRight: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          p: 3,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Preproute"
          sx={{
            width: 130,
          }}
        />
      </Box>

      <List>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            {...item}
          />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
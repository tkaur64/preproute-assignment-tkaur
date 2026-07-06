import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  label: string;
  path: string;
  icon: React.ElementType;
}

const SidebarItem = ({
  label,
  path,
  icon: Icon,
}: SidebarItemProps) => {
  return (
    <ListItemButton
      component={NavLink}
      to={path}
      sx={{
        minHeight: 48,
        px: 2,
        mx: 1,
        mb: 0.5,
        borderRadius: "0px 8px 8px 0px",
        color: "text.secondary",

        "& .MuiListItemIcon-root": {
          minWidth: 40,
          color: "inherit",
        },

        "& .MuiListItemText-primary": {
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        },

        "&.active": {
          bgcolor: "action.selected",
          color: "primary.main",
          borderLeft: "4px solid",

          "& .MuiListItemIcon-root": {
            color: "primary.main",
          },
        },
      }}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>

      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default SidebarItem;
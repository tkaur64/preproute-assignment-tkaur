import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Header = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      color="inherit"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "#fff",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: 70,
        }}
      >
        {/* Left */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600 }}
        >
          Test Management
        </Typography>

        {/* Right */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton>
            <Badge
              color="error"
              variant="dot"
            >
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </IconButton>

          <Avatar
            sx={{
              width: 38,
              height: 38,
            }}
          >
            A
          </Avatar>

          <Box>
            <Typography
              sx={{ fontWeight: 600, fontSize: 14 }}

            >
              Alex Wando
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Admin
            </Typography>
          </Box>

          <KeyboardArrowDownIcon
            color="action"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
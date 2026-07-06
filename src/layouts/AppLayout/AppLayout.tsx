import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const AppLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: "hidden",
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
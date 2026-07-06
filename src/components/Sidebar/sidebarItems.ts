import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

import { ROUTES } from "../../constants/routes";

export const sidebarItems = [
  {
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: TrendingUpOutlinedIcon,
  },
  {
    label: "Test Creation",
    path: ROUTES.CREATE_TEST,
    icon: EditSquareIcon,
  },
  {
    label: "Test Tracking",
    path: ROUTES.DASHBOARD,
    icon: AssignmentOutlinedIcon,
  },
];

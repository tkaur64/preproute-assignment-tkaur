import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import EditSquareIcon from "@mui/icons-material/EditSquare";

import { ROUTES } from "../../constants/routes";

export const sidebarItems = [
  {
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: TrendingUpOutlinedIcon,
  },
  {
    label: "Test Creation",
    path: ROUTES.CREATE_TEST.replace("/:id?", ""),
    icon: EditSquareIcon,
  },
];

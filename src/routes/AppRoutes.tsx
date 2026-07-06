import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ROUTES } from "../constants/routes";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateTest from "../pages/CreateTest/CreateTest";
import AddQuestions from "../pages/AddQuestions/AddQuestions";
import PreviewAndPublish from "../pages/PreviewAndPublish/PreviewAndPublish";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout/AppLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route
              path={ROUTES.DASHBOARD}
              element={<Dashboard />}
            />

            <Route
              path={ROUTES.CREATE_TEST}
              element={<CreateTest />}
            />

            <Route
              path={ROUTES.ADD_QUESTIONS}
              element={<AddQuestions />}
            />

            <Route
              path={ROUTES.PREVIEW}
              element={<PreviewAndPublish />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
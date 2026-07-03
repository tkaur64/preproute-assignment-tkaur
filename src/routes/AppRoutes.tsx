import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import CreateTest from '../pages/CreateTest/CreateTest';
import AddQuestions from '../pages/AddQuestions/AddQuestions';
import PreviewAndPublish from '../pages/PreviewAndPublish/PreviewAndPublish';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateTest />} />
        {/* <Route path="/edit/:id" element={<EditTest />} /> */}
        <Route path="/tests/:id/questions" element={<AddQuestions />} />
        <Route path="/tests/:id/preview" element={<PreviewAndPublish />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import VdotEquivalent from "../pages/vdot/VdotEquivalent";
import VdotFormula from "../pages/vdot/VdotFormula";
import VdotTraining from "../pages/vdot/VdotTraining";
import Workout from "../pages/workout/Workout";
import SpecialtyEvent from "../pages/specialty_event/SpecialtyEvent";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          {/* ログイン後のページ */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/vdot-equivalent" element={<VdotEquivalent />} />
          <Route path="/vdot-formula" element={<VdotFormula />} />
          <Route path="/vdot-training" element={<VdotTraining />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/specialty-event" element={<SpecialtyEvent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
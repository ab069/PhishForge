import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"; import Dashboard from "./pages/Dashboard"; import Campaigns from "./pages/Campaigns";
import Layout from "./components/Layout"; import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  return (<Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}><Route element={<Layout />}>
      <Route path="/" element={<Dashboard />} /> <Route path="/campaigns" element={<Campaigns />} />
    </Route></Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>);
}

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Zoho from "./Zoho";
import { AuthProvider } from "./AuthContext";
import Home from "./Home";
import TrafficPrediction from "./pages/TrafficPrediction";
import IncidentAlert from "./pages/IncidentAlerts";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import EmergencyServices from "./pages/EmergencyServices";
import Feedback from "./pages/Feedback";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Zoho />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          {/* Nav Links */}
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/traffic" element={<TrafficPrediction />} />
          <Route exact path="/incident" element={<IncidentAlert />} />
          <Route exact path="/reports" element={<ReportsAnalytics />} />
          <Route exact path="/emergency" element={<EmergencyServices />} />
          <Route exact path="/feedback" element={<Feedback />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
      </AuthProvider>
    )
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Callback from "./pages/Callback";




function MusicMoodSorter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/callback" element={<Callback />} />
            </Routes>
        </Router>
    )
}

export default MusicMoodSorter;
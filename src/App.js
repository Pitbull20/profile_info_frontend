import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthLogin from "./pages/AuthLogin/AuthLogin";
import AuthRegister from "./pages/AuthRegister/AuthRegister";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="login" element={<AuthLogin />} />
                <Route path="register" element={<AuthRegister />} />
            </Routes>
        </>
    );
}

export default App;

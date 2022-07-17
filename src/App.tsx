import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Navbar from "./components/Navbar/Navbar";
import Clients from "./pages/Clients/Clients";
import Home from "./pages/Home/Home";


function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/clients" element={<Clients />} />

            </Routes>

            <ToastContainer />

        </BrowserRouter>
    );
}

export default App;

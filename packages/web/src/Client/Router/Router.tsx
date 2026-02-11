import IndexPage from "@Client/Router/Pages/IndexPage";
import LogoutPage from "@Client/Router/Pages/LogoutPage";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router";

export default function Router() {
    return (
        <CookiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" index element={<IndexPage/>} />
                    <Route path="/logout" element={<LogoutPage/>} />
                </Routes>
            </BrowserRouter>
        </CookiesProvider>
    );
}

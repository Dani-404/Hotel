import { LoginForm } from "@Client/Components/LoginForm";
import { RegistrationForm } from "@Client/Components/RegistrationForm";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function LogoutPage() {
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        if(cookies.accessToken) {
            removeCookie("accessToken");
            
            window.location.href = "/";
        }
    }, [cookies.accessToken]);

    return null;
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./fonts.css";

import Router from "./Router/Router";

const element = document.createElement("div");
element.id = "root";

document.body.appendChild(element);

const root = createRoot(element);

root.render(
    <StrictMode>
        <Router/>
    </StrictMode>
);

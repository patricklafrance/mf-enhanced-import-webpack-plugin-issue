// @ts-check

import { App } from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { loadRemote } from "@module-federation/enhanced/runtime";
import { loadRemote } from "@module-federation/runtime";

const { HelloWorld } = await loadRemote("remote1/HelloWorld.jsx")
    .then(mod => {
        console.log("Loaded remote 1", mod);

        return mod;
    })
    .catch(() => console.log("Failed to load remote 1"));

const { sayHello } = await loadRemote("remote2/sayHello.js")
    .then(mod => {
        console.log("Loaded remote 2", mod);

        return mod;
    })
    .catch(() => console.log("Failed to load remote 2"));

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <>
            <App />
            {HelloWorld && <HelloWorld />}
            {sayHello && <div>{sayHello()}</div>}
        </>
    </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./router.tsx";
import { RouterProvider } from "react-router";

import { Provider } from "react-redux";
import store from "./store/store.ts";
import { fetchCartThunk } from "./store/slices/cart/thunks.ts";

store.dispatch(fetchCartThunk());

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
    console.log(message);
});

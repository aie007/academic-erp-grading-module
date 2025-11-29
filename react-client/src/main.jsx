import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "757560376836-6lhun1ihmqeuci052evbpi6lpqu5rdvh.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <GoogleOAuthProvider clientId={clientId}>
    <App />
  // </GoogleOAuthProvider>
);

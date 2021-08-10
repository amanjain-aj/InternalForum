import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RouteConfiguration from "./Router";

function App() {
  const [JwtToken, setJwtToken] = useState("");

  const history = useHistory();

  useEffect(() => {
    const checkLoginuser = () => {
      try {
        let token = window.localStorage.getItem("authorization");

        let answeredUserName = window.localStorage.getItem("userdata");
        if (!answeredUserName) {
          window.localStorage.setItem("userdata", "");
        }
        if (!token) {
          window.localStorage.setItem("authorization", JwtToken);
          history.push("/login");
        } else {
          setJwtToken(token);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginuser();
  }, [history, JwtToken]);
  return <RouteConfiguration />;
}
export default App;

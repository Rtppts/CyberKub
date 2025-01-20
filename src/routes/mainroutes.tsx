import React from "react";
import { useRoutes, RouteObject } from "react-router-dom";

// ✅ แก้ path ให้ถูกต้อง
import Page1 from "../pages/page1"; 
import Page2 from "../pages/page2"; 

const ConfigRoutes = () => {
  const checkpoint = localStorage.getItem("checkpoint");
  console.log("checkpoint:", checkpoint);

  let routes: RouteObject[] = [];

  if (true) {
    switch (checkpoint) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "4":
      case "5":
        routes = [{ path: "/", element: <Page1 /> }];
        break;
      default:
        routes = [{ path: "/", element: <Page2 /> }];
        break;
    }
  }

  return useRoutes(routes);
};

export default ConfigRoutes;

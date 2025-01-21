// import { lazy } from "react";
// import { useRoutes, RouteObject } from "react-router-dom";

// const Main = lazy(() => import("../pages/Main"));
// const Sym = lazy(() => import("../pages/Symmetric02"));
// const Palm = lazy(() => import("../pages/HashedPalm05"));

// const ConfigRoutes = () => {

//   const checkpoint = localStorage.getItem("checkpoint");
//   console.log("checkpoint:", checkpoint);

//   let routes: RouteObject[] = [];

//   switch (checkpoint) {
//     case "1":
//       routes = [{ path: "/", element: <Main /> }];
//       break;

//     case "2":
//       routes = [{ path: "/", element: <Sym /> }];
//       break;

//     case "3":
//       routes = [{ path: "/", element: <Palm /> }];
//       break;

//     case "5":
//       routes = [{ path: "/", element: <Main /> }];
//       break;

//     default:
//       routes = [{ path: "/", element: <Main /> }];
//       break;
//   }
  

//   return useRoutes(routes);
// };

// export default ConfigRoutes;


import { lazy } from "react";
import { useRoutes, RouteObject } from "react-router-dom";

const Main = lazy(() => import("../pages/Main"));
const Jo = lazy(() => import("../pages/Symmetric02"));
const Aut = lazy(() => import("../pages/HashAut03"));
const Dew = lazy(() => import("../pages/symmetric04"));
const Palm = lazy(() => import("../pages/HashedPalm05"));

const ConfigRoutes = () => {

  const routes: RouteObject[] = [
    { index: true, element: <Main /> },
    { path: "/", element: <Main /> },
    { path: "/symmetric02", element: <Jo /> },
    { path: "/HashAut03", element: <Aut /> },
    { path: "/Asymmetric04", element: <Dew /> },
    { path: "/palm", element: <Palm /> },
    { path: "*", element: <Main /> },
  ];

  return useRoutes(routes);
};

export default ConfigRoutes;

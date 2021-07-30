import App from "./containers/App";
import HomePage from "./containers/HomePage";
const APP_KEY = "APP_KEY";
const HOME_PAGE_KEY = "HOME_PAGE_KEY";
const routes = [
  {
    component: App,
    key: APP_KEY,
    routes: [
      {
        path: "/",
        component: HomePage,
        key: HOME_PAGE_KEY,
      },
    ],
  },
];
export default routes;

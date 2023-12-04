// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import UserProfile from "layouts/user-profile";
import UserManagement from "layouts/user-management";

import Login from "auth/login";
import Register from "auth/register";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";

import CreateOrder from "layouts/create-order";
import Orders from "layouts/orders";

// @mui icons
import Icon from "@mui/material/Icon";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "auth",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "examples",
    name: "Create Order",
    key: "orders/create",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/orders/create",
    component: <CreateOrder />,
  },
  {
    type: "examples",
    name: "Orders",
    key: "orders",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/orders",
    component: <Orders />,
  },
];

export default routes;

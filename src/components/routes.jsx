import { lazy } from "react";

const SignInPage = lazy(() => import("./pages/SignInPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GroupPage = lazy(() => import("./pages/GroupPage"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const UsersPage = lazy(() => import("./pages/UsersPage.jsx"));


export const privateRoutes = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/groups",
        element: <GroupPage />
    },
    {
        path: "/users",
        element: <UsersPage />
    }
];

export const publicRoutes = [
    {
        path: "/signin",
        element: <SignInPage />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
];
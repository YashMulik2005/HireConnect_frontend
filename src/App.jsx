import { useContext } from "react";
import Layout from "./pages/Homepage/Layout";
import { createBrowserRouter, RouterProvider } from "react-router";
import TypePage from "./pages/Auth/TypePage";
import StudentLogin from "./pages/Auth/StudentLogin";
import StudentSignup from "./pages/Auth/StudentSignup";
import CompanyLogin from "./pages/Auth/CompanyLogin";
import CompanySignup from "./pages/Auth/CompanySignup";
import Auth from "./pages/Auth/Auth";
import authHook, { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Student/HomePage";
import JobDetails from "./pages/Student/JobDetails";
import Companies from "./pages/Student/Companies";
import ApplyDetailsPage from "./pages/Student/ApplyDetailsPage";
import Profile from "./pages/Student/Profile";
import { DataProvider } from "./context/DataContext";

function AppRoutes() {
  const { token, userdata } = authHook();

  const isStudent = token && userdata?.type === "student";

  const routes = [
    {
      path: "/",
      element: isStudent ? <HomePage /> : <Layout />,
    },
    {
      path: "/auth",
      element: <TypePage />,
    },
    {
      path: "/auth",
      element: <Auth />,
      children: [
        {
          path: "studentlogin",
          element: <StudentLogin />,
        },
        {
          path: "studentsignup",
          element: <StudentSignup />,
        },
        {
          path: "companylogin",
          element: <CompanyLogin />,
        },
        {
          path: "companysignup",
          element: <CompanySignup />,
        },
      ],
    },
    {
      path: "/student",
      element: <HomePage />,
    },
    {
      path: "/job/:id",
      element: <JobDetails />,
    },
    {
      path: "/job/apply/:id",
      element: <ApplyDetailsPage />,
    },
    {
      path: "/companies",
      element: <Companies />,
    },
    {
      path: "/Profile",
      element: <Profile />,
    },
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

function App() {
  return (
    <div className="w-screen h-screen font-inter">
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;

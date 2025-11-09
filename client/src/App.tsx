import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Especialidades from "./pages/Especialidades";
import Assinaturas from "./pages/Assinaturas";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import './lib/i18n';

function RootLayout() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <Outlet />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

const router = createHashRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/especialidades", element: <Especialidades /> },
      { path: "/assinaturas", element: <Assinaturas /> },
      { path: "/login", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/chat/:avatarId", element: <Chat /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

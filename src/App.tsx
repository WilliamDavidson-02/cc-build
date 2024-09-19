import { FC } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { FormProvider } from "./context/formContext";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { UserProvider } from "./context/userContext";
import AuthenticationRoutes from "./components/protectedRoutes/AuthenticationRoutes";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer";


const AppContent: FC = () => {
  const location = useLocation();
//I needed to style the appContent to make the footer stick to the bottom of the page no matter the size of the content
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPath={location.pathname} />
      <main className="flex-grow">
        <FormProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<AuthenticationRoutes />}>
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/sign-up" element={<Signup />} />
            </Route>
          </Routes>
        </FormProvider>
      </main>
      <Footer currentPath={location.pathname} />
    </div>
  );
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;

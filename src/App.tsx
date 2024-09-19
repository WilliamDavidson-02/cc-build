import { FC } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { FormProvider } from "./context/formContext";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { UserProvider } from "./context/userContext";
import AuthenticationRoutes from "./components/protectedRoutes/AuthenticationRoutes";
import Navbar from "./components/Navigation/Navbar";


const AppContent: FC = () => {
  const location = useLocation();

  return (
    <>
      <Navbar currentPath={location.pathname} />        
        <FormProvider>
            <Routes>
              <Route path="/" element={<Home />} />          
              <Route element={<AuthenticationRoutes />}>
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/sign-up" element={<Signup />} />
            </Route>
          </Routes>
          </FormProvider>
    </>
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

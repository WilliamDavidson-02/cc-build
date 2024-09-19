import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { FormProvider } from "./context/formContext";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { UserProvider } from "./context/userContext";
import AuthenticationRoutes from "./components/protectedRoutes/AuthenticationRoutes";

const App: FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <FormProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<AuthenticationRoutes />}>
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/sign-up" element={<Signup />} />
            </Route>
          </Routes>
        </FormProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;

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
import Test from "./pages/Test";
import FormPage01 from "@/pages/FormPage01";
import FormPage02 from "@/pages/FormPage02";
import FormPage03 from "@/pages/FormPage03";
import FormPage04 from "@/pages/FormPage04";
import FormPage05 from "@/pages/FormPage05";
import Product from "./pages/Product";
import AuthRoute from "./components/protectedRoutes/AuthRoute";

const AppContent: FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPath={location.pathname} />
      <main className="flex-grow">
        <FormProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test-components" element={<Test />} />
            {/* <Route element={<AuthRoute />}> */}
            <Route path="/products/:id" element={<Product />} />
            <Route path="/form-01" element={<FormPage01 />} />
            <Route path="/form-02" element={<FormPage02 />} />
            <Route path="/form-03" element={<FormPage03 />} />
            <Route path="/form-04" element={<FormPage04 />} />
            <Route path="/form-05" element={<FormPage05 />} />
            {/* </Route>  */}
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

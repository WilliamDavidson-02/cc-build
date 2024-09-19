import { FC } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { FormProvider } from "./context/formContext";
import Navbar from "./components/Navigation/Navbar";


const AppContent: FC = () => {
  const location = useLocation();

  return (
    <>
      <Navbar currentPath={location.pathname} />
      <FormProvider>
        <Routes>
          <Route path="/" element={<Home />} />          
        </Routes>
      </FormProvider>
    </>
  );
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

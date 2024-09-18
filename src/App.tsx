import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { FormProvider } from "./context/formContext";

const App: FC = () => {
  return (
    <BrowserRouter>
    <FormProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </FormProvider>
    </BrowserRouter>
  );
};

export default App;

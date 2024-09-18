import Dropdown from "@/components/Dropdown";
import Textfield from "@/components/Textfield";
import { FC } from "react";

const Home: FC = () => {
  return (
    <div>
      <Dropdown title="Produktkategori" option="dog" size="medium" />
      <Textfield title="Title" size="medium" />
    </div>
  );
};

export default Home;

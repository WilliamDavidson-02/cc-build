import Form_1 from "@/components/Form_1";
import FormStep2 from "@/components/Form_2";
import { FC } from "react";

type FormStepOneProps = {};

const FormPage01: FC<FormStepOneProps> = ({}) => {
  return (
    <div>
      {" "}
      <FormStep2 />{" "}
    </div>
  );
};

export default FormPage01;

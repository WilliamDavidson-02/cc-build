import Form from "@/components/Form";
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

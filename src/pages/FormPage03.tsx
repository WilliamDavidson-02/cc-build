import Form_3 from "@/components/Form_3";
import { FC } from "react";

type FormStepThreeProps = {};

const FormPage03: FC<FormStepThreeProps> = ({}) => {
  return (
    <div className=" py-28 px-28 flex flex-col justify-center">
      <Form_3 />
    </div>
  );
};

export default FormPage03;

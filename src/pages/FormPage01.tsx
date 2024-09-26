import Form_1 from "@/components/Form_1";
import Typography from "@/components/Typography";
import { FC } from "react";

type FormStepOneProps = {};

const FormPage01: FC<FormStepOneProps> = ({}) => {
  return (
    <div className=" py-28 px-28 flex flex-col justify-center">
      <Typography variant="h3">Generell information </Typography>
      <Form_1 />{" "}
    </div>
  );
};

export default FormPage01;

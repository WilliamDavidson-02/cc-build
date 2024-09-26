import Form_1 from "@/components/Form_1";
//import Typography from "@/components/Typography";
import { FC } from "react";

type FormStepOneProps = {};

const FormPage01: FC<FormStepOneProps> = ({}) => {
  return (
    <div className=" py-28 px-36 flex flex-col justify-center pb-16">
      <h2 className="text-[#151515] text-[31px] font-bold font-poppins">
      Generell information
        </h2>      
      
      <Form_1 />{" "}
    </div>
  );
};

export default FormPage01;

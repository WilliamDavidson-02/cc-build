import { FC } from "react";
import FormStep2 from "@/components/Form_2";
//import Typography from "@/components/Typography";

type FormStepTwoProps = {};

const FormPage02: FC<FormStepTwoProps> = ({}) => {
  return (
    <main className="mt-16 px-48 flex flex-col">
      <div className="flex justify-start items-center">
      <h2 className="text-[#151515] text-[31px] font-bold font-poppins">
      Antal/Status/Plats
        </h2>      
       
      </div>
      <FormStep2 />
    </main>
  );
};

export default FormPage02;

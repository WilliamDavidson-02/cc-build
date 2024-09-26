import Form_3 from "@/components/Form_3";
import { FC } from "react";




const FormPage03: FC = () => {
 
  return (
    <main className="mt-16 px-32 flex flex-col">
     
      <div className="flex flex-col px-16 justify-start mt-16 ">
      <h2 className="text-[#151515] text-[31px] font-bold font-poppins mb-16">
        Form
        </h2>      
      <Form_3 />
      </div>
    </main>
  );
};

export default FormPage03;

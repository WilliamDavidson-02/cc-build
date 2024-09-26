import Form_4 from "@/components/Form_4";
import { FC } from "react";





const FormPage04: FC = () => {
  
  return (
    <main className="px-32 flex flex-col items-center justify-center w-full">
       
      <div className="flex flex-col px-16 justify-start pt-16 w-full ">
        <h2 className="text-[#151515] text-[31px] font-bold font-poppins mb-10 ">
        Produktinformation
        </h2>       
      <Form_4 />
      </div>
    </main>
  );
};

export default FormPage04;

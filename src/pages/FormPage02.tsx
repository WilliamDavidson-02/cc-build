import { FC } from "react";

import FormStep2 from "@/components/Form_2";



const FormPage02: FC = () => {
  return (
    <main className="mt-16 px-32 flex flex-col">
      
      <div className="flex flex-col px-16 justify-start mb-8  mt-16">
      <h2 className="text-[#151515] text-[31px] font-bold font-poppins">
      Antal/Status/Plats
        </h2>      
       
      <FormStep2 />
      </div>
    </main>
  );
};

export default FormPage02;

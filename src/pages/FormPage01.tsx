import Form_1 from "@/components/Form_1";

import { FC } from "react";



const FormPage01: FC = () => {
  

  return (
    <main className="mt-16 px-48 flex flex-col">      
      <div className=" py-28 px-36 flex flex-col justify-center pb-16">
        
        <h2 className="text-[#151515] text-[31px] font-bold font-poppins">
          Generell information
          </h2>      
        
        <Form_1 />{" "}
      </div>
    </main>
  );
};

export default FormPage01;

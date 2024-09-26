import Form_5 from "@/components/Form_5";
import { FC } from "react";



const FormPage05: FC = () => {  
  return (
    <main className="px-28 flex flex-col items-center justify-center w-full">
       
      <div className="flex flex-col px-16  justify-start w-full  ">
      <h2 className="text-[#151515] text-[31px] font-bold font-poppins pt-16 pb-10">
        Hantering för marknadsplats
      </h2>       
       
      <Form_5 />
      </div>
    </main>
  );
};

export default FormPage05;

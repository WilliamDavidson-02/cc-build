import Form_5 from "@/components/Form_5";
import { FC, useContext } from "react";
import { ProgressSteps, ProgressStepsCard } from "@/components/products/ProgressSteps"  // Ensure correct path

import { FormContext } from "@/context/formContext";
import { useNavigate } from "react-router-dom";

const FormPage05: FC = () => {  
  const { progressSteps } = useContext(FormContext)!;
  const navigate = useNavigate();
  return (
    <main className="px-28 flex flex-col items-center justify-center w-full">
       <ProgressSteps>
          {progressSteps.map((status, index) => (
            <ProgressStepsCard
              key={index}
              status={status}
              active={index === 0} 
              number={index + 1}
              name={`Step ${index + 1}`} 
              onClick={() => navigate(`/form-0${index + 1}`)}
            />
          ))}
        </ProgressSteps>
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

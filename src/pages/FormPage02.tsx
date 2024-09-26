import { FC, useContext } from "react";
import FormStep2 from "@/components/Form_2";

import { ProgressSteps, ProgressStepsCard } from "@/components/products/ProgressSteps"  // Ensure correct path

import { FormContext } from "@/context/formContext";
import { useNavigate } from "react-router-dom";


const FormPage02: FC = () => {
  const { progressSteps } = useContext(FormContext)!;
  const navigate = useNavigate();

  return (
    <main className="mt-16 px-32 flex flex-col">
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

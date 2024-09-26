import { FC, useContext } from "react";
import FormStep2 from "@/components/Form_2";

import { ProgressSteps, ProgressStepsCard } from "@/components/products/ProgressSteps"  // Ensure correct path

import { FormContext } from "@/context/formContext";
import { useNavigate } from "react-router-dom";


const FormPage02: FC = () => {
  const { progressSteps, currentStep, setCurrentStep } = useContext(FormContext)!;
  const navigate = useNavigate();

  return (
    <main className=" px-32 flex flex-col">
      <ProgressSteps>
        {progressSteps.map((status, index) => (
          <ProgressStepsCard
            key={index}
            status={status}
            active={currentStep === index} // Use currentStep from context
            number={index + 1}
            name={`Step ${index + 1}`}
            onClick={() => {
              setCurrentStep(index); // Update the current step
              navigate(`/form-0${index + 1}`); // Navigate to the corresponding form
            }}
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

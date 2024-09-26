import Form_3 from "@/components/Form_3";
import { FC, useContext } from "react";
import { ProgressSteps, ProgressStepsCard } from "@/components/products/ProgressSteps"  // Ensure correct path

import { FormContext } from "@/context/formContext";
import { useNavigate } from "react-router-dom";



const FormPage03: FC = () => {
  const { progressSteps, currentStep, setCurrentStep } = useContext(FormContext)!;
  const navigate = useNavigate();
  return (
    <main className="mt-16 px-32 flex flex-col">
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

import Form_1 from "@/components/Form_1";
import { FC, useContext } from "react";
import { ProgressSteps, ProgressStepsCard } from "@/components/products/ProgressSteps"  // Ensure correct path
import { useNavigate } from "react-router-dom";
import { FormContext } from "@/context/formContext";


const FormPage01: FC = () => {
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
      <div className=" py-16 px-16 flex flex-col justify-center pb-16">
        
        <h2 className="text-[#151515] text-[31px] font-bold font-poppins">
          Generell information
          </h2>      
        
        <Form_1 />{" "}
      </div>
    </main>
  );
};

export default FormPage01;

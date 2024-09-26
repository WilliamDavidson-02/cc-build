import Form_3 from "@/components/Form_3";
import { FC, useContext } from "react";
import { ProgressSteps, ProgressStepsCard } from "@/components/products/ProgressSteps"  // Ensure correct path

import { FormContext } from "@/context/formContext";
import { useNavigate } from "react-router-dom";



const FormPage03: FC = () => {
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

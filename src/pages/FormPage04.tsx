import Form_4 from "@/components/Form_4";
import Typography from "@/components/Typography";
import { FC } from "react";

type FormStepFourProps = {};

const FormPage04: FC<FormStepFourProps> = ({}) => {
  return (
    <main className="mt-16 px-48 flex flex-col items-center justify-center w-full">
      <div className="flex justify-start items-center mb-10 w-full">
        <Typography
          variant="h2"
          size="md"
          className="text-[#151515] text-[31px] font-bold font-poppins"
        >
          Produktinformation
        </Typography>
      </div>
      <Form_4 />
    </main>
  );
};

export default FormPage04;

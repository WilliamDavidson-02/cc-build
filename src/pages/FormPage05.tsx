import Form_5 from "@/components/Form_5";
import Typography from "@/components/Typography";
import { FC } from "react";

type FormStepFiveProps = {};

const FormPage05: FC<FormStepFiveProps> = ({}) => {
  return (
    <main className="mt-16 px-52 flex flex-col items-center justify-center w-full">
      <div className="flex justify-start items-center w-full px-4">
        <Typography
          variant="h2"
          size="md"
          className="text-[#151515] text-[31px] font-bold font-poppins mb-10"
        >
          Hantering för marknadsplats
        </Typography>
      </div>
      <Form_5 />
    </main>
  );
};

export default FormPage05;

import Button from "./Buttons";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '@/context/formContext';
import { supabase } from "@/lib/sbClient";
import Typography from "./Typography";
import { z } from 'zod';

const Step4Schema = z.object({
  manufactor: z.string().optional(),
  articelNumber: z.string().optional(),
  manufactorYear: z.number().optional(),
  boughtYear: z.number().optional(),
  gtin: z.boolean().optional(),
  rsk: z.boolean().optional(),
  bsab: z.boolean().optional(),
  enr: z.boolean().optional(),
  bk04: z.boolean().optional(),
});
type Step4Data = z.infer<typeof Step4Schema>;


const Form_4: React.FC = () => {
  const navigate = useNavigate();
  const { formData, setFormData, errors, setErrors } = useFormContext();
  const [formSection, setFormSection] = useState<Step4Data>({
    manufactor: "",
    articelNumber: "",
    manufactorYear: undefined,
    boughtYear: undefined,
    gtin: false,
    rsk: false,
    bsab: false,
    enr: false,
    bk04: false,
  });

  useEffect(() => {
   if (!formData) {
    const initialData: Step4Data = {
      manufactor: "",
      articelNumber: "",
      manufactorYear: 0,
      boughtYear: 0,
      gtin: false,
      rsk: false,
      bsab: false,
      enr: false,
      bk04: false,      
    };setFormData((prevData) => ({
      ...prevData,
      ...initialData,
    }));
  }
}, [formData, setFormData]);


const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setFormSection((prevSection) => ({
    ...prevSection,
    [name]: value,
  }));
};

const handleSave = async () => {
  const result = Step4Schema.safeParse(formSection); 

  if (!result.success) {
    const formattedErrors: Record<string, string[]> = {};

    result.error.issues.forEach((issue) => {
      const path = issue.path.join('.');
      if (!formattedErrors[path]) {
        formattedErrors[path] = [];
      }
      formattedErrors[path].push(issue.message);
    });

    setErrors(formattedErrors);
    return;
  }
  
  setErrors({});
  console.log("Form submitted successfully", formSection);

  try {
    const { data, error } = await supabase.from("products").insert([
      {
        manufactor: formSection.manufactor,
        articelNumber: formSection.articelNumber,
        manufactorYear: formSection.manufactorYear,
        boughtYear: formSection.boughtYear,
        gtin: formSection.gtin,
        rsk: formSection.rsk,
        bsab: formSection.bsab,
        enr: formSection.enr,
        bk04: formSection.bk04,
      },
    ]);

    if (error) throw error;

    console.log("Data inserted successfully:", data);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};




const handleNext = () => {    
  handleSave();
  navigate(`/form2`);
}


const handlePrevious = () => {    
    navigate(`/form5`);
  }

  return (
    <main className="mt-16 px-28 flex flex-col">

      <div className='flex justify-start items-center mb-4 '>
        <Typography variant="h2" size="md" className='text-[#151515] text-[31px] font-bold font-poppins'>Produktinformation</Typography>
      </div>


      <section className="w-full flex justify-between mb-12">
        <Button
          onClick={handlePrevious}              
          size="medium"
          variant="white"
        >
          &lt; Föregående
        </Button>


        <div className='flex gap-2'>
          <Button
            onClick={handleSave}
            size="medium"
            variant="white"
          >
            Spara utkast
          </Button>
          
          <Button
            onClick={handleNext}
            size="medium"
            variant="blue"
          >
            Nästa &gt;
          </Button>
        
        </div>
      </section>
    </main>
  );
}
   
export default Form_4;
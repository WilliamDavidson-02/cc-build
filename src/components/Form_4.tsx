import Button from "./Buttons";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '@/context/formContext';
import { supabase } from "@/lib/sbClient";
import Typography from "./Typography";
import { z } from 'zod';
import Textfield from "./Textfield";

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
    <main className="mt-16 px-48 flex flex-col items-center justify-center w-full">

      <div className='flex justify-start items-center mb-10 w-full'>
        <Typography variant="h2" size="md" className='text-[#151515] text-[31px] font-bold font-poppins'>Produktinformation</Typography>
      </div>

      <div className="flex flex-row gap-10 w-full justify-center">
        <section className="flex flex-col gap-6 px-4 py-5 w-1/2 shadow-lg">
          <div className="flex flex-col gap-4 w-full">
            <Textfield
              title="Tillverkare/Leverantör"
              name="manufactor"
              size="large"
              placeholder="ange tillverkare eller leverantör"
              value={formSection.manufactor || ""}
              onChange={handleInputChange}
              
            />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <Textfield
              title="Artikelnummer"
              name="articelNumber"
              size="large"
              placeholder="ange artikelnummer"
              value={formSection.articelNumber || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <Textfield
              title="Tillverkningsår"
              name="manufactorYear"
              size="large"
              placeholder="ange tillverkningsår"
              value={formSection.manufactorYear || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <Textfield
              title="Inköpsår"
              name="boughtYear"
              size="large"
              placeholder="ange inköpsår"
              value={formSection.boughtYear || ""}
              onChange={handleInputChange}
            />          
          </div>

        </section>

        <section className="flex flex-col gap-6 justify-center px-4 py-5 w-1/2">
          <div className="flex gap-4 w-full  items-center">
            <Button size="medium" variant="blue" className="min-w-[110px]"><span className="text-[24px]">+</span> GTIN</Button>
            <Typography variant="p" size="md" className="text-inter" >Ange GTIN om GTIN finns/är känt</Typography>
          </div>
          <div className="flex gap-4 w-full">
            <Button size="medium" variant="blue" className="min-w-[110px]"><span className="text-[24px]">+</span> RSK</Button>
            <Typography variant="p" size="md" className="text-inter" >Relevant för elektronik och VVS</Typography>
          </div>
          <div className="flex gap-4 w-full">
            <Button size="medium" variant="blue" className="min-w-[110px]"><span className="text-[24px]">+</span> BSAB</Button>
            <Typography variant="p" size="md" className="text-inter" >Ange BSAB-kod om känt/relevant. Används för att underlätta klassificering och sökning.</Typography>
          </div>
          <div className="flex gap-4 w-full">
            <Button size="medium" variant="blue" className="min-w-[110px]"><span className="text-[24px]">+</span> E-NR</Button>
            <Typography variant="p" size="md" className="text-inter" >Relevant för elektronik och VVS</Typography>
          </div>
          <div className="flex gap-4 w-full">
            <Button size="medium" variant="blue" className="min-w-[110px]"><span className="text-[24px]">+</span> BK-04</Button>
            <Typography variant="p" size="md" className="text-inter" >Ange BK04-kod om känt/relevant. Används för att underlätta klassificering och sökning.</Typography>
          </div>
        </section>

      </div>


      <section className="w-full flex justify-between my-12">
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
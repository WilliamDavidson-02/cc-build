import React, { ChangeEvent, useEffect } from 'react';
import { useFormContext } from '@/context/formContext';
//import FormNavigationButtons from './FormNavBtns';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Button from './Buttons';
import Textfield from './Textfield';
import DatePicker from './DatePicker';
import Typography from './Typography';
import Input from './Input';




const Step2Schema = z.object({
  amount: z.number().min(1, "Minsta tillåtna antal är 1"),
  status: z.string().optional(),
  marketplace: z.string().optional(),
  place1: z.string().min(2, "Plats måste vara minst 2 tecken").optional(),
  place2: z.string().min(2, "Plats måste vara minst 2 tecken").optional(),
  place3: z.string().min(2, "Plats måste vara minst 2 tecken").optional(),
  place4: z.string().min(2, "Plats måste vara minst 2 tecken").optional(),
  dismantability: z.string().optional(),
  accessibility: z.string().optional(),
  dateAcces: z.date().optional(),
  dateFirstPosDelivery: z.date().optional(),
  decisionDesignation1: z.string().min(2, "Beslutsbenämning måste vara minst 2 tecken").optional(),
  decisionDesignation2: z.string().min(2, "Beslutsbenämning måste vara minst 2 tecken").optional(),
  decisionDesignation3: z.string().min(2, "Beslutsbenämning måste vara minst 2 tecken").optional(),
  decisionDesignation4: z.string().min(2, "Beslutsbenämning måste vara minst 2 tecken").optional(),
});


type Step2Data = z.infer<typeof Step2Schema>;


//do I have to type it with the generic type <Step2Data>?
const FormStep2: React.FC = () => {  
  const { formData, setFormData, errors, setErrors } = useFormContext();
  const navigate = useNavigate();


  /* LAST WORKING VERSION
  
  useEffect(() => {
    if (!formData) {
      setFormData((prevData) => ({
        ...prevData,
        amount: 1,
        status: "Ej inventerad",
        marketplace: "Ej publicerad",
        place1: "",
        place2: "",
        place3: "",
        place4: "",
        dismantability: "Ej Demonterbar",
        accessibility: "Ej Åtkomlig",
        dateAcces: new Date(),
        dateFirstPosDelivery: new Date(),
        decisionDesignation1: "",
        decisionDesignation2: "",
        decisionDesignation3: "",
        decisionDesignation4: "",
      }));
    }
  }, [formData, setFormData]); */

  useEffect(() => {
    if (!formData) {
      const initialData: Step2Data = {
        amount: 1,
        status: "Ej inventerad",
        marketplace: "Ej publicerad",
        place1: "",
        place2: "",
        place3: "",
        place4: "",
        dismantability: "Ej Demonterbar",
        accessibility: "Ej Åtkomlig",
        dateAcces: new Date(),
        dateFirstPosDelivery: new Date(),
        decisionDesignation1: "",
        decisionDesignation2: "",
        decisionDesignation3: "",
        decisionDesignation4: "",
      };
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [formData, setFormData]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'antal' ? parseInt(value, 10) : value,
    }));
  };

  
  /* LAST WORKING VERSION
  
  const handleSave = async () => {
    const validation = Step2Schema.safeParse(formData);
    if (!validation.success) {
      const formattedErrors: Record<string, string[]> = {};
      Object.entries(validation.error.format()).forEach(([key, value]) => {
        if (key !== '_errors' && typeof value === 'object' && 'errors' in value) {
          formattedErrors[key] = value.errors as string[];
        }
      });
      setErrors(formattedErrors);
    } else {
      setErrors(null);
      console.log("Data saved successfully:", formData);
    }
  }; */

  const handleSave = () => {
    const result = Step2Schema.safeParse(formData);
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
    } else {
      setErrors({});
      const validatedData: Step2Data = result.data;
      console.log("Data saved successfully:", validatedData);
    }
  };
  
  const [isSelected, setIsSelected] = React.useState(false);
  const handleCheckboxChange = () => setIsSelected(prev => !prev);
  

  
  const handleAdd = () => isSelected && console.log('Add new section');
  const handleDel = () => isSelected && console.log('Delete selected section');
  const handleChange = () => isSelected && console.log('Change selected section');
  const handleCom = () => isSelected && console.log('Add comment to selected section');

  const handleNext = () => {    
      handleSave();
      navigate(`/form3`);
    }
  

  const handlePrevious = () => {    
      navigate(`/form`);
    }
  


  return (
    <main className="bg-slate-100 py-28 px-28 flex flex-col">


      <div className='flex flex-row gap-4 mb-4 '>
        <Button size="medium" variant="blue" onClick={handleAdd}>Lägg till ny</Button>
        <Button size="medium" variant="white" onClick={handleDel}>Radera</Button>
        <Button size="medium" variant="white" onClick={handleChange}>Ändra</Button>
        <Button size="medium" variant="white" onClick={handleCom}>Kommentar</Button>
      </div>


      <div className="flex">
        <div className='flex h-full items-start pt-8 pr-2'>
          <Input type="checkbox" onChange={handleCheckboxChange} />
        </div>
        <form className="flex flex-col gap-10">
          <section className="flex flex-col gap-6 px-4 py-6 shadow-lg">
             
            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label className='text-[14px] font-semibold'>Antal</label>          
                <input              
                  type="number"
                  name="amount"
                  value={formData.amount || 1}
                  onChange={handleInputChange}
                  placeholder="Antal (st)"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className='text-[14px] font-semibold'>Status</label>
                <select
                  name="status"
                  value={formData.status || "Ej inventerad"}
                  onChange={handleInputChange}
                >
                  <option value="Inventerad">Inventerad</option>
                  <option value="Ej inventerad">Ej inventerad</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className='text-[14px] font-semibold'>Marknadsplatsen</label>
                <select
                  name="marketplace"
                  value={formData.marketplace || "Ej publicerad"}
                  onChange={handleInputChange}
                >
                  <option value="Ej publicerad">Ej publicerad</option>
                  <option value="Publicerad">Publicerad</option>
                </select>
              </div>
            </div>


            <div className="flex gap-6">
              <div className="relative flex flex-col gap-2">
                  <Textfield
                    title="Plats"
                    size="small"
                    name="place1"
                    placeholder='Ange plats'
                    value={formData.place1 || ""}
                    onChange={handleInputChange}
                  /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[20%] cursor-pointer select-none  w-6 ' />
                </div>
                <div className="relative flex flex-col gap-2">
                  <Textfield
                    title="Plats"
                    size="small"
                    name="place2"
                    placeholder='Ange plats'
                    value={formData.place2 || ""}
                    onChange={handleInputChange}
                  /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[20%] cursor-pointer select-none  w-6 ' />
                </div>
                <div className="relative flex flex-col gap-2">
                  <Textfield
                    title="Plats"
                    size="small"
                    name="place3"
                    placeholder='Ange plats'
                    value={formData.place3 || ""}
                    onChange={handleInputChange}
                  /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[20%] cursor-pointer select-none  w-6 ' />
                </div>
                <div className="relative flex flex-col gap-2">
                  <Textfield                
                    title="Plats"
                    size="small"
                    name="place4"
                    placeholder='Ange plats'
                    value={formData.place4 || ""}
                    onChange={handleInputChange}
                  /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[20%] cursor-pointer select-none  w-6 ' />
                </div>
              </div>


          </section>


          <section className="flex flex-col gap-6 px-4">
            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                  <label className='text-[14px] font-semibold'>Demonterbarhet</label>
                  <select
                    name="dismantability"
                    value={formData.dismantability || "Ej Demonterbar"}
                    onChange={handleInputChange}
                  >
                    <option value="Demonterbar">Demonterbar</option>
                    <option value="Ej Demonterbar">Ej Demonterbar</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className='text-[14px] font-semibold'>Åtkomlighet</label>
                  <select
                    name="accessibility"
                    value={formData.accessibility || "Ej Åtkomlig"}
                    onChange={handleInputChange}
                  >
                    <option value="Åtkomlig">Åtkomlig</option>
                    <option value="Ej Åtkomlig">Ej Åtkomlig</option>
                  </select>
                </div>              
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-2 min-w-[162px]">
                  <Typography variant="p" size="sm" className='text-[14px] font-semibold'>Datum tillgänglig</Typography>
                    <DatePicker
                      selected={new Date()}
                      setSelected={() => {}}
                    />
                  </div>
                  <div className="flex flex-col gap-2 min-w-[162px]">
                  <Typography variant="p" size="sm" className='text-[14px] font-semibold'>Datum första möjliga leverans</Typography>
                    <DatePicker
                      selected={new Date()}
                      setSelected={() => {}}
                    />
                  </div>
              </div>
          </section>


          <section className="flex flex-row gap-6 px-4">
            <div className="relative flex flex-col gap-2">
                <Textfield                
                  title="Beslutsbenämning"
                  size="small"
                  name="decisionDesignation1"
                  placeholder='Ange'
                  value={formData.decisionDesignation1 || ""}
                  onChange={handleInputChange}
                /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[80%] cursor-pointer select-none  w-6 ' />
              </div>


              <div className="relative flex flex-col gap-2">
                <Textfield                
                  title="Beslutsbenämning"
                  size="small"
                  name="decisionDesignation2"
                  placeholder='Ange'
                  value={formData.decisionDesignation2 || ""}
                  onChange={handleInputChange}
                /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[80%] cursor-pointer select-none  w-6 ' />
              </div>
              <div className="relative flex flex-col gap-2">
                <Textfield                
                  title="Beslutsbenämning"
                  size="small"
                  name="decisionDesignation3"
                  placeholder='Ange'
                  value={formData.decisionDesignation3 || ""}
                  onChange={handleInputChange}
                /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[80%] cursor-pointer select-none  w-6 ' />
              </div>
              <div className="relative flex flex-col gap-2">
                <Textfield                
                  title="Beslutsbenämning"
                  size="small"
                  name="decisionDesignation4"
                  placeholder='Ange'
                  value={formData.decisionDesignation4 || ""}
                  onChange={handleInputChange}
                /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[80%] cursor-pointer select-none  w-6 ' />
              </div>
          </section>
         
          {errors && (
            <div className="text-red-500">
              {Object.entries(errors).map(([key, value]) => (
                <p key={key}>{value.join(', ')}</p>
              ))}
            </div>
          )}


          <section className="w-full flex justify-between">
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

        </form>
      </div>
    </main>
  );
};


export default FormStep2;
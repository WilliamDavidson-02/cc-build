import React, { ChangeEvent, useEffect } from 'react';
import { useFormContext } from '@/context/formContext';
import FormNavigationButtons from './FormNavBtns';
import { z } from 'zod';
import Button from './Buttons';
import Textfield from './Textfield';
import Dropdown from './Dropdown';
import DatePicker from './DatePicker';
import Typography from './Typography';
import Input from './Input';




const Step2Schema = z.object({
  antal: z.number().min(1, "Minsta tillåtna antal är 1"),
  status: z.enum(["Inventerad", "Ej inventerad"]),
  marknadsplatsen: z.enum(["Ej publicerad", "Publicerad"]),
  plats: z.string().min(2, "Plats måste vara minst 2 tecken"),
});


type Step2Data = z.infer<typeof Step2Schema>;
type Step2Errors = z.ZodFormattedError<Step2Data>;


const FormStep2: React.FC = () => {
  const { formData, setFormData, errors, setErrors, saveForm } = useFormContext();


  useEffect(() => {    
    if (!formData.step2) {
      setFormData(prevData => ({
        ...prevData,
        step2: {
          antal: 1,
          status: "Ej inventerad",
          marknadsplatsen: "Ej publicerad",
          plats: "",
        }
      }));
    }
  }, [formData, setFormData]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      step2: {
        ...(prevData.step2 as Step2Data),
        [name]: name === 'antal' ? parseInt(value, 10) : value,
      }
    }));
  };


  const handleSave = async () => {
    const step2Data = formData.step2 as Step2Data;
    const validation = Step2Schema.safeParse(step2Data);


    if (!validation.success) {
      setErrors(validation.error.format() as Step2Errors);
    } else {
      setErrors(null);
      console.log("Data saved successfully:", step2Data);
    }
  };


  useEffect(() => {
    saveForm.current = handleSave;
  }, [saveForm, formData]);


  const handleCheckboxChange = () => {
    setIsSelected(prev => !prev);
  };


  const handleAdd = () => {
    if (isSelected) {
      console.log('Add new section');      
    }
  };


  const handleDel = () => {
    if (isSelected) {
      console.log('Delete selected section');
    }
  };


  const handleChange = () => {
    if (isSelected) {
      console.log('Change selected section');
    }
  };


  const handleCom = () => {
    if (isSelected) {
      console.log('Add comment to selected section');
    }
  };


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
          <Input type="checkbox"  />
        </div>
        <form className="flex flex-col gap-10">
          <section className="flex flex-col gap-6 px-4 py-6 shadow-lg">
             
            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label className='text-[14px] font-semibold'>Antal</label>          
                <input              
                  type="number"
                  name="antal"
                  value={(formData.step2 as Step2Data)?.antal || 1}
                  onChange={handleInputChange}
                  placeholder="Antal (st)"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className='text-[14px] font-semibold'>Status</label>
                <select
                  name="status"
                  value={(formData.step2 as Step2Data)?.status || "Ej inventerad"}
                  onChange={handleInputChange}
                >
                  <option value="Inventerad">Inventerad</option>
                  <option value="Ej inventerad">Ej inventerad</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className='text-[14px] font-semibold'>Marknadsplatsen</label>
                <select
                  name="marknadsplatsen"
                  value={(formData.step2 as Step2Data)?.marknadsplatsen || "Ej publicerad"}
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
                    name="plats1"
                    placeholder='Ange plats'
                    value={(formData.step2 as Step2Data)?.plats1 || ""}
                    onChange={handleInputChange}
                  /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[20%] cursor-pointer select-none  w-6 ' />
                </div>
                <div className="relative flex flex-col gap-2">
                  <Textfield
                    title="Plats"
                    size="small"
                    name="plats2"
                    placeholder='Ange plats'
                    value={(formData.step2 as Step2Data)?.plats2 || ""}
                    onChange={handleInputChange}
                  /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[20%] cursor-pointer select-none  w-6 ' />
                </div>
                <div className="relative flex flex-col gap-2">
                  <Textfield
                    title="Plats"
                    size="small"
                    name="plats3"
                    placeholder='Ange plats'
                    value={(formData.step2 as Step2Data)?.plats3 || ""}
                    onChange={handleInputChange}
                  /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[20%] cursor-pointer select-none  w-6 ' />
                </div>
                <div className="relative flex flex-col gap-2">
                  <Textfield                
                    title="Plats"
                    size="small"
                    name="plats4"
                    placeholder='Ange plats'
                    value={(formData.step2 as Step2Data)?.plats4 || ""}
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
                    name="Demonterbarhet"
                    value={(formData.step2 as Step2Data)?.Demonterbarhet || "Ej Demonterbar"}
                    onChange={handleInputChange}
                  >
                    <option value="Demonterbar">Demonterbar</option>
                    <option value="Ej Demonterbar">Ej Demonterbar</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className='text-[14px] font-semibold'>Åtkomlighet</label>
                  <select
                    name="Åtkomlighet"
                    value={(formData.step2 as Step2Data)?.Åtkomlighet || "Ej Åtkomlig"}
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
                  name="beslutsbenämning1"
                  placeholder='Ange'
                  value={(formData.step2 as Step2Data)?.beslutsbenämning1 || ""}
                  onChange={handleInputChange}
                /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[80%] cursor-pointer select-none  w-6 ' />
              </div>


              <div className="relative flex flex-col gap-2">
                <Textfield                
                  title="Beslutsbenämning"
                  size="small"
                  name="beslutsbenämning2"
                  placeholder='Ange'
                  value={(formData.step2 as Step2Data)?.beslutsbenämning2 || ""}
                  onChange={handleInputChange}
                /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[80%] cursor-pointer select-none  w-6 ' />
              </div>
              <div className="relative flex flex-col gap-2">
                <Textfield                
                  title="Beslutsbenämning"
                  size="small"
                  name="beslutsbenämning3"
                  placeholder='Ange'
                  value={(formData.step2 as Step2Data)?.beslutsbenämning3 || ""}
                  onChange={handleInputChange}
                /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[80%] cursor-pointer select-none  w-6 ' />
              </div>
              <div className="relative flex flex-col gap-2">
                <Textfield                
                  title="Beslutsbenämning"
                  size="small"
                  name="beslutsbenämning4"
                  placeholder='Ange'
                  value={(formData.step2 as Step2Data)?.beslutsbenämning4 || ""}
                  onChange={handleInputChange}
                /><img src="/info.svg" alt="info icon" className='absolute top-0 left-[80%] cursor-pointer select-none  w-6 ' />
              </div>
          </section>
         


         
          {errors && (
            <div className="text-red-500">
              {Object.entries(errors).map(([key, value]) => (
                <p key={key}>{(value as { _errors: string[] })._errors.join(', ')}</p>
              ))}
            </div>
          )}
          <FormNavigationButtons currentStep={2} totalSteps={5} />
        </form>
      </div>
    </main>
  );
};


export default FormStep2;
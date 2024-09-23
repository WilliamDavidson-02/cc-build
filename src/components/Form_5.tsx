import { z } from "zod"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormContext } from "@/context/formContext";
import { supabase } from "@/lib/sbClient";
import Typography from "./Typography";
import Textfield from "./Textfield";
import Button from "./Buttons";
import Info from "./icons/Info";

const step5Schema = z.object({
  price_new: z.number().optional(),
  buyer_price: z.boolean().optional(),
  extern_price: z.number().optional(),
  intern_price: z.number().optional(),
  pick_up_on_site: z.boolean().optional(),
  send_with_freight: z.boolean().optional(),
  address: z.string().optional(),
  postal_code: z.number().optional(),
  locality: z.string().optional(),
  comment: z.string().optional(),  

})

type Step5Data = z.infer<typeof step5Schema>

const Form_5: React.FC = () => {
  const { formData, setFormData, errors, setErrors } = useFormContext();
  const navigate = useNavigate();
  const [formSection, setFormSection] = useState<Step5Data>({
    price_new: 0,
    buyer_price: false,
    extern_price: 0,
    intern_price: 0,
    pick_up_on_site: false,
    send_with_freight: false,
    address: "",
    postal_code: 0,
    locality: "",
    comment: "",
  });
  
  useEffect(() => {
    if (!formData) {
      const initialData: Step5Data = {
        price_new: 0,
        buyer_price: false,
        extern_price: 0,
        intern_price: 0,
        pick_up_on_site: false,
        send_with_freight: false,
        address: "",
        postal_code: 0,
        locality: "",
        comment: "",
      };
      setFormData((prevData) => ({
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
    const result = step5Schema.safeParse(formSection);

    if (!result.success) {
      const formattedErrors: Record<string, string[]> = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
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
          ...formSection,          
        },
      ]);

      if (error) throw error;

      console.log("Data inserted successfully:", data);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  //a function that generates a random price
  const generateRandomPrice = () => {
    const randomPrice = Math.floor(Math.random() * 1000) + 1;
    setFormSection((prevSection) => ({
      ...prevSection,
      price_new: randomPrice,
    }));
  };

  

  const handlePrevious = () => {
    navigate(`/form_4`);
  };

  return(
 <main className="mt-16 px-52 flex flex-col items-center justify-center w-full">
   
   <form className="flex flex-col gap-10 w-full">
      <div className="flex justify-start items-center w-full px-4">
        <Typography
          variant="h2"
          size="md"
          className="text-[#151515] text-[31px] font-bold font-poppins"
        >
          Hantering för marknadsplats
        </Typography>
      </div>

      <section className="flex flex-col gap-6 py-6 px-4 w-full">
        <div className="flex justify-between items-center " >
          <div className="flex gap-6">
            <Textfield
              title="Nypris / st"
              name="price_new"
              size="large"
              placeholder="nypris"
              value={formSection.price_new || ""}
              onChange={handleInputChange}
            />
            <div className="flex items-end">
              <Button variant="blue" size="medium" className="max-h-[58px]" onClick={generateRandomPrice}>Uppskatta pris</Button>
            </div>

            <div className="flex gap-2 items-center">
              <input className="transform scale-125" type="checkbox" name="buyer_price" value="buyer_price" onChange={handleInputChange} />
              <label htmlFor="buyer_price">Låt köparen föreslå pris</label>
            </div>

          </div>
          
          <div className="flex gap-2 relative border border-black py-2 px-4 ">
            <Typography variant="p" size="md" className="text-[#151515] text-[18px]  font-poppins">
              Alla priser ska anges exklusive moms
            </Typography>
            <Info className="self-center" />
          </div>
         
        </div>

        <div className="flex gap-6 items-end " >
          <Textfield 
            title="Externpris / st" 
            name="extern_price" 
            size="large" 
            placeholder="externpris" 
            value={formSection.extern_price || ""} 
            onChange={handleInputChange} 
          />
          <Textfield 
            title="Internt pris / st" 
            name="intern_price" 
            size="large" 
            placeholder="internt pris" 
            value={formSection.intern_price || ""} 
            onChange={handleInputChange}
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 py-6  w-full">
        <div className="w-full">
          <div className="flex flex-col gap-6 shadow-lg w-[60%] p-4">
            <div className="flex gap-6 items-center">
              <div className="flex gap-2 items-center font-inter">
                <input className="transform scale-125" type="checkbox" name="pick_up_on_site" value="pick_up_on_site" onChange={handleInputChange} />
                <label htmlFor="pick_up_on_site">Kan hämtas på plats</label>
              </div>
              <div className="flex gap-2 items-center font-inter">
                <input className="transform scale-125" type="checkbox" name="send_with_freight" value="send_with_freight" onChange={handleInputChange} />
                <label htmlFor="send_with_freight">Kan skickas med frakt</label>
              </div>
            </div>


            <div className="flex gap-6">
              <Textfield
                title="Adress"
                name="address"
                size="large"
                placeholder="ange adress"
                value={formSection.address || ""}
                onChange={handleInputChange}
              />
            
              <Textfield
                title="Postnummer"
                name="postal_code"
                size="large"
                placeholder="ange postnummer"
                value={formSection.postal_code || ""}
                onChange={handleInputChange}
              />
              <Textfield
                title="Ort"
                name="locality"
                size="large"
                placeholder="ange ort"
                value={formSection.locality || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex gap-6 px-4 w-full">
        <div className="flex flex-col gap-2 max-w-[60%]">
          <Textfield
            title="Kommentar"
            name="comment"
            size="large"
            placeholder="ange kommentar"
            value={formSection.comment || ""}
            onChange={handleInputChange}
          />
          <Typography variant="p" size="md" className="text-[#151515] text-[18px]  font-poppins">
            Ange kompletterande info om prissättningen och eventuella garantier, tex om kostnader tillkommer 
            för demontering och frakt, samt möjliga betalningsmetoder såsom faktura eller andra betalsätt.
          </Typography>
        </div>

{/*fetch the contact person from the database!! */}
        <Textfield
          title="Kontaktperson"
          name="contact_person"
          size="large"
          placeholder="ange kontaktperson"
          value="Marie Kalmnäs"
          onChange={handleInputChange}
        />
      </section>
      

      {errors && (
            <div className="text-red-500">
              {Object.entries(errors).map(([key, value]) => (
                <p key={key}>{value.join(', ')}</p>
              ))}
            </div>
          )}

      </form>

      <section className="w-full flex justify-between my-16">
        <Button onClick={handlePrevious} size="medium" variant="white">
          &lt; Föregående
        </Button>

        
        <Button onClick={handleSave} size="medium" variant="blue">
          Spara
        </Button>        
      </section>
  </main>
  );
}

export default Form_5;
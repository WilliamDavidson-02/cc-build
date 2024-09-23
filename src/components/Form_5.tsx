import { z } from "zod"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormContext } from "@/context/formContext";

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

    
  return(

  );
}

export default Form_5;
import { ChangeEvent, FC } from "react";
import { z } from "zod";
import Textfield from "@/components/Textfield";
import Button from "@/components/Buttons";
import { useState } from "react";
import { supabase } from "@/lib/sbClient";
import FormNavigationButtons from "./FormNavBtns";

type FormProps = {};

const FormSchema = z.object({
  name: z.string().max(255).min(2, "Name must be at least 2 characters"),
  product_id: z.string(),
});

type FormErrors = z.inferFormattedError<typeof FormSchema>;

const Form: FC<FormProps> = ({}) => {
  const [errors, setErrors] = useState<FormErrors | undefined>(undefined);
  const [formData, setFormData] = useState({
    project_id: "123e4567-e89b-12d3-a456-426614174000",
    name: "",
    product_id: "0",
  });

  console.log("formData:", formData);

  const handleButtonClick = () => {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = FormSchema.safeParse(formData);

    if (!validation.success) {
      const formErrors = validation.error.format();
      setErrors(formErrors);
    } else {
      setErrors(undefined);
      console.log("Form submitted successfully", formData);

      try {
        const { data, error } = await supabase.from("products").insert([
          {
            project_id: formData.project_id,
            name: formData.name,
            product_id: formData.product_id,
          },
        ]);

        if (error) throw error;

        console.log("Data inserted successfully:", data);

        setFormData({
          project_id: "123e4567-e89b-12d3-a456-426614174000",
          name: "",
          product_id: "0",
        });
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-slate-100 py-28 px-28 flex">
      <div className="flex">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex gap-6 flex-wrap">
            <Textfield
              title="Produktnamn"
              size="medium"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors?.name && <span>{errors.name._errors[0]}</span>}
            <Textfield
              title="Eget ID"
              size="medium"
              name="product_id"
              value={formData.product_id}
              onChange={handleInputChange}
            />
          </div>
          {errors?.product_id && <span>{errors.product_id._errors[0]}</span>}

          {/* <section className="flex justify-between flex-wrap gap-6">
            <div>
              <Button size="medium" variant="white" onClick={handleButtonClick}>
                Föregående
              </Button>
            </div>
            <div className=" flex gap-2 flex-wrap">
              <Button size="medium" variant="white" onClick={handleButtonClick}>
                Spara utkast
              </Button>
              <Button size="medium" variant="blue" onClick={handleButtonClick}>
                Nästa
              </Button>
              <Button size="medium" variant="blue" type="submit">
                Submit
              </Button>
            </div>
          </section> */}

          <FormNavigationButtons currentStep={1} totalSteps={5} />
        </form>
      </div>
    </div>
  );
};

export default Form;

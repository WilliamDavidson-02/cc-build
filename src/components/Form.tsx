import { ChangeEvent, FC } from "react";
import { z } from "zod";
import Textfield from "@/components/Textfield";
import Button from "@/components/Buttons";
import { useState } from "react";

type FormProps = {};

const FormSchema = z.object({
  project: z
    .string()
    .max(255)
    .min(2, "Project name must be at least 2 characters"),
  name: z.string().max(255).min(2, "Name must be at least 2 characters"),
  product_id: z.number(),
});

type FormErrors = z.inferFormattedError<typeof FormSchema>;

const Form: FC<FormProps> = ({}) => {
  const [errors, setErrors] = useState<FormErrors | undefined>(undefined);
  const [formData, setFormData] = useState({
    project: "",
    name: "",
    product_id: 0,
  });

  console.log("formData:", formData);

  const handleButtonClick = () => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = FormSchema.safeParse(formData);

    if (!validation.success) {
      const formErrors = validation.error.format();
      setErrors(formErrors);
    } else {
      setErrors(undefined);
      console.log("Form submitted successfully", formData);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "product_id" ? Number(value) : value,
    }));
  };

  return (
    <div className="bg-slate-100 py-28 px-28">
      <div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex gap-10">
            <Textfield
              title="Projekt"
              size="medium"
              name="project"
              value={formData.project}
              onChange={handleInputChange}
            />
            {errors?.project && <span>{errors.project._errors[0]}</span>}
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

          <section className="flex justify-between">
            <div>
              <Button size="medium" variant="white" onClick={handleButtonClick}>
                Föregående
              </Button>
            </div>
            <div className=" flex gap-2">
              <Button size="medium" variant="white" onClick={handleButtonClick}>
                Spara utkast
              </Button>
              <Button size="medium" variant="blue" onClick={handleButtonClick}>
                Nästa
              </Button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Form;

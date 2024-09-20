import { ChangeEvent, FC, useContext, useState } from "react";
import { z } from "zod";
import Textfield from "@/components/Textfield";
import Button from "@/components/Buttons";
import Dropdown from "@/components/Dropdown";
import FileUpload from "@/components/Upload";
import { FormContext } from "@/context/formContext";
import Typography from "./Typography";

type FormProps = {
  name: string;
  product_id: string;
  // Add other form fields as needed
};

const FormSchema = z.object({
  name: z.string().max(255).min(2, "Name must be at least 2 characters"),
  product_id: z.string(),
});

const Form: FC<FormProps> = ({}) => {
  const { formData, setFormData, errors, setErrors } = useContext(FormContext)!;
  const [categorystate, setCategorystate] = useState(false);

  const handleButtonClick = () => {};

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const validation = FormSchema.safeParse(formData);

  //   if (!validation.success) {
  //     const formErrors = validation.error.format();
  //     setErrors(formErrors);
  //   } else {
  //     setErrors(null);
  //     console.log("Form submitted successfully", formData);

  //     setFormData({
  //       project_id: "123e4567-e89b-12d3-a456-426614174000",
  //       name: "",
  //       product_id: "0",
  //     });
  //   }
  // };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className=" py-28 px-28 flex flex-col justify-center">
      <Typography variant="h3">Generell information </Typography>
      <div className="flex mt-12">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-6 max-w-12">
              <Textfield
                title="Projekt"
                size="medium"
                name="name"
                value={formData.project_id}
                onChange={handleInputChange}
              />

              <div className="flex flex-col">
                <div>
                  <Textfield
                    title="Produktnamn"
                    size="medium"
                    name="name"
                    value={formData.name as string}
                    onChange={handleInputChange}
                  />
                </div>
                <p>
                  Om du inte anger något här skapas ett produktnamn när du
                  sparar. Du kan ändra namnet senare.
                </p>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              <Dropdown
                title="Produktkategori"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
              <Dropdown
                title="Produktkategori"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
              <Dropdown
                title="Produktkategori"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
            </div>

            <div className="flex gap-6 flex-wrap">
              <Dropdown
                title="Estetiskt skick"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
              <Dropdown
                title="Funktionellt skick"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
              />
            </div>

            <div className="flex gap-6">
              <FileUpload title="Produktbilder" />
              <FileUpload title="Filer" />
              <div className="flex flex-col justify-end">
                <Textfield
                  title="Eget ID"
                  size="medium"
                  name="product_id"
                  value={formData.product_id as string}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <section className="flex justify-between flex-wrap gap-6">
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
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Form;

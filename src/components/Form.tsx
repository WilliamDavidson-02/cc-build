import { ChangeEvent, useContext } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Textfield from "@/components/Textfield";
import Button from "@/components/Buttons";
import Dropdown from "@/components/Dropdown";
import FileUpload from "@/components/Upload";
import { FormContext } from "@/context/formContext";
import Typography from "@/components/Typography";

const StepOneSchema = z.object({
  project_id: z.string(),
  name: z.string().max(255).min(2, "Name must be at least 2 characters"),
  product_id: z.string(),
  visual_condition: z.number(),
  working_condition: z.number(),
});

type StepOneData = z.infer<typeof StepOneSchema>;

const Form: React.FC = () => {
  const { formData, setFormData, errors, setErrors } = useContext(FormContext)!;
  const navigate = useNavigate();
  console.log("FormData;", formData);

  const handleButtonClick = () => {};

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const goToFormStepTwo = () => {
    navigate("/form-02");
  };

  console.log("FormData in render:", formData);
  return (
    <div className=" py-28 px-28 flex flex-col justify-center">
      <Typography variant="h3">Generell information </Typography>
      <div className="flex mt-12">
        <form className="flex flex-col gap-6">
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-6 max-w-12">
              <Textfield
                title="Projekt"
                size="medium"
                name="project_id"
                value={formData.project_id}
                onChange={handleInputChange}
              />

              <div className="flex flex-col">
                <div>
                  <Textfield
                    title="Produktnamn"
                    size="medium"
                    name="name"
                    value={formData.name}
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
                name="productcategory1"
                value={formData.productcategory1}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Produktkategori"
                options={["Stol", "Badrum"]}
                size="medium"
                name="productcategory2"
                value={formData.productcategory2}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Produktkategori"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                name="productcategory3"
                value={formData.productcategory3}
                onChange={handleSelectChange}
              />
            </div>

            <div className="flex gap-6 flex-wrap">
              <Dropdown
                title="Estetiskt skick"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                name="visual_condition"
                value={formData.visual_condition}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Funktionellt skick"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                name="working_condition"
                value={formData.working_condition}
                onChange={handleSelectChange}
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
                  value={formData.product_id}
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
              <Button size="medium" variant="blue" onClick={goToFormStepTwo}>
                Nästa &gt;
              </Button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Form;

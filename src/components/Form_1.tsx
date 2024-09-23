import { ChangeEvent, useContext, useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Textfield from "@/components/Textfield";
import Button from "@/components/Buttons";
import Dropdown from "@/components/Dropdown";
import FileUpload from "@/components/Upload";
import { FormContext } from "@/context/formContext";
import Typography from "@/components/Typography";
import { supabase } from "@/lib/sbClient";

const StepOneSchema = z.object({
  project: z.string(),
  name: z.string().max(255).min(2, "Name must be at least 2 characters"),
  product_category_1: z.string(),
  product_category_2: z.string(),
  product_category_3: z.string(),
  visual_condition: z.number(),
  working_condition: z.number(),
  image: z.string().array(),
  product_files: z.string().array(),
  product_id: z.string(),
});

type StepOneData = z.infer<typeof StepOneSchema>;

const Form_1: React.FC = () => {
  const { formData, setFormData, errors, setErrors } = useContext(FormContext)!;
  const navigate = useNavigate();

  const [formSection, setFormSection] = useState<StepOneData>({
    project: "",
    name: "",
    product_category_1: "",
    product_category_2: "",
    product_category_3: "",
    visual_condition: 0,
    working_condition: 0,
    image: [],
    product_files: [],
    product_id: "",
  });

  const handleButtonClick = () => {};

  const handleSave = async () => {
    try {
      const { data, error } = await supabase.from("products").insert([
        {
          project_id: "105e83a3-1f8b-492a-8b7b-74c001a98e2d",
          // project: "",
          name: formSection.name,
          // product_category_1: "",
          // product_category_2: "",
          // product_category_3: "",
          visual_condition: formSection.visual_condition,
          working_condition: formSection.working_condition,
          // image: [],
          // product_files: [],
          // product_id: "",
        },
      ]);

      if (error) throw error;

      console.log("Data inserted successfully:", data);
    } catch (error) {
      console.log("Error inserting data", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormSection((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormSection((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSetFiles = (files: File[], prop: "image" | "product_files") => {
    setFormData((prev) => ({
      ...prev,
      [prop]: files,
    }));
  };

  const goToFormStepTwo = () => {
    navigate("/form-02");
  };

  console.log("FormSection in render:", formSection);

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
                name="project"
                value={formSection.project}
                onChange={handleInputChange}
              />

              <div className="flex flex-col">
                <div>
                  <Textfield
                    title="Produktnamn"
                    size="medium"
                    name="name"
                    value={formSection.name}
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
                options={["Inreding & möbler", "Dörrar", "WC & badrum"]}
                size="medium"
                name="product_category_1"
                value={formSection.product_category_1}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Produktkategori"
                options={["Stol", "Altandörr", "Tvättställ"]}
                size="medium"
                name="product_category_2"
                value={formSection.product_category_2}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Produktkategori"
                options={["Skrivbordsstol", "Pardörr", "Rostfritt"]}
                size="medium"
                name="product_category_3"
                value={formSection.product_category_3}
                onChange={handleSelectChange}
              />
            </div>

            <div className="flex gap-6 flex-wrap">
              <Dropdown
                title="Estetiskt skick"
                options={[
                  { label: "1 - Skada går ej att åtgärda", value: 1 },
                  { label: "2 - Skada är svår att åtgärda", value: 2 },
                  { label: "3 - Skada går att åtgärda av proffs", value: 3 },
                  { label: "4 - Skada går att åtgärda av lekman", value: 4 },
                  { label: "5 - Inga skador", value: 5 },
                ]}
                size="medium"
                name="visual_condition"
                value={formSection.visual_condition}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Funktionellt skick"
                options={[
                  { label: "1 - Funktion går ej att åtgärda", value: 1 },
                  { label: "2 - Funktion är svår att åtgärda", value: 2 },
                  { label: "3 - Funktion går att åtgärda av proffs", value: 3 },
                  { label: "4 - Funktion går att åtgärda av lekman", value: 4 },
                  { label: "5 - Inga brister", value: 5 },
                ]}
                size="medium"
                name="working_condition"
                value={formSection.working_condition}
                onChange={handleSelectChange}
              />
            </div>

            <div className="flex gap-6">
              <FileUpload
                title="Produktbilder"
                uploadedFiles={formData.image}
                setUploadedFiles={(files) => handleSetFiles(files, "image")}
              />
              <FileUpload
                title="Filer"
                uploadedFiles={formData.product_files}
                setUploadedFiles={(files) =>
                  handleSetFiles(files, "product_files")
                }
              />
              <div className="flex flex-col justify-end">
                <Textfield
                  title="Eget ID"
                  size="medium"
                  name="product_id"
                  value={formSection.product_id}
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
              <Button size="medium" variant="white" onClick={handleSave}>
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

export default Form_1;

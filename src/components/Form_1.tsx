import { ChangeEvent, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Textfield from "@/components/Textfield";
import Button from "@/components/Buttons";
import Dropdown from "@/components/Dropdown";
import FileUpload from "@/components/Upload";
import { FormContext } from "@/context/formContext";
import Typography from "@/components/Typography";
import { supabase } from "@/lib/sbClient";
import { v4 as uuid } from "uuid"
import { useUser } from "@/context/userContext";
import { Database } from "@/lib/database.types";

interface StepOneData {
  project: string;
  name: string; // The length constraints (min and max) are not enforceable in a plain type
  product_category_1: string;
  product_category_2: string;
  product_category_3: string;
  visual_condition: string;
  working_condition: string;
  image: File[]; // Since it's an array of `File`, we represent it as `File[]`
  product_files: File[]; // Same for `product_files`
  product_id: string;
  ownId: string;
}

type Project = Database["public"]["Tables"]["projects"]["Row"]
type Category = Database["public"]["Tables"]["category"]["Row"]

const Form_1: React.FC = () => {
  const { formData, setFormData, saveForm } = useContext(FormContext)!;
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories1, setFilteredCategories1] = useState<Category[]>([]);
  const [filteredCategories2, setFilteredCategories2] = useState<Category[]>([]);
  const [filteredCategories3, setFilteredCategories3] = useState<Category[]>([]);
  const [isCategory2Enabled, setIsCategory2Enabled] = useState(false);
  const [isCategory3Enabled, setIsCategory3Enabled] = useState(false);
  const {user} = useUser();
  const navigate = useNavigate();
  const [formSection, setFormSection] = useState<StepOneData>({
    project: "",
    name: "",
    product_category_1: "",
    product_category_2: "",
    product_category_3: "",
    visual_condition: "",
    working_condition: "",
    image: [] as File[],
    product_files: [] as File[],
    product_id: uuid(),
    ownId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: categoryData, error: categoryError } = await supabase
        .from("category")
        .select("*");

      if (categoryError) {
        console.error("Error fetching categories", categoryError);
      } else {
        setCategories(categoryData);
        setFilteredCategories1(categoryData.filter((cat) => !cat.parent_id));
      }

      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user?.id?? "");

      if (projectError) {
        console.log("Error fetching projects", projectError);
      } else {
        setProjects(projectData);
      }
    };

    fetchData();
  }, []);

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

    if (name === "product_category_1") {
      setIsCategory2Enabled(true);
      setFilteredCategories2(
        categories.filter((cat) => cat.parent_id === value)
      );
      setIsCategory3Enabled(false);
      setFilteredCategories3([]);
      setFormSection((prevData) => ({
        ...prevData,
        product_category_2: "",
        product_category_3: "",
      }));
    } else if (name === "product_category_2") {
      setIsCategory3Enabled(true);
      setFilteredCategories3(
        categories.filter((cat) => cat.parent_id === value)
      );
      setFormSection((prevData) => ({
        ...prevData,
        product_category_3: "",
      }));
    }
  };

  const handleProjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedProject = projects.find(
      (project) => project.id === e.target.value
    );
    if (selectedProject) {
      setFormSection((prevData) => ({
        ...prevData,
        project: selectedProject.id,
      }));
    }
  };

  const handleSetFiles = (files: File[], prop: "images" | "product_files") => {
    setFormData((prev) => ({
      ...prev,
      [prop]: files,
    }));
  };

  const handleNext = () => {
    setFormData((prev) => ({
      ...prev,
      ...formSection,
    }));
    
    navigate("/form-02");
  };

  const handleSave = async () => {
    const updatedForm = {...formData, ...formSection }
    
    setFormData(updatedForm);
    saveForm(updatedForm);

   
  };
  
  const categoryOptions1 = filteredCategories1.map((cat) => ({
    label: cat.name?? "",
    value: cat.id?? "",
  }));

  const categoryOptions2 = filteredCategories2.map((cat) => ({
    label: cat.name?? "",
    value: cat.id?? "",
  }));

  const categoryOptions3 = filteredCategories3.map((cat) => ({
    label: cat.name?? "",
    value: cat.id?? "",
  }));

  const projectOptions = projects.map((project) => ({
    label: project.name?? "",
    value: project.id?? "",
  }));

  return (
    <div className=" py-28 px-28 flex flex-col justify-center">
      <Typography variant="h3">Generell information </Typography>
      <div className="flex mt-12">
        <form className="flex flex-col gap-6">
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-6 max-w-12">
              <Dropdown
                title="Projekt"
                options={projectOptions}
                size="medium"
                name="project"
                value={formSection.project}
                onChange={handleProjectChange}
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
                title="Produktkategori 1"
                options={categoryOptions1}
                size="medium"
                name="product_category_1"
                value={formSection.product_category_1}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Produktkategori 2"
                options={categoryOptions2}
                size="medium"
                name="product_category_2"
                value={formSection.product_category_2}
                onChange={handleSelectChange}
                disabled={!isCategory2Enabled}
              />
              <Dropdown
                title="Produktkategori 3"
                options={categoryOptions3}
                size="medium"
                name="product_category_3"
                value={formSection.product_category_3}
                onChange={handleSelectChange}
                disabled={!isCategory3Enabled}
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
                uploadedFiles={formData.images}
                setUploadedFiles={(files) => handleSetFiles(files, "images")}
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
                  name="ownId"
                  value={formSection.ownId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <section className="flex justify-between flex-wrap gap-6">
            {/* <div>
              <Button size="medium" variant="white" onClick={handleButtonClick}>
                Föregående
              </Button>
            </div> */}
            <div className=" flex gap-2 flex-wrap">
              <Button size="medium" variant="white" onClick={handleSave}>
                Spara utkast
              </Button>
              <Button size="medium" variant="blue" onClick={handleNext}>
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

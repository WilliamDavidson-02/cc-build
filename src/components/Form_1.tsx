import { ChangeEvent, useContext, useEffect, useState } from "react";
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
  visual_condition: z.string(),
  working_condition: z.string(),
  image: z.string().array(),
  product_files: z.string().array(),
  product_id: z.string(),
});

type StepOneData = z.infer<typeof StepOneSchema>;

const Form_1: React.FC = () => {
  const { formData, setFormData, errors, setErrors } = useContext(FormContext)!;
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories1, setFilteredCategories1] = useState<any[]>([]);
  const [filteredCategories2, setFilteredCategories2] = useState<any[]>([]);
  const [filteredCategories3, setFilteredCategories3] = useState<any[]>([]);
  const [isCategory2Enabled, setIsCategory2Enabled] = useState(false);
  const [isCategory3Enabled, setIsCategory3Enabled] = useState(false);
  const navigate = useNavigate();

  const [formSection, setFormSection] = useState<StepOneData>({
    project: "",
    name: "",
    product_category_1: "",
    product_category_2: "",
    product_category_3: "",
    visual_condition: "",
    working_condition: "",
    image: [],
    product_files: [],
    product_id: "",
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
        .select("*");

      if (projectError) {
        console.log("Error fetching projects", projectError);
      } else {
        setProjects(projectData);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {};

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

  const goToFormStepTwo = () => {
    navigate("/form-02");
  };

  const handleSave = async () => {
    const getSelectedCategories = () => {
      return [
        { name: formSection.product_category_1 },
        { name: formSection.product_category_2 },
        { name: formSection.product_category_3 },
      ].filter((category) => category.name);
    };
    const selectedCategories = getSelectedCategories();

    const productData = {
      project_id: formSection.project,
      name: formSection.name,
      visual_condition: formSection.visual_condition,
      working_condition: formSection.working_condition,
      product_id: formSection.product_id,
    };

    try {
      const { data, error } = await supabase
        .from("products")
        .insert([productData])
        .select();

      if (error) throw error;

      const productId = data[0]?.id;
      console.log("Product ID:", productId);

      const categoryNames = selectedCategories.map((category) => category.name);
      console.log("Category Names to Fetch:", categoryNames);

      const { data: categories, error: categoriesError } = await supabase
        .from("category")
        .select("id, name")
        .in("name", categoryNames);

      const productCategoryData =
        categories?.map((category) => ({
          product_id: productId,
          category_id: category.id,
        })) || [];

      const { error: productCategoryError } = await supabase
        .from("product_category")
        .insert(productCategoryData);

      console.log("Data inserted successfully:", data);
    } catch (error) {
      console.log("Error inserting data", error);
    }
  };

  const categoryOptions1 = filteredCategories1.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  const categoryOptions2 = filteredCategories2.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  const categoryOptions3 = filteredCategories3.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  const projectOptions = projects.map((project) => ({
    label: project.name,
    value: project.id,
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

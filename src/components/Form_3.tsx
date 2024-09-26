import {
  ChangeEvent,
  useContext,
  useState,
  FocusEvent,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@/components/Typography";
import Textfield from "@/components/Textfield";
import Radiobutton from "@/components/Radiobutton";
import Dropdown from "@/components/Dropdown";
import { FormContext } from "@/context/formContext";
import Button from "@/components/Buttons";

import ChevronLeft from "./icons/ChevronLeft";
import ChevronRight from "./icons/ChevronRight";

import { supabase } from "@/lib/sbClient";
import { Database } from "@/lib/database.types";


interface StepThreeData {
  material?: string;
  color_finish?: string;
  unit_of_measure?: string;
  width?: number;
  length?: number;
  height?: number;
  depth?: number;
  diameter?: number;
  thickness?: number;
  weight_unit?: string;
  weight?: number;
  avg_height_min?: number;
  avg_height_max?: number;
  lumbal_support?: number;

  glass_type?: string;
  glass_model?: string;
  glass_thickness?: number;
  hanging?: string;
  module_size?: string;
  sound_reduction?: number;
  fire_resistance_class?: number;
  burglary_resistance_class?: number;
  environmental_profile?: string;
  frame_depth?: number;
}

type Category = Database["public"]["Tables"]["category"]["Row"];

type Form3Props = {
  isEdit?: boolean;
  handleUpdate?: (values: StepThreeData) => Promise<void>;
};

const Form_3: React.FC<Form3Props> = ({ isEdit = false, handleUpdate }) => {
  const { formData, setFormData, saveForm, setProgressSteps, progressSteps, setCurrentStep } = useContext(FormContext)!;
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [formSection, setFormSection] = useState<StepThreeData>({
    material: formData.material ?? "",
  color_finish: formData.color_finish ?? "",
  unit_of_measure: formData.unit_of_measure ?? "mm",
  width: formData.width ?? 0,
  length: formData.length ?? 0,
  height: formData.height ?? 0,
  depth: formData.depth ?? 0,
  diameter: formData.diameter ?? 0,
  thickness: formData.thickness ?? 0,
  weight_unit: formData.weight_unit ?? "g",
  weight: formData.weight ?? 0,
  avg_height_min: formData.avg_height_min ?? 0,
  avg_height_max: formData.avg_height_max ?? 0,
  lumbal_support: formData.lumbal_support ?? 0,
  glass_type: formData.glass_type ?? "",
  glass_model: formData.glass_model ?? "",
  glass_thickness: formData.glass_thickness ?? 0,
  hanging: formData.hanging ?? "",
  module_size: formData.module_size ?? "",
  sound_reduction: formData.sound_reduction ?? 0,
  fire_resistance_class: formData.fire_resistance_class ?? 0,
  burglary_resistance_class: formData.burglary_resistance_class ?? 0,
  environmental_profile: formData.environmental_profile ?? "",
  frame_depth: formData.frame_depth ?? 0,
  });

  useEffect(() => {
    const fetchProjectNames = async () => {
      const { data } = await supabase.from("category").select("*");
      if (data) {
        setCategories(data);
      }
    };

    fetchProjectNames();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && formData.product_category_1) {
      const matchedCategory = categories.find(
        (category) => category.id === formData.product_category_1
      );

      if (matchedCategory) {
        setCategoryName(matchedCategory.name);
      } else {
        setCategoryName(null);
      }
    }
  }, [categories, formData.product_category_1]);

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

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormSection((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFormSection((prevData) => ({
      ...prevData,
      [name]: "",
    }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === "") {
      setFormSection((prevData) => ({
        ...prevData,
        [name]: 0,
      }));
    }
  };

  const handleNext = () => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        ...formSection,
      };
      return newData;
    });

    setCurrentStep((prevStep) => Math.min(prevStep + 1, progressSteps.length - 1)); 
    navigate("/form-04");
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    navigate(`/form-02`);
  };

  const handleSave = async () => {
    const updatedForm = { ...formData, ...formSection };

    setFormData(updatedForm);
    saveForm(updatedForm);
  };


  //PROGRESSBAR
  useEffect(() => {
    // Check if all required fields are filled
    const isFilled = 
      formSection.material !== "" &&
      formSection.color_finish !== "" &&
      (formSection.width !== undefined && formSection.width >= 0) &&
      (formSection.length !== undefined && formSection.length >= 0) &&
      (formSection.height !== undefined && formSection.height >= 0) &&
      (formSection.depth !== undefined && formSection.depth >= 0) &&
      (formSection.diameter !== undefined && formSection.diameter >= 0) &&
      (formSection.thickness !== undefined && formSection.thickness >= 0) &&
      (formSection.weight !== undefined && formSection.weight >= 0) &&
      (formSection.avg_height_min !== undefined && formSection.avg_height_min >= 0) &&
      (formSection.avg_height_max !== undefined && formSection.avg_height_max >= 0) &&
      (formSection.lumbal_support !== undefined && formSection.lumbal_support >= 0) &&
      (formSection.glass_type !== "") &&
      (formSection.glass_model !== "") &&
      (formSection.glass_thickness !== undefined && formSection.glass_thickness >= 0) &&
      (formSection.hanging !== "") &&
      (formSection.module_size !== "") &&
      (formSection.sound_reduction !== undefined && formSection.sound_reduction >= 0) &&
      (formSection.fire_resistance_class !== undefined && formSection.fire_resistance_class >= 0) &&
      (formSection.burglary_resistance_class !== undefined && formSection.burglary_resistance_class >= 0) &&
      (formSection.environmental_profile !== "") &&
      (formSection.frame_depth !== undefined && formSection.frame_depth >= 0);
  
    // Update progress for step 3
    setProgressSteps(prev => {
      const newProgress = [...prev];
      newProgress[2] = isFilled ? "complete" : "pending"; // Step 3 index is 2
      return newProgress;
    });
  }, [formSection, setProgressSteps]);
  return (
    <>
      <form className="flex flex-col gap-12">
        {/* <h2 className="font-bold font-poppins text-[31px]">Form</h2> */}
        
        <div className="flex gap-8">
          <Textfield
            title="Material"
            size="medium"
            name="material"
            value={formSection.material ?? ""}
            onChange={handleInputChange}
          />
          <Textfield
            title="Färg/finish"
            size="medium"
            name="color_finish"
            value={formSection.color_finish ?? ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <Typography variant="h6">Enhet mått</Typography>
            <div className="flex align-middle gap-5">
              <Radiobutton
                measurement="mm"
                name="unit_of_measure"
                value="mm"
                checked={formSection.unit_of_measure === "mm"}
                onChange={handleRadioChange}
              />
              <Radiobutton
                measurement="cm"
                name="unit_of_measure"
                value="cm"
                checked={formSection.unit_of_measure === "cm"}
                onChange={handleRadioChange}
              />
              <Radiobutton
                measurement="m"
                name="unit_of_measure"
                value="m"
                checked={formSection.unit_of_measure === "m"}
                onChange={handleRadioChange}
              />
            </div>              
              
            </div>
            <Textfield
              title="Bredd"
              size="xSmall"
              name="width"
              value={formSection.width ?? 0}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Textfield
              title="Längd"
              size="xSmall"
              name="length"
              value={formSection.length ?? 0}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Textfield
              title="Höjd"
              size="xSmall"
              name="height"
              value={formSection.height ?? 0}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Textfield
              title="Djup"
              size="xSmall"
              name="depth"
              value={formSection.depth ?? 0}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Textfield
              title="Diameter"
              size="xSmall"
              name="diameter"
              value={formSection.diameter ?? 0}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Textfield
              title="Tjocklek"
              size="xSmall"
              name="thickness"
              value={formSection.thickness ?? 0}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <Typography variant="h6">Enhet vikt</Typography>
              <div className="flex align-middle gap-5">
                <Radiobutton
                  measurement="g"
                  name="weight_unit"
                  value="g"
                  checked={formSection.weight_unit === "g"}
                  onChange={handleRadioChange}
                />
                <Radiobutton
                  measurement="hg"
                  name="weight_unit"
                  value="hg"
                  checked={formSection.weight_unit === "hg"}
                  onChange={handleRadioChange}
                />
                <Radiobutton
                  measurement="kg"
                  name="weight_unit"
                  value="kg"
                  checked={formSection.weight_unit === "kg"}
                  onChange={handleRadioChange}
                />
              </div>
            </div>
            <div className="flex align-middle gap-2">
              <Textfield
                title="Vikt"
                size="xSmall"
                name="weight"
                value={formSection.weight ?? 0}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <Typography variant="h3">Egenskaper</Typography>

          {categoryName === "Inredning & möbler" && (
            <div className="flex gap-5">
              <Textfield
                title="Sitthöjd min (cm)"
                size="small"
                name="avg_height_min"
                value={formSection.avg_height_min ?? 0}
                onChange={handleInputChange}
              />
              <Textfield
                title="Sitthöjd max (cm)"
                size="small"
                name="avg_height_max"
                value={formSection.avg_height_max ?? 0}
                onChange={handleInputChange}
              />
              <Textfield
                title="Ryggstöd(cm)"
                size="small"
                name="lumbal_support"
                value={formSection.lumbal_support ?? 0}
                onChange={handleInputChange}
              />
            </div>
          )}

          {categoryName === "Dörrar" && (
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                {" "}
                <Dropdown
                  title="Glastyp"
                  options={["1", "2", "3", "4", "5"]}
                  size="medium"
                  name="glass_type"
                  value={formSection.glass_type ?? ""}
                  onChange={handleSelectChange}
                />
                <Dropdown
                  title="Glasmodell"
                  options={["1", "2", "3", "4", "5"]}
                  size="medium"
                  name="glass_model"
                  value={formSection.glass_model ?? ""}
                  onChange={handleSelectChange}
                />
                <Dropdown
                  title="Glastjocklek (mm)"
                  options={["1", "2", "3", "4", "5"]}
                  size="medium"
                  name="glass_thickness"
                  value={formSection.glass_thickness ?? 0}
                  onChange={handleSelectChange}
                />
              </div>
              <div className="flex gap-5">
                {" "}
                <Dropdown
                  title="Hängning"
                  options={["1", "2", "3", "4", "5"]}
                  size="medium"
                  name="hanging"
                  value={formSection.hanging ?? ""}
                  onChange={handleSelectChange}
                />
                <Dropdown
                  title="Modulmått"
                  options={["1", "2", "3", "4", "5"]}
                  size="medium"
                  name="module_size"
                  value={formSection.module_size ?? ""}
                  onChange={handleSelectChange}
                />
                <Dropdown
                  title="Ljudreduktion (dB)"
                  options={["1", "2", "3", "4", "5"]}
                  size="medium"
                  name="sound_reduction"
                  value={formSection.sound_reduction ?? 0}
                  onChange={handleSelectChange}
                />
              </div>
              <div className="flex gap-5">
                {" "}
                <Dropdown
                  title="Brandklass"
                  options={["1", "2", "3", "4", "5"]}
                  size="medium"
                  name="fire_resistance_class"
                  value={formSection.fire_resistance_class ?? 0}
                  onChange={handleSelectChange}
                />
                <Dropdown
                  title="Inbrottsskydd"
                  options={["1", "2", "3", "4", "5"]}
                  size="medium"
                  name="burglary_resistance_class"
                  value={formSection.burglary_resistance_class ?? 0}
                  onChange={handleSelectChange}
                />
                <Dropdown
                  title="Omgivning/klimat"
                  options={["1", "2", "3", "4", "5"]}
                  size="medium"
                  name="environmental_profile"
                  value={formSection.environmental_profile ?? ""}
                  onChange={handleSelectChange}
                />
              </div>
              <div className="flex gap-5">
                {" "}
                <Dropdown
                  title="Karmdjup (mm)"
                  options={["10", "20", "30", "40", "50"]}
                  size="medium"
                  name="frame_depth"
                  value={formSection.frame_depth ?? 0}
                  onChange={handleSelectChange}
                />
              </div>
            </div>
          )}

          {categoryName === "WC & badrum" && (
            <div>
              <p>Det finns inga specifika egenskaper för vald produkttyp.</p>
            </div>
          )}
        </form>
     

      <section className="w-full flex justify-between  my-16">
        {isEdit ? (
          <Button
            onClick={() => handleUpdate && handleUpdate(formSection)}
            size="medium"
            variant="white"
            className="ml-auto"
          >
            Spara
          </Button>
        ) : (
          <>
            <Button onClick={handlePrevious} size="medium" variant="white">
            <ChevronLeft /> Föregående
            </Button>


        <div className="flex gap-2">
          <Button onClick={handleSave} size="medium" variant="white">
            Spara utkast
          </Button>


              <Button onClick={handleNext} size="medium" variant="blue">
                Nästa <ChevronRight />
              </Button>
            </div>
          </>
        )}

      </section>
    </>
  );
};

export default Form_3;

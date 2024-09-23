import { FC, ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@/components/Typography";
import Textfield from "@/components/Textfield";
import Radiobutton from "@/components/Radiobutton";
import Dropdown from "@/components/Dropdown";
import { FormContext } from "@/context/formContext";
import Button from "@/components/Buttons";
import { z } from "zod";

const StepThreeSchema = z.object({
  material: z.string().optional(),
  color_finish: z.string().optional(),
  unit_of_measure: z.string().optional(),
  width: z.number().optional(),
  length: z.number().optional(),
  height: z.number().optional(),
  depth: z.number().optional(),
  diameter: z.number().optional(),
  thickness: z.number().optional(),
  weight_unit: z.string().optional(),
  weight: z.number().optional(),
  avg_height_min: z.number().optional(),
  avg_height_max: z.number().optional(),
  lumbal_support: z.number().optional(),

  glass_type: z.string().optional(),
  glass_model: z.string().optional(),
  glass_thickness: z.number().optional(),
  hanging: z.string().optional(),
  module_size: z.string().optional(),
  sound_reduction: z.number().optional(),
  fire_resistance_class: z.number().optional(),
  burglary_resistance_class: z.number().optional(),
  environmental_profile: z.string().optional(),
  frame_depth: z.number().optional(),
});

const Form_3 = () => {
  const { formData, setFormData, errors, setErrors } = useContext(FormContext)!;
  const navigate = useNavigate();

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

  const handleNext = () => {
    navigate(`/form-04`);
  };

  const handlePrevious = () => {
    navigate(`/form-03`);
  };

  console.log("FormData step three:;", formData);

  return (
    <>
      <div className=" py-28 px-28 flex flex-col justify-center">
        <form className="flex flex-col gap-12">
          <Typography variant="h3">Form</Typography>
          <div className="flex gap-8">
            <Textfield
              title="Material"
              size="medium"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
            />
            <Textfield
              title="Färg/finish"
              size="medium"
              name="color_finish"
              value={formData.color_finish}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <Typography variant="h6">Enhet mått</Typography>
              <div className="flex align-middle gap-5">
                <Radiobutton measurement="mm" name="mm" />
                <Radiobutton measurement="cm" name="cm" />
                <Radiobutton measurement="m" name="m" />
              </div>
            </div>
            <Textfield
              title="Bredd"
              size="xSmall"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
            />
            <Textfield
              title="Längd"
              size="xSmall"
              name="length"
              value={formData.length}
              onChange={handleInputChange}
            />
            <Textfield
              title="Höjd"
              size="xSmall"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
            />
            <Textfield
              title="Djup"
              size="xSmall"
              name="depth"
              value={formData.depth}
              onChange={handleInputChange}
            />
            <Textfield
              title="Diameter"
              size="xSmall"
              name="diameter"
              value={formData.diameter}
              onChange={handleInputChange}
            />
            <Textfield
              title="Tjocklek"
              size="xSmall"
              name="thickness"
              value={formData.thickness}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <Typography variant="h6">Enhet vikt</Typography>
              <div className="flex align-middle gap-5">
                <Radiobutton measurement="g" name="g" />
                <Radiobutton measurement="hg" name="hg" />
                <Radiobutton measurement="kg" name="kg" />
              </div>
            </div>
            <div className="flex align-middle gap-2">
              <Textfield
                title="Vikt"
                size="xSmall"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Typography variant="h3">Egenskaper</Typography>
          {/* Conditionally render properties depending on product category */}
          <div className="flex gap-5">
            <Textfield
              title="Sitthöjd min (cm)"
              size="small"
              name="avg_height_min"
              value={formData.avg_height_min}
              onChange={handleInputChange}
            />
            <Textfield
              title="Sitthöjd max (cm)"
              size="small"
              name="avg_height_max"
              value={formData.avg_height_max}
              onChange={handleInputChange}
            />
            <Textfield
              title="Ryggstöd(cm)"
              size="small"
              name="lumbal_support"
              value={formData.lumbal_support}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              {" "}
              <Dropdown
                title="Glastyp"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                name="glass_type"
                value={formData.glass_type}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Glasmodell"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                name="glass_model"
                value={formData.glass_model}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Glastjocklek (mm)"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                name="glass_thickness"
                value={formData.glass_thickness}
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
                value={formData.hanging}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Modulmått"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                name="module_size"
                value={formData.module_size}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Ljudreduktion (dB)"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                name="sound_reduction"
                value={formData.sound_reduction}
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
                value={formData.fire_resistance_class}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Inbrottsskydd"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                name="burglary_resistance_class"
                value={formData.burglary_resistance_class}
                onChange={handleSelectChange}
              />
              <Dropdown
                title="Omgivning/klimat"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                name="environmental_profile"
                value={formData.environmental_profile}
                onChange={handleSelectChange}
              />
            </div>
            <div className="flex gap-5">
              {" "}
              <Dropdown
                title="Karmdjup (mm)"
                options={["1", "2", "3", "4", "5"]}
                size="medium"
                name="frame_depth"
                value={formData.frame_depth}
                onChange={handleSelectChange}
              />
            </div>
          </div>

          <div>
            <p>Det finns inga specifika egenskaper för vald produkttyp.</p>
          </div>
        </form>
      </div>

      <section className="w-full flex justify-between mb-12">
        <Button onClick={handlePrevious} size="medium" variant="white">
          &lt; Föregående
        </Button>

        <div className="flex gap-2">
          {/* <Button onClick={handleSave} size="medium" variant="white">
            Spara utkast
          </Button> */}

          <Button onClick={handleNext} size="medium" variant="blue">
            Nästa &gt;
          </Button>
        </div>
      </section>
    </>
  );
};

export default Form_3;

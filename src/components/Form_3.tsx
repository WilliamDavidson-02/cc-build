import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@/components/Typography";
import Textfield from "@/components/Textfield";
import Radiobutton from "@/components/Radiobutton";
import Dropdown from "@/components/Dropdown";
import { FormContext } from "@/context/formContext";
import { supabase } from "@/lib/sbClient";
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

type StepThreeData = z.infer<typeof StepThreeSchema>;

const Form_3: React.FC = () => {
  const { formData, setformData, errors, setErrors } = useContext(FormContext)!;
  const navigate = useNavigate();
  const [formSection, setFormSection] = useState<StepThreeData>({
    material: "",
    color_finish: "",
    unit_of_measure: "mm",
    width: 0,
    length: 0,
    height: 0,
    depth: 0,
    diameter: 0,
    thickness: 0,
    weight_unit: "g",
    weight: 0,
    avg_height_min: 0,
    avg_height_max: 0,
    lumbal_support: 0,
    glass_type: "",
    glass_model: "",
    glass_thickness: 0,
    hanging: "",
    module_size: "",
    sound_reduction: 0,
    fire_resistance_class: 0,
    burglary_resistance_class: 0,
    environmental_profile: "",
    frame_depth: 0,
  });
  console.log("formData from formContext", formData);

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

  const handleNext = () => {
    navigate(`/form-04`);
  };

  const handlePrevious = () => {
    navigate(`/form-03`);
  };

  const handleSave = async () => {
    const {
      unit_of_measure,
      width,
      length,
      height,
      depth,
      diameter,
      thickness,
      weight,
      weight_unit,
    } = formSection;

    // Hardcoded prodect id. Needs to be fetched from formcontext in the future
    const properties = [
      {
        name: "unit of measure",
        value: unit_of_measure?.toString(),
        prod_id: "c3503f87-a629-47f7-8091-2cbe5523b179",
      },
      {
        name: "width",
        value: width?.toString(),
        prod_id: "c3503f87-a629-47f7-8091-2cbe5523b179",
      },
      {
        name: "length",
        value: length?.toString(),
        prod_id: "c3503f87-a629-47f7-8091-2cbe5523b179",
      },
      {
        name: "height",
        value: height?.toString(),
        prod_id: "c3503f87-a629-47f7-8091-2cbe5523b179",
      },
      {
        name: "depth",
        value: depth?.toString(),
        prod_id: "c3503f87-a629-47f7-8091-2cbe5523b179",
      },
      {
        name: "diameter",
        value: diameter?.toString(),
        prod_id: "c3503f87-a629-47f7-8091-2cbe5523b179",
      },
      {
        name: "thickness",
        value: thickness?.toString(),
        prod_id: "c3503f87-a629-47f7-8091-2cbe5523b179",
      },
      {
        name: "weight",
        value: weight?.toString(),
        prod_id: "c3503f87-a629-47f7-8091-2cbe5523b179",
      },
      {
        name: "weight_unit",
        value: weight_unit?.toString(),
        prod_id: "c3503f87-a629-47f7-8091-2cbe5523b179",
      },
    ];

    const validProperties = properties.filter(
      (property) =>
        property.value !== "0" &&
        property.value !== "" &&
        property.value !== null
    );

    try {
      const { data, error } = await supabase
        .from("product_property")
        .insert(validProperties);

      if (error) {
        console.error("Error inserting product properties:", error);
      } else {
        console.log("Inserted product properties:", data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  console.log("FormSection:", formSection);

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
            />
            <Textfield
              title="Längd"
              size="xSmall"
              name="length"
              value={formSection.length ?? 0}
              onChange={handleInputChange}
            />
            <Textfield
              title="Höjd"
              size="xSmall"
              name="height"
              value={formSection.height ?? 0}
              onChange={handleInputChange}
            />
            <Textfield
              title="Djup"
              size="xSmall"
              name="depth"
              value={formSection.depth ?? 0}
              onChange={handleInputChange}
            />
            <Textfield
              title="Diameter"
              size="xSmall"
              name="diameter"
              value={formSection.diameter ?? 0}
              onChange={handleInputChange}
            />
            <Textfield
              title="Tjocklek"
              size="xSmall"
              name="thickness"
              value={formSection.thickness ?? 0}
              onChange={handleInputChange}
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
          <Button onClick={handleSave} size="medium" variant="white">
            Spara utkast
          </Button>

          <Button onClick={handleNext} size="medium" variant="blue">
            Nästa &gt;
          </Button>
        </div>
      </section>
    </>
  );
};

export default Form_3;

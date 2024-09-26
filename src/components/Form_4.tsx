import Button from "./Buttons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/context/formContext";

import Typography from "./Typography";
import { z } from "zod";
import Textfield from "./Textfield";
import ChevronLeft from "./icons/ChevronLeft";
import ChevronRight from "./icons/ChevronRight";

const Step4Schema = z.object({
  manufactor: z.string().optional(),
  articel_number: z.string().optional(),
  manufactor_year: z.string().optional(),
  bought_year: z.string().optional(),
  gtin: z.string().optional(),
  rsk: z.string().optional(),
  bsab: z.string().optional(),
  enr: z.string().optional(),
  bk04: z.string().optional(),
});
export type Step4Data = z.infer<typeof Step4Schema>;

type Form4Props = {
  isEdit?: boolean;
  handleUpdate?: (values: Step4Data) => Promise<void>;
};

const Form_4: React.FC<Form4Props> = ({ handleUpdate, isEdit = false }) => {
  const navigate = useNavigate();
  
  const { formData, setFormData, saveForm, errors, setErrors, setProgressSteps, progressSteps, setCurrentStep } = useFormContext();
  const [formSection, setFormSection] = useState<Step4Data>({    

    manufactor: formData.manufactor ?? "",
    articel_number: formData.articel_number ?? "",
    manufactor_year: formData.manufactor_year ?? undefined,
    bought_year: formData.bought_year ?? undefined,
    gtin: formData.gtin ?? "",
    rsk: formData.rsk ?? "",
    bsab: formData.bsab ?? "",
    enr: formData.enr ?? "",
    bk04: formData.bk04 ?? "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormSection((prevSection) => ({
      ...prevSection,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const result = Step4Schema.safeParse(formSection);

    if (!result.success) {
      const formattedErrors: Record<string, string[]> = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        if (!formattedErrors[path]) {
          formattedErrors[path] = [];
        }
        formattedErrors[path].push(issue.message);
      });

      setErrors(formattedErrors);
      return;
    }

    setErrors({});
    console.log("Form submitted successfully", formSection);

    const updatedForm = { ...formData, ...formSection };

    setFormData(updatedForm);
    saveForm(updatedForm);
  };

  const [visibleFields, setVisibleFields] = useState({
    gtin: formData.gtin ? true : false,
    rsk: formData.rsk ? true : false,
    bsab: formData.bsab ? true : false,
    enr: formData.enr ? true : false,
    bk04: formData.bk04 ? true : false,
  });

  const toggleField = (field: keyof typeof visibleFields) => {
    setVisibleFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleNext = () => {
    setFormData((prevData) => ({
      ...prevData,
      ...formSection,
    }));
    /*  handleSave(); */

    setCurrentStep((prevStep) => Math.min(prevStep + 1, progressSteps.length - 1)); 
    navigate(`/form-05`);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    navigate(`/form-03`);
  };
  

  //PROGRESSBAR
 // Effect to track progress
 useEffect(() => {
  // Check if all required fields are filled
  const isFilled = formSection.manufactor !== "" && 
                   formSection.articel_number !== "" &&
                   (formSection.manufactor_year !== undefined) &&
                   (formSection.bought_year !== undefined);

  // Update progress for step 4
  setProgressSteps(prev => {
    const newProgress = [...prev];
    newProgress[3] = isFilled ? "complete" : "pending"; // Step 4 index is 3
    return newProgress;
  });
}, [formSection, setProgressSteps]);

  return (
    <>
      <div className="flex flex-row gap-10 w-full justify-center">
        <section className="flex flex-col gap-6 px-4 py-5 w-1/2 shadow-lg  ">
          <Textfield
            title="Tillverkare/Leverantör"
            name="manufactor"
            size="large"
            placeholder="Ange tillverkare eller leverantör"
            value={formSection.manufactor || ""}
            onChange={handleInputChange}
            className="text-[14px] "
          />
          <Textfield
            title="Artikelnummer"
            name="articel_number"
            size="large"
            placeholder="Ange tillverkarens/leverantörens artikelnummer"
            value={formSection.articel_number || ""}
            onChange={handleInputChange}
            className="text-[14px]"
          />
          <Textfield
            title="Tillverkningsår"
            name="manufactor_year"
            size="large"
            placeholder="Ange uppskattat tillverkningsår"
            value={formSection.manufactor_year || ""}
            onChange={handleInputChange}
            className="text-[14px]"
          />
          <Textfield
            title="Inköpsår"
            name="bought_year"
            size="large"
            placeholder="Ange uppskattat inköpsår"
            value={formSection.bought_year || ""}
            onChange={handleInputChange}
            className="text-[14px]"
          />
        </section>

        <section className="flex flex-col gap-6 justify-center px-4 py-5 w-1/2">
          {["gtin", "rsk", "bsab", "enr", "bk04"].map((field) => (
            <div key={field} className="flex gap-4 w-full items-center">
              <Button
                size="medium"
                variant="blue"
                className="min-w-[142px] max-w-[142px] min-h-[56px] max-h-[56px]"
                onClick={() => toggleField(field as keyof typeof visibleFields)}
              >
                <span className="text-[24px]">
                  {visibleFields[field as keyof typeof visibleFields]
                    ? "-"
                    : "+"}
                </span>{" "}
                {field.toUpperCase()}
              </Button>
              {visibleFields[field as keyof typeof visibleFields] ? (
                <Textfield
                  name={field}
                  size="large"
                  placeholder={`Ange ${field.toUpperCase()}`}
                  value={formSection[field as keyof Step4Data] || ""}
                  onChange={handleInputChange}
                  className="w-full text-[14px] text-[#495057]"
                />
              ) : (
                <Typography variant="p" size="md" className="text-inter text-[14px]  text-[#495057]">
                  {getFieldDescription(field)}
                </Typography>
              )}
            </div>
          ))}
        </section>

        {errors && (
          <div className="text-red-500">
            {Object.entries(errors).map(([key, value]) => (
              <p key={key}>{value.join(", ")}</p>
            ))}
          </div>
        )}
      </div>

      <section className="w-full flex justify-between mt-20 mb-16">
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
            <Button onClick={handlePrevious} size="medium" variant="white" className="py-2 px-4">
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

const getFieldDescription = (field: string) => {
  switch (field) {
    case "gtin":
      return "Ange GTIN om GTIN finns/är känt";
    case "rsk":
    case "enr":
      return "Relevant för elektronik och VVS";
    case "bsab":
      return "Ange BSAB-kod om känt/relevant. Används för att underlätta klassificering och sökning.";
    case "bk04":
      return "Ange BK04-kod om känt/relevant. Används för att underlätta klassificering och sökning.";
    default:
      return "";
  }
};

export default Form_4;

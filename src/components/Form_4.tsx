import Button from "./Buttons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/context/formContext";
import { supabase } from "@/lib/sbClient";
import Typography from "./Typography";
import { z } from "zod";
import Textfield from "./Textfield";

const Step4Schema = z.object({
  manufactor: z.string().optional(),
  articel_number: z.string().optional(),
  manufactor_year: z.number().optional(),
  bought_year: z.number().optional(),
  gtin: z.number().optional(),
  rsk: z.number().optional(),
  bsab: z.string().optional(),
  enr: z.number().optional(),
  bk04: z.string().optional(),
});
type Step4Data = z.infer<typeof Step4Schema>;

const Form_4: React.FC = () => {
  const navigate = useNavigate();
  const { formData, setFormData, errors, setErrors } = useFormContext();
  const [formSection, setFormSection] = useState<Step4Data>({
    manufactor: "",
    articel_number: "",
    manufactor_year: undefined,
    bought_year: undefined,
    gtin: 0,
    rsk: 0,
    bsab: "",
    enr: 0,
    bk04: "",
  });

  useEffect(() => {
    if (!formData) {
      const initialData: Step4Data = {
        manufactor: "",
        articel_number: "",
        manufactor_year: 0,
        bought_year: 0,
        gtin: 0,
        rsk: 0,
        bsab: "",
        enr: 0,
        bk04: "",
      };
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [formData, setFormData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormSection((prevSection) => ({
      ...prevSection,
      [name]: value,
    }));
  };

  /* const toggleFeature = (feature: keyof Step4Data) => {
    setFormSection((prevSection) => ({
      ...prevSection,
      [feature]: !prevSection[feature],
    }));
  }; */

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

    try {
      const { data, error } = await supabase.from("products").insert([
        {
          manufactor: formSection.manufactor,
          articel_number: formSection.articel_number,
          manufactor_year: formSection.manufactor_year,
          bought_year: formSection.bought_year,
          gtin: formSection.gtin,
          rsk: formSection.rsk,
          bsab: formSection.bsab,
          enr: formSection.enr,
          bk04: formSection.bk04,
        },
      ]);

      if (error) throw error;

      console.log("Data inserted successfully:", data);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const [visibleFields, setVisibleFields] = useState({
    gtin: false,
    rsk: false,
    bsab: false,
    enr: false,
    bk04: false,
  });

  const toggleField = (field: keyof typeof visibleFields) => {
    setVisibleFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleNext = () => {
    handleSave();
    navigate(`/form-05`);
  };

  const handlePrevious = () => {
    navigate(`/form-03`);
  };

  return (
    <main className="mt-16 px-48 flex flex-col items-center justify-center w-full">
      <div className="flex justify-start items-center mb-10 w-full">
        <Typography
          variant="h2"
          size="md"
          className="text-[#151515] text-[31px] font-bold font-poppins"
        >
          Produktinformation
        </Typography>
      </div>

      <div className="flex flex-row gap-10 w-full justify-center">
        <section className="flex flex-col gap-6 px-4 py-5 w-1/2 shadow-lg">
          <Textfield
            title="Tillverkare/Leverantör"
            name="manufactor"
            size="large"
            placeholder="ange tillverkare eller leverantör"
            value={formSection.manufactor || ""}
            onChange={handleInputChange}
          />
          <Textfield
            title="Artikelnummer"
            name="articel_number"
            size="large"
            placeholder="ange tillverkare/leverantörens artikelnummer"
            value={formSection.articel_number || ""}
            onChange={handleInputChange}
          />
          <Textfield
            title="Tillverkningsår"
            name="manufactor_year"
            size="large"
            placeholder="ange uppskattat tillverkningsår"
            value={formSection.manufactor_year || ""}
            onChange={handleInputChange}
          />
          <Textfield
            title="Inköpsår"
            name="bought_year"
            size="large"
            placeholder="ange uppskattat inköpsår"
            value={formSection.bought_year || ""}
            onChange={handleInputChange}
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
                  className="w-full"
                />
              ) : (
                <Typography variant="p" size="md" className="text-inter">
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

      <section className="w-full flex justify-between my-12">
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
    </main>
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

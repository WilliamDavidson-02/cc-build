import Button from "./Buttons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/context/formContext";
import { supabase } from "@/lib/sbClient";
import Typography from "./Typography";
import { z } from "zod";
import Textfield from "./Textfield";
//import { TablesInsert } from "@/lib/database.types";

const Step4Schema = z.object({
  product_id: z.string(),//the id needs to be passed along the steps?
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
type Step4Data = z.infer<typeof Step4Schema>;

const Form_4: React.FC = () => {
  const navigate = useNavigate();
  const { formData, setFormData, errors, setErrors } = useFormContext();
  const [formSection, setFormSection] = useState<Step4Data>({
    product_id: "f2f1c148-f896-45ae-886e-c86b2b938442",//the id needs to be passed along the steps?
    manufactor: "",
    articel_number: "",
    manufactor_year: undefined,
    bought_year: undefined,
    gtin: "",
    rsk: "",
    bsab: "",
    enr: "",
    bk04: "",
  });

  useEffect(() => {
    if (!formData) {
      const initialData: Step4Data = {
        product_id: "f2f1c148-f896-45ae-886e-c86b2b938442",//the id needs to be passed along the steps?
        manufactor: "",
        articel_number: "",
        manufactor_year: "",
        bought_year: "",
        gtin: "",
        rsk: "",
        bsab: "",
        enr: "",
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
     
    const propertiesToInsert = [
      { name: 'manufactor', value: formSection.manufactor },
      { name: 'articel_number', value: formSection.articel_number },
      { name: 'manufactor_year', value: formSection.manufactor_year },
      { name: 'bought_year', value: formSection.bought_year },
      { name: 'gtin', value: formSection.gtin },
      { name: 'rsk', value: formSection.rsk },
      { name: 'bsab', value: formSection.bsab },
      { name: 'enr', value: formSection.enr },
      { name: 'bk04', value: formSection.bk04 },
    ];

    
    const insertData = propertiesToInsert.map(property => ({
      prod_id: formSection.product_id,  
      name: property.name,
      value: property.value,
    }));

    //insert data 
    const { data, error } = await supabase
      .from("product_property")
      .insert(insertData);  

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
                <span className="text-[24px]">{visibleFields[field as keyof typeof visibleFields] ? "-" : "+"}</span> {field.toUpperCase()}
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
                <p key={key}>{value.join(', ')}</p>
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
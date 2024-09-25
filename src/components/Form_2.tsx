import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "@/context/formContext";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "./Buttons";
import Textfield from "./Textfield";
import DatePicker from "./DatePicker";
import Typography from "./Typography";
import Input from "./Input";
import { Tooltip } from "./Tooltip";


const Step2Schema = z.object({ 
  amount: z.number().min(1, "Minsta tillåtna antal är 1"),
  prod_status: z.string().optional(),
  market_status: z.string().optional(),
  place1: z
    .string()
    .min(2, "Plats måste vara minst 2 tecken")
    .optional()
    .or(z.literal("")),
  place2: z
    .string()
    .min(2, "Plats måste vara minst 2 tecken")
    .optional()
    .or(z.literal("")),
  place3: z
    .string()
    .min(2, "Plats måste vara minst 2 tecken")
    .optional()
    .or(z.literal("")),
  place4: z
    .string()
    .min(2, "Plats måste vara minst 2 tecken")
    .optional()
    .or(z.literal("")),
  disassembly: z.string().optional(),
  accessibility: z.string().optional(),
  availability: z.date().optional(),
  delivery: z.date().optional(),
  decision_designation_1: z
    .string()
    .min(2, "Beslutsbenämning måste vara minst 2 tecken")
    .optional()
    .or(z.literal("")),
  decision_designation_2: z
    .string()
    .min(2, "Beslutsbenämning måste vara minst 2 tecken")
    .optional()
    .or(z.literal("")),
  decision_designation_3: z
    .string()
    .min(2, "Beslutsbenämning måste vara minst 2 tecken")
    .optional()
    .or(z.literal("")),
  decision_designation_4: z
    .string()
    .min(2, "Beslutsbenämning måste vara minst 2 tecken")
    .optional()
    .or(z.literal("")),
});

type Step2Data = z.infer<typeof Step2Schema>;


const Form_2: React.FC = () => {
  const { formData, setFormData, errors, setErrors, saveForm } = useFormContext();
  const navigate = useNavigate();

  const [formSections, setFormSections] = useState<Step2Data[]>([
    {            
      amount: 1,
      prod_status: "Ej inventerad",
      market_status: "Ej publicerad",
      place1: "",
      place2: "",
      place3: "",
      place4: "",
      disassembly: "Ej Demonterbar",
      accessibility: "Ej Åtkomlig",
      availability: undefined,
      delivery: undefined,
      decision_designation_1: "",
      decision_designation_2: "",
      decision_designation_3: "",
      decision_designation_4: "",
    },
  ]);

  useEffect(() => {
    if (!formData) {
      const initialData: Step2Data = {         
        amount: 1,
        prod_status: "Ej inventerad",
        market_status: "Ej publicerad",
        place1: "",
        place2: "",
        place3: "",
        place4: "",
        disassembly: "Ej Demonterbar",
        accessibility: "Ej Åtkomlig",
        availability: undefined,
        delivery: undefined,
        decision_designation_1: "",
        decision_designation_2: "",
        decision_designation_3: "",
        decision_designation_4: "",
      };
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [formData, setFormData]);

  const handleInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormSections((prevSections) =>
      prevSections.map((section, i) =>
        i === index
          ? {
              ...section,
              [name]: name === "amount" ? parseInt(value, 10) : value,
            }
          : section
      )
    );
  };

  const handleSave = async () => {
   
    const results = formSections.map((section) =>
      Step2Schema.safeParse(section)    
    );
    const hasErrors = results.some((result) => !result.success);
    if (hasErrors) {
      const formattedErrors: Record<string, string[]> = {};

      results.forEach((result) => {
        if (!result.success) {
          result.error.issues.forEach((issue) => {
            const path = issue.path.join(".");
            if (!formattedErrors[path]) {
              formattedErrors[path] = [];
            }
            formattedErrors[path].push(issue.message);
          });
        }
      });

      setErrors(formattedErrors);
      return;
    }

    const updatedForm = {...formData, individual: formSections as typeof formData["individual"]};
   
    setFormData(updatedForm);
    saveForm(updatedForm);
  };

  // Add new form section
  const handleAdd = () => {
    setFormSections((prevSections) => [
      ...prevSections,
      {       
        amount: 1,
        prod_status: "Ej inventerad",
        market_status: "Ej publicerad",
        place1: "",
        place2: "",
        place3: "",
        place4: "",
        disassembly: "Ej Demonterbar",
        accessibility: "Ej Åtkomlig",
        availability: undefined,
        delivery: undefined,
        decision_designation_1: "",
        decision_designation_2: "",
        decision_designation_3: "",
        decision_designation_4: "",
        
      },
    ]);
  };

  const handleDel = () => {
    const toDelete = checkedStates
      .map((checked, idx) => (checked ? idx : -1))
      .filter((idx) => idx !== -1);
    setFormSections((prev) => prev.filter((_, idx) => !toDelete.includes(idx)));
    setCheckedStates((prev) =>
      prev.filter((_, idx) => !toDelete.includes(idx))
    );
  };

  const handleChange = () => console.log("Change selected section");
  const handleCom = () => console.log("Add comment to selected section");

  const handleNext = () => {    
    setFormData((prevData) => ({
      ...prevData,
      individual: formSections as typeof prevData["individual"], 
    }));
    console.log("Form data:", formData);
    navigate(`/form-03`);

  };

  const handlePrevious = () => {
    navigate(`/form-01`);
  };

  //checkboxstates
  const [checkedStates, setCheckedStates] = React.useState<boolean[]>(
    Array(formSections.length).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    setCheckedStates((prev) => {
      const newCheckedStates = [...prev];
      newCheckedStates[index] = !newCheckedStates[index];
      return newCheckedStates;
    });
  };

  //expandable sections
  const [expandedForms, setExpandedForms] = React.useState<
    Record<number, boolean>
  >({});

  const toggleExpand = (index: number) => {
    setExpandedForms((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDateChange = (
    index: number,
    field: "availability" | "delivery",
    date: Date | undefined
  ) => {
    console.log(date);
    setFormSections((prev) =>
      prev.map((section, i) =>
        i === index ? { ...section, [field]: date } : section
      )
    );
  };

  return (
    <main className="mt-16 px-28 flex flex-col">
      <div className="flex justify-start items-center mb-4 ">
        <Typography
          variant="h2"
          size="md"
          className="text-[#151515] text-[31px] font-bold font-poppins"
        >
          Antal/Status/Plats
        </Typography>
      </div>

      <div className="flex flex-row gap-6 pt-8 pb-4 ">
        <Button size="medium" variant="blue" onClick={handleAdd}>
          Lägg till ny
        </Button>
        <Button size="medium" variant="white" onClick={handleDel}>
          Radera
        </Button>
        <Button size="medium" variant="white" onClick={handleChange}>
          Ändra
        </Button>
        <Button size="medium" variant="white" onClick={handleCom}>
          Kommentar
        </Button>
      </div>

      {formSections.map((section, index) => (
        <div key={index} className="flex flex-row gap-4 py-6 px-4">
          <div className="flex h-full items-start pt-8 pr-2">
            <Input
              type="checkbox"
              checked={checkedStates[index]}
              onChange={() => handleCheckboxChange(index)}
            />
          </div>
          <form key={index} className="flex flex-col">
            <section className="flex flex-col gap-6 px-4 py-6 shadow-lg">
              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-semibold">Antal</label>
                  <input
                    type="number"
                    name="amount"
                    value={formSections[index].amount || 1}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Antal (st)"
                    className="bg-[#F9F9F9] border border-[#E2E2E2] text-[#495057] rounded-sm shadow-sm appearance-none focus:outline-none "
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-semibold">Status</label>
                  <select
                    name="prod_status"
                    value={formSections[index].prod_status || "Ej inventerad"}
                    onChange={(e) => handleInputChange(index, e)}
                    className=" px-4 py-2 bg-[#F9F9F9] border border-[#E2E2E2] text-[#495057] rounded-sm shadow-sm appearance-none focus:outline-none "
                  >
                    <option value="" disabled>
                      Välj
                    </option>
                    <option value="Inventerad">Inventerad</option>
                    <option value="Inventerad - i byggnad">
                      Inventerad - i byggnad
                    </option>
                    <option value="Inventerad - i lager/förråd">
                      Inventerad - i lager/förråd
                    </option>
                    <option value="Mängdad">Mängdad</option>
                    <option value="Mängdad - i byggnad">
                      Mängdad - i byggnad
                    </option>
                    <option value="Mängdad - i lager/förråd">
                      Mängdad - i lager/förråd
                    </option>
                    <option value="På rekonditionering">
                      På rekonditionering
                    </option>
                    <option value="I lager">I lager</option>
                    <option value="Bevarad (slutstatus)">
                      Bevarad (slutstatus)
                    </option>
                    <option value="Återbrukad i projekt (slutstatus)">
                      Återbrukad i projekt (slutstatus)
                    </option>
                    <option value="Återbrukad inom organisationen (slutstatus)">
                      Återbrukad inom organisationen (slutstatus)
                    </option>
                    <option value="Återbrukad externt av annan aktör (slutstatus)">
                      Återbrukad externt av annan aktör (slutstatus)
                    </option>

                    <option value="Avfallshanterad (slutstatus)">
                      Avfallshanterad (slutstatus)
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-semibold">
                    Marknadsplatsen
                  </label>
                  <select
                    name="market_status"
                    value={formSections[index].market_status || "Ej publicerad"}
                    onChange={(e) => handleInputChange(index, e)}
                    className=" px-4 py-2 bg-[#F9F9F9] border border-[#E2E2E2] text-[#495057] rounded-sm shadow-sm appearance-none focus:outline-none "
                  >
                    <option value="" disabled>
                      Välj
                    </option>
                    <option value="Ej publicerad">Ej publicerad</option>
                    <option value="Publicerad internt">
                      Publicerad som intern annons
                    </option>
                    <option value="Publicerad externt">
                      Publicerad som extern annons
                    </option>
                    <option value="Reserverad">Reserverad</option>
                    <option value="Såld">Såld</option>
                    <option value="Avpublicerad">Avpublicerad</option>
                    <option value="Automatiskt avpublicerad">
                      Automatiskt avpublicerad
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="relative flex flex-col gap-2">
                  <Textfield
                    title="Plats"
                    size="small"
                    name="place1"
                    placeholder="Ange plats"
                    value={formSections[index].place1 || ""}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Tooltip
                    className="postition absolute left-10 cursor-pointer select-none"
                    info="Ange detaljerad platsbeskrivning angående var produkten finns"
                  />
                </div>
                <div className="relative flex flex-col gap-2">
                  <Textfield
                    title="Plats"
                    size="small"
                    name="place2"
                    placeholder="Ange plats"
                    value={formSections[index].place2 || ""}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Tooltip
                    className="postition absolute left-10 cursor-pointer select-none"
                    info="Ange detaljerad platsbeskrivning angående var produkten finns"
                  />
                </div>
                <div className="relative flex flex-col gap-2">
                  <Textfield
                    title="Plats"
                    size="small"
                    name="place3"
                    placeholder="Ange plats"
                    value={formSections[index].place3 || ""}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Tooltip
                    className="postition absolute left-10 cursor-pointer select-none"
                    info="Ange detaljerad platsbeskrivning angående var produkten finns"
                  />
                </div>
                <div className="relative flex flex-col gap-2">
                  <Textfield
                    title="Plats"
                    size="small"
                    name="place4"
                    placeholder="Ange plats"
                    value={formSections[index].place4 || ""}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <Tooltip
                    className="postition absolute left-10 cursor-pointer select-none"
                    info="Ange detaljerad platsbeskrivning angående var produkten finns"
                  />
                </div>
              </div>
            </section>

            <div
              className="flex flex-row gap-6 justify-center items-center py-2 px-8 cursor-pointer w-full"
              onClick={() => toggleExpand(index)}
            >
              <p className="cursor-pointer font-medium text-[16px] text-[#15151]">
                {expandedForms[index] ? "Dölj" : "Se mer"}
              </p>
              {expandedForms[index] ? (
                <img src="/up.svg" alt="up arrow" className="w-6 h-6" />
              ) : (
                <img src="/down.svg" alt="down arrow" className="w-6 h-6" />
              )}
            </div>
            {/*section that is initially hidden under the expandable " se mer"*/}
            {expandedForms[index] && (
              <>
                <section className="flex flex-col gap-6 px-4 py-2 mb-12">
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-semibold">
                        Demonterbarhet
                      </label>
                      <select
                        name="disassembly"
                        value={
                          formSections[index].disassembly || "Ej Demonterbar"
                        }
                        onChange={(e) => handleInputChange(index, e)}
                        className=" px-4 py-2 bg-[#F9F9F9] border border-[#E2E2E2] text-[#495057] rounded-sm shadow-sm appearance-none focus:outline-none "
                      >
                        <option value="" disabled>
                          Välj
                        </option>
                        <option value="Enkel att demontera/demontering krävs ej">
                          Enkel att demontera/demontering krävs ej
                        </option>
                        <option value="Demonterbar men specialverktyg kan behövas">
                          Demonterbar men specialverktyg kan behövas
                        </option>
                        <option value="Begränsad demonterbarhet">
                          Begränsad demonterbarhet
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-semibold">
                        Åtkomlighet
                      </label>
                      <select
                        name="accessibility"
                        value={
                          formSections[index].accessibility || "Ej Åtkomlig"
                        }
                        onChange={(e) => handleInputChange(index, e)}
                        className=" px-4 py-2 bg-[#F9F9F9] border border-[#E2E2E2] text-[#495057] rounded-sm shadow-sm appearance-none focus:outline-none "
                      >
                        <option value="" disabled>
                          Välj
                        </option>
                        <option value="Lätt åtkomlig">Lätt åtkomlig</option>
                        <option value="Åtkomlig men planering och specialverktyg kan behövas">
                          Åtkomlig men planering och specialverktyg kan behövas
                        </option>
                        <option value="Begränsad åtkomlighet">
                          Begränsad åtkomlighet
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-2 min-w-[162px]">
                      <Typography
                        variant="p"
                        size="sm"
                        className="text-[14px] font-semibold"
                      >
                        Datum tillgänglig
                      </Typography>
                      <DatePicker
                        selected={section.availability}
                        setSelected={(date) =>
                          handleDateChange(index, "availability", date)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2 min-w-[162px]">
                      <Typography
                        variant="p"
                        size="sm"
                        className="text-[14px] font-semibold"
                      >
                        Datum första möjliga leverans
                      </Typography>
                      <DatePicker
                        selected={section.delivery}
                        setSelected={(date) =>
                          handleDateChange(index, "delivery", date)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="relative flex flex-col gap-2">
                      <Textfield
                        title="Beslutsbenämning"
                        size="small"
                        name="decision_designation_1"
                        placeholder="Ange"
                        value={formSections[index].decision_designation_1 || ""}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                      <Tooltip
                        className="position absolute right-0 cursor-pointer select-none"
                        info="Ange ytterligare information angående beslutsfattningen"
                      />
                    </div>

                    <div className="relative flex flex-col gap-2">
                      <Textfield
                        title="Beslutsbenämning"
                        size="small"
                        name="decision_designation_2"
                        placeholder="Ange"
                        value={formSections[index].decision_designation_2 || ""}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                      <Tooltip
                        className="position absolute right-0 cursor-pointer select-none"
                        info="Ange ytterligare information angående beslutsfattningen"
                      />
                    </div>
                    <div className="relative flex flex-col gap-2">
                      <Textfield
                        title="Beslutsbenämning"
                        size="small"
                        name="decision_designation_3"
                        placeholder="Ange"
                        value={formSections[index].decision_designation_3 || ""}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                      <Tooltip
                        className="position absolute right-0 cursor-pointer select-none"
                        info="Ange ytterligare information angående beslutsfattningen"
                      />
                    </div>
                    <div className="relative flex flex-col gap-2">
                      <Textfield
                        title="Beslutsbenämning"
                        size="small"
                        name="decision_designation_4"
                        placeholder="Ange"
                        value={formSections[index].decision_designation_4 || ""}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                      <Tooltip
                        className="position absolute right-0 cursor-pointer select-none"
                        info="Ange ytterligare information angående beslutsfattningen"
                      />
                    </div>
                  </div>
                </section>
              </>
            )}
          </form>
        </div>
      ))}

      {errors && (
        <div className="text-red-500">
          {Object.entries(errors).map(([key, value]) => (
            <p key={key}>{value.join(", ")}</p>
          ))}
        </div>
      )}

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
    </main>
  );
};

export default Form_2;

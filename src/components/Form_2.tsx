import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "@/context/formContext";
import { supabase } from "@/lib/sbClient";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "./Buttons";
import Textfield from "./Textfield";
import DatePicker from "./DatePicker";
import Typography from "./Typography";
import Input from "./Input";
import Info from "./icons/Info";

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

//do I have to type it with the generic type <Step2Data>?
const Form_2: React.FC = () => {
  const { formData, setFormData, errors, setErrors } = useFormContext();
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

    setErrors({});
    console.log("All forms submitted successfully", formSections);

    try {
      const { data, error } = await supabase.from("products").insert(
        formSections.map((section) => ({
          amount: section.amount,
          prod_status: section.prod_status,
          market_status: section.market_status,
          place1: section.place1,
          place2: section.place2,
          place3: section.place3,
          place4: section.place4,
          disassembly: section.disassembly,
          accessibility: section.accessibility,
          availability: section.availability,
          delivery: section.delivery,
          decision_designation_1: section.decision_designation_1,
          decision_designation_2: section.decision_designation_2,
          decision_designation_3: section.decision_designation_3,
          decision_designation_4: section.decision_designation_4,
        }))
      );

      if (error) throw error;

      console.log("Data inserted successfully:", data);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
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
    handleSave();
    navigate(`/form-03`);
  };

  const handlePrevious = () => {
    navigate(`/form-02`);
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
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-semibold">Status</label>
                  <select
                    name="prod_status"
                    value={formSections[index].prod_status || "Ej inventerad"}
                    onChange={(e) => handleInputChange(index, e)}
                  >
                    <option value="Inventerad">Inventerad</option>
                    <option value="Ej inventerad">Ej inventerad</option>
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
                  >
                    <option value="Ej publicerad">Ej publicerad</option>
                    <option value="Publicerad">Publicerad</option>
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
                  <Info className="postition absolute left-10" />
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
                  <Info className="postition absolute left-10" />
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
                  <Info className="postition absolute left-10" />
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
                  <Info className="postition absolute left-10" />
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
                      >
                        <option value="Demonterbar">Demonterbar</option>
                        <option value="Ej Demonterbar">Ej Demonterbar</option>
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
                      >
                        <option value="Åtkomlig">Åtkomlig</option>
                        <option value="Ej Åtkomlig">Ej Åtkomlig</option>
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
                      <Info className="position absolute right-0 cursor-pointer select-none" />
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
                      <Info className="position absolute right-0 cursor-pointer select-none" />
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
                      <Info className="position absolute right-0 cursor-pointer select-none" />
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
                      <Info className="position absolute right-0 cursor-pointer select-none" />
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

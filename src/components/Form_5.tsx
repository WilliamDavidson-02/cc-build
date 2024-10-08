import { z } from "zod";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/context/formContext";
import { supabase } from "@/lib/sbClient";
import Typography from "./Typography";
import Textfield from "./Textfield";
import Button from "./Buttons";
import Info from "./icons/Info";
import { useUser } from "@/context/userContext";
import { UserProfile } from "./Navigation/Navbar";
import Input from "./Input";
import ChevronLeft from "./icons/ChevronLeft";


const step5Schema = z.object({
  product_id: z.string(),
  price_new: z.number().optional(),
  buyer_price: z.boolean().optional(),
  extern_price: z.number().optional(),
  intern_price: z.number().optional(),
  pick_up_on_site: z.boolean().optional(),
  send_with_freight: z.boolean().optional(),
  address: z.string().optional(),
  postal_code: z.string().optional(),
  locality: z.string().optional(),
  comment: z.string().optional(),
  contact_person: z.string().optional(),
});

export type Step5Data = z.infer<typeof step5Schema>;

type Form5Props = {
  isEdit?: boolean;
  handleUpdate?: (values: Step5Data) => Promise<void>;
};

const Form_5: React.FC<Form5Props> = ({ handleUpdate, isEdit = false }) => {
  const { formData, setFormData, saveForm, errors, setErrors, setProgressSteps, setCurrentStep } =
    useFormContext();
  const navigate = useNavigate();
  const { user } = useUser();
  const [fullName, setFullName] = useState<string | null>(null);
  const fetchUserNamesById = async (
    userId: string
  ): Promise<UserProfile | null> => {
    if (!userId) {
      console.error("User ID is undefined");
      return null;
    }

    const { data, error } = await supabase
      .from("profile")
      .select("first_name, last_name")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user names:", error);
      return null;
    }

    return data;
  };

  useEffect(() => {
    const fetchAndSetUserNames = async () => {
      const userId = user?.id;

      if (userId) {
        const userData = await fetchUserNamesById(userId);
        if (userData) {
          const name = `${userData.first_name} ${userData.last_name}`;
          setFullName(name);
        }
      } else {
        console.error("User ID not available after sign in.");
      }
    };

    fetchAndSetUserNames();
  }, [user]);

  const [formSection, setFormSection] = useState<Step5Data>({
    product_id: formData?.product_id ?? "",
    price_new: formData?.price_new ?? 0,
    buyer_price: formData?.buyer_price ?? false,
    extern_price: formData?.extern_price ?? 0,
    intern_price: formData?.intern_price ?? 0,
    pick_up_on_site: formData?.pick_up_on_site ?? false,
    send_with_freight: formData?.send_with_freight ?? false,
    address: formData?.address ?? "",
    postal_code: formData?.postal_code ?? "",
    locality: formData?.locality ?? "",
    comment: formData?.comment ?? "",
    contact_person: user?.id || "",
  });

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    // Convert number input fields from string to number
    const processedValue = type === "number" ? parseFloat(value) || 0 : value;

    setFormSection((prevSection) => ({
      ...prevSection,
      [name]: processedValue,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormSection((prevSection) => ({
      ...prevSection,
      [name]: checked,
    }));
  };

  const handleSave = async () => {
    const result = step5Schema.safeParse(formSection);

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

  //a function that generates a random price
  const generateRandomPrice = () => {
    const randomPrice = Math.floor(Math.random() * 1000) + 1;
    setFormSection((prevSection) => ({
      ...prevSection,
      price_new: randomPrice,
    }));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    navigate(`/form-04`);
  };
  
  //PROGERSSBAR
   // Effect to track progress
   useEffect(() => {
    // Check if required fields are filled
    const isFilled = formSection.product_id !== "" &&
                     formSection.price_new !== undefined && 
                     formSection.address !== "" &&
                     formSection.postal_code !== "" &&
                     formSection.locality !== "";

    // Update progress for step 5
    setProgressSteps(prev => {
      const newProgress = [...prev];
      newProgress[4] = isFilled ? "complete" : "pending"; // Step 5 index is 4
      return newProgress;
    });
  }, [formSection, setProgressSteps]);

  return (
    <>
      <form className="flex flex-col gap-10 w-full">
        <section className="flex flex-col gap-6 py-6 px-4 w-full">
          <div className="flex justify-between items-center ">
            <div className="flex gap-6">
              <Textfield
                title="Nypris / st"
                name="price_new"
                type="number"
                size="large"
                placeholder="Nypris"
                value={formSection.price_new || ""}
                onChange={handleInputChange}
              />
              <div className="flex items-end">
                <Button
                  variant="blue"
                  size="medium"
                  className="max-h-[58px]"
                  onClick={generateRandomPrice}
                >
                  Uppskatta pris
                </Button>
              </div>

              <div className="flex gap-2 items-center">
                <Input
                  className="w-6 h-6 transform"
                  type="checkbox"
                  name="buyer_price"
                  checked={formSection.buyer_price}
                  onChange={handleCheckboxChange}
                  style={{ transform: 'scale(1)' }}
                />
                <label htmlFor="buyer_price">Låt köparen föreslå pris</label>
              </div>
            </div>

            <div className="flex gap-2 relative border border-black py-3 px-5 ">
              <Typography
                variant="p"
                size="md"
                className="text-[#151515] text-[18px]  font-inter"
              >
                Alla priser ska anges exklusive moms
              </Typography>
              <Info className="self-center" />
            </div>
          </div>

          <div className="flex gap-6 items-end ">
            <Textfield
              title="Externt pris / st"
              type="number"
              name="extern_price"
              size="large"
              placeholder="Externt pris"
              value={formSection.extern_price || ""}
              onChange={handleInputChange}
            />

            <Textfield
              title="Internt pris / st"
              type="number"
              name="intern_price"
              size="large"
              placeholder="Internt pris"
              value={formSection.intern_price || ""}
              onChange={handleInputChange}
            />
          </div>
        </section>

        <section className="flex flex-col gap-6 py-6  w-full">
          <div className="w-full">
            <div className="flex flex-col gap-6 shadow-lg w-[60%] px-4 py-6">
              <div className="flex gap-6 items-center">
                <div className="flex gap-2 items-center font-inter">
                  <Input
                    className="w-6 h-6 transform"
                    type="checkbox"
                    name="pick_up_on_site"
                    checked={formSection.pick_up_on_site}
                    onChange={handleCheckboxChange}
                    style={{ transform: 'scale(1)' }}
                  />
                  <label className="font-normal" htmlFor="pick_up_on_site">Kan hämtas på plats</label>
                </div>
                <div className="flex gap-2 items-center font-inter">
                  <Input
                    className="w-6 h-6 transform"
                    type="checkbox"
                    name="send_with_freight"
                    checked={formSection.send_with_freight}
                    onChange={handleCheckboxChange}
                    style={{ transform: 'scale(1)' }}
                  />
                  <label htmlFor="send_with_freight">
                    Kan skickas med frakt
                  </label>
                </div>
              </div>

              <div className="flex gap-6">
                <Textfield
                  title="Adress"
                  name="address"
                  size="large"
                  placeholder="Upphämtningsadress"
                  value={formSection.address || ""}
                  onChange={handleInputChange}
                />

                <Textfield
                  title="Postkod"
                  name="postal_code"
                  size="large"
                  placeholder="Postkod"
                  value={formSection.postal_code || ""}
                  onChange={handleInputChange}
                />
                <Textfield
                  title="Postort"
                  name="locality"
                  size="large"
                  placeholder="Postort"
                  value={formSection.locality || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="flex gap-6 px-4 py-6 w-full">
          <div className="flex flex-col gap-2 max-w-[60%]">
            <Textfield
              title="Kommentar"
              name="comment"
              size="large"
              placeholder="Kommentar"
              value={formSection.comment || ""}
              onChange={handleInputChange}
            />
            <Typography
              variant="p"
              size="md"
              className="text-[#151515] text-[18px]  font-inter"
            >
              Ange kompletterande info om prissättningen och eventuella
              garantier, tex om kostnader tillkommer för demontering och frakt,
              samt möjliga betalningsmetoder såsom faktura eller andra
              betalsätt.
            </Typography>
          </div>

          {/*fetch the contact person from the database!! */}
          <Textfield
            title="Kontaktperson"
            name="contact_person"
            size="large"
            disabled
            placeholder={fullName || ""}
            value={fullName || ""}
            onChange={handleInputChange}
          />
        </section>

        {errors && (
          <div className="text-red-500">
            {Object.entries(errors).map(([key, value]) => (
              <p key={key}>{value.join(", ")}</p>
            ))}
          </div>
        )}
      </form>

      <section className="w-full flex justify-between my-16">
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

            <Button onClick={handleSave} size="medium" variant="blue">
              Spara
            </Button>
          </>
        )}
      </section>
    </>
  );
};

export default Form_5;

import React, {
  FC,
  useState,
  createContext,
  ReactNode,
  useContext,
  useRef,
} from "react";

export interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string[]> | null;
  setErrors: (errors: Record<string, string[]> | null) => void;
  saveForm: React.MutableRefObject<() => void>;
}

const defaultFormData = {
  project_id: "",
  project: "",
  product_id: "",
  name: "",
  product_category_1: "",
  product_category_2: "",
  product_category_3: "",
  visual_condition: "",
  working_condition: "",
  images: [] as File[],
  product_files: [] as File[],
  ownId: 0,

  amount: 1,
  prod_status: "Ej inventerad",
  market_status: "Ej publicerad",
  place1: "",
  place2: "",
  place3: "",
  place4: "",
  disassembly: "Ej Demonterbar",
  accessibility: "Ej Åtkomlig",
  availability: new Date(),
  delivery: new Date(),
  decision_designation_1: "",
  decision_designation_2: "",
  decision_designation_3: "",
  decision_designation_4: "",

  material: "",
  color_finish: "",
  unit_of_measure: "",
  width: 0,
  length: 0,
  height: 0,
  depth: 0,
  diameter: 0,
  thickness: 0,
  weight_unit: "",
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

  manufactor: "",
  articel_number: "",
  manufactor_year: 0,
  bought_year: 0,
  gtin: 0,
  rsk: 0,
  bsab: "",
  enr: 0,
  bk04: "",

  price_new: 0,
  buyer_price: false,
  extern_price: 0,
  intern_price: 0,
  pick_up_on_site: false,
  send_with_freight: false,
  address: "",
  postal_code: 0,
  locality: "",
  comment: "",
};

export type FormData = typeof defaultFormData;

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const saveForm = useRef(() => {});

  return (
    <FormContext.Provider
      value={{ formData, setFormData, errors, setErrors, saveForm }}
    >
      {children}
    </FormContext.Provider>
  );
};

const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }

  return context;
};

export { FormProvider, useFormContext, FormContext };

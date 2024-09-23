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
//we need to rename all the fields to their actual names they have in teh db
type FormData = {

      project_id: string;
      project: string;
      product_id: string;
      name: string;
      product_category_1: string;
      product_category_2: string;
      product_category_3: string;
      visual_condition: string;
      working_condition: string;
      image: Array<string>;
      product_files: Array<string>;
      ownId: number;



      amount: number;
      prod_status: string;
      market_status: string;
      place1: string;
      place2: string;
      place3: string;
      place4: string;
      disassembly: string;
      accessibility:  string;
      availability: Date;
      delivery:   Date;
      decision_designation_1: string;
      decision_designation_2: string;
      decision_designation_3:  string;
      decision_designation_4: string;
        

      material: string;
      color_finish: string;
      unit_of_measure: string;
      width: number;
      height: number;
      depth: number;
      diameter: number;
      thickness: number;
      weight_unit: string;
      weight: number;
      avg_height_min: number;
      avg_height_max: number;
      lumbal_support: number;

      //glass properties
      glass_type: string;
      glass_model: string;
      glass_thickness: number;
      hanging: string;
      module_size: string;
      sound_reduction: number;
      fire_resistance_class: number;
      burglary_resistance_class: number;
      environmental_profile: string;
      frame_depth: number;

      manufactor: string;
      articel_number: string;
      manufactor_year: number;
      bought_year: number;
      gtin: number;
      rsk: number;
      bsab: string;
      enr: number;
      bk04: string;

      price_new: number;
      buyer_price: boolean;
      extern_price: number;
      intern_price: number;
      pick_up_on_site: boolean;
      send_with_freight: boolean;
      address: string;
      postal_code: number;
      locality: string;
      comment: string;


};

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({

    project_id: "",
    project: "",
    product_id: "",
    name: "",
    product_category_1: "",
    product_category_2: "",
    product_category_3: "",    
    visual_condition: "",
    working_condition: "",
    image: [],
    product_files: [],
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
  });

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
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export { FormProvider, useFormContext, FormContext };

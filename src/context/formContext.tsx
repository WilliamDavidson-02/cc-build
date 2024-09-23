import React, { FC, useState, createContext, ReactNode, useContext, useRef } from 'react';

export interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string[]> | null;
  setErrors: (errors: Record<string, string[]> | null) => void;
  saveForm: React.MutableRefObject<() => void>;
}
//we need to rename all the fields to their actual names they have in teh db
type FormData = {

      project: string;
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
    project: "",
    productname: "",
    productcategori1: "",
    productcategori2: "",
    productcategori3: "",
    estState: "",
    funcState: "",
    prodImg: [],
    prodFiles: [],
    ownId: 0,

    amount: 1,
    status: "Ej inventerad",
    marketplace: "Ej publicerad",
    place1: "",
    place2: "",
    place3: "",
    place4: "",
    dismantability: "Ej Demonterbar",
    accessibility: "Ej Åtkomlig",
    dateAcces: new Date(),
    dateFirstPosDelivery: new Date(),
    decisionDesignation1: "",
    decisionDesignation2: "",
    decisionDesignation3: "",
    decisionDesignation4: "",

    material: "",
    colorFinish: "",
    unitOfMeasure: "",
    width: 0,
    height: 0,
    depth: 0,
    diameter: 0,
    thickness: 0,
    weightUnit: "",
    weight: 0,
    avgHeightMin: 0,
    avgHeightMax: 0,
    backSupport: 0,

    manufactor: "",
    articelNumber: "",
    manufactorYear: 0,
    boughtYear: 0,
    gtin: false,
    rsk: false,
    bsab: false,
    enr: false,
    bk04: false,

    priceNew: 0,
    buyerPrice: false,
    externPrice: 0,
    internPrice: 0,
    picUpOnSite: false,
    sendWithFreight: false,
    address: "",
    postalCode: 0,
    locality: "",
    comment: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const saveForm = useRef(() => {});

  /* const handleSetFormData = (data: FormData) => {
    setFormData(prevData => ({
      ...prevData,
      ...data,
    }));
  }; */

  return (
    <FormContext.Provider value={{ formData, setFormData, errors, setErrors, saveForm }}>
      {children}
    </FormContext.Provider>
  );
};

const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export { FormProvider, useFormContext, FormContext };
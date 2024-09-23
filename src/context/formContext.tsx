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
  name: string;
  productcategory1: string;
  productcategory2: string;
  productcategory3: string;
  product_id: string;
  visual_condition: string;
  working_condition: string;
  prodImg: File[];
  prodFiles: File[];

  amount: number;
  status: string;
  marketplace: string;
  place1: string;
  place2: string;
  place3: string;
  place4: string;
  dismantability: string;
  accessibility: string;
  dateAcces: Date;
  dateFirstPosDelivery: Date;
  decisionDesignation1: string;
  decisionDesignation2: string;
  decisionDesignation3: string;
  decisionDesignation4: string;

  material: string;
  colorFinish: string;
  unitOfMeasure: string;
  width: number;
  height: number;
  depth: number;
  diameter: number;
  thickness: number;
  weightUnit: string;
  weight: number;
  avgHeightMin: number;
  avgHeightMax: number;
  backSupport: number;

  manufactor: string;
  articelNumber: string;
  manufactorYear: number;
  boughtYear: number;
  gtin: boolean;
  rsk: boolean;
  bsab: boolean;
  enr: boolean;
  bk04: boolean;

  priceNew: number;
  buyerPrice: boolean;
  externPrice: number;
  internPrice: number;
  picUpOnSite: boolean;
  sendWithFreight: boolean;
  address: string;
  postalCode: number;
  locality: string;
  comment: string;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    project_id: "",
    name: "",
    productcategory1: "",
    productcategory2: "",
    productcategory3: "",
    product_id: "",
    visual_condition: "",
    working_condition: "",
    prodImg: [],
    prodFiles: [],

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

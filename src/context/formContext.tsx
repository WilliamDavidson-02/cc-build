import React, { FC, useState, createContext, ReactNode, useContext, useRef } from 'react';

export interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string[]> | null;
  setErrors: (errors: Record<string, string[]> | null) => void;
  saveForm: React.MutableRefObject<() => void>;
}

type FormData = {

      project: string;
      productname: string;
      productcategori1: string;
      productcategori2: string;
      productcategori3: string;
      estState: string;
      funcState: string;
      prodImg: Array<string>;
      prodFiles: Array<string>;
      ownId: number;



      amount: number;
      status: string;
      marketplace: string;
      place1: string;
      place2: string;
      place3: string;
      place4: string;
      dismantability: string;
      accessibility:  string;
      dateAcces: Date;
      dateFirstPosDelivery:   Date;
      decisionDesignation1: string;
      decisionDesignation2: string;
      decisionDesignation3:  string;
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
    project: "", // projekt
    productname: "", // produktnamn
    productcategori1: "", // produktkategori1
    productcategori2: "", // produktkategori2
    productcategori3: "", // produktkategori3
    estState: "", // estSkick
    funcState: "", // funkSkick
    prodImg: [], // prodBilder
    prodFiles: [], // prodFiler
    ownId: 0, // egetId

    amount: 1, // antal
    status: "Ej inventerad", 
    marketplace: "Ej publicerad", 
    place1: "", // plats1
    place2: "", // plats2
    place3: "", // plats3
    place4: "", // plats4
    dismantability: "Ej Demonterbar", 
    accessibility: "Ej Åtkomlig", 
    dateAcces: new Date(), // datumTillgänglig
    dateFirstPosDelivery: new Date(), // datumFörstaMöjligaLeverans
    decisionDesignation1: "", // beslutsbenämning1
    decisionDesignation2: "", // beslutsbenämning2
    decisionDesignation3: "", // beslutsbenämning3
    decisionDesignation4: "", // beslutsbenämning4

    material: "", // material
    colorFinish: "", // färgFinish
    unitOfMeasure: "", // måttEnhet
    width: 0, // bredd
    height: 0, // höjd
    depth: 0, // djup
    diameter: 0, // diameter
    thickness: 0, // tjocklek
    weightUnit: "", // viktEnehet
    weight: 0, // vikt
    avgHeightMin: 0, // snitthöjdMin
    avgHeightMax: 0, // snitthöjdMax
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
    comment: "" 
  });

  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const saveForm = useRef(() => {});

  const handleSetFormData = (data: FormData) => {
    setFormData(prevData => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, setFormData: handleSetFormData, errors, setErrors, saveForm }}>
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
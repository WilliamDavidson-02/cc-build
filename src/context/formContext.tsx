import React, { FC, useState, createContext, ReactNode, useContext, useRef } from 'react';

export interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string[]> | null;
  setErrors: (errors: Record<string, string[]> | null) => void;
  saveForm: React.MutableRefObject<() => void>;
}

type FormData = {

      projekt: string;
      produktnamn: string;
      produktkategori1: string;
      produktkategori2: string;
      produktkategori3: string;
      estSkick: string;
      funkSkick: string;
      prodBilder: Array<string>;
      prodFiler: Array<string>;
      egetId: number;



      antal: number;
      status: string;
      marknadsplatsen: string;
      plats1: string;
      plats2: string;
      plats3: string;
      plats4: string;
      Demonterbarhet: string;
      Åtkomlighet:  string;
      datumTillgänglig: Date;
      datumFörstaMöjligaLeverans:   Date;
      beslutsbenämning1: string;
      beslutsbenämning2: string;
      beslutsbenämning3:  string;
      beslutsbenämning4: string;
        

      material: string;
      färgFinish: string;
      måttEnhet: string;
      bredd: number;
      höjd: number;
      djup: number;
      diameter: number;
      tjocklek: number;
      viktEnehet: string;
      vikt: number;
      snitthöjdMin: number;
      snitthöjdMax: number;
      ryggStöd: number;

      tillverkare: string;
      artikelnummer: string;
      tillverkningsår: number;
      inköpsår: number;
      gtin: boolean;
      rsk: boolean;
      bsab: boolean;
      enr: boolean;
      bk04: boolean;

      nypris: number;
      buyerPrice: boolean;
      externPris: number;
      internPris: number;
      picUpOnSite: boolean;
      sendWithFreight: boolean;
      address: string;
      postkod: number;
      ort: string;
      kommentar: string;

};


const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    projekt: "",
    produktnamn: "",
    produktkategori1: "",
    produktkategori2: "",
    produktkategori3: "",
    estSkick: "",
    funkSkick: "",
    prodBilder: [],
    prodFiler: [],
    egetId: 0,

    antal: 1,
    status: "Ej inventerad",
    marknadsplatsen: "Ej publicerad",
    plats1: "",
    plats2: "",
    plats3: "",
    plats4: "",
    Demonterbarhet: "Ej Demonterbar",
    Åtkomlighet: "Ej Åtkomlig",
    datumTillgänglig: new Date(),
    datumFörstaMöjligaLeverans: new Date(),
    beslutsbenämning1: "",
    beslutsbenämning2: "",
    beslutsbenämning3: "",
    beslutsbenämning4: "",

    material: "",
    färgFinish: "",
    måttEnhet: "",
    bredd: 0,
    höjd: 0,
    djup: 0,
    diameter: 0,
    tjocklek: 0,
    viktEnehet: "",
    vikt: 0,
    snitthöjdMin: 0,
    snitthöjdMax: 0,
    ryggStöd: 0,

    tillverkare: "",
    artikelnummer: "",
    tillverkningsår: 0,
    inköpsår: 0,
    gtin: false,
    rsk: false,
    bsab: false,
    enr: false,
    bk04: false,

    nypris: 0,
    buyerPrice: false,
    externPris: 0,
    internPris: 0,
    picUpOnSite: false,
    sendWithFreight: false,
    address: "",
    postkod: 0,
    ort: "",
    kommentar: "",
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
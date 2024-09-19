import { FC, useState, createContext, ReactNode, useContext } from 'react';

interface FormContextType {
  formData: Record<string, unknown>; 
  setFormData: (data: Record<string, unknown>) => void;
  errors: Record<string, string[]> | null;
  setErrors: (errors: Record<string, string[]> | null) => void;
  saveForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const saveForm = () => {
    
    console.log('Saving form data:', formData);    
  };
  
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


export { FormProvider, useFormContext };
//export { FormProvider, FormContext };
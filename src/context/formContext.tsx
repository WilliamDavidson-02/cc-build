import { FC, useState, createContext, ReactNode, useContext, useRef } from 'react';

interface FormContextType {
  formData: Record<string, unknown>; 
  setFormData: (data: Record<string, unknown>) => void;
  errors: Record<string, string[]> | null;
  setErrors: (errors: Record<string, string[]> | null) => void;
  saveForm: React.MutableRefObject<() => void>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const saveForm = useRef(() => {});
  
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
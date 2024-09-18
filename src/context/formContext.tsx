import { FC, useState, createContext, ReactNode } from 'react';

interface FormContextType {
  formData: Record<string, unknown>; 
  setFormData: (data: Record<string, unknown>) => void;
  errors: Record<string, string[]> | null;
  setErrors: (errors: Record<string, string[]> | null) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  return (
    <FormContext.Provider value={{ formData, setFormData, errors, setErrors }}>
      {children}
    </FormContext.Provider>
  );
};

/* usage example:

import { useContext } from 'react';

const context = useContext(FormContext);

  const { formData, setFormData, errors, setErrors } = context;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { productName, value } = event.target;
    setFormData(prev => ({ ...prev, [productName]: value }));
  };

*/
export { FormProvider, FormContext };
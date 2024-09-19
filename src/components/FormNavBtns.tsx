import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/formContext';
import Button from './Buttons';

interface FormNavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
}

const FormNavigationButtons: React.FC<FormNavigationButtonsProps> = ({ currentStep, totalSteps }) => {
  const navigate = useNavigate();
  const { saveForm } = useFormContext();

  const handleNext = () => {
    if (currentStep < totalSteps) {
      saveForm.current();
      navigate(`/step${currentStep + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      navigate(`/step${currentStep - 1}`);
    }
  };

  const handleSave = () => {
    saveForm.current();
  };

  return (
    <section className="w-full flex justify-between">
      <Button
        onClick={handlePrevious}
        disabled={currentStep === 1}
        size="medium"
        variant="white"
      >
        &lt; Föregående
      </Button>
      <div className='flex gap-2'>
        <Button
          onClick={handleSave}
          size="medium"
          variant="white"
        >
          Spara utkast
        </Button>
        {currentStep < totalSteps ? (
          <Button
            onClick={handleNext}
            size="medium"
            variant="blue"
          >
            Nästa &gt;
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            size="medium"
            variant="blue"
          >
            Spara
          </Button>
        )}
      </div>
    </section>
  );
};

export default FormNavigationButtons;
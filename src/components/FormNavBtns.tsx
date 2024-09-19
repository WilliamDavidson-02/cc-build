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
      navigate(`/form/step${currentStep + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      navigate(`/form/step${currentStep - 1}`);
    }
  };

  return (
    <div className="flex justify-between mt-4">
      <Button
        onClick={handlePrevious}
        disabled={currentStep === 1}
        size="medium"
        variant="white"
      >
        &lt;Föregående
      </Button>
      <Button
        onClick={saveForm}
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
          Nästa&gt;
        </Button>
      ) : (
        <Button
          onClick={saveForm}
          size="medium"
          variant="blue"
        >
          Spara
        </Button>
      )}
    </div>
  );
};

export default FormNavigationButtons;
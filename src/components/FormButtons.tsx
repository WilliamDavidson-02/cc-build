import { FC } from "react";
import Button from "/Buttons";

type FormButtonsProps = {};

const FormButtons: FC<FormButtonsProps> = ({}) => {
  return (
    <section className="flex justify-between flex-wrap gap-6">
      <div>
        <Button size="medium" variant="white" onClick={handleButtonClick}>
          Föregående
        </Button>
      </div>
      <div className=" flex gap-2 flex-wrap">
        <Button size="medium" variant="white" onClick={handleButtonClick}>
          Spara utkast
        </Button>
        <Button size="medium" variant="blue" onClick={handleButtonClick}>
          Nästa
        </Button>
      </div>
    </section>
  );
};

export default FormButtons;

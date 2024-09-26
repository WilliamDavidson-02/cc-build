import Button from "@/components/Buttons";
import { useNavigate } from "react-router-dom";
import {
  ProgressSteps,
  ProgressStepsCard,
  Status,
} from "@/components/products/ProgressSteps";
import { FC, useState } from "react";

const defaultSteps: { title: string; status: Status }[] = [
  {
    title: "Generell information",
    status: "pending",
  },
  {
    title: "Plats/status/antal",
    status: "pending",
  },
  {
    title: "Egenskaper",
    status: "pending",
  },
  {
    title: "Produktinformation",
    status: null,
  },
  {
    title: "Hantering för marknadsplats",
    status: null,
  },
];

const Home: FC = () => {
  const [step, setStep] = useState(3);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center px-48">
      <ProgressSteps>
        {defaultSteps.map((s, i) => (
          <ProgressStepsCard
            name={s.title}
            number={i + 1}
            status={s.status}
            active={i === step}
            key={s.title}
            onClick={() => setStep(i)}
          />
        ))}
      </ProgressSteps>
      <Button
        size="large"
        variant="blue"
        className="mt-32"
        onClick={() => navigate("/form-01")}
      >
        Klicka här för att lägga till en produkt
      </Button>
    </div>
  );
};

export default Home;

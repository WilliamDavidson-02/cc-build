import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import {
  ProgressSteps,
  ProgressStepsCard,
  ProgressStepsCardNumber,
  Status,
} from "@/components/products/ProgressSteps";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
const defaultSteps: { title: string; status: Status }[] = [
  {
    title: "Generell information",
    status: "pending",
  },
  {
    title: "Plats/status/antal",
    status: "complete",
  },
  {
    title: "Egenskaper",
    status: null,
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
  const [step, setStep] = useState(2);
  const [selected, setSelected] = useState<Date>();

  return (
    <div>
      <ProgressSteps>
        {defaultSteps.map((s, i) => (
          <ProgressStepsCard
            active={step === i}
            onClick={() => setStep(i)}
            status={s.status}
            key={s.title}
          >
            <ProgressStepsCardNumber
              className={cn({
                "border-black text-black": step === i || s.status,
              })}
              number={i + 1}
            />
            <p className="text-nowrap text-ellipsis overflow-hidden">
              {s.title}
            </p>
          </ProgressStepsCard>
        ))}
      </ProgressSteps>
      <DatePicker selected={selected} setSelected={setSelected} />
      <Input type="radio" />
      <Input type="checkbox" />
    </div>
  );
};

export default Home;

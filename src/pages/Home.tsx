//import Button from "@/components/Buttons";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import {
  ProgressSteps,
  ProgressStepsCard,
  Status,
} from "@/components/products/ProgressSteps";
//import { useUser } from "@/context/userContext";
import { FC, useState } from "react";
import Form from "@/components/Form";
import FormStepThree from "@/components/FormStepThree";
import { Tooltip } from "@/components/Tooltip";
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
  const [selected, setSelected] = useState<Date>();

  /* const { user, isLoading, signOut } = useUser();
   */
  return (
    <div>
      {/*  {!isLoading && user && <Button onClick={signOut}>Logga ut</Button>} */}
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
      <DatePicker selected={selected} setSelected={setSelected} />
      <Input type="radio" />
      <Input type="checkbox" />
      <Form name="hello" product_id="cd3805a6-609a-40ff-80c5-b30913941423" />
      <Tooltip info="This is the tooltip info" />
      <FormStepThree />
    </div>
  );
};

export default Home;

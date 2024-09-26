import { FC } from "react";
import Typography from "./Typography";
import Button from "./Buttons";
import Copy from "./icons/Copy";
import ArrowUpRight from "./icons/ArrowUpRight";
import Close from "./icons/Close";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";
import StatusColor from "./StatusColor";
import { Status } from "./products/ProgressSteps";
import Form_1, { StepOneData } from "./Form_1";
import Form_2, { Step2Data } from "./Form_2";
import Form_3, { StepThreeData } from "./Form_3";
import Form_4, { Step4Data } from "./Form_4";
import Form_5, { Step5Data } from "./Form_5";

type SummaryItemBannerProps = {
  title: string;
  status?: Status;
};

const SummaryItemBanner: FC<SummaryItemBannerProps> = ({
  status = null,
  title,
}) => {
  return (
    <div>
      <div className="flex justify-between py-8">
        <Typography variant="h3" className="font-bold">
          {title}
        </Typography>
        <div className="flex gap-6 items-center pr-9">
          <StatusColor status={status} />
          <Button size="small">Redigera</Button>
        </div>
      </div>
      <div className="bg-zinc-200 w-full h-[1px]" />
    </div>
  );
};

const Summary: FC = () => {
  const updateForm1 = async (values: StepOneData) => {
    console.log(values);
  };

  const updateForm2 = async (values: Step2Data[]) => {
    console.log(values);
  };

  const updateForm3 = async (values: StepThreeData) => {
    console.log(values);
  };

  const updateForm4 = async (values: Step4Data) => {
    console.log(values);
  };

  const updateForm5 = async (values: Step5Data) => {
    console.log(values);
  };

  return (
    <section className="max-w-[1024px] mx-auto py-16 flex flex-col gap-16">
      <header className="flex flex-col gap-10">
        <Typography variant="h3" className="font-bold">
          Sammanfattning
        </Typography>
        <Typography size="sm">
          Här är en sammanfattning och du kan redigera och sånna grejer.
        </Typography>
        <div className="flex flex-wrap gap-6">
          <Button size="small">
            <Copy />
            Duplicera
          </Button>
          <Button size="small">
            <ArrowUpRight />
            Flytta
          </Button>
          <Button size="small">
            <Close />
            Radera
          </Button>
        </div>
      </header>
      <Accordion>
        <AccordionItem value="generll-information">
          <AccordionTrigger>
            <SummaryItemBanner
              title="Generell information"
              status={"complete"}
            />
          </AccordionTrigger>
          <AccordionContent>
            <Form_1 isEdit handleUpdate={updateForm1} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="antal-status-plats">
          <AccordionTrigger>
            <SummaryItemBanner title="Antal/status/plats" />
          </AccordionTrigger>
          <AccordionContent>
            <Form_2 isEdit handleUpdate={updateForm2} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="form-egenskaper">
          <AccordionTrigger>
            <SummaryItemBanner title="Form/egenskaper" status={"complete"} />
          </AccordionTrigger>
          <AccordionContent>
            <Form_3 isEdit handleUpdate={updateForm3} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="produktinformation">
          <AccordionTrigger>
            <SummaryItemBanner title="Produktinformation" status={"pending"} />
          </AccordionTrigger>
          <AccordionContent>
            <Form_4 isEdit handleUpdate={updateForm4} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="hantering-för-marknadsplats">
          <AccordionTrigger>
            <SummaryItemBanner
              title="Hantering för marknadsplats"
              status={"complete"}
            />
          </AccordionTrigger>
          <AccordionContent>
            <Form_5 isEdit handleUpdate={updateForm5} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Summary;

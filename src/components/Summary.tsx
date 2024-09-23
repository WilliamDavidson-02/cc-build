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
  return (
    <section className="max-w-[60rem] mx-auto py-16 flex flex-col gap-16">
      <header className="flex flex-col gap-10">
        <Typography variant="h3" className="font-bold">
          Sammanfattning
        </Typography>
        <Typography size="sm">
          Här är en sammanfattning och du kan rediger och sånna grejer.
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
          <AccordionContent>Step form</AccordionContent>
        </AccordionItem>
        <AccordionItem value="antal-status-plats">
          <AccordionTrigger>
            <SummaryItemBanner title="Antal/status/plats" />
          </AccordionTrigger>
          <AccordionContent>Step form</AccordionContent>
        </AccordionItem>
        <AccordionItem value="form-egenskaper">
          <AccordionTrigger>
            <SummaryItemBanner title="Form/egenskaper" status={"complete"} />
          </AccordionTrigger>
          <AccordionContent>Step form</AccordionContent>
        </AccordionItem>
        <AccordionItem value="produktinformation">
          <AccordionTrigger>
            <SummaryItemBanner title="Produktinformation" status={"pending"} />
          </AccordionTrigger>
          <AccordionContent>Step form</AccordionContent>
        </AccordionItem>
        <AccordionItem value="hantering-för-marknadsplats">
          <AccordionTrigger>
            <SummaryItemBanner
              title="Hantering för marknadsplats"
              status={"complete"}
            />
          </AccordionTrigger>
          <AccordionContent>Step form</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Summary;

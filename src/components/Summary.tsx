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
import { supabase } from "@/lib/sbClient";
import { FormData, useFormContext } from "@/context/formContext";
import { Database } from "@/lib/database.types";

type DBIndividual =
  Database["public"]["Tables"]["product_individual"]["Update"];

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
        <Typography variant="h3" className="font-bold text-[31px] font-poppins">
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

type SummaryProps = {
  initialData: FormData | null;
};

const Summary: FC<SummaryProps> = ({ initialData }) => {
  const { formData } = useFormContext();

  const updateForm1 = async (values: StepOneData) => {
    const productData = {
      project_id: values.project,
      name: values.name,
      visual_condition: values.visual_condition,
      working_condition: values.working_condition,
      product_id: values.ownId,
    };

    const products = await supabase
      .from("products")
      .update(productData)
      .eq("id", formData.product_id);

    if (products.error) {
      console.log(products.error);
      return;
    }

    const categories = [
      {
        old_category: initialData?.product_category_1,
        new_category: values.product_category_1,
      },
      {
        old_category: initialData?.product_category_2,
        new_category: values.product_category_2,
      },
      {
        old_category: initialData?.product_category_3,
        new_category: values.product_category_3,
      },
    ];

    categories.forEach(async ({ new_category, old_category }) => {
      if (!old_category || new_category === old_category) return;

      const { error } = await supabase
        .from("product_category")
        .update({ category_id: new_category })
        .eq("category_id", old_category)
        .eq("product_id", formData.product_id);

      if (error) {
        console.log(error);
        return;
      }
    });
  };

  const updateForm2 = async (values: Step2Data[]) => {
    // Delete
    const toDelete = initialData?.individual
      .filter(
        (ind) => !values.some((v) => v.id === ind.id) && ind.id !== undefined
      )
      .map((ind) => ind.id);

    if (toDelete) {
      const deleteIndividuals = await supabase
        .from("product_individual")
        .delete()
        .in("id", toDelete);

      if (deleteIndividuals.error) {
        console.log(deleteIndividuals.error);
        return;
      }
    }

    const toUpdate = values.filter(
      (ind) =>
        ind.id !== undefined ||
        initialData?.individual.some((i) => i.id === ind.id)
    );

    toUpdate.forEach(async ({ id, ...rest }) => {
      if (id === undefined) return;

      const upsertedIndividual = await supabase
        .from("product_individual")
        .update({ ...rest } as DBIndividual)
        .eq("prod_id", formData.product_id)
        .eq("id", id);

      if (upsertedIndividual.error) {
        console.log(upsertedIndividual.error);
        return;
      }
    });

    const toInsert = values
      .filter((ind) => ind.id === undefined)
      .map(({ id, ...rest }) => ({ ...rest, prod_id: formData.product_id }));

    const insertedIndividuals = await supabase
      .from("product_individual")
      .insert(toInsert);

    if (insertedIndividuals.error) {
      console.log(insertedIndividuals.error);
      return;
    }
  };

  const updateForm3 = async (values: StepThreeData) => {
    console.log(values);

    const formated = Object.entries(values).map(([name, value]) => ({
      name,
      value,
    }));

    formated.forEach(async ({ name, value }) => {
      const { error } = await supabase
        .from("product_property")
        .update({ value })
        .eq("prod_id", formData.product_id)
        .eq("name", name);

      if (error) {
        console.log(error);
        return;
      }
    });
  };

  const updateForm4 = async (values: Step4Data) => {
    const formated = Object.entries(values).map(([name, value]) => ({
      name,
      value,
    }));

    formated.forEach(async ({ name, value }) => {
      const { error } = await supabase
        .from("product_property")
        .update({ value })
        .eq("prod_id", formData.product_id)
        .eq("name", name);

      if (error) {
        console.log(error);
        return;
      }
    });
  };

  const updateForm5 = async (values: Step5Data) => {
    console.log(values);

    const { product_id, ...rest } = values;

    const { error } = await supabase
      .from("product_market_place")
      .update({ prod_id: product_id, ...rest })
      .eq("prod_id", values.product_id);

    if (error) console.log(error);
  };

  return (
    <section className="max-w-[1200px] mx-auto py-16 flex flex-col gap-16">
      <header className="flex flex-col gap-10">
        <Typography variant="h3" className="font-bold text-[31px] font-poppins">
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
            <div className="mt-10">
              <Form_3 isEdit handleUpdate={updateForm3} />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="produktinformation">
          <AccordionTrigger>
            <SummaryItemBanner title="Produktinformation" status={"pending"} />
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-10">
              <Form_4 isEdit handleUpdate={updateForm4} />
            </div>
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
            <div className="mt-10">
              <Form_5 isEdit handleUpdate={updateForm5} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Summary;

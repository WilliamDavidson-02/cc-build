import React, {
  FC,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/sbClient";
import { TablesInsert } from "@/lib/database.types";
import { useUser } from "./userContext";

export interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string[]> | null;
  setErrors: (errors: Record<string, string[]> | null) => void;
  saveForm: (formData: FormData) => Promise<void>;
}

const defaultFormData = {
  project_id: "",
  project: "",
  product_id: "",
  name: "",
  product_category_1: "",
  product_category_2: "",
  product_category_3: "",
  visual_condition: "",
  working_condition: "",
  images: [] as File[],
  image_urls: [] as string[],
  product_files: [] as File[],
  product_file_urls: [] as string[],
  ownId: "",

  individual: [
    {
      id: 0 as number | undefined,
      amount: 1 as number | undefined,
      prod_status: "Ej inventerad" as string | undefined,
      market_status: "Ej publicerad" as string | undefined,
      place1: "" as string | undefined,
      place2: "" as string | undefined,
      place3: "" as string | undefined,
      place4: "" as string | undefined,
      disassembly: "Ej Demonterbar",
      accessibility: "Ej Åtkomlig",
      availability: new Date() as Date | undefined,
      delivery: new Date() as Date | undefined,
      decision_designation_1: "" as string | undefined,
      decision_designation_2: "" as string | undefined,
      decision_designation_3: "" as string | undefined,
      decision_designation_4: "" as string | undefined,
    },
  ],

  material: "",
  color_finish: "",
  unit_of_measure: "",
  width: 0,
  length: 0,
  height: 0,
  depth: 0,
  diameter: 0,
  thickness: 0,
  weight_unit: "",
  weight: 0,
  avg_height_min: 0,
  avg_height_max: 0,
  lumbal_support: 0,

  glass_type: "",
  glass_model: "",
  glass_thickness: 0,
  hanging: "",
  module_size: "",
  sound_reduction: 0,
  fire_resistance_class: 0,
  burglary_resistance_class: 0,
  environmental_profile: "",
  frame_depth: 0,

  manufactor: "",
  articel_number: "",
  manufactor_year: "",
  bought_year: "",
  gtin: "",
  rsk: "",
  bsab: "",
  enr: "",
  bk04: "",

  price_new: 0,
  buyer_price: false,
  extern_price: 0,
  intern_price: 0,
  pick_up_on_site: false,
  send_with_freight: false,
  address: "",
  postal_code: "",
  locality: "",
  comment: "",
  contact_person: "",
};

export type FormData = typeof defaultFormData;

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const { user } = useUser();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  /* const saveForm = useRef(() => {}); */

  const saveForm = async (formData: FormData) => {
    const productData = {
      project_id: formData.project,
      name: formData.name,
      visual_condition: formData.visual_condition,
      working_condition: formData.working_condition,
      product_id: formData.ownId,
      id: formData.product_id,
    };

    try {
      const products = await supabase.from("products").insert([productData]);

      if (products.error) throw products.error;

      const productCategoryData = [
        {
          product_id: formData.product_id,
          category_id: formData.product_category_1,
        },
        {
          product_id: formData.product_id,
          category_id: formData.product_category_2,
        },
        {
          product_id: formData.product_id,
          category_id: formData.product_category_3,
        },
      ];

      const productsCategory = await supabase
        .from("product_category")
        .insert(productCategoryData);

      if (productsCategory.error) {
        throw productsCategory.error;
      }

      //step2

      // Prepare data for insertion
      const insertData: TablesInsert<"product_individual">[] =
        formData.individual.map((section) => ({
          accessibility: section.accessibility ?? undefined,
          amount: section.amount ?? undefined,
          availability: section.availability ?? undefined,
          decision_designation_1: section.decision_designation_1 ?? undefined,
          decision_designation_2: section.decision_designation_2 ?? undefined,
          decision_designation_3: section.decision_designation_3 ?? undefined,
          decision_designation_4: section.decision_designation_4 ?? undefined,
          delivery: section.delivery ?? undefined,
          disassembly: section.disassembly ?? undefined,
          market_status: section.market_status ?? undefined,
          place1: section.place1 ?? undefined,
          place2: section.place2 ?? undefined,
          place3: section.place3 ?? undefined,
          place4: section.place4 ?? undefined,
          prod_id: formData.product_id ?? undefined,
          prod_status: section.prod_status ?? undefined,
        }));

      // Insert into the 'product_individual' table
      const productIndividual = await supabase
        .from("product_individual")
        .insert(insertData);

      if (productIndividual.error) throw productIndividual.error;

      console.log("Data inserted successfully:", productIndividual.data);

      //step 3

      const {
        unit_of_measure,
        width,
        length,
        height,
        depth,
        diameter,
        thickness,
        weight,
        weight_unit,
        material,
        color_finish,
      } = formData;

      const prod_id = formData.product_id;

      const properties = [
        {
          name: "material",
          value: material?.toString(),
          prod_id,
        },
        {
          name: "color_finish",
          value: color_finish?.toString(),
          prod_id,
        },
        {
          name: "unit_of_measure",
          value: unit_of_measure?.toString(),
          prod_id,
        },
        {
          name: "width",
          value: width?.toString(),
          prod_id,
        },
        {
          name: "length",
          value: length?.toString(),
          prod_id,
        },
        {
          name: "height",
          value: height?.toString(),
          prod_id,
        },
        {
          name: "depth",
          value: depth?.toString(),
          prod_id,
        },
        {
          name: "diameter",
          value: diameter?.toString(),
          prod_id,
        },
        {
          name: "thickness",
          value: thickness?.toString(),
          prod_id,
        },
        {
          name: "weight",
          value: weight?.toString(),
          prod_id,
        },
        {
          name: "weight_unit",
          value: weight_unit?.toString(),
          prod_id,
        },
      ];

      //step 4

      const propertiesToInsert = [
        { name: "manufactor", value: formData.manufactor },
        { name: "articel_number", value: formData.articel_number },
        { name: "manufactor_year", value: formData.manufactor_year },
        { name: "bought_year", value: formData.bought_year },
        { name: "gtin", value: formData.gtin },
        { name: "rsk", value: formData.rsk },
        { name: "bsab", value: formData.bsab },
        { name: "enr", value: formData.enr },
        { name: "bk04", value: formData.bk04 },
      ];

      let propertyInsert = propertiesToInsert.map((property) => ({
        prod_id: formData.product_id,
        name: property.name,
        value: property.value,
      }));
      propertyInsert = [...properties, ...propertyInsert];
      //insert data
      const productProperty = await supabase
        .from("product_property")
        .insert(propertyInsert);

      if (productProperty.error) {
        throw productProperty.error;
      }

      //step 5

      const marketData: TablesInsert<"product_market_place"> = {
        prod_id: formData.product_id,
        price_new: formData.price_new,
        buyer_price: formData.buyer_price,
        extern_price: formData.extern_price,
        intern_price: formData.intern_price,
        pick_up_on_site: formData.pick_up_on_site,
        send_with_freight: formData.send_with_freight,
        address: formData.address,
        postal_code: formData.postal_code,
        locality: formData.locality,
        comment: formData.comment,
        contact_person: user?.id || "",
      };

      const market = await supabase
        .from("product_market_place")
        .insert([marketData]);

      if (market.error) throw market.error;

      navigate(`/products/${formData.product_id}`);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <FormContext.Provider
      value={{ formData, setFormData, errors, setErrors, saveForm }}
    >
      {children}
    </FormContext.Provider>
  );
};

const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }

  return context;
};

export { FormProvider, useFormContext, FormContext };

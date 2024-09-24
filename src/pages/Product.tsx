import Summary from "@/components/Summary";
import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/sbClient";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type DBCategory = Database["public"]["Tables"]["category"]["Row"];
type DBProperty = {
  name: string | null;
  value: string | null;
};

const Product: FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const orderCategories = (categories: DBCategory[]): string[] => {
    const sorted: string[] = [];

    const addCategory = (c: DBCategory) => {
      if (sorted.includes(c.name as string)) return;

      if (c.parent_id) {
        const parent = categories.find((p) => p.id === c.parent_id);

        if (parent) {
          addCategory(parent);
        }
      }

      sorted.push(c.name as string);
    };

    categories.forEach((c) => addCategory(c));
    return sorted;
  };

  const mapProps = (properties: DBProperty[]) => {
    return properties.reduce((acc, current) => {
      if (current.name) {
        acc[current.name] = current.value;
      }
      return acc;
    }, {} as Record<string, any>);
  };

  const formatShape = (properties: DBProperty[]) => {
    const mappedProps = mapProps(properties);

    return {
      material: mappedProps.material ?? null,
      color_finish: mappedProps.color_finish ?? null,
      unit_of_measure: mappedProps.unit_of_measure ?? null,
      width: mappedProps.width ?? null,
      length: mappedProps.length ?? null,
      height: mappedProps.height ?? null,
      depth: mappedProps.depth ?? null,
      diameter: mappedProps.diameter ?? null,
      thickness: mappedProps.thickness ?? null,
      weight_unit: mappedProps.weight_unit ?? null,
      weight: mappedProps.weight ?? null,
    };
  };

  const formatProperties = (properties: DBProperty[], category: string) => {
    const mappedProps = mapProps(properties);
    const categoryName = category.toLowerCase().replace(/\s/g, "");

    if (categoryName === "inredning&möbler") {
      return {
        avg_height_min: mappedProps.avg_height_min ?? null,
        avg_height_max: mappedProps.avg_height_max ?? null,
        lumbal_support: mappedProps.lumbal_support ?? null,
      };
    } else if (categoryName === "dörrar") {
      return {
        glass_type: mappedProps.glass_type ?? null,
        glass_model: mappedProps.glass_model ?? null,
        glass_thickness: mappedProps.glass_thickness ?? null,
        hanging: mappedProps.hanging ?? null,
        module_size: mappedProps.module_size ?? null,
        sound_reduction: mappedProps.sound_reduction ?? null,
        fire_resistance_class: mappedProps.fire_resistance_class ?? null,
        burglary_resistance_class:
          mappedProps.burglary_resistance_class ?? null,
        environmental_profile: mappedProps.environmental_profile ?? null,
        frame_depth: mappedProps.frame_depth ?? null,
      };
    } else if (categoryName === "wc&badrum") {
      return {};
    } else {
      return {};
    }
  };

  const formatInformation = (properties: DBProperty[]) => {
    const mappedProps = mapProps(properties);

    return {
      manufactor: mappedProps.manufactor ?? null,
      articel_number: mappedProps.articel_number ?? null,
      manufactor_year: mappedProps.manufactor_year ?? null,
      bought_year: mappedProps.bought_year ?? null,
      gtin: mappedProps.gtin ?? null,
      rsk: mappedProps.rsk ?? null,
      bsab: mappedProps.bsab ?? null,
      enr: mappedProps.enr ?? null,
      bk04: mappedProps.bk04 ?? null,
    };
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
            *,
            product_property(name, value),
            product_individual(id, amount, prod_status, market_status, place1, place2, place3, place4, disassembly, accessibility, availability, delivery, decision_designation_1, decision_designation_2, decision_designation_3, decision_designation_4),
            product_category!inner(category:category_id(*)),
            projects(*),
            product_market_place!inner(
            price_new,
            buyer_price,
            extern_price,
            intern_price,
            pick_up_on_site,
            send_with_freight,
            address,
            postal_code,
            locality,
            comment,
            profile:contact_person(id, first_name, last_name))
          `
        )
        .eq("id", id)
        .limit(1)
        .single();

      if (!data || error) {
        setIsLoading(false);
        return;
      }

      const categories = data.product_category.map(
        (c) => c.category
      ) as unknown as DBCategory[];
      const orderedCategories = orderCategories(categories);

      let formatedData = {
        project_id: data.projects?.id,
        project: data.projects?.name,
        product_id: data.id,
        name: data.name,
        product_category_1: orderedCategories[0],
        product_category_2: orderedCategories[1],
        product_category_3: orderedCategories[2],
        visual_condition: data.visual_condition,
        working_condition: data.working_condition,
        images: data.images ?? [],
        product_files: data.files ?? [],
        ownId: data.product_id,
        induvidual: data.product_individual,
        shape: formatShape(data.product_property),
        properties: formatProperties(
          data.product_property,
          orderedCategories[0]
        ),
        information: formatInformation(data.product_property),
        marketPlace: data.product_market_place,
      };

      console.log(JSON.stringify(formatedData, null, 2));
      setIsLoading(false);
    };

    fetchProduct();
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="max-w-[1440px] mx-auto">
      <Summary />
    </div>
  );
};

export default Product;

import Summary from "@/components/Summary";
import { FormData, useFormContext } from "@/context/formContext";
import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/sbClient";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type DBCategory = Database["public"]["Tables"]["category"]["Row"];
type DBProperty = {
  name: string | null;
  value: string | null;
};

type Profile = {
  id: string;
};

type DBMarketPlace = {
  price_new: number | null;
  buyer_price: boolean | null;
  extern_price: number | null;
  intern_price: number | null;
  pick_up_on_site: boolean | null;
  send_with_freight: boolean | null;
  address: string | null;
  postal_code: string | null;
  locality: string | null;
  comment: string | null;
  profile: Profile;
};

type OrderedCategory = {
  id: string;
  name: string;
};

const Product: FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<FormData | null>(null);
  const { setFormData, formData } = useFormContext();

  const orderCategories = (categories: DBCategory[]): OrderedCategory[] => {
    const sorted: OrderedCategory[] = [];

    const addCategory = (c: DBCategory) => {
      if (sorted.some((item) => item.id === (c.id as string))) return;

      if (c.parent_id) {
        const parent = categories.find((p) => p.id === c.parent_id);

        if (parent) {
          addCategory(parent);
        }
      }

      sorted.push({ id: c.id, name: c.name ?? "" });
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
    }, {} as Record<string, string | null>);
  };

  const formatShape = (properties: DBProperty[]) => {
    const mappedProps = mapProps(properties);

    return {
      material: mappedProps.material ?? "",
      color_finish: mappedProps.color_finish ?? "",
      unit_of_measure: mappedProps.unit_of_measure ?? "",
      width: mappedProps.width ? Number(mappedProps.width) : 0,
      length: mappedProps.length ? Number(mappedProps.length) : 0,
      height: mappedProps.height ? Number(mappedProps.height) : 0,
      depth: mappedProps.depth ? Number(mappedProps.depth) : 0,
      diameter: mappedProps.diameter ? Number(mappedProps.diameter) : 0,
      thickness: mappedProps.thickness ? Number(mappedProps.thickness) : 0,
      weight_unit: mappedProps.weight_unit ?? "",
      weight: mappedProps.weight ? Number(mappedProps.weight) : 0,
    };
  };

  const formatProperties = (properties: DBProperty[], category: string) => {
    const mappedProps = mapProps(properties);
    const categoryName = category.toLowerCase().replace(/\s/g, "");

    if (categoryName === "inredning&möbler") {
      return {
        avg_height_min: mappedProps.avg_height_min
          ? Number(mappedProps.avg_height_min)
          : 0,
        avg_height_max: mappedProps.avg_height_max
          ? Number(mappedProps.avg_height_max)
          : 0,
        lumbal_support: mappedProps.lumbal_support
          ? Number(mappedProps.lumbal_support)
          : 0,
      };
    } else if (categoryName === "dörrar") {
      return {
        glass_type: mappedProps.glass_type ?? "",
        glass_model: mappedProps.glass_model ?? "",
        glass_thickness:
          mappedProps.glass_thickness ?? ""
            ? Number(mappedProps.glass_thickness)
            : 0,
        hanging: mappedProps.hanging ?? "",
        module_size: mappedProps.module_size ?? "",
        sound_reduction: mappedProps.sound_reduction
          ? Number(mappedProps.sound_reduction)
          : 0,
        fire_resistance_class: mappedProps.fire_resistance_class
          ? Number(mappedProps.fire_resistance_class)
          : 0,
        burglary_resistance_class: mappedProps.burglary_resistance_class
          ? Number(mappedProps.burglary_resistance_class)
          : 0,
        environmental_profile: mappedProps.environmental_profile ?? "",
        frame_depth: mappedProps.frame_depth
          ? Number(mappedProps.frame_depth)
          : 0,
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
      manufactor: mappedProps.manufactor ?? "",
      articel_number: mappedProps.articel_number ?? "",
      manufactor_year: mappedProps.manufactor_year ?? "",
      bought_year: mappedProps.bought_year ?? "",
      gtin: mappedProps.gtin ?? "",
      rsk: mappedProps.rsk ?? "",
      bsab: mappedProps.bsab ?? "",
      enr: mappedProps.enr ?? "",
      bk04: mappedProps.bk04 ?? "",
    };
  };

  const formatMarketPlace = (marketPlace: DBMarketPlace) => {
    return {
      price_new: marketPlace.price_new ? Number(marketPlace.price_new) : 0,
      buyer_price: marketPlace.buyer_price ?? false,
      extern_price: marketPlace.extern_price
        ? Number(marketPlace.extern_price)
        : 0,
      intern_price: marketPlace.intern_price
        ? Number(marketPlace.intern_price)
        : 0,
      pick_up_on_site: marketPlace.pick_up_on_site ?? false,
      send_with_freight: marketPlace.send_with_freight ?? false,
      address: marketPlace.address ?? "",
      postal_code: marketPlace.postal_code ?? "",
      locality: marketPlace.locality ?? "",
      comment: marketPlace.comment ?? "",
      contact_person: marketPlace.profile.id ?? "",
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
            profile:contact_person(id))
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

      const marketPlaceData = Array.isArray(data.product_market_place)
        ? data.product_market_place[0]
        : data.product_market_place;

      const formatedData: FormData = {
        ...formData,
        project_id: data.projects?.id ?? "",
        project: data.projects?.name ?? "",
        product_id: data.id,
        name: data.name ?? "",
        product_category_1: orderedCategories[0].id,
        product_category_2: orderedCategories[1].id,
        product_category_3: orderedCategories[2].id,
        visual_condition: data.visual_condition ?? "",
        working_condition: data.working_condition ?? "",
        image_urls: data.images ?? [],
        product_file_urls: data.files ?? [],
        ownId: data.product_id ?? "",
        individual: data.product_individual as FormData["individual"],
        ...formatShape(data.product_property),
        ...formatProperties(data.product_property, orderedCategories[0].name),
        ...formatInformation(data.product_property),
        ...formatMarketPlace(marketPlaceData),
      };

      setFormData(formatedData);
      setInitialData(formatedData);
      setIsLoading(false);
    };

    fetchProduct();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="max-w-[1440px] mx-auto">
      <Summary initialData={initialData} />
    </div>
  );
};

export default Product;

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string
          id: string
          name: string | null
          parent_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          parent_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      product_category: {
        Row: {
          category_id: string | null
          created_at: string
          id: number
          product_id: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          id?: number
          product_id: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          id?: number
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_category_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_individual: {
        Row: {
          accessibility: string | null
          amount: number
          availability: string | null
          created_at: string
          decision_designation_1: string | null
          decision_designation_2: string | null
          decision_designation_3: string | null
          decision_designation_4: string | null
          delivery: string | null
          disassembly: string | null
          id: number
          market_status: string | null
          place1: string | null
          place2: string | null
          place3: string | null
          place4: string | null
          prod_id: string
          prod_status: string | null
        }
        Insert: {
          accessibility?: string | null
          amount?: number
          availability?: string | null
          created_at?: string
          decision_designation_1?: string | null
          decision_designation_2?: string | null
          decision_designation_3?: string | null
          decision_designation_4?: string | null
          delivery?: string | null
          disassembly?: string | null
          id?: number
          market_status?: string | null
          place1?: string | null
          place2?: string | null
          place3?: string | null
          place4?: string | null
          prod_id: string
          prod_status?: string | null
        }
        Update: {
          accessibility?: string | null
          amount?: number
          availability?: string | null
          created_at?: string
          decision_designation_1?: string | null
          decision_designation_2?: string | null
          decision_designation_3?: string | null
          decision_designation_4?: string | null
          delivery?: string | null
          disassembly?: string | null
          id?: number
          market_status?: string | null
          place1?: string | null
          place2?: string | null
          place3?: string | null
          place4?: string | null
          prod_id?: string
          prod_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_individual_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_market_place: {
        Row: {
          address: string | null
          buyer_price: boolean | null
          comment: string | null
          contact_person: string | null
          created_at: string
          extern_price: number | null
          intern_price: number | null
          locality: string | null
          pick_up_on_site: boolean | null
          postal_code: string | null
          price_new: number | null
          prod_id: string
          send_with_freight: boolean | null
        }
        Insert: {
          address?: string | null
          buyer_price?: boolean | null
          comment?: string | null
          contact_person?: string | null
          created_at?: string
          extern_price?: number | null
          intern_price?: number | null
          locality?: string | null
          pick_up_on_site?: boolean | null
          postal_code?: string | null
          price_new?: number | null
          prod_id: string
          send_with_freight?: boolean | null
        }
        Update: {
          address?: string | null
          buyer_price?: boolean | null
          comment?: string | null
          contact_person?: string | null
          created_at?: string
          extern_price?: number | null
          intern_price?: number | null
          locality?: string | null
          pick_up_on_site?: boolean | null
          postal_code?: string | null
          price_new?: number | null
          prod_id?: string
          send_with_freight?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "product_market_place_contact_person_fkey"
            columns: ["contact_person"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_market_place_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_property: {
        Row: {
          created_at: string
          id: number
          name: string | null
          prod_id: string
          value: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          prod_id: string
          value?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          prod_id?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_property_prod_id_fkey"
            columns: ["prod_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          files: string[] | null
          id: string
          images: string[] | null
          name: string | null
          product_id: string | null
          project_id: string
          visual_condition: string | null
          working_condition: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          files?: string[] | null
          id?: string
          images?: string[] | null
          name?: string | null
          product_id?: string | null
          project_id: string
          visual_condition?: string | null
          working_condition?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          files?: string[] | null
          id?: string
          images?: string[] | null
          name?: string | null
          product_id?: string | null
          project_id?: string
          visual_condition?: string | null
          working_condition?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          country: string[] | null
          created_at: string
          currency: string | null
          id: string
          image: string | null
          name: string | null
          project_number: string | null
          region: string[] | null
          user_id: string | null
        }
        Insert: {
          country?: string[] | null
          created_at?: string
          currency?: string | null
          id?: string
          image?: string | null
          name?: string | null
          project_number?: string | null
          region?: string[] | null
          user_id?: string | null
        }
        Update: {
          country?: string[] | null
          created_at?: string
          currency?: string | null
          id?: string
          image?: string | null
          name?: string | null
          project_number?: string | null
          region?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never


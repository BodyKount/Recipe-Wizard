export interface foodFactsInterface {
    product_name: string;
    brands?: string;
    ingredients_text?: string;
    image_url?: string;
    nutriments?: {
      energy_kcal?: number;
    };
  }
  
export interface Product {
  id: string;
  description: string;
  images: string[];
  stock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: Type;
  gender: Category;
  user: any;
  productCategory: ProductCategory
}

export type Category = 'men'|'women'|'kid'|'unisex';
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';
 
export interface ProductCategory
{
  id: string;
  name: string;
}
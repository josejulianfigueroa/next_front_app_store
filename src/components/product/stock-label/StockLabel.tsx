"use client";

import { getStockBySlug } from "@/actions/product/get-stock-by-slug";
import { titleFont } from "@/config/fonts";
import { Product } from "@/interfaces/product.interface";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const getStock = async () => {
     const product: Product | null = await getStockBySlug(slug);
      if ( !product ) {
         notFound();
       }
       
    setStock(product.stock);
    setIsLoading(false);
  };
  
    getStock();
  }, [slug]);



  return (
    <>
      {isLoading ? (
        <h1
          className={` ${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse `}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={` ${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
};

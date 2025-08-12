"use server";

import { sleep } from "@/utils/sleep";

export const getStockBySlug = async ( slug: string ) => {

  try {
    //  await sleep(3);
    return await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/products/${slug}`,{
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
    
  } catch (error) {
     throw new Error("No se pudo cargar el producto por slug");
  }

}
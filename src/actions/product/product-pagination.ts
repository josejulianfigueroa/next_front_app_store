"use server";

import { notFound } from 'next/navigation';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: string;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 10,
  gender = '',
}: PaginationOptions) => {

  try {
    return await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/products?page=${page}&take=${take}&gender=${gender}`,{
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
    
  } catch (error) {
     throw new Error("No se pudo cargar los productos");
  }

}

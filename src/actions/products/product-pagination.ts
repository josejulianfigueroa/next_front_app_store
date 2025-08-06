"use server";

import { notFound } from 'next/navigation';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: string;
}

export const getProducts = async ({
  page = 1,
  take = 10,
  gender = '',
}: PaginationOptions) => {

  try {
    return await fetch(`http://localhost:3001/api/products?page=${page}&take=${take}&gender=${gender}`,{
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
    
  } catch (error) {
     throw new Error("No se pudo cargar los productos");
  }

}

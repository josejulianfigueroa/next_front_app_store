"use server";

export const getProductBySlug = async ( slug: string ) => {

  try {
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

export const getProductBySlugImages = async ( slug: string ) => {

  try {
    return await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/products/images/${slug}`,{
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
    
  } catch (error) {
     throw new Error("No se pudo cargar el producto por slug");
  }

}
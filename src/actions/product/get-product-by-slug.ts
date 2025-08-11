"use server";

export const getProductBySlug = async ( slug: string ) => {

  try {
    return await fetch(`http://localhost:3001/api/products/${slug}`,{
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
    return await fetch(`http://localhost:3001/api/products/images/${slug}`,{
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
    
  } catch (error) {
     throw new Error("No se pudo cargar el producto por slug");
  }

}
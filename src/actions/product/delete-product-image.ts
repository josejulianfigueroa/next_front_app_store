'use server';

import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config( process.env.CLOUDINARY_URL ?? '' );


export const deleteProductImage = async( imageId: number, imageUrl: string, slug:string ) => {

  if ( !imageUrl.startsWith('http') ) {
    return {
      ok: false,
      error: 'No se pueden borrar imagenes de FS'
    }
  }

  const imageName = imageUrl
    .split('/')
    .pop()
    ?.split('.')[0] ?? '';

  try {

    await cloudinary.uploader.destroy( imageName );

      const method= 'DELETE';
        await fetch(`http://localhost:3001/api/products/images/delete/${imageId}`,{
        method,
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );


    // Revalidar los paths
    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/product/${ slug }`);
    revalidatePath(`/product/${ slug }`);

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo eliminar la imagen'
    }
  }




}

'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {v2 as cloudinary} from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL ?? '' );

import { auth } from "@/auth.config";
import { Product } from '@/interfaces/product.interface';


const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform( val => Number(val.toFixed(2)) ),
  stock: z.coerce
    .number()
    .min(0)
    .transform( val => Number(val.toFixed(0)) ),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform( val => val.split(',') ),
  tags: z.string(),
  gender: z.string(), 
});







export const createUpdateProduct = async( formData: FormData ) => {

  const data = Object.fromEntries( formData );
  const productParsed = productSchema.safeParse( data );


  if ( !productParsed.success) {
    console.log( productParsed.error );
    return { ok: false }
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, '-' ).trim();

  const method = 'POST';
  const { id, ...rest } = product;
  const tagsArray = rest.tags.split(',').map( tag => tag.trim().toLowerCase() );
  let productSave: Product;


  const session = await auth();
 
   if (!session?.user.token) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
      }
 const token = session?.user.token;


  try { 
    
if(id){

  const { id, categoryId, tags, ...restProduct } = product;

productSave = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/products/${id}`,{
        method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`         },
            body: JSON.stringify( {
                ...restProduct,
                idProductCategory: categoryId,
                tags: tagsArray
            } ),
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
    console.log("productSave0", productSave);
} else {

  const { id, categoryId, tags, ...restProduct } = product;

productSave = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/products`,{
        method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`         },
            body: JSON.stringify( {
                ...restProduct,
                idProductCategory: categoryId,
                tags: tagsArray
            } ),
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
       console.log("productSave2", productSave);
}

      
      // Proceso de carga y guardado de imagenes
      // Recorrer las imagenes y guardarlas
      if ( formData.getAll('images') ) {
        // [https://url.jpg, https://url.jpg]
        const images = await uploadImages(formData.getAll('images') as File[]);
           console.log("images", images);
        if ( !images ) {
          throw new Error('No se pudo cargar las imágenes, rollingback');
        }

        await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/products/images/update/${productSave.id}`,{
        method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`         },
            body: JSON.stringify( {
                images: images,
            } ),
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
console.log("epaaa");

      }
  

    // Todo: RevalidatePaths
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${ product.slug }`);
    revalidatePath(`/products/${ product.slug }`);
 console.log("saliendo");
     return {
      ok: true,
      product: productSave,
    }

    
  } catch (error) {
     console.log("error");
    return {
      ok: false,
      message: 'Revisar los logs, no se pudo actualizar/crear'
    }
  }

}



const uploadImages = async( images: File[] ) => {

  try {

    const uploadPromises = images.map( async( image) => {

      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
  
        return cloudinary.uploader.upload(`data:image/png;base64,${ base64Image }`)
          .then( r => r.secure_url );
        
      } catch (error) {
        console.log(error);
        return null;
      }
    })


    const uploadedImages = await Promise.all( uploadPromises );
    return uploadedImages;


  } catch (error) {

    console.log(error);
    return null;
    
  }


}

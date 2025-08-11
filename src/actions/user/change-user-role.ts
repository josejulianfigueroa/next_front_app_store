'use server';

import { auth } from '@/auth.config';
import { revalidatePath } from 'next/cache';


export const changeUserRole = async( userId: string, role: string ) => {

  const session = await auth();

  if ( session?.user.role !== 'admin' ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado como admin'
    }
  }

  try {

    const newRole = role === 'admin' ? 'admin':'user';

/* UPDATE USER
   const method = 'GET';
    const users = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/auth/get/all`, {
        method,
            headers: {
                'Content-type': 'application/json',        },
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );*/

    revalidatePath('/admin/users');

    return {
      ok: true
    }
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo actualizar el role, revisar logs'
    }
  }



}
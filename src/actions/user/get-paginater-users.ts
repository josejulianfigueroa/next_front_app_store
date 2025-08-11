'use server';

import { auth } from '@/auth.config';


export const getPaginatedUsers = async() => {

  const session = await auth();

  if ( session?.user.role !== 'admin' ) {
    return {
      ok: false,
      message: 'Debe de ser un usuario administrador'
    }
  }
  
  const method = 'GET';
    const users = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/auth/get/all`, {
        method,
            headers: {
                'Content-type': 'application/json',        },
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );

  return {
    ok: true,
    users: users
  }


}
'use server';

import { auth } from '@/auth.config';


export const getPaginatedOrders = async() => {

  const session = await auth();

  if ( session?.user.role !== 'admin'  ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  const method = 'GET';
    const orders = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/orders/get/all`, {
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
    orders: orders,
  }


}
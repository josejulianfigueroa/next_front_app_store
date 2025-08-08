'use server';

import { auth } from '@/auth.config';


export const getOrdersByUser = async() => {

  const session = await auth();

  if ( !session?.user ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }
const token = session?.user.token || '';

  try {
    const method = 'GET';
    const orders = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/orders/user/order`, {
        method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`         },
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );

  

    return {
      ok: true,
      orders: orders,
    }


  } catch (error) {

    console.log(error);

    return {
      ok: false,
      message: 'Orden no existe'
    }


  }




}
'use server';

import { auth } from '@/auth.config';


export const getOrderById = async( id: string ) => {

  const session = await auth();

  if ( !session?.user ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }


  try {
    
    const order = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/orders/${ id }`, {
      method: 'GET',
          next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );

    
    if( !order ) throw `${ id } no existe`;

    if ( session.user.role === 'user' ) {
      if ( session.user.id !== order.userId ) {
        throw `${ id } no es de ese usuario`
      }
    }



    return {
      ok: true,
      order: order,
    }


  } catch (error) {

    console.log(error);

    return {
      ok: false,
      message: 'Orden no existe'
    }


  }




}
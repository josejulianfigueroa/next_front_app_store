'use server';

export const setTransactionId = async( orderId: string, transactionId: string ) => {

  try {
 const method = 'POST';

    const order = await fetch(`http://localhost:3001/api/orders/update/order/${orderId}`,{
        method,
            headers: {
                'Content-type': 'application/json',      },
            body: JSON.stringify( { transactionId: transactionId } ),
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
    
    if ( !order ) {
      return {
        ok:false,
        message: `No se encontró una orden con el ${ orderId }`,
      }
    }

    return { ok: true }


  } catch (error) {
    
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo actualizar el id de la transacción'
    }

  }


}
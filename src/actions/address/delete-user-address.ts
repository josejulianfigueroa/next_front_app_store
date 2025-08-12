'use server';


export const deleteUserAddress = async( token: string ) => {

  try {

     const method = 'DELETE';

    await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/orders/address/delete`,{
        method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`         },
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );

    return { ok: true };
    
  } catch (error) {
    console.log(error);
  
    return {
      ok: false,
      message: 'No se pudo eliminar la direccion'
    }


}
}
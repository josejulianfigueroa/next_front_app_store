'use server';


export const getUserAddress = async( token: string ) => {
  try {
    
    const method = 'GET';
    
   const address = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/orders/address/get`,{
        method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`         },
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );

    if ( !address ) return null;

    const {  country, user, id, address2, ...rest } = address;

    return {
      ...rest,
      country: country.id,
      address2: address2 ? address2 : '',
    };


  } catch (error) {
    console.log(error);
    return null;
  }
}





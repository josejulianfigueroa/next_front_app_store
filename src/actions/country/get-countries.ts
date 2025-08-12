"use server";

export const getCountries = async () => {

  try {
    //  await sleep(3);
    return await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/orders/countries/get`,{
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
    
  } catch (error) {
     return [];
  }

}
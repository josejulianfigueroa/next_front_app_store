"use server";

export const getCountries = async () => {

  try {
    //  await sleep(3);
    return await fetch(`http://localhost:3001/api/orders/countries`,{
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
    
  } catch (error) {
     return [];
  }

}
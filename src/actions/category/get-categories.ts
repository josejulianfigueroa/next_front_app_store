'use server';

export const getCategories =  async()=> {

  try {

    const method = 'GET';
    return await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/products/categories/get/all`, {
        method,
            headers: {
                'Content-type': 'application/json',        },
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );


  } catch (error) {
    console.log(error);
    return [];
  }


}
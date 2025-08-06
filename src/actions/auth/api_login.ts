"use server";

export const getApiLogin = async ( email: string, password: string ) => {

  try {
    const method = 'POST';
    const data = { email, password };

    return await fetch(`http://localhost:3001/api/auth/login`,{
        method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data ),
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
    
  } catch (error) {
     return null;
  }

}
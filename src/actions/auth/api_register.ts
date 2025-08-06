"use server";

export const getApiRegister = async ( name: string, email: string, password: string ) => {

  try {
    const method = 'POST';
    const data = { email, password, fullName : name };

    return await fetch(`http://localhost:3001/api/auth/register`,{
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
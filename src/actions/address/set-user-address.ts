"use server";

import type { Address } from "@/interfaces";

export const setUserAddress = async (address: Address, token: string) => {
  try {

    const newAddress = await createOrReplaceAddress( address, token );

    return {
      ok: true,
      address: newAddress,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo grabar la dirección",
    };
  }

};

const createOrReplaceAddress = async (address: Address, token: string) => {

   const method = 'POST';

      try {
    return await fetch(`http://localhost:3001/api/orders/address/user`,{
        method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`         },
            body: JSON.stringify( address ),
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
    
  } catch (error) {
     return null;
  }
}
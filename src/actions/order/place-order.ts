"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
 
   if (!session?.user.token) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
      }

 const token = session?.user.token;

try {
const method = 'POST';

return await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/orders/create/order`,{
        method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`         },
            body: JSON.stringify( {
              products: productIds,
              address: address,
            } ),
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );


  } catch (error: any) {
    return {
      ok: false,
      message:  "Error al crear la orden",
    };
  }
};

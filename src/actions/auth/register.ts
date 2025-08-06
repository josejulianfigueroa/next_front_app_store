'use server';

import { getApiRegister } from "./api_register";

export const registerUser = async( name: string, email: string, password: string ) => {


  try {

    const user = await getApiRegister( name, email, password );

    if (user.error) {
       return {
      ok: false,
      message: 'No se pudo crear el usuario'
       }
    }
    return {
      ok: true,
      user: user,
      message: 'Usuario creado'
    }

  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo crear el usuario'
    }
  }

  

}
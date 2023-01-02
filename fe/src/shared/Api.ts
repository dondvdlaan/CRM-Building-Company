import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios, { AxiosResponse, Method } from "axios";

// *** Constants and variables ***
const BASE_URL = 'http://127.0.0.1:8080/';
// local utility type
type SetState<T> = Dispatch<SetStateAction<T>>;



export function useDBApi<T>(method:Method, path: string, jwt: string ): [T | undefined, SetState<T | undefined>] {
  
  console.log("useDBApi jwt: ", jwt)

  // Constants
  const [rows, setRows] = useState<T>();

  useEffect(() => {

    // JWT token is a condition to continue, wait till JWT arrived
    if(!jwt) return;

    dbApi(method, path, jwt, setRows); 

  },[path, jwt]);

  return [rows, setRows];
}

export function dbApi<T>  
(method: Method, 
  path:string,
  jwt: string, 
  callback:(data: any) => void = () => {},
  data = {}
  ){

  // *** Constants and variables ***
  const config = {
    method,
    url: `${BASE_URL}${path}`,
    headers: {Authorization: `Bearer ${jwt}`},
    data}

    console.log("dbApi config: ",config)

  axios(config)
  .then((response: AxiosResponse<any>) =>{
    console.log("dbApi response :", response.data )
    return callback(response.data)
  })
  .catch(error => {
    // handle error
    alert(error.response.status);
  })

}
export const simplifiedDBApi =  
(method: Method, path:string, jwt: string, data = {}):any =>{

   // *** Constants and variables ***

  const config = {
    method,
    url: `${BASE_URL}${path}`,
    headers: {Authorization: `Bearer ${jwt}`},
    data}

    console.log("APIconfig: ",config)

  return axios(config)
}

export const getTokenApi =  
( method: Method, 
  path: string, 
  userpassword: string,
  data = {}):any =>{


  // Constants
  
  const config = {
    method,
    url: `${BASE_URL}${path}`,
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Basic ${userpassword}`,
    },
    // data: {"username":"dvdlaan","password":"password"}
    data
  }
  
    console.log("APIconfig: ", config)

  return axios(config)
}

type A = (null | string);

export function useStorageApi(userToken: string): any{

  const [auth, setAuth] = useState<A>(null);

  useEffect(()=>{

    let token = localStorage.getItem(userToken);

    console.log("useStorageApi token: ", token)
    
    if (token) setAuth(token);
    
  },[userToken]);

  return auth;
}


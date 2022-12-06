import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios, { AxiosResponse, Method } from "axios";

// Constants
const BASE_URL = 'http://127.0.0.1:8080/';
// local utility type
type SetState<T> = Dispatch<SetStateAction<T>>;


export function useDBApi<T>(method:Method, path: string ): [T | undefined, SetState<T | undefined>] {
  
  // Constants
  const [rows, setRows] = useState<T>();

  useEffect(() => {

    dbApi(method, path, setRows); 

  },[path]);

  return [rows, setRows];
}

export function dbApi<T>  
(method: Method, 
  path:string, 
  callback:(data: any) => void = () => {},
  data = {}
  ){

  // Constants
  const config = {
    method,
    url: `${BASE_URL}${path}`,
    data}

    console.log("config: ",config)

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
(method: Method, path:string, data = {}):any =>{

  // Constants
  const config = {
    method,
    url: `${BASE_URL}${path}`,
    data}

    console.log("APIconfig: ",config)

  return axios(config)
}

type A = (null | string);

export function useStorageApi(userData: string){

  const [auth, setAuth] = useState<A>(null);

  useEffect(()=>{

    let token = localStorage.getItem(userData);

    if (token) setAuth(token);
    
  },[userData]);

  return auth;
}


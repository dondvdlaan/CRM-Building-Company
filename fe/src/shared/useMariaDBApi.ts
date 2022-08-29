import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";

// Constants
const BASE_URL = 'http://localhost:8080/';

function mariaDBApi(method:string, path: string ) {
  // UseState declaration
  const [rows, setRows] = useState([]);

  useEffect(() => {

    axios({
      method,
      url: `${BASE_URL}${path}`})
    .then(response => setRows(response.data) )
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  },[]);

  return rows;
}

export default mariaDBApi;

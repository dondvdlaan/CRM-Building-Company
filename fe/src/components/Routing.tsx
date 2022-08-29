import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ListCustomers } from "./customer/ListCustomers";
import {  AddCustomer } from "./customer/AddCustomer";
import {  EditCustomer } from "./customer/EditCustomer";
import { ListProjects } from "./project/ListProjects";
import  {ListReferences}  from "./references/ListReferences";
import { Summary } from "./Summary";

export default function Routing(): ReactElement {
  return (
    <Routes>
      <Route path="/summary"            element={<Summary />} />
      <Route path="/allCustomers"       element={<ListCustomers />} />
      <Route path="/addCustomer"        element={<AddCustomer />} />
      <Route path="/editCustomer/:id"    element={<EditCustomer />} />
      <Route path="/allProjects"        element={<ListProjects />} />
      <Route path="/allReferences"      element={<ListReferences />} />

      <Route path="/" element={<Navigate to="/summary" />} />

    </Routes>
  );
}
import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ListCustomers } from "./customer/ListCustomers";
import {  AddCustomer } from "./customer/AddCustomer";
import {  EditCustomer } from "./customer/EditCustomer";
import { ListProjects } from "./project/ListProjects";
import  {ListReferences}  from "./references/ListReferences";
import { Summary } from "./summary/Summary";
import { ProjectDetails } from "./project/ProjectDetails";
import { AddProject } from "./project/AddProject";
import { EditProject } from "./project/EditProject";
import Test from "./testing/Dashboard";
import { CustomerDetails } from "./customer/details/CustomerDetails";
import Dashboard from "./testing/Dashboard";

export default function Routing(): ReactElement {
  return (
    <Routes>
      <Route path="/summary"              element={<Summary />} />
      <Route path="/allCustomers"         element={<ListCustomers />} />
      <Route path="/customerDetails/:custID"  element={<CustomerDetails />} />
      <Route path="/addCustomer"          element={<AddCustomer />} />
      <Route path="/editCustomer/:id"     element={<EditCustomer />} />

      <Route path="/allProjects"          element={<ListProjects />} />
      <Route path="/projectDetails/:id"   element={<ProjectDetails />} />
      <Route path="/addProject"           element={<AddProject />} />
      <Route path="/editProject/:id"      element={<EditProject />} />

      <Route path="/allReferences"        element={<ListReferences />} />
      
      <Route path="/dashboard"                 element={<Dashboard />} />

      <Route path="/" element={<Navigate to="/summary" />} />

    </Routes>
  );
}
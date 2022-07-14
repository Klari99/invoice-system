import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import CreateInvoice from "./pages/create-invoice.page";
import Invoice from "./pages/invoice.page";

const Router = (props) => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/invoice/:id" element={<Invoice/>}/>
          <Route path="/create" element={<CreateInvoice/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default Router;

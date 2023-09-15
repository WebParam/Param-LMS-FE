"use client"
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./auth/login/page";
import RootLayout from "./auth/layout";
import Register from "./auth/register/page";

export default function Page() {
  return (
    <BrowserRouter>
    <Routes>
      {/* Specify the route for the root path */}
      <Route path="/" element={<RootLayout> <Login /> </RootLayout>} />

      <Route path="auth/register" element={<Register/>} />
    </Routes>
  </BrowserRouter>
  );
}

"use client"
import React from "react";
import { Routes, Route, MemoryRouter,  } from "react-router-dom";
import Login from "./auth/login/page";
import RootLayout from "./auth/layout";
import { ReduxProvider } from "./provider";

export default function Page() {
  return (

      <MemoryRouter>
      <Routes>
        <Route path="/" element={
          <ReduxProvider>
        <RootLayout><Login /></RootLayout>
        </ReduxProvider>} />
      </Routes>
    </MemoryRouter>

  );
}

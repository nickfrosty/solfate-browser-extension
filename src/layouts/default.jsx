import React from "react";
import AppHeader from "../components/layout/AppHeader";
import SimpleFooter from "../components/layout/SimpleFooter";

export default function Layout({ seo, children }) {
  if (seo === undefined) seo = {};

  return (
    <>
      <AppHeader />

      <main className="min-h-110 min-w-96 md:max-w-full max-w-sm">
        {children}
      </main>

      <SimpleFooter />
    </>
  );
}

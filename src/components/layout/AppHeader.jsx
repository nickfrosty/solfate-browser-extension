import React from "react";
import SearchForm from "../SearchForm";
import AppLogo from "./AppLogo";

export default function AppHeader() {
  return (
    <nav
      id="AppNav"
      className="flex sticky top-0 z-10 justify-between items-center h-14"
    >
      <div className="flex justify-between items-center px-4 mx-auto space-x-4 w-full max-w-6xl">
        <a href="/profile.html">
          <AppLogo image={true} className="" />
        </a>

        <div className="md:flex flex-grow justify-between items-center place-content-center mx-auto">
          <SearchForm />
        </div>

        <div className="md:flex hidden flex-shrink-0 justify-between space-x-2">
          <a
            href="https://solfate.com/extension"
            target="_blank"
            rel="noreferrer"
            className="btn btn-blue"
          >
            Learn More
          </a>
        </div>
      </div>
    </nav>
  );
}

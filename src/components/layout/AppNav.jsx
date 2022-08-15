import React from "react";
// import NavLink from "./header/NavLink";

export default function AppNav({ className }) {
  return (
    <nav className={`${className || ""}`}>
      {/* <NavLink href="/ipfs.html">IPFS</NavLink> */}
      {/* <NavLink href="/profile.html">SNS</NavLink> */}
    </nav>
  );
}

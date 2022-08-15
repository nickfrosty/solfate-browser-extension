import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function SimpleFooter() {
  return (
    <section className="simple-footer space-y-2">
      <p className="space-x-4 text-center">
        <a href="/profile.html" className="link underline">
          Solana Profiles
        </a>

        <FontAwesomeIcon icon={faCircle} className="mb-1 w-1 h-1" />

        <a href="/ipfs.html" className="link underline">
          IPFS Explorer
        </a>
      </p>

      <p className="">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://solfate.com"
          target="_blank"
          rel="noreferrer"
          className="link underline"
        >
          Solfate
        </a>{" "}
        All rights reserved.
      </p>
    </section>
  );
}

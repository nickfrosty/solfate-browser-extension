import React, { useState, useEffect, FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { solParser } from "../utils/urlParser";

export default function SearchForm(props: {
  user?: any;
  className?: string | boolean | undefined;
}) {
  const location = useLocation();
  // const { user } = props;
  const [url, setURL] = useState("");

  // hook to auto select the url form field when the current url param is empty (like on an initial unsearch browse attempt)
  useEffect(() => {
    const elem = window.document.getElementById("form-url");
    if (elem) {
      if (!(solParser(location.pathname) || { name: false }).name) elem.focus();
    }
  }, [location]);

  // function to handle the search form submission, in both react and in the extension
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const path = window.location.pathname.toLowerCase();
    const parsed = solParser(url) || { name: url };
    let searchValue = parsed?.name || url;

    // handle IPFS searches
    if (url.startsWith("ipfs=")) {
      searchValue = parsed?.name?.slice("ipfs=".length);

      if (path !== "/ipfs.html")
        window.document.location = `/ipfs.html#/${searchValue}`;
    }
    // handle .sol searches
    else if (parsed?.name.endsWith(".sol")) {
      // todo: enable other SNS domains
      if (path !== "/profile.html")
        window.document.location = `/profile.html#/${searchValue}`;
    }

    window.location.assign(`#/${searchValue}`);

    setURL("");
  }

  return (
    <form
      method="GET"
      onSubmit={handleSubmit}
      action=""
      className="flex items-center mx-auto space-x-2 w-full max-w-lg"
    >
      <input
        type="text"
        id="form-url"
        className="input block flex-grow"
        placeholder="Enter a Solana domain or IPFS address"
        value={url}
        autoComplete="off"
        onChange={(e) => {
          setURL(e.target.value);
        }}
        required={true}
      />
      {/* <button
    type="submit"
    className={`mx-auto text-center btn btn-blue-default ${
      loading ? "loading" : ""}`}
  >
    Search
  </button> */}
    </form>
  );
}

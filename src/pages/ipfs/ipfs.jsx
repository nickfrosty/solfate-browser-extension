/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DefaultLayout from "../../layouts/default";
import { BrowserView } from "../../components/views/BrowserView";
import { LoadingView } from "../../components/views/LoadingView";

import * as IPFS from "ipfs-http-client";
import { solParser } from "../../utils/urlParser";

const IPFSPage = () => {
  const location = useLocation();
  const [url, setURL] = useState();
  const [cid, setCID] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // handle and parse the changes to the hash router url
  useEffect(() => {
    // console.log(location.pathname);
    const parsed = solParser(location.pathname);

    // console.log("url changed:", url);
    if (loading && !url && !cid) setLoading(false);

    // console.log(parsed);
    if (parsed?.name) {
      setCID(parsed.name);
      setLoading(true);
    }
  }, [location]);

  useEffect(() => {
    // reset to the default no error/loading state
    // setLoading(true);
    setError("");

    // create a place holder error message to update with
    let tmpError = "";

    const fn = async () => {
      if (!cid) return;

      try {
        console.log("[SOLFATE] ", "IPFS CID lookup:", cid);

        // console.warn("checker:", IPFS.CID.asCID(IPFS.CID.create(1, 1, cid)));

        const ipfs = IPFS.create("https://dweb.link");

        // load the data object of the CID (which includes the `Links` array)
        const ipfsData = await ipfs.object
          .get(cid)
          // .then((res) => {
          //   console.log("Response: ");
          //   console.log(res);
          // })
          .catch((err) => {
            console.warn(err);
            // console.warn(JSON.stringify(err));
            // tmpError = "IPFS loading error. Try again in a few minutes.";
            tmpError = err.message;
          });
        // console.warn("ipfsData");
        // console.log(ipfsData);

        // const ipfsLinks = await ipfs.object.links(cid);
        const ipfsLinks = ipfsData?.Links || [];

        // toggle the final loading state to not rapid flash the loading screen
        setTimeout(() => {
          // console.log("update the things");
          setLoading(false);
          setLinks(ipfsLinks);
          setError(tmpError);
        }, 400);
      } catch (err) {
        // console.warn("ipfs error: ");
        console.warn(err);

        // toggle the final loading state to not rapid flash the loading screen
        setTimeout(() => {
          setLoading(false);
          setLinks([]);
          setError("Unable to load IPFS");
        }, 400);
      }
    };

    fn().catch(console.warn);
  }, [cid]);

  return (
    <DefaultLayout>
      {!loading && !error && links.length > 0 ? (
        <BrowserView cid={cid} links={links} />
      ) : (
        <LoadingView loading={loading} error={error} />
      )}
    </DefaultLayout>
  );
};

export default IPFSPage;

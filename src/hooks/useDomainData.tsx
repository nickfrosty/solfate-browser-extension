/* eslint-disable react-hooks/exhaustive-deps */
import * as web3 from "@solana/web3.js";
import { useState, useEffect, useRef } from "react";
import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";
import { useConnection } from "@solana/wallet-adapter-react";

// define some simple types
type Result = DataResult | undefined;
type DataResult = {
  error?: string | undefined;
  name?: string;
  owner?: string;
  data?: string | undefined;
};

/**
 * This hook can be used to retrieve the record of a domain, including its 'data'
 * @param domain Domain to resolve (e.g "nickfrosty")
 * @returns {object} { owner: PublicKey as string, data: string}
 */
export const useDomainData = (domain: string) => {
  let { connection } = useConnection();
  if (!connection)
    connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));

  const [error, setError] = useState("");
  const [result, setResult] = useState<Result>(undefined);
  const mounted = useRef(true);

  useEffect(() => {
    const fn = async () => {
      if (!domain) return false;

      let domainKey =
        (await getDomainKey(domain as string).then((res) => {
          return res?.pubkey;
        })) || false;

      if (!domainKey) return;

      // load the SNS registry object containing all the info about the domain name
      const { registry } = await NameRegistryState.retrieve(
        connection,
        domainKey,
      );

      // update the state
      // if (mounted.current) {
      const obj = {
        name: domain,
        owner: registry?.owner?.toString() || "[error]",
        data: registry?.data?.toString("ascii").replace(/\0/g, ""),
      };

      // console.log("set domain data", obj);

      // set the stored state and clear the error
      setResult(obj);
      setError("");
      // }

      return () => (mounted.current = false);
    };

    fn().catch((err) => {
      // console.log("Domain data error:", "Solana name not found");
      // console.warn(err);
      setError("Solana name not found");
      mounted.current = false;
    });
  }, [domain]);

  return error ? { error } : result;
};

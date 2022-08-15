/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useRef } from "react";
import {
  getDomainKey,
  NameRegistryState,
  Record,
} from "@bonfida/spl-name-service";
import * as web3 from "@solana/web3.js";

import { useConnection } from "@solana/wallet-adapter-react";

export type Result = SNSRecord | undefined;

export type SNSRecord = {
  error?: string | null | undefined;
  data?: string | null | undefined;
  pic?: string | null | undefined;
  bio?: string | null | undefined;
  IPFS?: string | null | undefined;
  ARWV?: string | null | undefined;
  ETH?: string | null | undefined;
  BTC?: string | null | undefined;
  LTC?: string | null | undefined;
  DOGE?: string | null | undefined;
  email?: string | null | undefined;
  url?: string | null | undefined;
  twitter?: string | null | undefined;
  discord?: string | null | undefined;
  github?: string | null | undefined;
  reddit?: string | null | undefined;
  telegram?: string | null | undefined;
};

/**
 * This hook can be used to retrieve all the records of a domain
 * @param domains Domains to resolve records for e.g "bonfida"
 * @returns
 */
export const useDomainRecords = (domain: string) => {
  let { connection } = useConnection();
  if (!connection)
    connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));

  const [error, setError] = useState("");
  const [result, setResult] = useState<Result>(undefined);
  const mounted = useRef(true);

  useEffect(() => {
    if (!domain) return;

    const fn = async () => {
      // load and parse the SNS record keys (aka subdomains)
      let recordsKeys = Object.keys(Record).map(
        (e) => Record[e as keyof typeof Record],
      );

      // manually add the 'pic' subdomain record to include it in searches
      recordsKeys.push("pic" as any);

      // retrieve the key/addresses of the SNS subdomain records
      const keys = await Promise.all(
        recordsKeys.map((e) => getDomainKey(e + "." + domain)),
      );

      // batch call the SNS registry to load the subdomain data
      const registries = await NameRegistryState.retrieveBatch(
        connection,
        keys.map((e) => e.pubkey),
      ).catch((err) => {
        console.warn("SNS registry error");
        console.warn(err);
      });

      // remove trailling 0s from the records
      const records =
        registries?.map((e) => {
          if (e?.data) {
            const idx = e.data?.indexOf(0x00);
            e.data = e.data?.slice(0, idx);

            return e.data.toString();
          }
          // Record is not defined
          return undefined;
        }) || [];

      // convert the results to a keyed object
      const obj = recordsKeys.reduce(
        (obj, key, index) => ({ ...obj, [key]: records[index] }),
        {},
      );

      // update the stored state with the returned records
      if (mounted.current) {
        // console.log("set records", obj);
        setResult(obj as unknown as Result);
        setError("");
      }

      return () => (mounted.current = false);
    };

    fn().catch((err) => {
      setError("Unable to locate Solana domain");
      // console.log("Domain record error:", "Unable to locate solana domain");
      // console.warn(err);
      mounted.current = false;
    });
  }, [domain]);

  return error ? { error } : result;
};

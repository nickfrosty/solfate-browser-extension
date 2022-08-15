/* eslint-disable react-hooks/exhaustive-deps */
// import * as web3 from "@solana/web3.js";
import { useState, useEffect, useRef } from "react";

import { useDomainRecords } from "./useDomainRecords";
import { useDomainData } from "./useDomainData";

export type UserType = RecordType | undefined;

export type RecordType = {
  error?: string | undefined;
  name?: string | undefined;
  address?: string | undefined;
  bio?: string | undefined;
  data?: string | undefined;
  pic?: string | undefined;
  records?: object | undefined;
};

/**
 *
 * @param
 * @returns
 */
export const useProfile = (url: string) => {
  // const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>(undefined);
  const [error, setError] = useState("");
  const mounted = useRef(true);

  // load the needed hooks
  let domain = useDomainData(url);
  let domainRecords = useDomainRecords(url);

  //
  useEffect(() => {
    setError("");
  }, [url]);

  // construct the user data for each update of the domain data
  useEffect(() => {
    // on errors from the SNS hooks, store the error locally
    if (domain?.error || domainRecords?.error) {
      setError(domain?.error || domainRecords?.error || "[unknown error]");
    }

    // stop processing this hook if: no url was provided OR when an error was found
    if (!url || domain?.error || domainRecords?.error) return;

    // reset the current user state to enable the loading screen
    setUser(undefined);

    const fn = async () => {
      // construct the new user state based on the data returned from SNS
      const data = {
        name: domain?.name,
        address: domain?.owner || "",
        pic: domainRecords?.pic || undefined,
        bio: domainRecords?.bio || domain?.data || undefined,
        records: domainRecords,
      } as UserType;

      // update the state
      if (mounted.current) {
        // console.log("detected data change, new data:", data);

        setUser(data);
        setError("");
      }

      return () => (mounted.current = false);
    };

    fn().catch((err) => {
      setError("Unable to load profile data");
      // console.log("Profile data error:", "unable to locate profile data");
      // console.warn(err);
      mounted.current = false;
    });
  }, [domain, domainRecords]);

  // return the `error` or the `user` state, but not both
  return error ? { error: error } : user;
};

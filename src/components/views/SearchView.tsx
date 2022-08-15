/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import SearchForm from "../SearchForm";

// define some example profiles for clicking
const examples = [
  "nickfrosty.sol",
  "raj.sol",
  "aey.sol",
  "bonfida.sol",
  // "solfate.sol",
];

export const SearchView = (props: {
  user: any;
  url?: string;
  error?: string | boolean | undefined;
  loading?: boolean;
}) => {
  const { error, loading, url } = props;
  // const [loading, setLoading] = useState(true);

  const rotationStep = 8;
  const [deg, setDeg] = useState(0);

  const message = error || "Search for a Solana name";

  useEffect(() => {
    let isMounted = true;

    if ((loading !== undefined && !loading) || error) return;

    setTimeout(() => {
      if (isMounted)
        setDeg((prev) => {
          return (prev as any) + rotationStep;
        });
    }, 100);

    return () => {
      isMounted = false;
    };
  }, [deg, loading]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setDeg((prev) => {
          return (prev as any) + rotationStep;
        });
      }, 100);
    }
  }, []);

  return (
    <main className="container">
      <div className="space-y-8 text-center">
        <div className="space-y-3">
          <div className="avatar mx-auto">
            <img
              src="/icon.png"
              alt={"loading"}
              style={
                loading
                  ? {
                      transform: `rotate(${deg}deg)`,
                    }
                  : {}
              }
            />
          </div>
          <h1 className="md:text-5xl heading text-3xl tracking-wide">
            {loading ? <>loading</> : <>{message}</>}
          </h1>
          <p className="text-2xl tracking-wide">
            {error && url ? (
              <span className="mx-1 italic">
                "<span className="shadow-orange">{url}</span>"
              </span>
            ) : (
              <>
                Enter any
                <span className="shadow-orange mx-1 font-bold">.sol</span>
                address
              </>
            )}

            <section className="mt-8 space-y-2 text-base">
              <h3 className="font-semibold">View an example profile:</h3>
              <ul className="flex justify-center space-x-3">
                {examples.map((item: string) => {
                  return (
                    <li key={item}>
                      <a href={`/profile.html#/${item}`} className="link">
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          </p>
        </div>

        {/* <SearchForm /> */}
      </div>
    </main>
  );
};

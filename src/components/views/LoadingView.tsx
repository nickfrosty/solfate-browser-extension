/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";

// define some example profiles for clicking
const examples = [
  "QmR6fezFhQbxdPZx41quREbCVTEZEkju6aQT51dsU5FZvN",
  "bafybeigufd2qlnvkiphl6qkj7icsgahpmldvoiwrnqlryh62aaxqcvw5xq",
  "Qme2sLfe9ZMdiuWsEtajWMDzx6B7VbjzpSC2VWhtB6GoB1",
];

export const LoadingView = (props: { loading: boolean; error?: string }) => {
  const { loading, error } = props;
  const rotationStep = 8;

  const title = error ? "IPFS Error" : "Explore IPFS";
  const message = error || "Enter an IPFS file ID";

  const [deg, setDeg] = useState(0);
  // const [message, setMessage] = useState("");

  useEffect(() => {
    if (loading !== undefined && !loading) return;
    // if (error !== "") return;

    setTimeout(() => {
      // if (isMounted)
      setDeg((prev) => {
        return (prev as any) + rotationStep;
      });
    }, 100);
  }, [deg]);

  // useEffect(() => {
  //   if (loading !== undefined && !loading) return;
  //   setDeg(5);
  // }, []);

  return (
    <main className="container-inner container text-center">
      <section className="space-y-8 text-center">
        <div className="avatar mx-auto">
          <img
            src="/icon.png"
            alt={"loading"}
            style={{
              transform: `rotate(${deg}deg)`,
            }}
          />
        </div>

        <h1 className="md:text-5xl heading text-3xl tracking-wide">
          {loading ? <>loading</> : title}
        </h1>
        <p className="text-2xl tracking-wide">
          <span className="mx-1 italic">{message}</span>
        </p>
      </section>

      <section className="mt-8 space-y-2 text-base">
        <h3 className="font-semibold">Explore some files on IPFS:</h3>
        <ul className="space-x-3">
          {examples.map((item: string) => {
            return (
              <li key={item}>
                <a href={`/ipfs.html#/${item}`} className="link">
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

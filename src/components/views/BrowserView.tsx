/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

// import { useState, useEffect } from "react";

import SocialLinkItem from "../SocialLinkItem";

type IPFSLink = { Name: string; Hash: any };

export const BrowserView = (props: {
  links?: Array<IPFSLink>;
  cid?: string;
}) => {
  const { cid, links } = props;

  function createIpfsUrl(cid: string, link: IPFSLink) {
    if (link) cid = link.Hash.toV1().toString();
    return new URL(`https://${cid}.ipfs.dweb.link/`)?.href || "";
    // console.log(link);
    // console.log(`https://dweb.link/ipfs/${cid}/${link.Name}`);
    // return new URL(`https://dweb.link/ipfs/${cid}/${link.Name}`)?.href || "";
  }

  /*
    Simple util function to check if all the links are images
  */
  function checkIsAllImages(links: Array<IPFSLink>) {
    let isAllImages = true;

    links.map((link) => {
      let arr = link?.Name?.split(".");
      let isImage = false;

      switch (arr[arr.length - 1].toLowerCase()) {
        case "png" || "gif" || "svg" || "jpg" || "jpeg":
          isImage = true;
          break;
      }

      if (!isImage) isAllImages = false;

      return null;
    });

    return isAllImages;
  }

  const isAllImages = checkIsAllImages(links || []);

  if (cid !== undefined && links !== undefined && links?.length > 0) {
    // window.document.title = user?.name || "[name not found]";

    return (
      <main className="md:max-w-5xl container-inner container">
        <section className="flexer justify-between space-x-5">
          <div className="flexer flex-grow space-y-0">
            <img
              src="/icons/ipfs.svg"
              alt="IPFS browsing"
              className="inline-block w-32"
            />
            <h1 className="title block">Explorer</h1>
          </div>
          <div className="block w-min">
            <SocialLinkItem index="ipfs" value={cid} />
          </div>
        </section>

        <section
          className={isAllImages ? "grid grid-cols-3 gap-4" : "space-y-1"}
        >
          {links.map((link) => {
            const url = createIpfsUrl(cid, link);
            // console.log(url);

            if (!url || !link?.Name) return false;

            if (isAllImages)
              return (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="card"
                  key={link.Name}
                >
                  <img src={url} alt={link.Name || "[unknown file name]"} />
                </a>
              );
            else
              return (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  key={link.Name}
                >
                  {link.Name || "[unknown file name]"}
                </a>
              );
          })}
        </section>
      </main>
    );
  } else return <></>;
};

/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

// import { useState, useEffect } from "react";
import IconCollection from "../IconCollection";
import SocialLinks from "../SocialLinks";
import { UserType } from "../../hooks/useProfile";
// import Autolinker from "autolinker";

export const ProfileView = (props: {
  user?: UserType;
  url?: string | undefined;
}) => {
  const { user } = props;

  // user?.bio = Autolinker.link(bio as string, {
  //   stripPrefix: true,
  // });

  if (user !== undefined && user?.address) {
    // window.document.title = user?.name || "[name not found]";

    return (
      <main className="container container-inner">
        <section className="space-x-5 flexer">
          <div className="avatar">
            {user?.pic ? (
              <img
                src={user.pic}
                alt={`${user.name}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/icon.png";
                }}
              />
            ) : (
              <img src="/icon.png" alt={`${user?.name || "[error]"}`} />
            )}
          </div>

          <div className="block space-y-3 whitespace-pre-line break-all line-clamp-2">
            <h1 className="block title">{user?.name || "[unknown]"}</h1>
            <IconCollection user={user as object} className={false} />
          </div>
        </section>

        <p className="bio">{user?.bio || ""}</p>

        <SocialLinks address={user.address} records={user?.records as object} />
      </main>
    );
  } else return <></>;
};

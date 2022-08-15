import React from "react";
import SocialLinkItem from "./SocialLinkItem";

export default function SocialLinks(props: {
  className?: string | boolean;
  address: string;
  records: any;
}) {
  const { records, address } = props;

  // console.log(records);

  return (
    <section className="space-y-2">
      <SocialLinkItem index="address" value={address} />

      <SocialLinkItem index="email" value={records?.email} />
      <SocialLinkItem index="url" value={records?.url} />
      <SocialLinkItem index="ipfs" value={records?.ipfs} />
      <SocialLinkItem index="arwv" value={records?.arwv} />
      <SocialLinkItem index="twitter" value={records?.twitter} />
      <SocialLinkItem index="discord" value={records?.discord} />
      <SocialLinkItem index="github" value={records?.github} />
      <SocialLinkItem index="reddit" value={records?.reddit} />
      <SocialLinkItem index="telegram" value={records?.telegram} />
    </section>
  );
}

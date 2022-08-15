import React from "react";
import IconItem from "./IconItem";

export default function IconCollection(props: {
  user: any;
  className?: string | boolean | undefined;
}) {
  const { user } = props;

  return user?.address ? (
    <div className="flexer">
      <IconItem
        href={`https://solscan.io/account/${user?.address}`}
        src="/icons/solscan.png"
        title="Solscan.io"
        className
      />

      <IconItem
        href={`https://explorer.solana.com/account/${user?.address}`}
        src="/icons/solana.png"
        title="Solana Explorer"
        className
      />

      <IconItem
        href={`https://magiceden.io/u/${user?.address}`}
        src="/icons/magiceden.png"
        title="Magic Eden"
        className
      />
    </div>
  ) : (
    <></>
  );
}

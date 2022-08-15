import React from "react";

interface IProps {
  href: string;
  title: string | undefined;
  src: string;
  className: string | boolean | undefined;
}

export default function IconItem(props: IProps) {
  const { href, src, title } = props;

  return (
    <a href={href} target="_blank" rel="noreferrer">
      <img
        src={src}
        className="icon"
        title={title?.toString() || ""}
        alt={title?.toString() || ""}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/icon.png";
        }}
      />
    </a>
  );
}

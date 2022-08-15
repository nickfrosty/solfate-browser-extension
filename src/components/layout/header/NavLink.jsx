import React from "react";

// import Link from "next/link";

export default function NavLink({ icon, href, title, children }) {
  return (
    href && (
      // <Link href={href} passHref={true}>
      <a title={title || ""} className={`NavLink default inactive`}>
        <span className="">{children}</span>
      </a>
      // </Link>
    )
  );
}

import React from "react";

export default function AppLogo({ className, image, burger, burgerSide }) {
  //
  if (burgerSide === "left") burgerSide = "flex-row-reverse";
  else burgerSide = "";

  // process the props for displaying the image
  if (image) image = <img className="icon" src="/icon.png" alt="solfate" />;

  return (
    <div
      className={`flex flex-shrink-0 justify-between items-center space-x-3 ${
        className || ""
      } ${burgerSide || ""}`}
    >
      <div title="Home" className="flex justify-between items-center space-x-2">
        {image || null}
        <span
          v-if="text"
          className="md:text-2xl inline-block py-4 text-xl font-bold tracking-wide"
        >
          Solfate
        </span>
      </div>
    </div>
  );
}

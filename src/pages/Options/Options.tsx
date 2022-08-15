import React from "react";
import "./Options.css";

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  return (
    <div className="OptionsContainer">
      <h1>Options, options, options</h1>
      <h6 className="text-red-500">eventually...</h6>
    </div>
  );
};

export default Options;

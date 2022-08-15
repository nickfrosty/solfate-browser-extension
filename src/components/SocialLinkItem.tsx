import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faCopy,
  // faCheck
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGithub,
  faReddit,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { urlParser } from "../utils/urlParser";

function getUrl(index: string | boolean, value: string | boolean) {
  if (!index || !value) return "";

  switch (index) {
    case "twitter":
      return `https://twitter.com/${value}`; // TODO: parse twitter to handle @ signs
    case "url":
      return `${value}`; // TODO: parse urls to validate them
    case "github":
      return `https://github.com/${value}`;
    case "reddit":
      return `https://reddit.com/u/${value}`;
    default:
      return false;
  }
}

function getIcon(index: string | boolean) {
  if (!index) return false;

  switch (index) {
    case "copy" || "clipboard":
      return faCopy;
    case "twitter":
      return faTwitter;
    case "url":
      return faGlobe;
    case "github":
      return faGithub;
    case "reddit":
      return faReddit;
    case "discord":
      return faDiscord;
    default:
      return false;
  }
}

export default function SocialLinkItem(props: {
  className?: string | boolean;
  index: string;
  value: string | boolean;
}) {
  const { index, value } = props;
  const url = getUrl(index, value);
  const label = urlParser(value ? value.toString() : "");

  // store some simple state
  const [enabled, setEnabled] = useState(true);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let text = label && label.label ? label?.label : value;
    setDisplayText(text as string);
  }, [label, value]);

  // simple function to copy the `displayText` to the clipboard and show a UI change
  const copyToClipboard = () => {
    if (enabled) {
      navigator.clipboard.writeText(displayText as string);
      let tmp = displayText;
      setDisplayText("Copied to clipboard");
      setEnabled(false);
      setTimeout(() => {
        setDisplayText(tmp);
        setEnabled(true);
      }, 700);
    }
  };

  return index && value ? (
    url ? (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="truncate social-link"
      >
        <div className="w-full truncate flexer">
          {getIcon(index) ? (
            <FontAwesomeIcon icon={getIcon(index) as any} className="icon" />
          ) : (
            <span className="">&lt;{index}&gt;</span>
          )}
          <span className="truncate">{displayText}</span>
        </div>
        {/* <FontAwesomeIcon
          onClick={(e) => {
            copyToClipboard();
            e.preventDefault();
          }}
          icon={getIcon("copy") as any}
          className="flex-shrink-0 w-4 h-4 icon"
        /> */}
      </a>
    ) : (
      <button
        type="button"
        className="overflow-hidden w-full social-link"
        onClick={copyToClipboard}
      >
        <div className="w-full truncate flexer">
          {getIcon(index) ? (
            <FontAwesomeIcon icon={getIcon(index) as any} className="icon" />
          ) : (
            <></>
          )}
          <span className="truncate">{displayText}</span>
        </div>
        <FontAwesomeIcon
          icon={getIcon("copy") as any}
          className="flex-shrink-0 w-4 h-4 icon"
        />
      </button>
    )
  ) : (
    <></>
  );
}

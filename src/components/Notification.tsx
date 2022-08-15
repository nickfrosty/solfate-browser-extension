import React from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faCheckCircle,
  faInfoCircle,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

import useNotificationStore from "../stores/useNotificationStore";
import { useConnection } from "@solana/wallet-adapter-react";
// import { getExplorerUrl } from "../utils/explorer";

type NotificationType = {
  type: string;
  message: string | undefined;
  description: string | undefined;
  txid: string | undefined;
  onHide: Function;
  timeout?: number | undefined;
};

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s) => s,
  );

  const reversedNotifications = [...notifications].reverse();

  return (
    <div
      className={`flex fixed inset-0 z-20 items-end px-4 py-6 pointer-events-none sm:p-6`}
    >
      <div className={`flex flex-col w-full`}>
        {reversedNotifications.map((n, idx) => (
          <Notification
            key={`${n.message}${idx}`}
            type={n.type}
            message={n.message}
            description={n.description}
            txid={n.txid}
            onHide={() => {
              setNotificationStore((state: any) => {
                const reversedIndex = reversedNotifications.length - 1 - idx;
                state.notifications = [
                  ...notifications.slice(0, reversedIndex),
                  ...notifications.slice(reversedIndex + 1),
                ];
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Notification = (props: NotificationType) => {
  const { type, message, description, txid, onHide, timeout } = props;
  const { connection } = useConnection();

  // TODO: we dont have access to the network or endpoint here..
  // getExplorerUrl(connection., txid, 'tx')
  // Either a provider, context, and or wallet adapter related pro/contx need updated

  useEffect(() => {
    const id = setTimeout(() => {
      onHide();
    }, timeout || 5000);

    return () => {
      clearInterval(id);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onHide]);

  return (
    <div
      className={`overflow-hidden p-2 mx-4 mt-2 mb-12 w-full max-w-sm rounded-md ring-1 ring-black ring-opacity-5 shadow-lg pointer-events-auto bg-bkg-1`}
    >
      <div className={`p-4`}>
        <div className={`flex items-center`}>
          <div className={`flex-shrink-0`}>
            {type === "success" ? (
              // <CheckCircleIcon
              // 	className={`mr-1 w-8 h-8 text-green`}
              // />
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="mr-1 w-8 h-8 text-green"
              />
            ) : null}
            {type === "info" && (
              // <InformationCircleIcon
              // 	className={`mr-1 w-8 h-8 text-red`}
              // />
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="mr-1 w-8 h-8 text-red"
              />
            )}
            {type === "error" && (
              // <XCircleIcon className={`mr-1 w-8 h-8`} />
              <FontAwesomeIcon icon={faWarning} className="mr-1 w-8 h-8" />
            )}
          </div>
          <div className={`flex-1 ml-2 w-0`}>
            <div className={`font-bold text-fgd-1`}>{message}</div>
            {description ? (
              <p className={`mt-0.5 text-sm text-fgd-2`}>{description}</p>
            ) : null}
            {txid ? (
              <div className="flex flex-row">
                <a
                  href={
                    "https://explorer.solana.com/tx/" + txid + `?cluster=devnet`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-row link link-accent"
                >
                  <svg
                    className="flex-shrink-0 h-4 ml-2 mt-0.5 text-primary-light w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                  <div className="flex mx-4">
                    {txid.slice(0, 8)}...
                    {txid.slice(txid.length - 8)}
                  </div>
                </a>
              </div>
            ) : null}
          </div>
          <div className={`flex flex-shrink-0 self-start ml-4`}>
            <button
              onClick={() => onHide()}
              className={`inline-flex rounded-md bg-bkg-2 default-transition text-fgd-3 hover:text-fgd-4 focus:outline-none`}
            >
              <span className={`sr-only`}>Close</span>
              <FontAwesomeIcon icon={faClose} className="icon" />
              {/* <XIcon className="w-5 h-5" /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;

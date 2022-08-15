import { solParser } from "./urlParser";

/**
 * Accepts the url the user is requesting, and attempts to route it
 * to the correct page or handle the specific protocol (e.g. ipfs or arweave).
 *
 * @param {string} url the url being requested
 */
export async function routeRequest(url = null) {
  /*  Example Requests:
    https://name.sol
    https://name.sol
      load profile page for "name.sol"
    search engine query, e.g. "q=*.sol*""
      load profile if no route was noted
    https://name.sol/route or https://name.sol/[cid]
      load browse page (and attempt to determine the protocol)
    ipfs=[cid]
    https://ipfs=[cid]
    ipfs=[cid]/route
    arweave stuff
      ...
  */
  let sns = solParser(url);

  console.log("[SOLFATE] ", "routeRequest for", url);

  // attempt to extract a query search param and check it for supported request types
  try {
    let queryVal =
      new URL(url).searchParams.get("q") ||
      new URL(url).searchParams.get("query");

    if (queryVal) sns = solParser(queryVal);
  } catch (err) {
    console.log("[SOLFATE] ", "Unable to parse URL:", url);
  }

  console.log("[SOLFATE] ", "parsed url:", sns);

  /*
    Handle each of the supported protocols and display methods
    
    Current protocols:
      - none

    Current display methods:
      - Profile page: `/profile.html#/name.sol`
  */

  const PREFIX_IPFS = "ipfs=";
  const PREFIX_ARWV = "arwv=";

  if (sns?.name?.startsWith(PREFIX_IPFS)) {
    console.warn("[SOLFATE] ", "IPFS detected!");
    redirect(
      `/ipfs.html#/${sns?.name?.slice(PREFIX_IPFS.length)}${sns?.route}`,
    );
  } else if (sns?.name?.startsWith(PREFIX_ARWV)) {
    console.warn("[SOLFATE] ", "ARWV detected!");
    redirect(
      `/arwv.html#/${sns?.name?.slice(PREFIX_ARWV.length)}${sns?.route}`,
    );
  }
  // check for SNS routing/browsing
  else if (sns?.name?.endsWith(".sol")) {
    if (!sns?.route || sns?.route !== "/")
      redirect(`/browse.html#/${sns?.name}${sns?.route}`);
    // else
    redirect(`/profile.html#/${sns.name}`);
  }
  // else console.log("[SOLFATE] ", "");

  console.log("[SOLFATE] ", "complete");
}

/**
 * Redirect the user to an internal extension page
 * @param {string} route the url the user is attempting to navigate to
 */
export async function redirect(route = null) {
  const tab = await getCurrentTab();

  console.log("[SOLFATE] ", `redirecting to ${route}`);

  if (tab !== undefined && tab?.id && route) {
    chrome.tabs.update(tab.id, {
      url: route,
    });
    console.log("[SOLFATE] ", "Redirect complete!!!");
  } else console.log("[SOLFATE] ", "Unable to locate current tab");
}

/**
 * Retreive the tab the user is navigating from
 *
 * @returns {chrome.tabs.Tab} current active tab
 */
export async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab;
}

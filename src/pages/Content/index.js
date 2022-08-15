/**
 * Content script:
 * Loaded on the client side and injected into every page request
 * that matches the URL patterns in the `manifest.json` file
 *
 * NOTE: This tactic is a workaround for a bug in the `WebRequest` API that does
 * not trigger the service worker (aka the `background` script) after it has been unloaded.
 * **/

// console.log("Content script loaded!");

/**
 *  Handle each of the web requests on the frontend, via this content script
 */
async function requestForwarder() {
  try {
    const url = window.location.href;
    // console.log("[SOLFATE] ", "requestForwarder ::");

    // extract the .sol url from the search engine queries (including the auto search via browser url input)
    const solanaUrl = new URL(url).searchParams.get("q");
    // console.log("content script url from query:", solanaUrl);

    // send the redirect request to the "background" service worker script
    // console.log("send redirect request to background script:", solanaUrl);
    chrome.runtime.sendMessage({ url, solanaUrl });

    return { cancel: true };
  } catch (err) {
    console.warn("[SOLFATE]  Request forwarder error:", err);
  }
}

/**
 * Main function used to trigger the async `requestForwarder` function
 */
function main() {
  requestForwarder();
}
main();

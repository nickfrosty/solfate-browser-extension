# Solfate Browser Extension

Browse .sol domains and IPFS websites like web2 and explore the decentralized Solana web.

## Features

- navigate to any .sol domain like it is web3
- IPFS explorer to browse IPFS content

## Example content

After installing the Solfate browser extension, try to browse to the following urls:

- [https://solfate.sol](https://solfate.sol)
- [https://nickfrosty.sol](https://nickfrosty.sol)
- [https://bonfida.sol](https://bonfida.sol)

## Manually Install Extension (Load Unpacked)

To manually install the extension into your browser, you will need to load the "unpacked" extension into your browser:

1. Extract the zip archive of the recent version inside the "builds" directory on to your computer
   - Or you can build the extension from source with the steps listed below
2. Open your browser extensions manager via `Settings` -> `Extension`
3. Enable `developer mode`
4. Locate and click the `Load Unpacked` extension
5. In the file browser, navigate to and select the extracted folder of the zip archive (or the `build` directory if built from source)
6. Enjoy :)

## Build From Source

> **NOTE:** This extension requires NodeJS to be installed. And it is recommended to use YARN as the package manager to install dependencies. NPM should work, but incorrect package versions may be inadvertently installed.

1. Download the extension repo from here. With `git clone`:

```sh
git clone https://github.com/solfate/extension.git
```

2. Install the NPM packages via YARN:

```sh
yarn install
```

3. Build from source

Running either build command listed below will build the "unpacked" version of
the browser extension into the `build` directory.

To build the `production` ready extension:

```sh
yarn build
```

To build the `development` ready extension:

```sh
yarn dev
```

## Notes and Assorted Thoughts

### SOL TLDs are not standard, yet

Since .sol domains are not recognized as true TLDs (yet, a man can dream...), most browsers will try to auto search for text entered in the browser's URL bar. Navigating the user to their default search engine. To counteract this, the extension is setup to listen for these "redirects" to common search engines and grab them mid-flight. Sending them to this browser extension and displayed the Solfate generated profile page (by default).

The search engines that are currently supported are:

- Google (with most if not all the official TLDs captured)
- Duckduckgo (duckduckgo.com)
- Brave search (search.brave.com)
- Bing (gross. do people use this??)

### Chromium bug and foreground scripts

There is a bug in the Chromium API that enables the extension to check the URLs when navigating around. Specifically, and to get more technical, the Chromium service work that powers the browser plugin will auto sleep when idled for too long. Once the service worker goes to sleep (and there for stops doing the magic of this extension) there is no default way to wake it back up.

To counteract this, and rather unfortunately, the extension will check every single URL in a post-flight sort of way with the "content script". This script will determine if the intended URL, or auto searched parameter, was intended to be routed to this extension. The content script that runs in the foreground on every page can send a signal to the wake up that background service worker which can in turn do its magic. Handling all the decentralized web stuff.

I agree that this is less than ideal. But it is the only way I could find to wake the service worker and build this extension. Better, more privacy focus solutions are VERY welcome!

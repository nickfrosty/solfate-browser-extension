export const WEBSITE_MAX_LEN = 32;

export const urlParser = (url: string) => {
  if (!url) return false;
  // console.log("url parser here");

  let regex = new RegExp(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
  );

  let tmp = regex.exec(url);

  // when the url is unable to be parsed, then return no website
  if (!Array.isArray(tmp)) return false;

  // console.log(tmp[1]); // https://domain.tld/page
  // console.log(tmp[2]); // https://domain.tld
  // console.log(tmp[3]); // https://
  // console.log(tmp[4]); // /page

  // force the url to have https
  if (tmp[3].toLowerCase() === "http://") {
    url = `https://${url.substring("https://".length - 1)}`;
    tmp = regex.exec(url);
    if (!Array.isArray(tmp)) return false;
  }

  // init the label to be just the 'domain.tld'
  let label = tmp[2].substring(tmp[3].length);

  // allow up to X page route deep
  if (tmp[4] != undefined && tmp[4] != null) {
    let pages = new RegExp(/(\/[\w]+)(\/[\w]+)/).exec(tmp[4]);

    // only try to extract the page routes when the regex was valid
    if (Array.isArray(pages) && pages.length > 2) {
      label = label.concat(pages[1] || "");
      // label = label.concat(pages[2] || '');
      // TODO: add the extra page length only when the link will NOT be chunked for length
    }
  }

  // cap the entire label at WEBSITE_MAX_LEN characters
  label =
    label.length > WEBSITE_MAX_LEN
      ? label.substring(0, WEBSITE_MAX_LEN) + "..."
      : label;

  return { url, label };
};

export const solParser = (url: string, addSolTLD?: boolean) => {
  if (!url) return false;
  // console.log("sol parser here");

  let regex = new RegExp(
    /((((http|https|sol)?:(?:\/\/)?)?(?:[\-;:&=\+\$,\w]+)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+)[A-Za-z0-9\.\-]+)(\.[A-Za-z]*)?((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
  );

  let tmp = regex.exec(url);

  // console.log(tmp);

  // when the url is unable to be parsed, then return no website
  if (!Array.isArray(tmp)) return false;

  // console.log("proto/domain:", tmp[2]); // https://
  // console.log("proto:", tmp[3]); // https://
  // console.log("tld:", tmp[5]); //
  // console.log("route:", tmp[6]); // /page

  let route = tmp[6] || "";

  let name = tmp[2]?.substring(tmp[3]?.length) || "";
  // .toLowerCase();

  if (
    addSolTLD !== undefined &&
    addSolTLD &&
    name.substring(name.length - 4) !== ".sol"
  )
    name = `${name}.sol`;

  // convert all SNS names to lower case (SNS names may only be created with lowercase)
  // name = name.toLowerCase();

  // init the label to be just the 'domain.tld'
  let label = createUrlLabel(tmp[2]?.substring(tmp[3]?.length));

  return { name, route, url, label };
};

/**
 *
 */
function createUrlLabel(
  label: string,
  max_len: number | boolean = WEBSITE_MAX_LEN,
) {
  // // allow up to X page route deep
  // if (tmp[4] != undefined && tmp[4] != null) {
  //   let pages = new RegExp(/(\/[\w]+)(\/[\w]+)/).exec(tmp[4]);

  //   // only try to extract the page routes when the regex was valid
  //   if (Array.isArray(pages) && pages.length > 1) {
  //     label = label.concat(pages[1] || "");
  //     // label = label.concat(pages[2] || '');
  //     // TODO: add the extra page length only when the link will NOT be chunked for length
  //   }
  // }

  // cap the entire label at `max_len` characters
  if (max_len !== false) {
    label =
      label.length > max_len
        ? label.substring(0, max_len as number) + "..."
        : label;
  }

  return label;
}

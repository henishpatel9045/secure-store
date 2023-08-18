const TABLE_PAGE_SIZE = 10;
const UPLOAD_PATH_PREFIX = ".";
const SHARE_LINK_PREFIX = "/share/doc/";
const GITHUB_URL = "https://github.com/henishpatel9045";
const WHATSAPP_URL =
  "https://wa.me/917990577979?text=Hi%20there.%20Found%20about%20you%20from%20SecureStore.";
const LINKEDIN_URL = "https://www.linkedin.com/in/henish-patel-71428b202";
const DATE_ISO_ADJUST = () => {
  // let local = new Date().getTimezoneOffset();
  // let indiaTime = new Date("2023-08-18T12:00:00+00:00").getTimezoneOffset();
  // const tz = (local - indiaTime) * 60 * 1000;
  // console.log(tz);
  // return tz;
  return 0
};

export {
  TABLE_PAGE_SIZE,
  SHARE_LINK_PREFIX,
  UPLOAD_PATH_PREFIX,
  GITHUB_URL,
  WHATSAPP_URL,
  LINKEDIN_URL,
  DATE_ISO_ADJUST,
};

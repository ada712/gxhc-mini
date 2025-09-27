// export const imgUrls =
//   "https://7072-prod-cloud-env-9gqq29j68db5f470-1326719267.tcb.qcloud.la/miniprogram/images";
// export const imgUrls2 = "/cloud/miniprogram/images";
// export const directorUrl = "https://7072-prod-cloud-env-9gqq29j68db5f470-1326719267.tcb.qcloud.la/miniprogram/";

export const imgUrls = "https://mini.acture-hub.com/statics/miniprogram/images";
export const imgUrls2 = "/cloud/miniprogram/images";
export const miniprogramUrl = "https://mini.acture-hub.com/statics/miniprogram/";


// 小程序 / APP请求配置
// #ifdef MP || APP-PLUS
// 请求域名 格式： https://您的域名
export const HTTP_REQUEST_URL = `https://mini.acture-hub.com`;
// #endif

// H5请求配置
// #ifdef H5
// H5接口是浏览器地址，非单独部署不用修改
// HTTP_REQUEST_URL: window.location.protocol + "//" + window.location.host
export const HTTP_REQUEST_URL = "https://mini.acture-hub.com";
// #endif

// 后台版本号
export const SYSTEM_VERSION = 563;

// 以下配置在不做二开的前提下,不需要做任何的修改
export const HEADER = {
  "content-type": "application/json",
  //#ifdef H5
  "Form-type":
    navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1
      ? "wechat"
      : "h5",
  //#endif
  //#ifdef MP
  "Form-type": "routine",
  //#endif
  //#ifdef APP-VUE
  "Form-type": "app",
  //#endif
};
// 回话密钥名称 请勿修改此配置
export const TOKENNAME = "Authori-zation";
// 缓存时间 0 永久
export const EXPIRE = 0;
//分页最多显示条数
export const LIMIT = 10;
// 请求超时限制 默认10秒
export const TIMEOUT = 10000;

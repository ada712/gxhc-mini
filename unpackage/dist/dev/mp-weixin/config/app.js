"use strict";
const env = "test";
const imgUrls = `https://${env}.acture-hub.com/statics/miniprogram/images`;
const miniprogramUrl = `https://${env}.acture-hub.com/statics/miniprogram/`;
const HTTP_REQUEST_URL = `https://${env}.acture-hub.com`;
const HEADER = {
  "content-type": "application/json",
  "Form-type": "routine"
};
const TOKENNAME = "Authori-zation";
const EXPIRE = 0;
const TIMEOUT = 1e4;
exports.EXPIRE = EXPIRE;
exports.HEADER = HEADER;
exports.HTTP_REQUEST_URL = HTTP_REQUEST_URL;
exports.TIMEOUT = TIMEOUT;
exports.TOKENNAME = TOKENNAME;
exports.imgUrls = imgUrls;
exports.miniprogramUrl = miniprogramUrl;

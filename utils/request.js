import { HTTP_REQUEST_URL, HEADER, TOKENNAME, TIMEOUT } from "@/config/app";
import { toLogin } from "@/libs/login";
import store from "../store";

/**
 * 发送请求
 */
function baseRequest(url, method, data, { noAuth = false, noVerify = false }) {
  let Url = HTTP_REQUEST_URL,
    header = HEADER;

  if (!noAuth) {
    //登录过期自动登录
    // && !checkLogin()
    if (!store.state.app.token) {
      // ========== 测试阶段：暂时不跳转登录页面 ==========
      console.warn("测试模式：检测到未登录，但不跳转登录页面");
      uni.showToast({
        title: "未登录（测试模式）",
        icon: "none",
        duration: 2000,
      });
      // toLogin(); // 测试阶段注释掉
      // ========== 测试代码结束 ==========
      return Promise.reject({
        msg: `未登录`,
      });
      
    }
  }
  if (store.state.app.token)
    header[TOKENNAME] = "Bearer " + store.state.app.token;

  return new Promise((reslove, reject) => {
    if (uni.getStorageSync("locale")) {
      header["Cb-lang"] = uni.getStorageSync("locale");
    }
    let newUrl = Url + "/api/" + url;
    uni.request({
      url: newUrl,
      method: method || "GET",
      header: header,
      data: data || {},
      timeout: TIMEOUT,
      success: (res) => {
        if (noVerify) reslove(res.data, res);
        else if (res.data.status == 200) reslove(res.data, res);
        else if ([110002, 110003, 110004].indexOf(res.data.status) !== -1) {
          // ========== 测试阶段：暂时不跳转登录页面 ==========
          console.warn("测试模式：检测到登录过期，但不跳转登录页面", res.data);
          uni.showToast({
            title: res.data.msg || "请登录（测试模式）",
            icon: "none",
            duration: 2000,
          });
          // toLogin(); // 测试阶段注释掉
          // ========== 测试代码结束 ==========
          reject(res.data);
        } else if (res.data.status == 100103) {
          uni.showModal({
            title: `提示`,
            content: res.data.msg,
            showCancel: false,
            confirmText: `我知道了`,
          });
        } else reject(res.data.msg || `系统错误`);
      },
      fail: (msg) => {
        let data = {
          mag: `请求失败`,
          status: 1, //1没网
        };
        // #ifdef APP-PLUS
        reject(data);
        // #endif
        // #ifndef APP-PLUS
        reject(`请求失败`);
        // #endif
      },
    });
  });
}

const request = {};

["options", "get", "post", "put", "head", "delete", "trace", "connect"].forEach(
  (method) => {
    request[method] = (api, data, opt) =>
      baseRequest(api, method, data, opt || {});
  }
);

export default request;

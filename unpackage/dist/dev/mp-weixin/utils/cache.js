"use strict";
const common_vendor = require("../common/vendor.js");
const config_app = require("../config/app.js");
class Cache {
  constructor(handler) {
    this.cacheSetHandler = common_vendor.index.setStorageSync;
    this.cacheGetHandler = common_vendor.index.getStorageSync;
    this.cacheClearHandler = common_vendor.index.removeStorageSync;
    this.cacheExpire = "UNI-APP-CRMEB:TAG";
    this.clearOverdue();
  }
  /**
   * 获取当前时间戳
   */
  time() {
    return Math.round(/* @__PURE__ */ new Date() / 1e3);
  }
  /**
   * 字符串转时间戳
   * @param {Object} expiresTime
   */
  strTotime(expiresTime) {
    let expires_time = expiresTime.substring(0, 19);
    expires_time = expires_time.replace(/-/g, "/");
    return Math.round(new Date(expires_time).getTime() / 1e3);
  }
  /**
   * 设置过期时间缓存
   * @param {Object} key
   * @param {Object} expire
   */
  setExpireCaheTag(key, expire) {
    expire = expire !== void 0 ? expire : config_app.EXPIRE;
    if (typeof expire === "number") {
      let tag = this.cacheGetHandler(this.cacheExpire), newTag = [], newKeys = [];
      if (typeof tag === "object" && tag.length) {
        newTag = tag.map((item) => {
          newKeys.push(item.key);
          if (item.key === key) {
            item.expire = expire === 0 ? 0 : this.time() + expire;
          }
          return item;
        });
      }
      if (!newKeys.length || newKeys.indexOf(key) === -1) {
        newTag.push({
          key,
          expire: expire === 0 ? 0 : this.time() + expire
        });
      }
      this.cacheSetHandler(this.cacheExpire, newTag);
    }
  }
  /**
   * 缓存是否过期,过期自动删除
   * @param {Object} key
   * @param {Object} $bool true = 删除,false = 不删除
   */
  getExpireCahe(key, $bool) {
    try {
      let tag = this.cacheGetHandler(this.cacheExpire), time = 0, index = false;
      if (typeof tag === "object" && tag.length) {
        tag.map((item, i) => {
          if (item.key === key) {
            time = item.expire;
            index = i;
          }
        });
        if (time) {
          let newTime = parseInt(time);
          if (time && time < this.time() && !Number.isNaN(newTime)) {
            if ($bool === void 0 || $bool === true) {
              this.cacheClearHandler(key);
              if (index !== false) {
                tag.splice(index, 1);
                this.cacheSetHandler(this.cacheExpire, tag);
              }
            }
            return false;
          } else
            return true;
        } else {
          return !!this.cacheGetHandler(key);
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  /**
   * 设置缓存
   * @param {Object} key
   * @param {Object} data
   */
  set(key, data, expire) {
    if (data === void 0) {
      return true;
    }
    if (typeof data === "object")
      data = JSON.stringify(data);
    try {
      this.setExpireCaheTag(key, expire);
      return this.cacheSetHandler(key, data);
    } catch (e) {
      return false;
    }
  }
  /**
   * 检测缓存是否存在
   * @param {Object} key
   */
  has(checkwhethethecacheexists, isDel) {
    this.clearOverdue();
    return this.getExpireCahe(checkwhethethecacheexists, isDel);
  }
  /**
   * 获取缓存
   * @param {Object} key
   * @param {Object} $default
   * @param {Object} expire
   */
  get(key, $default, expire) {
    this.clearOverdue();
    try {
      let isBe = this.getExpireCahe(key);
      let data = this.cacheGetHandler(key);
      if (data && isBe) {
        if (typeof $default === "boolean")
          return JSON.parse(data);
        else
          return data;
      } else {
        if (typeof $default === "function") {
          let value = $default();
          this.set(key, value, expire);
          return value;
        } else {
          this.set(key, $default, expire);
          return $default;
        }
      }
    } catch (e) {
      return null;
    }
  }
  /**
   * 删除缓存
   * @param {Object} key
   */
  clear(key) {
    try {
      let cahceValue = this.cacheGetHandler(this.cacheExpire), index = false;
      if (cahceValue && typeof cahceValue === "object" && cahceValue.length) {
        cahceValue.map((item, i) => {
          if (item.key === key) {
            index = i;
          }
        });
        if (index !== false) {
          cahceValue.splice(index, 1);
        }
        this.cacheSetHandler(this.cacheExpire, cahceValue);
      }
      return this.cacheClearHandler(key);
    } catch (e) {
      return false;
    }
  }
  /**
   * 清除过期缓存
   */
  clearOverdue() {
    let cahceValue = this.cacheGetHandler(this.cacheExpire), time = this.time(), newBeOverdueValue = [], newTagValue = [];
    if (cahceValue && typeof cahceValue === "object" && cahceValue.length) {
      cahceValue.map((item) => {
        if (item) {
          if (item.expire !== void 0 && item.expire > time || item.expire === 0) {
            newTagValue.push(item);
          } else {
            newBeOverdueValue.push(item.key);
          }
        }
      });
    }
    if (newTagValue.length !== cahceValue.length) {
      this.cacheSetHandler(this.cacheExpire, newTagValue);
    }
    newBeOverdueValue.forEach((k) => {
      this.cacheClearHandler(k);
    });
  }
}
const clearProjectStorage = () => {
  common_vendor.index.removeStorageSync("teamList");
  common_vendor.index.removeStorageSync("tempTeamParamData");
  common_vendor.index.removeStorageSync("workExpList");
  common_vendor.index.removeStorageSync("enterprises");
  common_vendor.index.removeStorageSync("colleges");
};
const Cache$1 = new Cache();
exports.Cache = Cache$1;
exports.clearProjectStorage = clearProjectStorage;

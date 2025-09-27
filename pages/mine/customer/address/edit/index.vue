<template>
  <view class="wripper">
    <form @submit="formSubmit" style="width: 100%;">
      <view class="tips" v-if="id">
        您已经填写收件地址信息，如需更改请直接修改即可
      </view>
      <view class="content">
        <view class="row">
          <view class="label">收件人姓名</view>
          <input
            type="text"
            placeholder="请输入收件人姓名"
            class="same-input"
            maxlength="20"
            name="real_name"
            placeholder-style="color: rgba(47,48,49,0.3);"
            v-model="userAddress.real_name"
          />
        </view>
        <view class="row">
          <view class="label">收件人手机号</view>
          <input
            type="number"
            placeholder="请输入收件人手机号"
            class="same-input"
            maxlength="11"
            name="phone"
            placeholder-style="color: rgba(47,48,49,0.3);"
            v-model="userAddress.phone"
          />
        </view>
        <view class="row">
          <view class="label">所在地区</view>
          <view class="address">
            <picker
              mode="multiSelector"
              @change="bindRegionChange"
              @columnchange="bindMultiPickerColumnChange"
              :value="valueRegion"
              :range="multiArray"
            >
              <view class="acea-row">
                <view class="picker"
                  >{{ region[0] }}，{{ region[1] }}，{{ region[2] }}</view
                >
                <view class="iconfont icon-dizhi fontcolor"></view>
              </view>
            </picker>
          </view>
        </view>
        <view class="col">
          <view class="label">收件地址信息</view>
          <textarea
            v-model="userAddress.detail"
            class="address"
            name="detail"
            placeholder="请输入收件地址信息"
            placeholder-style="color: rgba(47,48,49,0.3);"
            maxlength="200"
          />
        </view>
      </view>
      <button class="save-btn" form-type="submit">保存地址</button>
    </form>
  </view>
</template>

<script>
import { editAddress, getAddressDetail } from "@/api/user.js";
import { getCity } from "@/api/api.js";
import { toLogin } from "@/libs/login.js";
import { mapGetters } from "vuex";

export default {
  components: {
  },
  data() {
    return {
      regionDval: [`浙江省`, `杭州市`, `滨江区`],
      cartId: "", //购物车id
      pinkId: 0, //拼团id
      couponId: 0, //优惠券id
      id: 0, //地址id
      userAddress: {
        is_default: false,
      }, //地址详情
      region: [`省`, `市`, `区`],
      valueRegion: [0, 0, 0],
      isAuto: false, //没有授权的不会自动授权
      isShowAuth: false, //是否隐藏授权
      district: [],
      multiArray: [],
      multiIndex: [0, 0, 0],
      cityId: 0,
      defaultRegion: [`广东省`, `广州市`, `番禺区`],
      defaultRegionCode: "110101",
      news: "",
      noCoupon: 0,
    };
  },
  computed: mapGetters(["isLogin"]),
  watch: {
    isLogin: {
      handler: function (newV, oldV) {
        if (newV) {
          this.getUserAddress();
        }
      },
      deep: true,
    },
  },
  onLoad(options) {
    if (this.isLogin) {
      this.cartId = options.cartId || "";
      this.pinkId = options.pinkId || 0;
      this.couponId = options.couponId || 0;
      this.id = options.id || 0;
      this.noCoupon = options.noCoupon || 0;
      this.news = options.new || "";
      uni.setNavigationBarTitle({
        title: options.id ? `修改地址` : `添加地址`,
      });
      this.getUserAddress();
      this.getCityList();
    } else {
      toLogin();
    }
  },
  methods: {
    // #ifdef APP-PLUS
    // 获取选择的地区
    handleGetRegion(region) {
      this.region = region;
    },
    // #endif
    // 回去地址数据
    getCityList: function () {
      let that = this;
      getCity().then((res) => {
        this.district = res.data;
        that.initialize();
      });
    },
    initialize() {
      let that = this,
        province = [],
        city = [],
        area = [];
      let cityChildren = that.district[0].c || [];
      let areaChildren = cityChildren.length ? cityChildren[0].c || [] : [];
      that.district.forEach((item, i) => {
        province.push(item.n);
        if (item.n === this.region[0]) {
          this.valueRegion[0] = i;
          this.multiIndex[0] = i;
        }
      });
      that.district[this.valueRegion[0]].c.forEach((item, i) => {
        if (this.region[1] == item.c) {
          this.valueRegion[1] = i;
          this.multiIndex[1] = i;
        }
        city.push(item.n);
      });
      that.district[this.valueRegion[0]].c[this.valueRegion[1]].c.forEach(
        (item, i) => {
          if (this.region[2] == item.c) {
            this.valueRegion[2] = i;
            this.multiIndex[2] = i;
          }
          area.push(item.n);
        }
      );
      this.multiArray = [province, city, area];
    },
    bindRegionChange: function (e) {
      let multiIndex = this.multiIndex,
        province = this.district[multiIndex[0]] || {
          c: [],
        },
        city = province.c[multiIndex[1]] || {
          v: 0,
        },
        multiArray = this.multiArray,
        value = e.detail.value;

      this.region = [
        multiArray[0][value[0]],
        multiArray[1][value[1]],
        multiArray[2][value[2]],
      ];
      // this.$set(this.region,0,multiArray[0][value[0]]);
      // this.$set(this.region,1,multiArray[1][value[1]]);
      // this.$set(this.region,2,multiArray[2][value[2]]);
      this.cityId = city.v;
      this.valueRegion = [0, 0, 0];
      this.initialize();
    },
    bindMultiPickerColumnChange: function (e) {
      let that = this,
        column = e.detail.column,
        value = e.detail.value,
        currentCity = this.district[value] || {
          c: [],
        },
        multiArray = that.multiArray,
        multiIndex = that.multiIndex;
      multiIndex[column] = value;
      switch (column) {
        case 0:
          let areaList = currentCity.c[0] || {
            c: [],
          };
          multiArray[1] = currentCity.c.map((item) => {
            return item.n;
          });
          multiArray[2] = areaList.c.map((item) => {
            return item.n;
          });
          break;
        case 1:
          let cityList = that.district[multiIndex[0]].c[multiIndex[1]].c || [];
          multiArray[2] = cityList.map((item) => {
            return item.n;
          });
          break;
        case 2:
          break;
      }
      // #ifdef MP || APP-PLUS
      this.$set(this.multiArray, 0, multiArray[0]);
      this.$set(this.multiArray, 1, multiArray[1]);
      this.$set(this.multiArray, 2, multiArray[2]);
      // #endif
      // #ifdef H5
      this.multiArray = multiArray;
      // #endif

      this.multiIndex = multiIndex;
      // this.setData({ multiArray: multiArray, multiIndex: multiIndex});
    },
    // 授权回调
    onLoadFun: function () {
      this.getUserAddress();
    },
    // 授权关闭
    authColse: function (e) {
      this.isShowAuth = e;
    },
    toggleTab(str) {
      this.$refs[str].show();
    },
    // bindRegionChange: function(e) {
    // 	this.$set(this, 'region', e.detail.value);
    // },
    onConfirm(val) {
      this.region =
        val.checkArr[0] + "-" + val.checkArr[1] + "-" + val.checkArr[2];
    },
    getUserAddress: function () {
      if (!this.id) return false;
      let that = this;
      getAddressDetail(this.id).then((res) => {
        // let region = [res.data.province, res.data.city, res.data.district];
        let region = [res.data.province, res.data.city, res.data.district];
        that.$set(that, "userAddress", res.data);
        that.$set(that, "region", region);
        that.cityId = res.data.city_id;
      });
    },
    // 导入共享地址（小程序）
    getWxAddress: function () {
      let that = this;
      uni.authorize({
        scope: "scope.address",
        success: function (res) {
          uni.chooseAddress({
            success: function (res) {
              let addressP = {};
              addressP.province = res.provinceName;
              addressP.city = res.cityName;
              addressP.district = res.countyName;
              editAddress({
                address: addressP,
                is_default: 1,
                real_name: res.userName,
                post_code: res.postalCode,
                phone: res.telNumber,
                detail: res.detailInfo,
                id: 0,
                type: 1,
              })
                .then((res) => {
                  setTimeout(function () {
                    if (that.cartId) {
                      let cartId = that.cartId;
                      let pinkId = that.pinkId;
                      let couponId = that.couponId;
                      that.cartId = "";
                      that.pinkId = "";
                      that.couponId = "";
                      uni.navigateTo({
                        url:
                          "/pages/goods/order_confirm/index?cartId=" +
                          cartId +
                          "&addressId=" +
                          (that.id ? that.id : res.data.id) +
                          "&pinkId=" +
                          pinkId +
                          "&couponId=" +
                          couponId +
                          "&new=" +
                          that.news +
                          "&noCoupon=" +
                          that.noCoupon,
                      });
                    } else {
                      uni.navigateBack({
                        delta: 1,
                      });
                    }
                  }, 1000);
                  return that.$util.Tips({
                    title: `添加成功`,
                    icon: "success",
                  });
                })
                .catch((err) => {
                  return that.$util.Tips({
                    title: err,
                  });
                });
            },
            fail: function (res) {
              if (res.errMsg == "chooseAddress:cancel")
                return that.$util.Tips({
                  title: `取消选择`,
                });
            },
          });
        },
        fail: function (res) {
          uni.showModal({
            title: `您已拒绝导入微信地址权限`,
            content: `是否进入权限管理，调整授权？`,
            success(res) {
              if (res.confirm) {
                uni.openSetting({
                  success: function (res) {},
                });
              } else if (res.cancel) {
                return that.$util.Tips({
                  title: `已取消！`,
                });
              }
            },
          });
        },
      });
    },
    // 导入共享地址（微信）；
    getAddress() {
      let that = this;
      that.$wechat
        .openAddress()
        .then((userInfo) => {
          editAddress({
            id: this.id,
            real_name: userInfo.userName,
            phone: userInfo.telNumber,
            address: {
              province: userInfo.provinceName,
              city: userInfo.cityName,
              district: userInfo.countryName,
            },
            detail: userInfo.detailInfo,
            is_default: 1,
            post_code: userInfo.postalCode,
            type: 1,
          })
            .then((res) => {
              // close();
              that.$util.Tips(
                {
                  title: `添加成功`,
                  icon: "success",
                },
                () => {
                  if (that.cartId) {
                    let cartId = that.cartId;
                    let pinkId = that.pinkId;
                    let couponId = that.couponId;
                    that.cartId = "";
                    that.pinkId = "";
                    that.couponId = "";
                    uni.navigateTo({
                      url:
                        "/pages/goods/order_confirm/index?cartId=" +
                        cartId +
                        "&addressId=" +
                        (that.id ? that.id : res.data.id) +
                        "&pinkId=" +
                        pinkId +
                        "&couponId=" +
                        couponId +
                        "&new=" +
                        that.news,
                    });
                  } else {
                    uni.navigateTo({
                      url: "/pages/users/user_address_list/index",
                    });
                    // history.back();
                  }
                }
              );
            })
            .catch((err) => {
              // close();
              return that.$util.Tips({
                title: err || `添加失败`,
              });
            });
        })
        .catch((err) => {});
    },
    /**
     * 提交用户添加地址
     *
     */
    formSubmit: function (e) {
      let that = this,
        value = e.detail.value;
      console.log(value);

      if (!value.real_name.trim())
        return that.$util.Tips({
          title: `请填写收货人姓名`,
        });
      if (!value.phone)
        return that.$util.Tips({
          title: `请填写联系电话`,
        });
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(value.phone))
        return that.$util.Tips({
          title: `请输入正确的手机号码`,
        });
      if (that.region[0] == `省`)
        return that.$util.Tips({
          title: `请选择所在地区`,
        });
      if (!value.detail.trim())
        return that.$util.Tips({
          title: `请填写详细地址`,
        });
      value.id = that.id;
      let regionArray = that.region;
      value.address = {
        province: regionArray[0],
        city: regionArray[1],
        district: regionArray[2],
        city_id: that.cityId,
      };
      value.is_default = that.userAddress.is_default ? 1 : 0;

      uni.showLoading({
        title: `保存中`,
        mask: true,
      });
      editAddress(value)
        .then((res) => {
          if (that.id)
            that.$util.Tips({
              title: `修改成功`,
              icon: "success",
            });
          else
            that.$util.Tips({
              title: `添加成功`,
              icon: "success",
            });
          setTimeout(function () {
            if (that.cartId) {
              let cartId = that.cartId;
              let pinkId = that.pinkId;
              let couponId = that.couponId;
              that.cartId = "";
              that.pinkId = "";
              that.couponId = "";
              uni.navigateTo({
                url:
                  "/pages/goods/order_confirm/index?new=" +
                  that.news +
                  "&cartId=" +
                  cartId +
                  "&addressId=" +
                  (that.id ? that.id : res.data.id) +
                  "&pinkId=" +
                  pinkId +
                  "&couponId=" +
                  couponId +
                  "&noCoupon=" +
                  that.noCoupon,
              });
            } else {
              // #ifdef H5
              return history.back();
              // #endif
              // #ifndef H5
              return uni.navigateBack({
                delta: 1,
              });
              // #endif
            }
          }, 1000);
        })
        .catch((err) => {
          return that.$util.Tips({
            title: err,
          });
        });
    },
    ChangeIsDefault: function (e) {
      this.$set(this.userAddress, "is_default", !this.userAddress.is_default);
    },
  },
};
</script>

<style lang="scss" scoped>
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  .tips {
    width: 100%;
    background: #eef6ff;
    height: 72rpx;
    box-sizing: border-box;
    padding-left: 24rpx;
    font-size: 28rpx;
    line-height: 36rpx;
    color: #2969ff;
    margin-bottom: 24rpx;
    border-radius: 36rpx;
    display: flex;
    align-items: center;
  }
  .content {
    background-color: #ffffff;
    box-shadow: 0rpx 4rpx 8rpx -4rpx rgba(0, 0, 0, 0.08);
    border-radius: 24rpx;
    width: 100%;
    box-sizing: border-box;
    padding: 0 24rpx;
    .row {
      width: 100%;
      height: 104rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1rpx solid #f5f5f5;
    }
    .address {
      .acea-row {
        display: flex;
        align-items: center;

        .iconfont {
          margin-left: 16rpx;
        }
      }
    }
    .label {
      font-size: 32rpx;
      color: rgba(47, 48, 49, 0.75);
      line-height: 48rpx;
    }
    .same-input {
      width: 50%;
      height: 100%;
      font-size: 32rpx;
      color: #2f3031;
      line-height: 48rpx;
      text-align: right;
    }
    .col {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 28rpx 0 24rpx 0;
      .address {
        width: 100%;
        height: 200rpx;
        border: 1rpx solid #f5f5f5;
        box-sizing: border-box;
        padding: 20rpx 16rpx;
        margin-top: 24rpx;
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
        border-radius: 24rpx;
      }
    }
  }
  .save-btn {
    width: 638rpx;
    height: 88rpx;
    font-weight: bold;
    margin-top: 36rpx;
    font-size: 32rpx;
    color: #ffffff;
    line-height: 45rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2969ff;
    border-radius: 12rpx;
  }
}
</style>

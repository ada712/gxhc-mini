<template>
  <view class="wrapper">
    <!-- 地址列表 -->
    <view class="address-list" v-if="addressList.length > 0">
      <radio-group
        class="radio-group"
        @change="radioChange"
        v-if="addressList.length"
      >
        <view
          class="address-item"
          v-for="(item, index) in addressList"
          :key="item.id"
        >
          <view class="address-info">
            <view class="user-info">
              <text class="name">{{ item.real_name }}</text>
              <text class="phone">{{ item.phone }}</text>
              <!-- 默认地址标签 -->
              <view class="default-tag" v-if="item.is_default">默认</view>
            </view>
            <view class="address-detail">
              {{ item.detail }}
            </view>
          </view>
          <view class="address-actions">
            <!-- 设置为默认地址按钮 -->
            <view class="set-default-btn">
              <!-- #ifndef MP -->
              <radio
                class="radio"
                :value="index.toString()"
                :checked="item.is_default ? true : false"
              >
                <text>设为默认</text>
              </radio>
              <!-- #endif -->
              <!-- #ifdef MP -->
              <radio
                class="radio"
                :value="index"
                :checked="item.is_default ? true : false"
              >
                <text>设为默认</text>
              </radio>
              <!-- #endif -->
            </view>
            <view class="a">
              <text class="edit-btn" @click.stop="editAddress(item.id)"
                >编辑</text
              >
              <text class="delete-btn" @click.stop="delAddress(index)"
                >删除</text
              >
            </view>
          </view>
        </view>
      </radio-group>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-else>
      <view class="empty-icon">📭</view>
      <view class="empty-text">暂无收货地址</view>
    </view>

    <!-- 添加地址按钮 -->
    <view class="add-address-btn" @click="addAddress"> + 新增收货地址 </view>
  </view>
</template>

<script>
import {
  getAddressList,
  setAddressDefault,
  delAddress,
  editAddress,
} from "@/api/user.js";
import { toLogin } from "@/libs/login.js";
import { mapGetters } from "vuex";
import { HTTP_REQUEST_URL } from "@/config/app";
export default {
  components: {},
  data() {
    return {
      imgHost: HTTP_REQUEST_URL,
      addressList: [],
      cartId: "",
      pinkId: 0,
      couponId: 0,
      loading: false,
      loadend: false,
      loadTitle: `加载更多`,
      page: 1,
      limit: 20,
      isAuto: false, //没有授权的不会自动授权
      isShowAuth: false, //是否隐藏授权
      news: "",
      noCoupon: 0,
    };
  },
  computed: mapGetters(["isLogin"]),
  onLoad(options) {
    if (this.isLogin) {
      this.cartId = options.cartId || "";
      this.noCoupon = options.noCoupon || 0;
      this.pinkId = options.pinkId || 0;
      this.couponId = options.couponId || 0;
      this.news = options.news || 0;
      this.getAddressList(true);
    } else {
      toLogin();
    }
  },
  onShow: function () {
    let that = this;
    that.getAddressList(true);
  },
  methods: {
    onLoadFun: function () {
      this.getAddressList();
    },
    // 授权关闭
    authColse: function (e) {
      this.isShowAuth = e;
    },
    /*
     * 导入微信地址（小程序）
     */
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
                  that.$util.Tips(
                    {
                      title: `添加成功`,
                      icon: "success",
                    },
                    function () {
                      that.getAddressList(true);
                    }
                  );
                })
                .catch((err) => {
                  return that.$util.Tips({
                    title: err,
                  });
                });
            },
            fail: function (err) {
              if (err.errMsg == "chooseAddress:cancel")
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
    /*
     * 导入微信地址（公众号）
     */
    getAddress() {
      let that = this;
      that.$wechat.openAddress().then((userInfo) => {
        // open();
        editAddress({
          real_name: userInfo.userName,
          phone: userInfo.telNumber,
          address: {
            province: userInfo.provinceName,
            city: userInfo.cityName,
            district: userInfo.countryName,
          },
          detail: userInfo.detailInfo,
          post_code: userInfo.postalCode,
          is_default: 1,
          type: 1,
        })
          .then(() => {
            that.$util.Tips(
              {
                title: `添加成功`,
                icon: "success",
              },
              function () {
                // close();
                that.getAddressList(true);
              }
            );
          })
          .catch((err) => {
            // close();
            return that.$util.Tips({
              title: err || `添加失败`,
            });
          });
      });
    },
    /**
     * 获取地址列表
     *
     */
    getAddressList: function (isPage) {
      let that = this;
      if (isPage) {
        that.loadend = false;
        that.page = 1;
        that.$set(that, "addressList", []);
      }
      if (that.loading) return;
      if (that.loadend) return;
      that.loading = true;
      that.loadTitle = "";
      getAddressList({
        page: that.page,
        limit: that.limit,
      })
        .then((res) => {
          let list = res.data;
          let loadend = list.length < that.limit;
          that.addressList = that.$util.SplitArray(list, that.addressList);
          that.$set(that, "addressList", that.addressList);
          that.loadend = loadend;
          that.loadTitle = loadend ? `我也是有底线的` : `加载更多`;
          that.page = that.page + 1;
          that.loading = false;
        })
        .catch((err) => {
          that.loading = false;
          that.loadTitle = `加载更多`;
        });
    },
    /**
     * 设置默认地址
     */
    radioChange: function (e) {
      let index = parseInt(e.detail.value),
        that = this;
      let address = this.addressList[index];
      if (address == undefined)
        return that.$util.Tips({
          title: `您设置的默认地址不存在!`,
        });
      setAddressDefault(address.id)
        .then((res) => {
          for (let i = 0, len = that.addressList.length; i < len; i++) {
            if (i == index) that.addressList[i].is_default = true;
            else that.addressList[i].is_default = false;
          }
          that.$util.Tips(
            {
              title: `设置成功`,
              icon: "success",
            },
            function () {
              that.$set(that, "addressList", that.addressList);
            }
          );
        })
        .catch((err) => {
          return that.$util.Tips({
            title: err,
          });
        });
    },
    /**
     * 编辑地址
     */
    editAddress: function (id) {
      uni.navigateTo({
        url: "/pages/mine/customer/address/edit/index?id=" + id,
      });
    },
    /**
     * 删除地址
     */
    delAddress: function (index) {
      let that = this,
        address = this.addressList[index];
      if (address == undefined)
        return that.$util.Tips({
          title: `您删除的地址不存在!`,
        });
      delAddress(address.id)
        .then((res) => {
          that.$util.Tips(
            {
              title: `删除成功`,
              icon: "success",
            },
            function () {
              that.addressList.splice(index, 1);
              that.$set(that, "addressList", that.addressList);
            }
          );
        })
        .catch((err) => {
          return that.$util.Tips({
            title: err,
          });
        });
    },
    /**
     * 新增地址
     */
    addAddress: function () {
      uni.navigateTo({
        url: "/pages/mine/customer/address/edit/index",
      });
    },
  },
  onReachBottom: function () {
    this.getAddressList();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  box-sizing: border-box;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
}

.address-list {
  flex: 1;
}

.address-item {
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 8rpx -4rpx rgba(0, 0, 0, 0.08);

  .address-info {
    border-bottom: 1rpx solid #f5f5f5;
    padding-bottom: 24rpx;

    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;

      .name {
        font-size: 32rpx;
        color: #2f3031;
        font-weight: bold;
        margin-right: 24rpx;
      }

      .phone {
        font-size: 28rpx;
        color: #666666;
        flex: 1;
      }

      .default-tag {
        width: 64rpx;
        height: 36rpx;
        background: #2969ff;
        border-radius: 8rpx;
        font-size: 24rpx;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .address-detail {
      font-size: 28rpx;
      color: #666666;
      line-height: 40rpx;
    }
  }

  .address-actions {
    display: flex;
    justify-content: space-between;
    padding-top: 24rpx;

    .edit-btn,
    .delete-btn {
      font-size: 28rpx;
      padding: 12rpx 24rpx;
      border-radius: 8rpx;
      margin-left: 24rpx;
    }

    .set-default-btn {
      font-size: 26rpx;
      color: #2f3031;
    }

    .edit-btn {
      color: #2969ff;
      border: 1rpx solid #2969ff;
    }

    .delete-btn {
      color: #ff4d4f;
      border: 1rpx solid #ff4d4f;
    }
  }
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .empty-icon {
    font-size: 80rpx;
    margin-bottom: 32rpx;
  }

  .empty-text {
    font-size: 32rpx;
    color: #999999;
  }
}

.add-address-btn {
  width: 100%;
  height: 88rpx;
  background: #2969ff;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #ffffff;
  font-weight: bold;
  margin-top: 24rpx;
}
uni-radio .uni-radio-input {
  border-radius: 50%;
  width: 19px;
  height: 19px;
}
</style>

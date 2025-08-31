<template>
  <view class="center-wripper">
    <view class="top-module">
      <image :src="imgPath + '/mine/img_mine_bg.png'" class="img-top-bg" />
      <view class="login-box" v-if="isLogin">
        <view class="row">
          <view class="row-left" @click="goPersonInfoPage">
            <view class="head">
              <image
                :src="userInfo.avatar"
                class="img-head"
                v-if="userInfo.avatar"
              />
              <image
                :src="imgPath + '/mine/default-head.png'"
                class="img-head"
                v-else
              />
            </view>
            <view class="info">
              <view class="nickname">{{ userInfo.nickname }}</view>
              <view class="mark-row">
                <view class="identity-box" v-if="identityLabel">{{
                  identityLabel
                }}</view>
                <view class="jyz" v-if="showCampusModule"
                  >经验值{{ experienceValue }}</view
                >
              </view>
            </view>
          </view>
          <view class="row-right" @click="goMessageList">
            <view class="message-box">
              <image
                :src="imgPath + '/mine/icon-lingdang.png'"
                class="icon-ld"
              />
              消息
            </view>
          </view>
        </view>
      </view>

      <view class="login-box" v-if="!isLogin">
        <view class="row" @click="goLoginPage">
          <view class="row-left">
            <view class="head">
              <image
                :src="imgPath + '/mine/default-head.png'"
                class="img-head"
              />
            </view>
            <view class="go-login">注册/登录</view>
          </view>
        </view>
      </view>
    </view>
    <view class="content-module">
      <image
        :src="imgPath + '/mine/banner240.png'"
        class="img-banner"
        @click="goGxhcIntroduce"
      />

      <view class="message-row" v-if="isLogin && messageTips">
        <image :src="imgPath + '/mine/icon_tongzhi.png'" class="icon-noice" />
        <view class="ft28 tips"
          >您的项目已经通过审核了，详情通过功能模块，项目进展了解更多</view
        >
      </view>

      <view class="same-box" v-if="isLogin && showCampusModule">
        <view class="same-menus">
          <view
            class="item-menu"
            v-for="(item, key) in campusMenus"
            :key="key"
            @click="handleGoPage(item)"
          >
            <image :src="item.icon" class="icon-color-menu" />
            <view class="menu-name">{{ item.name }}</view>
          </view>
        </view>
      </view>

      <view class="same-box" v-if="isLogin && (isCampusManage || isAdmin)">
        <view class="title">校园合伙人管理专区</view>
        <view class="same-menus">
          <view
            class="item-menu"
            v-for="(item, key) in campusManageMenus"
            :key="key"
            @click="handleGoPage(item)"
          >
            <image :src="item.icon" class="icon-color-menu" />
            <view class="menu-name">{{ item.name }}</view>
          </view>
        </view>
      </view>

      <view class="common-box">
        <view
          class="row common-row"
          v-if="isLogin && (isCampusManage || isAdmin)"
          @click="goAdminCenterPage"
        >
          <view class="left">
            <image
              :src="imgPath + '/mine/icon_khzx.png'"
              class="icon_brief_menu"
            />
            <text class="ft32">管理员操作中心</text>
          </view>
          <view class="right">
            <image
              :src="imgPath + '/icons/icon-gray-right2.png'"
              class="icon_right_arrow"
            />
          </view>
        </view>
        <view class="row common-row" v-if="isLogin" @click="goClientCenterPage">
          <view class="left">
            <image
              :src="imgPath + '/mine/icon_khzx.png'"
              class="icon_brief_menu"
            />
            <text class="ft32">客户中心</text>
          </view>
          <view class="right">
            <image
              :src="imgPath + '/icons/icon-gray-right2.png'"
              class="icon_right_arrow"
            />
          </view>
        </view>
        <view class="row common-row" @click="goProtocolPage">
          <view class="left">
            <image
              :src="imgPath + '/mine/icon_xysm.png'"
              class="icon_brief_menu"
            />
            <text class="ft32">协议说明</text>
          </view>
          <view class="right">
            <image
              :src="imgPath + '/icons/icon-gray-right2.png'"
              class="icon_right_arrow"
            />
          </view>
        </view>
        <button class="row common-row" open-type="feedback">
          <view class="left">
            <image
              :src="imgPath + '/mine/icon_fkjy.png'"
              class="icon_brief_menu"
            />
            <text class="ft32">意见反馈</text>
          </view>
          <view class="right">
            <image
              :src="imgPath + '/icons/icon-gray-right2.png'"
              class="icon_right_arrow"
            />
          </view>
        </button>
        <view class="row common-row" @click="goCustomerPage">
          <view class="left">
            <image
              :src="imgPath + '/mine/icon_zxkf.png'"
              class="icon_brief_menu"
            />
            <text class="ft32">智能客服</text>
          </view>
          <view class="right">
            <image
              :src="imgPath + '/icons/icon-gray-right2.png'"
              class="icon_right_arrow"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserInfo } from "@/api/user.js";
import { mapGetters } from "vuex";
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      campusMenus: [
        {
          icon: `${imgUrls}/mine/icon_xy_jyzsh.png`,
          name: "经验值申报",
          route: "/campusPages/experience/apply/index",
        },
        {
          icon: `${imgUrls}/mine/icon_xy_cyhd.png`,
          name: "参与的活动",
          route: "",
        },
      ],
      campusManageMenus: [
        {
          icon: `${imgUrls}/mine/icon_xy_dslb.png`,
          name: "大使列表",
          route: "/campusPages/parter/list/index",
        },
        {
          icon: `${imgUrls}/mine/icon_xy_dssh.png`,
          name: "大使审核",
          route: "",
        },
        {
          icon: `${imgUrls}/mine/icon_xy_jyzsh.png`,
          name: "经验值审核",
          route: "",
        },
        {
          icon: `${imgUrls}/mine/icon_xy_bmsh.png`,
          name: "活动报名审核",
          route: "",
        },
        {
          icon: `${imgUrls}/mine/icon_xy_fqhdsh.png`,
          name: "发起活动审核",
          route: "",
        },
      ],
      userInfo: {
        userTag: ''
      },
      experienceValue: 0,
      messageTips: "",
      tagList: {
        admin: "超级管理员",
        investor: "投资部成员",
        director: "理事会理事",
        ambassador: "校园大使",
        partner: "校园合伙人",
        campusManage: "校园合伙人管理员",
      },
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin",
    }),
    identityLabel() {
      return this.tagList[this.userInfo.userTag];
    },
    showCampusModule() {
      return ["ambassador", "partner", "campusManage"].includes(
        this.userInfo.userTag
      );
    },
    isCampusManage() {
      return this.userInfo.userTag === 'campusManage'
    },
    isAdmin() {
      return this.userInfo.userTag === 'admin'
    },
  },
  onShow() {
    if (this.isLogin) {
      this.getUserInfo();
    }
  },
  methods: {
    /**
     * 获取个人用户信息
     */
    getUserInfo: function () {
      let that = this;
      getUserInfo().then((res) => {
        that.userInfo = res.data;
        if (res.data.shop_id) {
          this.$Cache.set("shopId", res.data.shop_id);
        }
        that.$store.commit("UPDATE_USERINFO", res.data);
        that.$store.commit("SETUID", res.data.uid);
        uni.stopPullDownRefresh();
      });
    },
    navigateToPage(route, isWeb = false) {
      if (!route) return; // 如果 route 为空，则直接返回
      let url = isWeb
        ? `/pages/web/index?url=${encodeURIComponent(route)}`
        : route;

      uni.navigateTo({
        url,
      });
    },
    handleGoPage(item) {
      const { route } = item;
      this.navigateToPage(route);
    },
    goAdminCenterPage() {
      this.navigateToPage("/managePages/index/index");
    },
    goLoginPage() {
      this.navigateToPage("/pages/mine/login/index");
    },
    goPersonInfoPage() {
      this.navigateToPage("/pages/mine/customer/personInfo/index");
    },
    goClientCenterPage() {
      this.navigateToPage("/pages/mine/customer/index/index");
    },
    goGxhcIntroduce() {
      this.navigateToPage(
        "https://mp.weixin.qq.com/s/kCbiycoxR5xv5EPjwl7zaA",
        true
      );
    },
    goProtocolPage() {
      this.navigateToPage("/explainPages/protocol/index");
    },
    goSuggestPage() {
      this.navigateToPage("/explainPages/protocol/index");
    },
    goCustomerPage() {
      this.navigateToPage("https://cha.mahanova.com/", true);
    },
    goMessageList() {
      this.navigateToPage("/pages/mine/message/index");
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f4f5f6;
}

button {
  background: none;

  &::after {
    display: none;
  }
}

.center-wripper {
  width: 100%;
  position: relative;

  .top-module {
    width: 100%;
    height: 531rpx;
    position: relative;

    .img-top-bg {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .login-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 348rpx;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 174rpx 24rpx 0 38rpx;

      .row-left {
        width: 80%;
        display: flex;
        flex-direction: row;
        align-items: center;

        .head {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f2f6;
          box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(0, 0, 0, 0.1);
          margin-right: 24rpx;

          .img-head {
            width: 96rpx;
            height: 96rpx;
            border-radius: 50%;
            border: 4rpx solid #ffffff;
          }
        }

        .info {
          display: flex;
          flex-direction: column;

          .nickname {
            font-weight: bold;
            font-size: 36rpx;
            color: #303133;
            line-height: 50rpx;
          }

          .mark-row {
            display: flex;
            flex-direction: row;
            align-items: center;

            .identity-box {
              // width: 134rpx;
              height: 32rpx;
              box-sizing: border-box;
              padding: 6rpx 10rpx;
              background: linear-gradient(
                316deg,
                #2d65b8 0%,
                #668bd7 61%,
                #6493ec 100%
              );
              font-size: 18rpx;
              color: #ffffff;
              line-height: 24rpx;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .jyz {
              font-size: 22rpx;
              color: #2f3031;
              line-height: 32rpx;
              margin-left: 4rpx;
            }
          }
        }

        .go-login {
          font-weight: bold;
          font-size: 36rpx;
          color: #303133;
          line-height: 50rpx;
        }
      }

      .row-right {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

        .message-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 124rpx;
          height: 56rpx;
          background: linear-gradient(270deg, #1a9dff 0%, #1a5eff 100%);
          box-shadow: 0rpx 16rpx 40rpx -12rpx rgba(26, 94, 255, 0.5);
          border-radius: 28rpx;
          font-size: 24rpx;
          color: #ffffff;
          line-height: 36rpx;

          .icon-ld {
            width: 21rpx;
            height: 24rpx;
            margin-right: 8rpx;
          }
        }
      }
    }
  }

  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .content-module {
    width: 100%;
    box-sizing: border-box;
    padding: 0rpx 24rpx 56rpx 24rpx;
    position: absolute;
    top: 348rpx;
    color: #2f3031;
    // #ifdef H5
    padding-bottom: 70px;
    // #endif
    .ft28 {
      font-size: 28rpx;
      line-height: 42rpx;
    }

    .ft32 {
      font-weight: bold;
      font-size: 32rpx;
      line-height: 48rpx;
    }

    .img-banner {
      width: 100%;
      height: 240rpx;
      margin-bottom: 24rpx;
    }

    .message-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 72rpx;
      box-sizing: border-box;
      padding: 0rpx 24rpx;
      border-radius: 12rpx;
      background: #ffffff;
      margin-bottom: 24rpx;

      .icon-noice {
        width: 48rpx;
        height: 48rpx;
        margin-right: 16rpx;
      }

      .tips {
        width: 590rpx;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .same-box {
      width: 100%;
      border-radius: 24rpx;
      background: #ffffff;
      margin-bottom: 24rpx;
      box-sizing: border-box;
      padding-top: 24rpx;

      .title {
        font-weight: bold;
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
        box-sizing: border-box;
        padding-left: 24rpx;
        margin-bottom: 24rpx;
      }

      .same-menus {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .item-menu {
          width: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 24rpx;

          .icon-color-menu {
            width: 88rpx;
            height: 88rpx;
            margin-bottom: 16rpx;
          }

          .menu-name {
            font-size: 24rpx;
            color: #2f3031;
            line-height: 36rpx;
          }
        }
      }
    }

    .common-box {
      background: #ffffff;
      border-radius: 24rpx;

      .common-row {
        width: 100%;
        height: 110rpx;
        box-sizing: border-box;
        padding: 0 32rpx;

        .left {
          width: 80%;
          display: flex;
          flex-direction: row;
          align-items: center;

          .icon_brief_menu {
            width: 64rpx;
            height: 64rpx;
            margin-right: 24rpx;
          }
        }

        .right {
          width: 20%;
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;

          .icon_right_arrow {
            width: 12rpx;
            height: 24rpx;
          }
        }
      }
    }
  }
}
</style>

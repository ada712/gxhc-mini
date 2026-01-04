<template>
  <view class="center-wripper">
    <view class="top-module">
      <image :src="imgPath + '/mine/img_mine_bg.png'" class="img-top-bg" />
      <view class="login-box" v-if="isLogin">
        <view class="row">
          <view class="row-left">
            <view class="head">
              <button
                class="head-box"
                open-type="chooseAvatar"
                @chooseavatar="onChooseAvatar"
              >
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
              </button>
            </view>
            <view class="info" @click="goPersonInfoPage">
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
          <view class="row-right">
            <image
              src="/static/images/my/msg.png"
              class="message-icon"
              @click="goMessageList"
            />
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
        v-if="false"
        :src="imgPath + '/mine/banner240.png'"
        class="img-banner"
        @click="goGxhcIntroduce"
      />

      <!-- 统计卡片 -->
      <view class="stats-cards" v-if="isLogin">
        <view class="stats-card stats-card-blue" @click="goBpList">
          <view class="stats-label">
            <image class="stats-label-icon" src="/static/images/my/wodebaogao.png" mode="aspectFit"></image>
            <text class="stats-label-text">我的报告</text>
          </view>
          <view class="stats-value-wrapper">
            <text class="stats-value-number">{{ reportCount }}</text>
            <text class="stats-value-unit">份</text>
          </view>
        </view>
        <view class="stats-card stats-card-orange" @click="goEnergyPage">
          <view class="stats-label">
            <image class="stats-label-icon" src="/static/images/my/wodenengliang.png" mode="aspectFit"></image>
            <text class="stats-label-text">我的能量</text>
          </view>
          <view class="stats-value-wrapper">
            <text class="stats-value-number">{{ formatEnergy(energy) }}</text>
            <text class="stats-value-unit">点</text>
          </view>
        </view>
      </view>

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

      <view
        class="same-box"
        v-if="isLogin && (isCampusManage || isAdmin) && false"
      >
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
        <view class="row common-row" v-if="isLogin" @click="goAgencyCenter">
          <view class="left">
            <image
              src="/static/images/my/dailizhongxin.png"
              class="icon_brief_menu"
            />
            <text class="ft32">代理中心</text>
          </view>
          <view class="right">
            <image
              :src="imgPath + '/icons/icon-gray-right2.png'"
              class="icon_right_arrow"
            />
          </view>
        </view>
        <view class="row common-row" v-if="isLogin" @click="goProjectRegister">
          <view class="left">
            <image
              src="/static/images/my/xiangmudengji.png"
              class="icon_brief_menu"
            />
            <text class="ft32">项目登记</text>
          </view>
          <view class="right">
            <image
              :src="imgPath + '/icons/icon-gray-right2.png'"
              class="icon_right_arrow"
            />
          </view>
        </view>
        <view class="row common-row" v-if="isLogin" @click="goEcosystemPlatform">
          <view class="left">
            <image
              src="/static/images/my/shengtaipingtai.png"
              class="icon_brief_menu"
            />
            <text class="ft32">生态平台</text>
          </view>
          <view class="right">
            <image
              :src="imgPath + '/icons/icon-gray-right2.png'"
              class="icon_right_arrow"
            />
          </view>
        </view>
        <view class="row common-row" v-if="false && isLogin" @click="goClientCenterPage">
          <view class="left">
            <image
              src="/static/images/my/daili.png"
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
        <view class="row common-row" v-if="isLogin" @click="goInvoicePage">
          <view class="left">
            <image
              src="/static/images/my/fapiaoguanli.png"
              class="icon_brief_menu"
            />
            <text class="ft32">发票管理</text>
          </view>
          <view class="right">
            <image
              :src="imgPath + '/icons/icon-gray-right2.png'"
              class="icon_right_arrow"
            />
          </view>
        </view>
        <view class="row common-row" v-if="isLogin" @click="goInvitePage">
          <view class="left">
            <image
              src="/static/images/my/tuiguangmingpian.png"
              class="icon_brief_menu"
            />
            <text class="ft32">推广名片</text>
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
              src="/static/images/my/xiangmudengji.png"
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
              src="/static/images/my/yijianfankui.png"
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
        <view class="row common-row" v-if="false" @click="goCustomerPage">
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
        <view class="row common-row" v-if="isLogin" @click="goLiveVoucher">
          <view class="left">
            <image
              src="/static/images/my/zhiboquanyuliang.png"
              class="icon_brief_menu"
            />
            <text class="ft32">直播卷余量</text>
          </view>
          <view class="right">
            <text class="voucher-count">{{ liveVoucherCount }}张</text>
            <image
              :src="imgPath + '/icons/icon-gray-right2.png'"
              class="icon_right_arrow"
            />
          </view>
        </view>
        <view class="row common-row" @click="goCustomerPage2">
          <view class="left">
            <image
              src="/static/images/my/bangzhuyukefu.png"
              class="icon_brief_menu"
            />
            <text class="ft32">帮助与客服</text>
          </view>
          <view class="right">
            <image
              :src="imgPath + '/icons/icon-gray-right2.png'"
              class="icon_right_arrow"
            />
          </view>
        </view>
      </view>
      
      <!-- 版本信息 -->
      <view class="version-info">VERSION 1.0.5 LAB</view>
    </view>
  </view>
</template>

<script>
import { getUserInfo, userEdit } from "@/api/user.js";
import { userEnergy, getBpResultList } from "@/api/gxhc.js";
import { mapGetters } from "vuex";
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      energy: 0,
      reportCount: 0,
      liveVoucherCount: 1,
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
        userTag: "",
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
      return this.userInfo.userTag === "campusManage";
    },
    isAdmin() {
      return this.userInfo.userTag === "admin";
    },
  },
  onShow() {
    if (this.isLogin) {
      this.getUserInfo();
      this.getUserEnergy();
      this.getReportCount();
    }
  },
  methods: {
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail;
      this.$util.uploadImgs(
        "upload/image",
        avatarUrl,
        (res) => {
          this.userInfo.avatar = res.data.url;
          this.formUpdate({
            avatar: res.data.url,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
    formUpdate(data) {
      userEdit(data)
        .then((res) => {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000,
          });
        })
        .catch((msg) => {
          uni.showToast({
            title: msg || `保存失败`,
            icon: "none",
            duration: 2000,
          });
        });
    },
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
    goInvoicePage() {
      this.navigateToPage("/pages/users/user_invoice_list/index");
    },
    goInvitePage() {
      this.navigateToPage("/subpackage1/poster/index");
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
    goCustomerPage2() {
      this.navigateToPage("/subpackage1/kf/index");
    },
    goMessageList() {
      this.navigateToPage("/pages/mine/message/index");
    },
    getUserEnergy() {
      userEnergy()
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.energy = res.data.energy || 0;
          }
        })
        .catch((error) => {
          console.error("获取能量数据异常:", error);
        });
    },
    getReportCount() {
      getBpResultList({ page: 1, limit: 1 })
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.reportCount = res.data.total || 0;
          }
        })
        .catch((error) => {
          console.error("获取报告数量异常:", error);
        });
    },
    formatEnergy(energy) {
      if (energy >= 1000) {
        return (energy / 1000).toFixed(1) + "k";
      }
      return energy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    goBpList() {
      this.navigateToPage("/subpackage1/bp/list/index");
    },
    goEnergyPage() {
      this.navigateToPage("/subpackage1/energy/index/index");
    },
    goAgencyCenter() {
      // 代理中心
      uni.showToast({
        title: "功能开发中",
        icon: "none",
      });
    },
    goProjectRegister() {
      // 项目登记
      uni.showToast({
        title: "功能开发中",
        icon: "none",
      });
    },
    goEcosystemPlatform() {
      // 生态平台
      uni.showToast({
        title: "功能开发中",
        icon: "none",
      });
    },
    goLiveVoucher() {
      // 直播卷余量
      uni.showToast({
        title: "功能开发中",
        icon: "none",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #ffffff;
}

button {
  background: none;

  &::after {
    display: none;
  }
}

.head-box {
  margin: 0;
  padding: 0;
  line-height: 0;
  border-radius: 0;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
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

        .message-icon {
          width: 92rpx;
          height: 92rpx;
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
      height: 44rpx;
      opacity: 1;
      color: #16171a;
      text-align: left;
      font-size: 32rpx;
      font-weight: 500;
      font-family: "Alibaba PuHuiTi 3.0";
      line-height: 44rpx;
      display: block;
    }

    .img-banner {
      width: 100%;
      height: 240rpx;
      margin-bottom: 24rpx;
    }

    .stats-cards {
      display: flex;
      gap: 24rpx;
      margin-bottom: 24rpx;

      .stats-card {
        flex: 1;
        height: 326rpx;
        border-radius: 24rpx;
        padding: 24rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;

        &.stats-card-blue {
          background: linear-gradient(155.4deg, #285ee7 0%, #403ccd 100%);
          
          .stats-label-text {
            color: #3f5bda;
          }
        }

        &.stats-card-orange {
          background: linear-gradient(135.3deg, #fa9336 0%, #f69e0f 100%);
          
          .stats-label-text {
            color: #ed6712;
          }
        }

        .stats-label {
          width: 240rpx;
          height: 90rpx;
          border-radius: 224rpx;
          opacity: 1;
          background: #ffffff;
          box-shadow: 0 8rpx 20rpx 0 #d886104d;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12rpx 24rpx;
          margin-bottom: 68rpx;
          gap: 12rpx;
          box-sizing: border-box;

          .stats-label-icon {
            width: 32rpx;
            height: 32rpx;
          }

          .stats-label-text {
            width: 96rpx;
            height: 30rpx;
            opacity: 1;
            color: #16171a;
            text-align: left;
            font-size: 24rpx;
            font-weight: 600;
            font-family: "PingFang SC";
            line-height: 30rpx;
            display: block;
          }
        }

        .stats-value-wrapper {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 8rpx;

          .stats-value-number {
            width: 42rpx;
            height: 44rpx;
            opacity: 1;
            color: #ffffff;
            text-align: left;
            font-size: 84rpx;
            font-weight: 700;
            font-family: "DIN Alternate";
            line-height: 44rpx;
            display: block;
          }

          .stats-value-unit {
            width: 24rpx;
            height: 30rpx;
            opacity: 1;
            color: #ffffff;
            text-align: left;
            font-size: 24rpx;
            font-weight: 600;
            font-family: "PingFang SC";
            line-height: 30rpx;
            display: block;
          }
        }
      }
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
        width: 696rpx;
        height: 154rpx;
        border-radius: 36rpx;
        opacity: 1;
        background: #ffffff;
        box-shadow: 0 0 8rpx 0 #0000001a;
        box-sizing: border-box;
        padding: 0 32rpx;
        margin-bottom: 32rpx;

        .left {
          width: 80%;
          display: flex;
          flex-direction: row;
          align-items: center;

          .icon_brief_menu {
            width: 80rpx;
            height: 80rpx;
            margin-right: 38rpx;
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

          .voucher-count {
            font-size: 28rpx;
            color: #909399;
            margin-right: 16rpx;
          }
        }
      }
    }

    .version-info {
      text-align: center;
      font-size: 24rpx;
      color: #909399;
      margin-top: 40rpx;
      margin-bottom: 20rpx;
      font-family: "PingFang SC";
    }
  }
}
</style>

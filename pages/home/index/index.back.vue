<template>
  <view class="index-wripper">
    <swiper
      indicator-dots
      class="banner-box"
      interval="5000"
      autoplay
      indicator-color="rgba(255,255,255,0.4)"
      layout-type="stackLeft"
      indicator-active-color="#FFFFFF"
      circular
    >
      <swiper-item
        v-for="(item, key) in bannerList"
        :key="key"
        class="banner-item"
        @click="handleClickBanner(item)"
      >
        <image :src="item.img" class="swiper-item" />
      </swiper-item>
    </swiper>

    <movable-area class="movable-area">
      <view @click="goGxhcIntroduce">
        <image
          :src="imgUrl + '/banner/gxhcjsbanner1.png'"
          class="gxhc-banner"
        />
      </view>

      <view class="content">
        <movable-view class="movable-view" direction="vertical">
          <view class="movale-content" @click="onClickCustomer">
            <image src="/static/images/index/icon_zxkf.png" class="line-kf" />
            <view class="text">客服</view>
          </view>
        </movable-view>

        <view class="same-box director-box">
          <view class="title-row">
            <view class="title">理事成员</view>
            <view class="more" @click="searchDirectors">
              查看更多
              <image
                :src="imgUrl + '/index/icon_right_gray.png'"
                class="icon-right"
              />
            </view>
          </view>
          <view class="director-swiper">
            <view
              v-for="(item, key) in directorList"
              :key="key"
              class="director-item"
              @click="handleClickDirectorItem(item)"
            >
              <view class="item-left">
                <image :src="item.photo" class="img-head" />
              </view>
              <view class="item-right">
                <view class="item-row">
                  <view class="item-name">{{ item.name }}</view>
                  <view class="item-status">{{ item.position }}</view>
                </view>
                <view class="item-info">{{ item.introduction }}</view>
              </view>
            </view>
          </view>
        </view>

        <view class="same-box project-box">
          <view class="same-box project-box">
            <view class="title-row" @click="searchHatchList">
              <view class="title">已孵化项目</view>
              <view class="more" @click="searchHatchList">
                <image
                  :src="imgUrl + '/index/icon_right_gray.png'"
                  class="icon-right"
                />
              </view>
            </view>
            <view class="hatch-swiper">
              <view
                class="hatch-item"
                v-for="(item, key) in hatchList"
                :key="key"
                @click="handleClickHatchItem(item)"
              >
                <view class="item-row">
                  <view class="logo-box">
                    <image :src="item.logo" class="img-company-logo" />
                  </view>
                  <view class="item-right">
                    <view class="item-name">{{ item.name }}</view>
                    <view class="item-info">{{ item.brief }}</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="same-box ecology-module">
          <view class="ecology-row">
            <view class="ecology-title">生态服务</view>
            <view class="ecology-more" @click="searchEcologyList">
              <image
                :src="imgUrl + '/index/icon_right_gray.png'"
                class="icon-right"
              />
            </view>
          </view>

          <view class="ecology-list">
            <view class="ecology-item" @click="searchEcologyList">
              <image
                :src="imgUrl + '/index/server_dstsl.png'"
                class="item-icon"
              />
              <view class="item-title">多生态算力</view>
              <view class="item-subtitle"
                >提供优质且价格优惠的算力资源渠道</view
              >
            </view>
            <view class="ecology-item" @click="searchEcologyList">
              <image
                :src="imgUrl + '/index/server_mtfw.png'"
                class="item-icon"
              />
              <view class="item-title">媒体服务</view>
              <view class="item-subtitle">访谈，建立PR渠道</view>
            </view>
            <view class="ecology-item" @click="searchEcologyList">
              <image
                :src="imgUrl + '/index/server_flzxfw.png'"
                class="item-icon"
              />
              <view class="item-title">法律咨询服务</view>
              <view class="item-subtitle">初创企业定制化法律咨询</view>
            </view>
            <view class="ecology-item" @click="searchEcologyList">
              <image
                :src="imgUrl + '/index/server_jghsjj.png'"
                class="item-icon"
              />
              <view class="item-title">结构化数据集</view>
              <view class="item-subtitle">数据要素市场优势</view>
            </view>
          </view>

          <view class="campus-module">
            <view class="campus-title">校园合伙人专区</view>
            <view class="menu-row">
              <view class="menu-col mr24">
                <view class="recruit-menu" @click="goApplyCampus">
                  <image
                    :src="imgUrl + '/index/img_hhrsqbg.png'"
                    class="dsmenu-bg"
                  />
                  <view class="menu-content">
                    <view class="menu-title">校园大使申请</view>
                    <view class="subtitle">加入我们，成就未来</view>
                    <!-- <view class="soon-btn">立即申请</view> -->
                  </view>
                </view>
              </view>
              <view class="menu-col">
                <!-- 	<view class="same-menu activity-bg mb24" @click="goCampusActivity">
									<image :src="imgUrl+'/index/img_hddtbg.png'" class="dsmenu-bg" />
									<view class="samll-content">
										<view class="menu-title activity-color">经验值榜</view>
										<view class="subtitle">在点滴中积累</view>
									</view>
								</view> -->

                <view class="same-menu amb-bg" @click="goCampusList">
                  <image
                    :src="imgUrl + '/index/img_dsfcbg.png'"
                    class="dsmenu-bg"
                  />
                  <view class="samll-content">
                    <view class="menu-title amb-color">合伙人风采</view>
                    <view class="subtitle">精英汇聚，共筑梦想</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </movable-area>
  </view>
</template>

<script>
import { getIndex } from "@/api/api.js";
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      hatchList: [
        {
          name: "北京开放传神OpenCSG",
          logo: `${imgUrls}/logo/opencsglogo.jpg`,
          brief: "人工智能算力算法管理，大模型应用普惠化领域创新的领先企业",
          articlesURL: "https://mp.weixin.qq.com/s/UxUWHOH3aw2OqmHDEfWpmg",
        },
        {
          name: "摩诃脉动",
          logo: `${imgUrls}/logo/mohelogo.jpg`,
          brief: "为企业提供定制化的LLM生成服务",
          articlesURL: "https://mp.weixin.qq.com/s/QG93ccQeDgLg57Oj7QMEzg",
        },
      ],
      bannerList: [],
      directorList: [],
    };
  },
  onShow() {
    this.getIndexData();
  },
  methods: {
    getIndexData() {
      getIndex().then((res) => {
        this.bannerList = res.data.banner;
        this.directorList = res.data.directorList;
      });
    },
    openWebUrl(url) {
      uni.navigateTo({
        url: `/pages/web/index?url=${encodeURIComponent(url)}`,
      });
    },
    handleClickBanner(item) {
      const { link, isWeb } = item;
      if (isWeb && link) {
        this.openWebUrl(link);
      } else {
        this.navigateToPage(link);
      }
    },
    navigateToPage(url) {
      uni.navigateTo({
        url,
      });
    },
    goGxhcIntroduce() {
      const url = "https://mp.weixin.qq.com/s/kCbiycoxR5xv5EPjwl7zaA";
      this.openWebUrl(url);
    },
    onClickCustomer() {
      this.openWebUrl("https://cha.mahanova.com/");
    },
    searchDirectors() {
      this.navigateToPage("/pages/director/list/index");
    },
    handleClickDirectorItem(item) {
      const { id } = item;
      if (id) {
        this.navigateToPage(`/pages/director/detail/index?id=${id}`);
      }
    },
    handleClickHatchItem(item) {
      const { articlesURL } = item;
      if (articlesURL) {
        this.openWebUrl(articlesURL);
      }
    },
    searchHatchList() {
      this.navigateToPage("/projectPages/hatchList/index");
    },
    searchEcologyList() {
      this.navigateToPage("/pages/home/serviceList/index");
    },
    goApplyCampus() {
      this.navigateToPage("/campusPages/parter/apply/index");
    },
    goCampusList() {
      this.navigateToPage("/campusPages/parter/list/index");
    },
  },
  onShareAppMessage() {
    return {
      title: "国信合创（CHA）人工智能共创理事会",
      imageUrl: `${this.imgUrl}/index/img-share.png`,
      path: "pages/home/index/index",
    };
  },
};
</script>

<style lang="scss" scoped>
.index-wripper {
  width: 100%;
  box-sizing: border-box;
  background-color: #f4f4f4;

  .banner-box {
    width: 100%;
    height: 320rpx;

    .swiper-item {
      width: 100%;
      height: 100%;
    }
  }

  .gxhc-banner {
    width: 100%;
    height: 320rpx;
  }

  .movable-area {
    width: 100%;
    height: 1500rpx;
    position: relative;
  }

  .movable-view {
    position: absolute;
    top: 20%;
    left: 650rpx;
    width: 102rpx;
    height: 100rpx;
    z-index: 999;
  }

  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx 24rpx 24rpx 24rpx;

    .movale-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 102rpx;
      height: 100rpx;
      background: #ffffff;
      box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
      border-radius: 49rpx 0rpx 0rpx 49rpx;

      .line-kf {
        width: 48rpx;
        height: 48rpx;
      }

      .text {
        font-size: 22rpx;
        color: #2f3031;
        line-height: 34rpx;
      }
    }
  }

  .gxhc-box {
    width: 100%;
    background: #ffffff;
    border-radius: 24rpx;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 80rpx 48rpx 80rpx 50rpx;
    margin-bottom: 24rpx;

    .gxhc-top {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 24rpx;
    }

    .img-logo {
      width: 148rpx;
      height: 127rpx;
      margin-right: 32rpx;
    }

    .bigtitle {
      font-size: 40rpx;
      color: #000000;
      line-height: 48rpx;
      font-weight: bold;
    }

    .subtitle {
      font-size: 32rpx;
      color: #333;
      line-height: 48rpx;
      letter-spacing: 2px;
      margin-top: 15rpx;
    }
  }

  .same-box {
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx;
    background: #ffffff;
    border-radius: 24rpx;
    margin-bottom: 24rpx;

    .title-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24rpx;

      .title {
        font-weight: bold;
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
      }

      .more {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 24rpx;
        color: rgba(47, 48, 49, 0.75);
        line-height: 36rpx;
      }
    }
  }

  .hatch-swiper {
    width: 100%;

    .hatch-item {
      width: 100%;
      margin-bottom: 24rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      // background: #f5f5f5;
      border-radius: 20rpx;

      .item-row {
        width: 100%;
        height: 240rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .logo-box {
        width: 240rpx;
        height: 168rpx;
        border-radius: 10rpx;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;

        .img-company-logo {
          width: 155rpx;
          height: 55rpx;
        }
      }

      .item-right {
        width: 50%;
        margin-left: 24rpx;
        display: flex;
        flex-direction: column;

        .item-name {
          font-size: 30rpx;
          color: #2f3031;
          line-height: 42rpx;
          font-weight: bold;
          margin-bottom: 4rpx;
        }

        .item-info {
          // overflow: hidden;
          // white-space: nowrap;
          // text-overflow: ellipsis;
          font-size: 24rpx;
          color: rgba(47, 48, 49, 0.75);
          line-height: 36rpx;
        }
      }
    }
  }

  .main-menu {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      // padding-top: 20rpx;
      margin-bottom: 24rpx;
      width: 150rpx;
      margin-right: 20rpx;

      .menu-icon {
        width: 88rpx;
        height: 88rpx;
        border-radius: 28rpx;
        margin-bottom: 16rpx;
      }

      .menu-desc {
        font-size: 24rpx;
        color: #2f3031;
        line-height: 36rpx;
        text-align: center;
      }
    }
  }

  .campus-module {
    width: 100%;
    border-radius: 24rpx;
    background: #ffffff;
    box-sizing: border-box;
    padding: 24rpx 0rpx 24rpx 24rpx;

    .campus-title {
      font-weight: bold;
      font-size: 32rpx;
      color: #2f3031;
      line-height: 48rpx;
      margin-bottom: 24rpx;
    }

    .menu-row {
      width: 100%;
      display: flex;
      flex-direction: row;

      .menu-col {
        display: flex;
        flex-direction: column;
      }

      .mr24 {
        margin-right: 24rpx;
      }

      .dsmenu-bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
      }

      .recruit-menu {
        border-radius: 12rpx;
        width: 316rpx;
        height: 160rpx;
        // height: 340rpx;

        position: relative;

        .menu-content {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 23;
          width: 100%;
          box-sizing: border-box;
          padding: 32rpx 0 0 20rpx;
        }

        .menu-title {
          margin-left: 8rpx;
          font-size: 32rpx;
          color: #ffffff;
          line-height: 48rpx;
          font-weight: bold;
          letter-spacing: 2rpx;
        }

        .subtitle {
          font-size: 22rpx;
          color: rgba(255, 255, 255, 0.75);
          line-height: 34rpx;
          margin-left: 9rpx;
          margin-bottom: 16rpx;
        }

        .soon-btn {
          width: 140rpx;
          height: 48rpx;
          background: #ffffff;
          border-radius: 24rpx;

          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22rpx;
          color: #457efd;
          line-height: 30rpx;
        }
      }

      .samll-content {
        box-sizing: border-box;
        padding-top: 24rpx;
        padding-left: 24rpx;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 23;
      }

      .mb24 {
        margin-bottom: 24rpx;
      }

      .same-menu {
        width: 314rpx;
        height: 160rpx;
        border-radius: 24rpx;
        position: relative;

        .menu-title {
          font-weight: bold;
          font-size: 32rpx;
          line-height: 48rpx;
          margin-bottom: 4rpx;
        }

        .subtitle {
          font-size: 22rpx;
          color: rgba(47, 48, 49, 0.5);
          line-height: 34rpx;
        }
      }

      .amb-bg {
        background: linear-gradient(12deg, #fffaff 0%, #ffe5ff 100%);
      }

      .amb-color {
        color: #f03abd;
      }

      .partner-bg {
        background: linear-gradient(12deg, #ffffff 0%, #ffdbd8 100%);
      }

      .partner-color {
        color: #fd422e;
      }

      .activity-bg {
        background: linear-gradient(12deg, #e9f6ff 0%, #dcebff 100%);
      }

      .activity-color {
        color: #126fd1;
      }
    }
  }

  .director-box {
    position: relative;

    .director-swiper {
      width: 100%;
      box-shadow: 0rpx 4rpx 8rpx -4rpx rgba(0, 0, 0, 0.08);
      border-radius: 24rpx;

      .director-item {
        width: 100%;
        margin-bottom: 24rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #f4f9fe;
        box-sizing: border-box;
        padding: 24rpx 2rpx 24rpx 24rpx;
        border-radius: 12rpx;

        .item-left {
          width: 36%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20rpx;

          .img-head {
            width: 220rpx;
            height: 220rpx;
            border-radius: 20rpx;
          }
        }

        .item-right {
          width: 64%;
          display: flex;
          flex-direction: column;

          .item-row {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
          }

          .item-name {
            font-weight: bold;
            font-size: 34rpx;
            color: #2f3031;
            line-height: 52rpx;
            margin-bottom: 12rpx;
          }

          .item-status {
            // width: 140rpx;
            word-wrap: break-word;
            overflow-wrap: break-word;
            box-sizing: border-box;
            padding: 2rpx 12rpx;

            background: #f2e4cd;
            border-radius: 8rpx;
            font-size: 24rpx;
            color: #89633f;
            line-height: 36rpx;
            margin-left: 12rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 4rpx;
          }

          .item-title {
            font-size: 24rpx;
            color: #2f3031;
            line-height: 36rpx;
            margin-bottom: 8rpx;
          }

          .item-info {
            width: 96%;
            font-size: 24rpx;
            color: rgba(47, 48, 49, 0.75);
            line-height: 36rpx;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

  .icon-right {
    width: 12rpx;
    height: 24rpx;
    margin-left: 8rpx;
    // margin-top: 2rpx;
  }

  .ecology-module {
    padding: 24rpx 24rpx 0rpx 0rpx;

    .ecology-row {
      width: 100%;
      box-sizing: border-box;
      padding: 0rpx 4rpx 24rpx 24rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .ecology-title {
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
        font-weight: bold;
      }

      .ecology-more {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }

    .ecology-list {
      width: 100%;

      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .ecology-item {
        width: 315rpx;
        height: 300rpx;
        display: flex;
        flex-direction: column;
        align-items: center;

        background: #f4f9fe;
        border-radius: 12rpx;
        margin-bottom: 25rpx;
        margin-left: 24rpx;
        box-sizing: border-box;
        padding-top: 24rpx;

        .item-icon {
          width: 100rpx;
          height: 100rpx;
          margin-bottom: 12rpx;
        }

        .item-title {
          font-size: 28rpx;
          color: #126fd1;
          line-height: 42rpx;
          font-weight: bold;
          margin-bottom: 10rpx;
        }

        .item-subtitle {
          font-size: 24rpx;
          color: rgba(47, 48, 49, 0.75);
          line-height: 36rpx;
          width: 251rpx;
          text-align: center;
        }
      }
    }
  }
}
</style>

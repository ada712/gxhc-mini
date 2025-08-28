<template>
  <view class="wripper">
    <view class="top-box">
      <image :src="imgPath + '/partner/jyzbg.png'" class="img-jyzbg" />
      <image :src="imgPath + '/partner/icon_jyzphb.png'" class="img-jyzfont" />
      <!-- <view class="top-row">
      <text class="explain">排行说明</text>
      <image :src="imgPath+'/partner/icon_info.png'" class="icon-info" />
    </view> -->
    </view>
    <view class="bottom-box">
      <view class="content">
        <view class="title-row">
          <image
            :src="imgPath + '/partner/icon_three_left.png'"
            class="icon-three-line"
          />
          <text class="title-text">校园大使TOP20</text>
          <image
            :src="imgPath + '/partner/icon_three_right.png'"
            class="icon-three-line"
          />
        </view>
        <view class="list">
          <!-- <view class="item onebg">
          <view class="item-left">
            <image :src="imgPath+'/partner/icon_no1.png'" class="icon-guanjun" />
            <image :src="imgPath+'/partner/img_photo_female.png'" class="img-head" />
            <view class="info">
              <view class="name">黄亦玟</view>
              <view class="position">校园合伙人（管理层）</view>
            </view>
          </view>
          <view class="item-right">
            236
          </view>
        </view>
        <view class="item twobg">
          <view class="item-left">
            <image :src="imgPath+'/partner/icon_no2.png'" class="icon-guanjun" />
            <image :src="imgPath+'/partner/img_photo_female.png'" class="img-head" />
            <view class="info">
              <view class="name">黄亦玟</view>
              <view class="position">校园合伙人（管理层）</view>
            </view>
          </view>
          <view class="item-right">
            236
          </view>
        </view>
        <view class="item threebg">
          <view class="item-left">
            <image :src="imgPath+'/partner/icon_no3.png'" class="icon-guanjun" />
            <image :src="imgPath+'/partner/img_photo_female.png'" class="img-head" />
            <view class="info">
              <view class="name">黄亦玟</view>
              <view class="position">校园合伙人（管理层）</view>
            </view>
          </view>
          <view class="item-right">
            236
          </view>
        </view> -->
          <view
            :class="'item ' + getRankClass(index + 1)"
            v-for="(item, index) in list"
            :key="index"
          >
            <view class="item-left">
              <view class="item-index">{{ index + 1 }}</view>
              <image
                :src="imgPath + '/partner/img_photo_female.png'"
                class="img-head"
              />
              <view class="info">
                <view class="name">{{ item.name }}</view>
                <view class="position">{{ item.position }}</view>
              </view>
            </view>
            <view class="item-right">
              {{ item.point }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      list: [
        {
          name: "黄亦玟",
          gender: "female",
          position: "校园合伙人（管理层）",
          point: 240,
        },
        {
          name: "郑云潇",
          gender: "male",
          position: "校园合伙人（组长）",
          point: 232,
        },
        {
          name: "廖喜盈",
          gender: "female",
          position: "校园大使（组长）",
          point: 157.76,
        },
        {
          name: "梁向晴",
          gender: "female",
          position: "校园大使（组长）",
          point: 78,
        },
        {
          name: "蔡浩蕾",
          gender: "female",
          position: "校园大使",
          point: 60,
        },
        {
          name: "李昱心",
          gender: "female",
          position: "校园大使",
          point: 40,
        },
        {
          name: "王艺茹",
          gender: "female",
          position: "校园大使",
          point: 20,
        },
        {
          name: "王炳翰",
          gender: "male",
          position: "校园大使",
          point: 15,
        },
      ],
    };
  },
  methods: {
    getRankClass(rank) {
      console.log("rank:", rank); // 调试信息
      switch (rank) {
        case 1:
          return "onebg";
        case 2:
          return "twobg";
        case 3:
          return "threebg";
        default:
          return "default-style";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wripper {
  width: 100%;
  position: relative;
  .top-box {
    width: 100%;
    height: 334rpx;
    position: relative;
    .img-jyzbg {
      width: 100%;
      height: 100%;
    }
    .img-jyzfont {
      width: 297rpx;
      height: 72rpx;
      position: absolute;
      top: 80rpx;
      left: 40rpx;
    }
    .top-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: absolute;
      left: 40rpx;
      top: 164rpx;
      .explain {
        font-size: 32rpx;
        color: #843414;
        line-height: 48rpx;
        font-weight: bold;
      }
      .icon-info {
        width: 32rpx;
        height: 32rpx;
        margin-left: 12rpx;
      }
    }
  }
  .bottom-box {
    width: 100%;
    box-sizing: border-box;
    padding: 0rpx 24rpx 25rpx 24rpx;
    .content {
      width: 100%;
      border-radius: 24rpx;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 32rpx 24rpx 0rpx 24rpx;
      .title-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .title-text {
          font-size: 40rpx;
          color: #843414;
          line-height: 55rpx;
          font-weight: bold;
          margin-left: 18rpx;
          margin-right: 18rpx;
        }
        .icon-three-line {
          width: 24rpx;
          height: 20rpx;
        }
      }
      .list {
        display: flex;
        flex-direction: column;
        margin-top: 33rpx;
        .item {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
          padding: 21rpx 24rpx 21rpx 20rpx;
          margin-bottom: 16rpx;
          .item-left {
            width: 90%;
            display: flex;
            flex-direction: row;
            align-items: center;
            .icon-guanjun {
              width: 63rpx;
              height: 74rpx;
              margin-right: 16rpx;
            }
            .img-head {
              width: 92rpx;
              height: 92rpx;
              border-radius: 50%;
              margin-right: 24rpx;
            }
            .info {
              display: flex;
              flex-direction: column;
              .name {
                font-size: 32rpx;
                color: #2f3031;
                line-height: 48rpx;
                font-weight: bold;
              }
              .position {
                font-size: 24rpx;
                color: rgba(47, 48, 49, 0.5);
                line-height: 36rpx;
                margin-top: 8rpx;
              }
            }
          }
          .item-right {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
          }
        }
        .item-index {
          width: 63rpx;
          height: 74rpx;
          font-weight: 600;
          font-size: 40rpx;
          color: #959595;
          line-height: 56rpx;
          margin-right: 16rpx;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .onebg {
          background: linear-gradient(270deg, #ffffff 0%, #fcefdd 100%);
          border-radius: 12rpx;
        }
        .twobg {
          background: linear-gradient(270deg, #ffffff 0%, #d9e6fa 100%);
          border-radius: 12rpx;
        }
        .threebg {
          background: linear-gradient(270deg, #ffffff 0%, #fbdede 100%);
          border-radius: 12rpx;
        }
      }
    }
  }
}
</style>

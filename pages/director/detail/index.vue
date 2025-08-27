<template>
  <view class="item-wripper">
    <image :src="imgUrl + '/mine/img-jf-bg.png'" class="item-bg" />
    <view class="content">
      <view class="card">
        <view class="card-top">
          <view class="card-top-left">
            <view class="top-left-row">
              <text class="name">{{ directorItem.name }}</text>
              <image
                :src="imgUrl + '/icons/icon_women.png'"
                class="icon-sex"
                v-if="directorItem.gender === 'female'"
              />
              <image
                :src="imgUrl + '/icons/icon_men.png'"
                class="icon-sex"
                v-if="directorItem.gender === 'male'"
              />
            </view>
            <view class="position">{{ directorItem.title }}</view>
          </view>
          <view class="card-top-right">
            <image :src="directorItem.photo" class="card-head" />
          </view>
        </view>
        <view class="card-bottom"> 成员身份：{{ directorItem.position }} </view>
      </view>
      <view class="brief">{{ directorItem.introduction }}</view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      directorId: "",
      directorItem: {},
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
page {
  background: #f4f8fb;
}
.item-wripper {
  width: 100%;
  position: relative;
  .item-bg {
    width: 100%;
    height: 260rpx;
  }
  .content {
    position: absolute;
    top: 40rpx;
    width: 100%;
    box-sizing: border-box;
    padding: 0 32rpx;
    .card {
      width: 100%;
      height: 320rpx;
      background: #ffffff;
      box-shadow: 0rpx 4rpx 8rpx -4rpx rgba(0, 0, 0, 0.08);
      border-radius: 40rpx;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 40rpx;
      .card-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .card-top-left {
          display: flex;
          flex-direction: column;
          .top-left-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            .name {
              font-size: 48rpx;
              color: #2f3031;
              line-height: 72rpx;
              font-weight: bold;
            }
            .icon-sex {
              width: 40rpx;
              height: 40rpx;
              margin-left: 8rpx;
            }
          }
          .position {
            font-size: 24rpx;
            color: #2f3031;
            line-height: 36rpx;
            margin-top: 8rpx;
          }
        }
        .card-top-right {
          width: 150rpx;
          height: 150rpx;
          // background: #D8D8D8;
          box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(184, 176, 176, 0.5);
          border: 3rpx solid #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          .card-head {
            width: 146rpx;
            height: 146rpx;
            border-radius: 50%;
          }
        }
      }
      .card-bottom {
        font-size: 24rpx;
        color: rgba(47, 48, 49, 0.75);
        line-height: 36rpx;
        margin-top: 58rpx;
      }
    }
    .brief {
      font-size: 28rpx;
      color: rgba(47, 48, 49, 0.75);
      line-height: 42rpx;
      margin-top: 40rpx;
    }
  }
}
</style>

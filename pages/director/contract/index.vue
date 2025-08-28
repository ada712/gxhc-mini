<template>
  <view class="wripper">
    <view class="list" v-if="list.length > 0">
      <view
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="handleLookContract"
        data-url="{{item.fileURL}}"
      >
        <view class="row">
          <view class="left-row">
            <image
              :src="imgPath + '/icons/icon-contact.png'"
              class="icon-contact"
            />
            <view class="name">{{ item.title }}</view>
          </view>
          <image
            :src="imgPath + '/icons/icon-right-arrow.png'"
            class="icon-right"
          />
        </view>
        <view class="row">
          <view
            class="left-row"
            @click="handleCopyContractNum"
            data-num="{{item.contractNumber}}"
          >
            <view class="label">合同编号：</view>
            <view class="value">{{ item.contractNumber }}</view>
            <image
              :src="imgPath + '/icons/icon-gray-copy.png'"
              class="icon-copy"
            />
          </view>
        </view>

        <view class="row">
          <view class="left-row">
            <view class="label">合同类型：</view>
            <view class="value">{{ item.contractTypeName }}</view>
          </view>
        </view>
        <view class="row">
          <view class="left-row">
            <view class="label">签署时间：</view>
            <view class="value">{{ item.signAt }}</view>
          </view>
        </view>
        <view class="row">
          <view class="left-row">
            <view class="label">合同时间：</view>
            <view class="value">{{ item.startDate }} — {{ item.endDate }}</view>
          </view>
        </view>
        <view
          :class="
            'status ' + item.status === 'already'
              ? 'aready'
              : item.status === 'expired'
              ? 'over'
              : item.status === 'wait'
              ? 'wait'
              : 'gray'
          "
          >{{ item.statusName }}</view
        >
      </view>
    </view>
    <view class="empty-box" v-if="list.length == 0">
      <image :src="imgPath + '/index/img-no-data.png'" class="img-no-data" />
      <view class="subtitle">暂无签订的合同</view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      list: [],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;

  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    .item {
      width: 100%;
      margin-bottom: 24rpx;
      border-radius: 24rpx;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 24rpx 24rpx 2rpx 24rpx;
      position: relative;
      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24rpx;
        font-size: 28rpx;
        line-height: 42rpx;
        .left-row {
          width: 85%;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .icon-contact {
          width: 48rpx;
          height: 48rpx;
          margin-right: 12rpx;
        }
      }
      .icon-right {
        width: 32rpx;
        height: 32rpx;
      }
      .name {
        font-weight: bold;
        font-size: 32rpx;
        line-height: 48rpx;
        color: #2f3031;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 489rpx;
      }
      .label {
        color: rgba(47, 48, 49, 0.75);
      }
      .value {
        color: #2f3031;
      }
      .icon-copy {
        margin-left: 12rpx;
        width: 30rpx;
        height: 30rpx;
      }
      .status {
        width: 120rpx;
        height: 48rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12rpx;
        font-size: 24rpx;
        line-height: 36rpx;
        position: absolute;
        top: 150rpx;
        right: 24rpx;
      }
      .wait {
        color: #e47318;
        border: 1rpx solid #e47318;
      }
      .aready {
        color: #2aa570;
        border: 1rpx solid #2aa570;
      }
      .over {
        color: #d54942;
        border: 1rpx solid #d54942;
      }
      .gray {
        color: #86858a;
        border: 1rpx solid #86858a;
      }
    }
  }
}
</style>

<template>
  <view class="wripper">
    <scroll-view class="list" scroll-x="false" scroll-y="true">
      <view class="item" v-for="(item, key) in list" :key="key">
        <image
          class="photo"
          v-if="item.profilePhoto"
          :src="item.profilePhoto"
        />
        <image
          class="photo"
          v-else
          :src="
            item.gender === 'male'
              ? imgUrl + '/partner/img_photo_male.png'
              : imgUrl + '/partner/img_photo_female.png'
          "
        />

        <view class="info">
          <view class="row mb4">
            <view class="name">{{ item.reallyName }}</view>
            <view class="grade">
              <image :src="imgUrl + '/campus/icon_xl.png'" class="hat" />
              <view class="level">{{ item.highestEdu }}</view>
            </view>
          </view>
          <view class="row mb5">
            <text class="major">专业</text>
            <view class="cut"></view>
            <text class="major">{{ item.major }}</text>
          </view>
          <view class="partner">校园合伙人</view>

          <view class="row">
            <image
              :src="imgUrl + '/campus/icon_xxmc.png'"
              class="icon-school"
            />
            <view class="school-name">{{ item.schoolName }}</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";

export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      pageIndex: 1,
      list: [
        {
          _id: "25e993b766d8089b099d8f29729e59bc",
          birthday: "2003-08-21",
          referrerName: "毛邦铭",
          owner: "1803248890808373250",
          referrerContact: "18518089514",
          gender: "female",
          partnerLevel: "partner",
          mobile: "15600492003",
          reviewers: [],
          createdAt: 1725434011336,
          createBy: "1803248890808373250",
          major: "经济学（辅修大数据）",
          wechatNum: "Grace201201",
          updateBy: "1803248890808373250",
          reallyName: "黄亦玟",
          _openid: "1803248890808373250",
          hasReferrer: "true",
          gradYear: "2026",
          schoolName: "中国农业大学",
          wechatName: "黄亦玟",
          highestEdu: "本科",
          email: "huangyiwen6@163.com",
          status: "pending",
          updatedAt: 1725434011336,
        },
        {
          _id: "2ad666ce66d80a1809a553ed14b3b29b",
          birthday: "1998-10-09",
          referrerContact: "18518089514",
          gender: "male",
          partnerLevel: "partner",
          createdAt: 1725434392871,
          profilePhoto:
            "cloud://prod-cloud-env-9gqq29j68db5f470.7072-prod-cloud-env-9gqq29j68db5f470-1326719267/weda-uploader/0aeee364c5cf1ca6fa523af1a91f91b1-微信图片_20240904151852.jpg",
          major: "绿色化学",
          updateBy: "1803248890808373250",
          reallyName: "郑云潇",
          hasReferrer: "true",
          schoolName: "帝国理工学院",
          wechatName: "郑云潇101",
          highestEdu: "硕士",
          email: "zheng_yunxiao101@163.com",
          updatedAt: 1725434392871,
          referrerName: "毛邦铭",
          owner: "1803248890808373250",
          mobile: "15811480934",
          reviewers: [],
          createBy: "1803248890808373250",
          wechatNum: "wxid_sd9axb9fb0si22",
          _openid: "1803248890808373250",
          gradYear: "2023",
          status: "pass",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
page {
  background: #f4f4f4;
}
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;

  .item {
    width: 100%;
    background: #ffffff;
    box-shadow: 0rpx 4rpx 8rpx -4rpx rgba(0, 0, 0, 0.08);
    border-radius: 24rpx;
    box-sizing: border-box;
    padding: 24rpx;
    display: flex;
    flex-direction: row;
    margin-bottom: 24rpx;
    .photo {
      width: 200rpx;
      height: 200rpx;
      border-radius: 20rpx;
      margin-right: 24rpx;
    }
    .info {
      display: flex;
      flex-direction: column;
      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        .name {
          font-size: 34rpx;
          color: #2f3031;
          line-height: 52rpx;
          font-weight: bold;
        }
        .grade {
          display: flex;
          flex-direction: row;
          align-items: center;
          background: #f2e4cd;
          border-radius: 8rpx;
          margin-left: 17rpx;
          box-sizing: border-box;
          padding: 5rpx 8rpx;
          height: 36rpx;
          .hat {
            width: 24rpx;
            height: 22rpx;
            margin-right: 4rpx;
          }
          .level {
            font-size: 24rpx;
            color: #89633f;
            line-height: 36rpx;
          }
        }
      }
      .major {
        font-size: 24rpx;
        color: rgba(47, 48, 49, 0.75);
        line-height: 36rpx;
      }
      .cut {
        width: 1rpx;
        height: 24rpx;
        background: #e5e6e6;
        margin-left: 12rpx;
        margin-right: 12rpx;
      }
      .mb4 {
        margin-bottom: 4rpx;
      }
      .mb5 {
        margin-bottom: 5rpx;
      }

      .partner {
        font-size: 24rpx;
        color: #2f3031;
        line-height: 36rpx;
        margin-bottom: 23rpx;
      }
      .icon-school {
        width: 24rpx;
        height: 27rpx;

        margin-right: 8rpx;
      }
      .school-name {
        font-size: 24rpx;
        color: #2f3031;
        line-height: 36rpx;
        margin-right: 7rpx;
      }
    }
  }
}
</style>

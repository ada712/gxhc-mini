<template>
  <view class="service-wripper">
    <view class="list">
      <view class="item" v-for="(item, key) in list" :key="key">
        <image :src="item.icon" class="item-icon" />
        <view class="item-name">{{ item.name }}</view>
        <view class="item-notes">{{ item.introduce }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      list: [
        {
          id: "service01",
          name: "多⽣态算⼒",
          icon: imgUrls + "/index/server_dstsl.png",
          introduce:
            "理事会向孵化项⽬提供优质且价格优惠的多⽣态算⼒资源渠道，包括英伟达全系以及华为、燧原、沐曦、天数等国产算⼒⽣态。",
        },
        {
          id: "service02",
          name: "法律服务",
          icon: imgUrls + "/index/icon_fvfw2.png",
          introduce:
            "初创企业内部制度建设；初创企业业务合同建议；初创企业股权结构咨询；初创企业定制化法律咨询",
        },
        {
          id: "service03",
          name: "结构化数据集",
          icon: imgUrls + "/index/server_jghsjj.png",
          introduce:
            "理事会发挥⾃身数据要素市场优势搭建或联合数据运营企业汇集各⾏业结构化数据集来⽀持理事会项⽬训练。",
        },
        {
          id: "service04",
          name: "媒体服务",
          icon: imgUrls + "/index/server_mtfw.png",
          introduce:
            "创业者访谈 理事会将运营官⽅视频账号，对所有项⽬进⾏短视频访谈录制，并在私域进⾏初创公司宣传；理事会将帮助企业对接主流及⾏业媒体，帮助企业建⽴PR渠道。",
        },
        {
          id: "service05",
          name: "技术咨询",
          icon: imgUrls + "/index/server_flzxfw.png",
          introduce:
            "为企业提供技术产品化咨询服务；为企业提供技术发展路线咨询服务",
        },
        {
          id: "service06",
          name: "孵化营合作",
          icon: imgUrls + "/index/icon_fhyhz.png",
          introduce:
            "为创始⼈提升内部管理能⼒；为企业提供路演机会；帮助企业申请荣誉及资质",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f4f4f4;
}
.service-wripper {
  width: 100%;

  .list {
    width: 100%;
    box-sizing: border-box;
    padding: 32rpx 0rpx 48rpx 24rpx;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .item {
      width: 338rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 32rpx;
      background-color: #ffffff;
      border-radius: 24rpx;
      margin-bottom: 24rpx;
      margin-right: 25rpx;
      .item-icon {
        width: 100rpx;
        height: 100rpx;
        margin-bottom: 10rpx;
      }
      .item-name {
        font-size: 32rpx;
        line-height: 48rpx;
        color: #2f3031;
        font-weight: bold;
        margin-bottom: 6rpx;
      }
      .item-notes {
        font-size: 28rpx;
        color: rgba(47, 48, 49, 0.5);
        line-height: 42rpx;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 3; /* 限制在一个块元素显示的文本的行数，这里是2行 */
        // overflow: hidden;
        // text-overflow: ellipsis;
      }
    }
  }
}
</style>

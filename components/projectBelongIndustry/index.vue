<template>
  <view class="fixed-wripper" @click="onCloseFixedbg">
    <view class="industry-module" @click.stop="() => {}">
      <view class="industry-head">
        <view class="head-title">请选择项目所属行业</view>
        <view class="head-close" @click="onCloseIndustry">
          <image
            src="/static/images/icons/icon-close-gray.png"
            class="icon-close"
          />
        </view>
      </view>
      <scroll-view
        class="industry-list"
        :show-scrollbar="false"
        :enhanced="true"
        scroll-y
      >
        <view
          class="item"
          @click="onChangeIndustryItem(item)"
          v-for="(item, key) in list"
          :key="key"
        >
          <view :class="'item-left ' + (item.checked ? 'active-txt' : '')">{{
            item.name
          }}</view>
          <view class="item-right">
            <image
              :src="
                item.checked
                  ? '/static/images/icons/icon-checked2.png'
                  : '/static/images/icons/icon-chekcked1.png'
              "
              class="icon-checked"
            />
          </view>
        </view>
      </scroll-view>
      <view class="industry-foot">
        <view class="industry-btn" @click="onSureIndustry">确定</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    industryName: {
      type: String,
      value: "",
    },
  },
  emits: ["sureIndustry", "closeIndustry"],
  data: function () {
    return {
      list: [
        {
          name: "大模型",
          key: "largeModel",
          checked: false,
        },
        {
          name: "人工智能基础设施",
          key: "artificialInfrastructure",
          checked: false,
        },
        {
          name: "垂类人工智能行业应用",
          key: "verticalArtificialIntelligence",
          checked: false,
        },
        {
          name: "数据库",
          key: "database",
          checked: false,
        },
        {
          name: "算力",
          key: "computationalPower",
          checked: false,
        },
        {
          name: "大数据",
          key: "BigData",
          checked: false,
        },
        {
          name: "区块链",
          key: "blockchain",
          checked: false,
        },
        {
          name: "数据安全",
          key: "dataSecurity",
          checked: false,
        },
        {
          name: "其他",
          key: "other",
          checked: false,
        },
      ],
      chooseIndustry: "",
    };
  },
  methods: {
    onChangeIndustryItem(item) {
      const newList = this.list.map((v) => {
        v.checked = false;
        if (v.key === item.key) {
          v.checked = !v.checked;
        }
        return v;
      });
      this.chooseIndustry = item.name;
      this.list = newList;
    },
    onSureIndustry() {
      if (!this.chooseIndustry) {
        return uni.showToast({
          title: "请选择~",
          icon: "none",
        });
      }
      this.$emit("sureIndustry", {
        industryName: this.chooseIndustry,
      });
      this.$emit("closeIndustry");
    },
    onCloseIndustry() {
      this.$emit("closeIndustry");
    },
  },
};
</script>

<style scoped lang="scss">
.fixed-wripper {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
}
.industry-module {
  width: 100%;
  background-color: #ffffff;
  border-radius: 24rpx 24rpx 0rpx 0rpx;
  z-index: 101;
  position: fixed;
  bottom: 0;
  left: 0;
  .industry-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 112rpx;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    box-sizing: border-box;
    padding-left: 32rpx;
    .head-title {
      font-size: 32rpx;
      color: #2f3031;
      line-height: 48rpx;
      font-weight: bold;
    }
    .head-close {
      display: flex;
      box-sizing: border-box;
      padding-right: 36rpx;
      .icon-close {
        width: 24rpx;
        height: 24rpx;
      }
    }
  }
  .industry-list {
    width: 100%;
    height: 576rpx;
    box-sizing: border-box;
    padding: 0 34rpx 0 32rpx;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 96rpx;
      .item-left {
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
      }
      .active-txt {
        font-weight: bold;
        color: #2969ff;
      }
      .item-right {
        width: 15%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .icon-checked {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
  }
  .industry-foot {
    width: 100%;
    box-sizing: border-box;
    padding: 32rpx;
    .industry-btn {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: 88rpx;
      background: #2969ff;
      border-radius: 12rpx;
      font-size: 32rpx;
      color: #ffffff;
      line-height: 48rpx;
      font-weight: bold;
    }
  }
}
</style>

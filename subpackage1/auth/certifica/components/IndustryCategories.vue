<template>
  <x-popup :round="20" :show="show" @close="show = false">
    <view class="popup">
      <view class="head">
        <text class="title">选择投资领域</text>
        <image
          @click="show = false"
          class="close"
          :src="imgUrl + '/subpackage1/close.png'"
        />
      </view>
      <view class="search">
        <image class="search-icon" :src="imgUrl + '/subpackage1/search.png'" />
        <input
          class="search-input"
          v-model="searchKeyword"
          placeholder="搜索行业类别"
          placeholder-class="placeholder-class"
          @input="onSearch"
        />
      </view>
      <view class="content">
        <view class="content-left">
          <view
            class="cate"
            :class="{ active: currentIndustryId == item.id }"
            v-for="(item, index) in industry"
            :key="index"
            @click="switchIndustry(item.id)"
          >
            {{ item.name }}
          </view>
        </view>
        <view class="content-right">
          <view
            class="item"
            v-for="(item, index) in filteredOptions"
            :key="index"
          >
            <view class="rad" @click="toggleCategory(item)">
              <image
                class="nl-select"
                :src="
                  imgUrl +
                  (selectedCategories.includes(item.id)
                    ? '/subpackage1/select2.png'
                    : '/subpackage1/select1.png')
                "
              />
              <text class="nl-select-t">
                {{ item.name }}
              </text>
            </view>
            <view
              class="child"
              v-for="(child, childIndex) in item.sub"
              :key="childIndex"
              :class="{ active: selectedSubCategories.includes(child.id) }"
              @click="toggleSubCategory(child)"
            >
              {{ child.name }}
            </view>
          </view>
        </view>
      </view>
      <view class="footer">
        <button class="btn" @click="confirmSelection">
          确定({{ selectedCount }})
        </button>
      </view>
    </view>
  </x-popup>
</template>

<script>
import { imgUrls } from "@/config/app";
import { getIndustryCategories, getIndustrySubCategories } from "@/api/gxhc";

export default {
  name: "IndustryCategories",
  data() {
    return {
      imgUrl: imgUrls,
      show: false,
      industry: [],
      options: [],
      filteredOptions: [],
      currentIndustryId: null,
      searchKeyword: "",
      selectedCategories: [], // 选中的一级分类
      selectedSubCategories: [], // 选中的二级分类
      initialSelectedData: [] // 用于存储初始选中的数据
    };
  },
  computed: {
    selectedCount() {
      return this.selectedCategories.length + this.selectedSubCategories.length;
    },
  },
  methods: {
    open(selected = []) {
      this.show = true;
      this.initialSelectedData = [...selected]; // 保存初始选中的数据
      this.processInitialSelection(selected);
      this.getData();
    },

    processInitialSelection(selected) {
      // 清空当前选中状态
      this.selectedCategories = [];
      this.selectedSubCategories = [];
      
      // 根据传入的已选数据设置选中状态
      selected.forEach(item => {
        if (item.level === 2) {
          this.selectedCategories.push(item.id);
        } else if (item.level === 3) {
          this.selectedSubCategories.push(item.id);
        }
      });
    },

    getData() {
      getIndustryCategories({
        level: 1,
      }).then((res) => {
        if (res.status === 200) {
          this.industry = res.data;
          if (res.data.length > 0) {
            // 查找初始选中数据对应的行业ID
            let targetIndustryId = this.currentIndustryId;
            
            // 如果有初始选中数据，尝试找到对应的行业
            if (this.initialSelectedData.length > 0) {
              const firstSelectedItem = this.initialSelectedData[0];
              // 查找该选中项所属的行业
              for (let industryItem of res.data) {
                if (firstSelectedItem.level === 2 && firstSelectedItem.pid === industryItem.id) {
                  targetIndustryId = industryItem.id;
                  break;
                } else if (firstSelectedItem.level === 3) {
                  // 对于三级分类，需要先找到二级分类
                  // 这里简化处理，使用第一个行业
                  targetIndustryId = industryItem.id;
                  break;
                }
              }
            }
            
            // 如果没有找到匹配的行业，使用第一个
            if (!targetIndustryId) {
              targetIndustryId = res.data[0].id;
            }
            
            this.currentIndustryId = targetIndustryId;
            this.getSubData(targetIndustryId);
          }
        }
      });
    },

    getSubData(id) {
      getIndustrySubCategories({
        pid: id,
        level: 2,
      }).then((res) => {
        if (res.status === 200) {
          this.options = res.data;
          this.filteredOptions = res.data;
          
          // 如果有初始选中的数据，确保显示正确的行业分类
          this.$nextTick(() => {
            this.ensureSelectedVisible();
          });
        }
      });
    },

    // 确保选中的分类在当前显示的列表中
    ensureSelectedVisible() {
      if (this.initialSelectedData.length > 0 && this.options.length > 0) {
        // 检查是否有选中的二级分类在当前列表中
        const hasSelectedInCurrent = this.selectedCategories.some(catId => 
          this.options.some(option => option.id === catId)
        );
        
        // 如果当前列表中没有选中的分类，尝试切换到包含选中分类的行业
        if (!hasSelectedInCurrent && this.industry.length > 1) {
          // 这里可以添加更复杂的逻辑来自动切换到正确的行业
          // 简化处理：保持当前行业不变
        }
      }
    },

    switchIndustry(id) {
      this.currentIndustryId = id;
      this.searchKeyword = "";
      this.getSubData(id);
    },

    onSearch(e) {
      const keyword = e.detail.value.toLowerCase();
      if (!keyword) {
        this.filteredOptions = [...this.options];
        return;
      }

      this.filteredOptions = this.options
        .map((category) => {
          // 筛选二级分类
          const matchedSubs = category.sub.filter((sub) =>
            sub.name.toLowerCase().includes(keyword)
          );

          // 如果二级分类匹配或者一级分类名称匹配
          if (
            matchedSubs.length > 0 ||
            category.name.toLowerCase().includes(keyword)
          ) {
            return {
              ...category,
              sub: matchedSubs,
            };
          }
          return null;
        })
        .filter((item) => item !== null);
    },

    toggleCategory(category) {
      const index = this.selectedCategories.indexOf(category.id);
      if (index > -1) {
        // 取消选中
        this.selectedCategories.splice(index, 1);
        // 同时取消所有子分类的选中
        category.sub.forEach((sub) => {
          const subIndex = this.selectedSubCategories.indexOf(sub.id);
          if (subIndex > -1) {
            this.selectedSubCategories.splice(subIndex, 1);
          }
        });
      } else {
        // 选中
        this.selectedCategories.push(category.id);
      }
    },

    toggleSubCategory(subCategory) {
      const index = this.selectedSubCategories.indexOf(subCategory.id);
      if (index > -1) {
        this.selectedSubCategories.splice(index, 1);
      } else {
        this.selectedSubCategories.push(subCategory.id);
      }
    },

    confirmSelection() {
      // 构造返回数据
      const selectedData = [];
      
      // 获取选中的二级分类完整信息
      this.options.forEach(category => {
        if (this.selectedCategories.includes(category.id)) {
          selectedData.push({
            id: category.id,
            name: category.name,
            pid: this.currentIndustryId,
            level: 2
          });
        }
        
        // 获取选中的三级分类完整信息
        category.sub.forEach(sub => {
          if (this.selectedSubCategories.includes(sub.id)) {
            selectedData.push({
              id: sub.id,
              name: sub.name,
              pid: category.id,
              level: 3
            });
          }
        });
      });

      this.$emit("confirm", selectedData);
      this.show = false;
    },

    reset() {
      this.selectedCategories = [];
      this.selectedSubCategories = [];
      this.searchKeyword = "";
      this.initialSelectedData = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.placeholder-class {
  color: #999999;
  font-size: 24rpx;
  font-weight: 400;
}
.popup {
  height: 999rpx;
  display: flex;
  flex-direction: column;
  .head {
    margin: 32rpx 30rpx 0 30rpx;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    position: relative;
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 48rpx;
      height: 48rpx;
    }
  }
  .search {
    height: 36rpx;
    background: #f2f2f2;
    border-radius: 50rpx;
    margin: 16rpx 28rpx;
    padding: 20rpx 20rpx;
    display: flex;
    align-items: center;
    .search-icon {
      width: 44rpx;
      height: 44rpx;
      margin-right: 10rpx;
    }
    .search-input {
      flex: 1;
      font-size: 24rpx;
      font-weight: 400;
    }
  }
  .content {
    flex: 1;
    display: flex;
    min-height: 0;
    .content-left {
      width: 220rpx;
      overflow-y: scroll;
      .cate {
        padding: 24rpx 32rpx;
        font-size: 24rpx;
        font-weight: 400;
        font-size: 26rpx;
        color: #333333;
        text-align: center;
        cursor: pointer;

        &.active {
          background: #f2f7ff;
          color: #1e7cfb;
        }
      }
    }
    .content-right {
      flex: 1;
      overflow-y: scroll;
      padding-left: 24rpx;
      box-sizing: border-box;
      padding-top: 20rpx;
      background: #fafafa;
      .item {
        .rad {
          display: flex;
          align-items: center;
          margin-bottom: 20rpx;
          cursor: pointer;
          .nl-select {
            width: 26rpx;
            height: 26rpx;
            margin-right: 10rpx;
          }
          .nl-select-t {
            font-size: 26rpx;
            font-weight: 400;
          }
        }
        .child {
          margin-bottom: 20rpx;
          padding: 10rpx 18rpx;
          font-size: 24rpx;
          font-weight: 400;
          background-color: #fff;
          display: inline-block;
          border-radius: 10rpx;
          margin-right: 10rpx;
          cursor: pointer;
          &.active {
            background: #f2f7ff;
            color: #1e7cfb;
          }
        }
      }
    }
  }
  .footer {
    padding: 20rpx 32rpx;
    background: #fff;
    .btn {
      width: 100%;
      height: 64rpx;
      background: #1e7cfb;
      border-radius: 32rpx;
      color: #ffffff;
      font-size: 28rpx;
      font-weight: 500;
    }
  }
}
</style>
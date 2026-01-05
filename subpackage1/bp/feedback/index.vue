<!-- /subpackage1/bp/feedback/index.vue -->
<template>
  <view class="container">
    <view class="feedback-card">
      <!-- Header -->
      <view class="header">
        <view class="header-content">
          <view class="header-title">
            <image
              class="header-icon"
              src="/static/images/my/feekback/center.png"
              mode="aspectFit"
            />
            <text class="header-text">反馈中心</text>
          </view>
          <text class="header-subtitle"
            >帮助我们进化，提供更精准的BP诊断</text
          >
        </view>
      </view>

      <!-- Main Content -->
      <view class="main-content">
        <!-- Success State -->
        <view v-if="isSuccess" class="success-state">
          <view class="success-icon-container">
            <image
              class="success-icon"
              :src="imgUrl + '/subpackage1/select2.png'"
            />
          </view>
          <text class="success-title">反馈已收到</text>
          <text class="success-subtitle">感谢您的建议</text>
        </view>

        <!-- Form State -->
        <form v-else class="form-container">
          <!-- Category Selection -->
          <view class="category-section">
            <text class="section-label">想聊聊哪方面？</text>
            <view class="category-grid">
              <view
                v-for="category in categories"
                :key="category.id"
                class="category-item"
                :class="{ active: selectedCategory === category.id }"
                @click="selectCategory(category.id)"
              >
                <image
                  v-if="category.iconPath"
                  class="category-icon"
                  :class="{ 'active-icon': selectedCategory === category.id }"
                  :src="selectedCategory === category.id ? (category.iconPathActive || category.iconPath) : category.iconPath"
                  mode="aspectFit"
                />
                <text class="category-label">{{ category.label }}</text>
              </view>
            </view>
          </view>

          <!-- Feedback Input -->
          <view class="feedback-section">
            <view class="feedback-input-container">
              <text class="section-label">您的具体建议</text>
              <textarea
                class="feedback-textarea"
                v-model="feedbackText"
                placeholder="请输入"
              >
              </textarea>
            </view>
          </view>

          <!-- Submit Button -->
          <view
            class="submit-button"
            :class="{ disabled: !canSubmit }"
            :disabled="!canSubmit || isSubmitting"
            @click="handleSubmit"
          >
            <text v-if="isSubmitting">提交中...</text>
            <view v-else class="submit-content">
              <text>提交反馈</text>
            </view>
          </view>
        </form>
      </view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
import { feedBack } from "@/api/gxhc.js";

export default {
  data() {
    return {
      imgUrl: imgUrls,
      selectedCategory: "report_logic", // 默认选中第一个
      feedbackText: "",
      isSubmitting: false,
      isSuccess: false,
      categories: [
        {
          id: "report_logic",
          label: "逻辑策略",
          icon: "11.png",
          iconPath: "/static/images/my/feekback/11.png",
          iconPathActive: "/static/images/my/feekback/12.png",
          placeholder:
            "我觉得关于\"竞争壁垒\"的优化建议不够落地，实际上我们的核心优势是...",
        },
        {
          id: "report_data",
          label: "财务数据",
          icon: "21.png",
          iconPath: "/static/images/my/feekback/21.png",
          iconPathActive: "/static/images/my/feekback/22.png",
          placeholder:
            "报告中关于SAM市场规模的测算逻辑太保守了，我们实际的客单价是...",
        },
        {
          id: "report_tone",
          label: "措辞表达",
          icon: "41.png",
          iconPath: "/static/images/my/feekback/41.png",
          iconPathActive: "/static/images/my/feekback/42.png",
          placeholder: "产品亮点的描述太过于技术化，希望能更通俗易懂一点...",
        },
        {
          id: "feature_new",
          label: "功能需求",
          icon: "61.png",
          iconPath: "/static/images/my/feekback/61.png",
          iconPathActive: "/static/images/my/feekback/62.png",
          placeholder:
            "我希望增加一个\"一键生成路演逐字稿\"的功能，或者支持Excel数据导入...",
        },
        {
          id: "feature_ui",
          label: "体验优化",
          icon: "51.png",
          iconPath: "/static/images/my/feekback/51.png",
          iconPathActive: "/static/images/my/feekback/52.png",
          placeholder:
            "希望能支持在BP预览页上直接对特定页面进行\"意见映射\"标注，方便对照修改...",
        },
        {
          id: "other",
          label: "其它吐槽",
          icon: "31.png",
          iconPath: "/static/images/my/feekback/31.png",
          iconPathActive: "/static/images/my/feekback/32.png",
          placeholder: "请畅所欲言，您的每一个字都在帮助我们进化...",
        },
      ],
    };
  },
  computed: {
    currentCategory() {
      return this.categories.find((c) => c.id === this.selectedCategory) || {};
    },
    canSubmit() {
      return this.selectedCategory && this.feedbackText.trim().length > 0;
    },
  },
  methods: {
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
    },
    handleSubmit() {
      if (!this.canSubmit || this.isSubmitting) return;
      this.isSubmitting = true;
      feedBack({
        category: this.selectedCategory,
        content: this.feedbackText,
      }).then((res) => {
        if (res.status === 200) {
          this.isSubmitting = false;
          this.isSuccess = true;
          // 3秒后重置成功状态
          setTimeout(() => {
            this.isSuccess = false;
            this.feedbackText = "";
            // 保留当前选中的分类，不重置
          }, 3000);
        } else {
          uni.showToast({
            title: res.msg || "反馈提交失败",
            icon: "none",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.feedback-card {
  width: 100%;
  max-width: 700px;
  background-color: #ffffff;
  box-shadow: 0 20rpx 25rpx -5rpx rgba(0, 0, 0, 0.1),
    0 10rpx 10rpx -5rpx rgba(0, 0, 0, 0.04);
  border: 1rpx solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(180deg, #e0f2fe 0%, #ffffff 100%);
  padding: 40rpx 30rpx;
  color: #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.header-content {
  flex: 1;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 10rpx;
}

.header-icon {
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
}

.header-icon {
  width: 38rpx;
  height: 38rpx;
  flex-shrink: 0;
}

.header-text {
  width: 192rpx;
  height: 60rpx;
  opacity: 1;
  color: #000000;
  text-align: left;
  font-size: 48rpx;
  font-weight: 600;
  font-family: "PingFang SC";
  line-height: 60rpx;
}

.header-subtitle {
  font-size: 24rpx;
  color: #64748b;
  font-weight: 400;
  margin-top: 12rpx;
}

.version-tag {
  font-size: 16rpx;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 10rpx 16rpx;
  border-radius: 8rpx;
  color: white;
  border: 1rpx solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  font-weight: bold;
}

.main-content {
  flex: 1;
  padding: 40rpx 30rpx;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.success-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx 0;
  animation: fadeIn 0.3s ease-out;
}

.success-icon-container {
  width: 120rpx;
  height: 120rpx;
  background-color: #dcfce7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
}

.success-icon {
  width: 60rpx;
  height: 60rpx;
}

.success-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16rpx;
}

.success-subtitle {
  font-size: 28rpx;
  color: #64748b;
}

.form-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.category-section {
  margin-bottom: 50rpx;
  flex-shrink: 0;
}

.section-label {
  height: 30rpx;
  opacity: 1;
  color: #a4b0c2;
  text-align: left;
  font-size: 24rpx;
  font-weight: 600;
  font-family: "PingFang SC";
  line-height: 30rpx;
  margin-bottom: 24rpx;
  display: block;
  text-transform: none;
  letter-spacing: 0;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28rpx;
  width: 100%;
}

.category-item {
  width: 190rpx;
  height: 132rpx;
  border-radius: 28rpx;
  opacity: 1;
  background: #fafcfd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  padding: 24rpx 16rpx;
  border: 1rpx solid #e2e8f0;
  transition: all 0.2s ease;
  text-align: center;
  box-sizing: border-box;
}

.category-item.active {
  border-color: #2B7EFF;
  background-color: #ffffff;
  transform: scale(1.02);
  box-shadow: 0 0 0 2rpx rgba(59, 130, 246, 0.2);
}

.category-icon {
  width: 48rpx;
  height: 48rpx;
  flex-shrink: 0;
}

.category-icon.active-icon {
  filter: brightness(0) saturate(100%) invert(27%) sepia(95%) saturate(2075%) hue-rotate(210deg) brightness(98%) contrast(98%);
}

.category-label {
  width: 96rpx;
  height: 30rpx;
  opacity: 1;
  color: #a3afc1;
  text-align: left;
  font-size: 24rpx;
  font-weight: 600;
  font-family: "PingFang SC";
  line-height: 30rpx;
}

.category-item.active .category-label {
  color: #2B7EFF;
  font-weight: 600;
}

.feedback-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 350rpx;
  margin-bottom: 40rpx;
}

.feedback-input-container {
  width: 702rpx;
  height: 596rpx;
  border-radius: 28rpx;
  opacity: 1;
  border: 2rpx solid #f4f7fa;
  box-shadow: 0 4rpx 4rpx 0 rgba(131, 132, 135, 0.1);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 24rpx;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.feedback-input-container:focus-within {
  border-color: #2B7EFF;
}

.feedback-input-container .section-label {
  width: 144rpx;
  height: 30rpx;
  opacity: 1;
  color: #a4b0c2;
  text-align: left;
  font-size: 24rpx;
  font-weight: 600;
  font-family: "PingFang SC";
  line-height: 30rpx;
  margin-bottom: 16rpx;
}

.feedback-textarea {
  flex: 1;
  width: 100%;
  min-height: 200rpx;
  padding: 0;
  box-sizing: border-box;
  background-color: transparent;
  color: #1e293b;
  font-size: 28rpx;
  resize: none;
  border: none;
  outline: none;
}

.feedback-textarea::placeholder {
  width: 72rpx;
  height: 30rpx;
  opacity: 1;
  color: #a4b0c2;
  text-align: left;
  font-size: 24rpx;
  font-weight: 600;
  font-family: "PingFang SC";
  line-height: 30rpx;
  display: block;
}

.uni-textarea-placeholder {
  color: #A4B0C2 !important;
  font-size: 24rpx;
}

.submit-button {
  width: 702rpx;
  height: 128rpx;
  border-radius: 20rpx;
  opacity: 1;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  padding: 0;
  box-sizing: border-box;
  transition: all 0.2s ease;
  transform: scale(1);
  border: none;
  margin-top: 40rpx;
}

.submit-button:not(.disabled) {
  background: #0f172a;
}

.submit-button:active {
  transform: scale(0.95);
}

.submit-button.disabled {
  background-color: #e2e8f0;
  color: #bfcddf;
  cursor: not-allowed;
}

.send-icon {
  width: 28rpx;
  height: 28rpx;
  flex-shrink: 0;
}

.submit-content {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.submit-content text,
.submit-button text {
  opacity: 1;
  color: #ffffff;
  text-align: center;
  font-size: 32rpx;
  font-weight: 700;
  font-family: "Alibaba PuHuiTi 3.0";
  line-height: 50.6rpx;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .header-text {
    font-size: 30rpx;
  }

  .header-subtitle {
    font-size: 20rpx;
  }
}
</style>

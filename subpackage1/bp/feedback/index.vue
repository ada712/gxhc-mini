<!-- /subpackage1/bp/feedback/index.vue -->
<template>
  <view class="container">
    <view class="feedback-card">
      <!-- Header -->
      <view class="header">
        <view class="header-content">
          <view class="header-title">
            <text class="header-text">BP优化建议书 反馈中心</text>
          </view>
          <text class="header-subtitle"
            >帮助我们进化，为您提供更精准的BP诊断</text
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
                <text class="category-label">{{ category.label }}</text>
              </view>
            </view>
          </view>

          <!-- Feedback Input -->
          <view class="feedback-section">
            <view class="feedback-header">
              <text class="section-label">您的具体建议</text>
            </view>

            <view class="feedback-input-container">
              <!-- Inspiration Guide -->
              <view v-if="selectedCategory" class="inspiration-guide">
                <view class="guide-content">
                  <!-- <image
                    class="quote-icon"
                    :src="imgUrl + '/subpackage1/quote.png'"
                  /> -->
                  <view class="guide-text-container">
                    <text class="guide-category"
                      >{{ currentCategory.label }} · 思考引导</text
                    >
                    <text class="guide-text"
                      >"{{ currentCategory.placeholder }}"</text
                    >
                  </view>
                </view>
              </view>

              <!-- Textarea -->
              <textarea
                class="feedback-textarea"
                v-model="feedbackText"
                placeholder="点击此处开始输入..."
              >
              </textarea>

              <!-- Character Count -->
              <view class="char-count">
                <text class="char-count-text"
                  >{{ feedbackText.length }} 字</text
                >
              </view>
            </view>
          </view>

          <!-- Submit Button -->
          <view class="submit-section">
            <button
              class="submit-button"
              :class="{ disabled: !canSubmit }"
              :disabled="!canSubmit || isSubmitting"
              @click="handleSubmit"
            >
              <text v-if="isSubmitting">提交中...</text>
              <view v-else class="submit-content">
                <text>提交反馈</text>
              </view>
            </button>
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
          icon: "trending-up.png",
          placeholder:
            "我觉得关于“竞争壁垒”的优化建议不够落地，实际上我们的核心优势是...",
        },
        {
          id: "report_data",
          label: "财务数据",
          icon: "file-text.png",
          placeholder:
            "报告中关于SAM市场规模的测算逻辑太保守了，我们实际的客单价是...",
        },
        {
          id: "report_tone",
          label: "措辞表达",
          icon: "pen-tool.png",
          placeholder: "产品亮点的描述太过于技术化，希望能更通俗易懂一点...",
        },
        {
          id: "feature_new",
          label: "功能需求",
          icon: "lightbulb.png",
          placeholder:
            "我希望增加一个“一键生成路演逐字稿”的功能，或者支持Excel数据导入...",
        },
        {
          id: "feature_ui",
          label: "体验优化",
          icon: "cpu.png",
          placeholder:
            "希望能支持在BP预览页上直接对特定页面进行“意见映射”标注，方便对照修改...",
        },
        {
          id: "other",
          label: "其他吐槽",
          icon: "message-square.png",
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
  background-color: #f1f5f9;
  padding: 30rpx;
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
  border-radius: 24rpx;
  box-shadow: 0 20rpx 25rpx -5rpx rgba(0, 0, 0, 0.1),
    0 10rpx 10rpx -5rpx rgba(0, 0, 0, 0.04);
  border: 1rpx solid #e2e8f0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60rpx);
  max-height: 900px;
}

.header {
  background: linear-gradient(90deg, #2563eb, #3b82f6, #2dd4bf);
  padding: 40rpx 30rpx;
  border-radius: 24rpx 24rpx 0 0;
  color: white;
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

.header-text {
  font-size: 32rpx;
  font-weight: bold;
  color: white;
}

.header-subtitle {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-top: 6rpx;
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
  font-size: 22rpx;
  font-weight: bold;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1rpx;
  margin-bottom: 24rpx;
  display: block;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  padding: 20rpx 10rpx;
  border-radius: 16rpx;
  border: 1rpx solid #e2e8f0;
  background-color: #ffffff;
  transition: all 0.2s ease;
  text-align: center;
}

.category-item.active {
  border-color: #3b82f6;
  background-color: #3b82f6;
  transform: scale(1.02);
  box-shadow: 0 4rpx 6rpx -1rpx rgba(59, 130, 246, 0.2),
    0 2rpx 4rpx -1rpx rgba(59, 130, 246, 0.1);
}

.category-icon {
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
}

.category-icon.active-icon {
  filter: brightness(0) invert(1);
}

.category-label {
  font-size: 22rpx;
  font-weight: bold;
  color: #64748b;
}

.category-item.active .category-label {
  color: white;
}

.feedback-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 350rpx;
  margin-bottom: 40rpx;
}

.feedback-header {
  margin-bottom: 24rpx;
}

.feedback-input-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 20rpx;
  box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #f1f5f9;
  overflow: hidden;
  transition: all 0.3s ease;
}

.feedback-input-container:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4rpx rgba(59, 130, 246, 0.1);
}

.inspiration-guide {
  background-color: rgba(219, 234, 254, 0.8);
  border-bottom: 1rpx solid #dbeafe;
  padding: 24rpx;
  transition: all 0.3s ease;
}

.guide-content {
  display: flex;
  gap: 20rpx;
}

.quote-icon {
  width: 24rpx;
  height: 24rpx;
  flex-shrink: 0;
  margin-top: 6rpx;
}

.guide-text-container {
  flex: 1;
}

.guide-category {
  font-size: 22rpx;
  font-weight: bold;
  color: #60a5fa;
  text-transform: uppercase;
  letter-spacing: 0.5rpx;
  margin-bottom: 6rpx;
  display: block;
}

.guide-text {
  font-size: 20rpx;
  color: #999;
  font-weight: 500;
  font-style: italic;
  line-height: 1.4;
}

.feedback-textarea {
  flex: 1;
  width: 100%;
  padding: 30rpx 30rpx;
  box-sizing: border-box;
  background-color: white;
  color: #1e293b;
  font-size: 28rpx;
  resize: none;
}

.feedback-textarea::placeholder {
  color: #cbd5e1;
}

.char-count {
  background-color: white;
  padding: 16rpx 24rpx;
  display: flex;
  justify-content: flex-end;
}

.char-count-text {
  font-size: 22rpx;
  color: #cbd5e1;
}

.submit-section {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 30rpx;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  padding: 0rpx 48rpx;
  box-sizing: border-box;
  border-radius: 16rpx;
  font-weight: bold;
  font-size: 28rpx;
  color: white;
  background: linear-gradient(90deg, #2563eb, #2dd4bf);
  transition: all 0.2s ease;
  transform: scale(1);
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
    grid-template-columns: repeat(2, 1fr);
  }

  .header-text {
    font-size: 30rpx;
  }

  .header-subtitle {
    font-size: 20rpx;
  }
}
</style>

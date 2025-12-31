<!-- /subpackage1/bp/applyPlay/index.vue -->
<template>
  <view class="container">
    <view class="form-container">
      <!-- 已有申请提示 -->
      <view v-if="hasExistingApplication" class="application-status">
        <view class="status-success">
          <text class="success-icon">✓</text>
          <text class="success-text">您已成功提交申请</text>
        </view>
        <view class="application-details" v-if="existingApplication">
          <view class="detail-item">
            <text class="label">申请时间:</text>
            <text class="value">{{ existingApplication.add_time }}</text>
          </view>
          <view class="detail-item">
            <text class="label">项目名称:</text>
            <text class="value">{{ existingApplication.project_name }}</text>
          </view>
          <view class="detail-item" v-if="existingApplication.agree_public">
            <text class="label">预约时间:</text>
            <text class="value"
              >{{ existingApplication.expected_date }}
              {{ existingApplication.expected_time }}</text
            >
          </view>
        </view>
      </view>

      <view class="form-item">
        <view class="form-label">
          <text class="required">*</text>
          您的姓名？
        </view>
        <input
          class="form-input"
          placeholder="请输入您的姓名"
          v-model="formData.name"
          :disabled="hasExistingApplication"
        />
      </view>

      <view class="form-item">
        <view class="form-label">
          <text class="required">*</text>
          您的项目名称/简称？
        </view>
        <input
          class="form-input"
          placeholder="请输入项目名称或简称"
          v-model="formData.project_name"
          :disabled="hasExistingApplication"
        />
      </view>

      <view class="form-item">
        <view class="form-label">
          <text class="required">*</text>
          您是否同意直播公开讲解BP
        </view>
        <view class="radio-group">
          <label
            class="radio-item"
            v-for="(item, index) in agreeOptions"
            :key="index"
            @click="hasExistingApplication ? null : selectAgree(item.value)"
          >
            <radio
              :value="item.value"
              :checked="formData.agree_public === item.value"
              color="#2969ff"
              :disabled="hasExistingApplication"
            />
            <text>{{ item.label }}</text>
          </label>
        </view>
      </view>

      <!-- 仅在同意公开讲解时显示以下内容 -->
      <block v-if="formData.agree_public === '1' && !hasExistingApplication">
        <view class="form-item">
          <view class="form-label">
            <text class="required">*</text>
            您期望的直播时间段
          </view>
          <view class="date-selector">
            <picker
              mode="date"
              :value="selectedDate"
              :start="minDate"
              @change="onDateChange"
            >
              <view class="date-picker">
                {{ selectedDate ? formatDate(selectedDate) : "请选择日期" }}
                <text class="arrow">▶</text>
              </view>
            </picker>
          </view>

          <view class="time-slots" v-if="selectedDate">
            <view
              class="time-slot"
              v-for="(slot, index) in availableSlots"
              :key="index"
              :class="{
                selected: selectedTimeSlot === slot.time,
                disabled: slot.booked,
              }"
              @click="selectTimeSlot(slot)"
            >
              {{ slot.time }}
              <text v-if="slot.booked" class="booked-tag">已占用</text>
            </view>

            <view class="no-slots" v-if="availableSlots.length === 0">
              该日期无可用时间段
            </view>
          </view>
        </view>

        <view class="form-item">
          <view class="form-label">
            <text class="required">*</text>
            您是否接受时间调剂
          </view>
          <view class="radio-group">
            <label
              class="radio-item"
              v-for="(item, index) in adjustOptions"
              :key="index"
              @click="selectAdjust(item.value)"
            >
              <radio
                :value="item.value"
                :checked="formData.accept_adjust === item.value"
                color="#2969ff"
              />
              <text>{{ item.label }}</text>
            </label>
          </view>
        </view>
      </block>

      <block v-if="formData.agree_public === '1' && hasExistingApplication">
        <view class="form-item">
          <view class="form-label">
            <text class="required">*</text>
            您期望的直播时间段
          </view>
          <view
            class="date-display"
            v-if="existingApplication && existingApplication.expected_date"
          >
            {{ existingApplication.expected_date }}
            {{ existingApplication.expected_time }}
          </view>
        </view>
      </block>

      <view class="form-item">
        <view class="form-label">
          <text class="required">*</text>
          请输入您的手机号或联系方式，以便我们及时通知您相关的直播信息
        </view>
        <input
          class="form-input"
          placeholder="请输入手机号或微信号等联系方式"
          v-model="formData.contact"
          :disabled="hasExistingApplication"
        />
      </view>
      <view class="tips">
        <text class="tips-t">如报名直播请添加我们官方客服微信：gxhc-cha</text>
      </view>

      <!-- 只有在没有申请时才显示提交按钮 -->
      <button
        class="submit-btn"
        @click="submitForm"
        v-if="!hasExistingApplication"
      >
        提交申请
      </button>

      <!-- 已有申请时显示提示 -->
      <view class="applied-tip" v-else> 您已提交申请，请等待联系~ </view>
    </view>
  </view>
</template>

<script>
import {
  applyLiveApply,
  getBookedTimeSlots,
  getUserApplyLive,
} from "@/api/gxhc";

export default {
  data() {
    return {
      formData: {
        name: "",
        project_name: "",
        agree_public: "",
        expected_date: "",
        expected_time: "",
        accept_adjust: "",
        contact: "",
      },
      agreeOptions: [
        { label: "是的，我希望公开讲解BP", value: "1" },
        { label: "不，我不同意公开讲解BP", value: "0" },
      ],
      adjustOptions: [
        { label: "接受", value: "1" },
        { label: "不接受", value: "0" },
      ],
      selectedDate: "",
      selectedTimeSlot: "",
      bookedSlots: [], // 从服务器获取的已预订时间段
      minDate: this.getTodayString(), // 最小可选日期为今天
      hasExistingApplication: false, // 是否已有申请
      existingApplication: null, // 已有的申请信息
    };
  },
  mounted() {
    this.checkExistingApplication();
  },
  computed: {
    availableSlots() {
      if (!this.selectedDate) return [];

      // 生成当天的两个时间段
      const slots = [
        {
          time: "13:00-13:30",
          booked: this.isBooked(this.selectedDate, "13:00-13:30"),
        },
        {
          time: "13:30-14:00",
          booked: this.isBooked(this.selectedDate, "13:30-14:00"),
        },
      ];

      return slots;
    },
  },
  methods: {
    // 检查用户是否已有申请
    async checkExistingApplication() {
      try {
        const res = await getUserApplyLive();
        if (res.status === 200 && res.data) {
          // 用户已有申请记录
          this.hasExistingApplication = true;
          this.existingApplication = res.data;
          // 填充表单数据
          this.fillFormWithExistingData(this.existingApplication);
        } else {
          // 用户没有申请记录
          this.hasExistingApplication = false;
          this.existingApplication = null;
        }
      } catch (error) {
        console.error("检查申请状态失败:", error);
        uni.showToast({
          title: "检查申请状态失败",
          icon: "none",
        });
      }
    },

    // 使用已有申请数据填充表单
    fillFormWithExistingData(application) {
      this.formData.name = application.name || "";
      this.formData.project_name = application.project_name || "";
      this.formData.agree_public = application.agree_public ? "1" : "0";
      this.formData.accept_adjust = application.accept_adjust ? "1" : "0";
      this.formData.contact = application.contact || "";

      // 如果已同意公开讲解，设置日期和时间
      if (application.agree_public) {
        this.selectedDate = application.expected_date || "";
        this.formData.expected_date = application.expected_date || "";
        this.selectedTimeSlot = application.expected_time || "";
        this.formData.expected_time = application.expected_time || "";

        // 加载该日期的预订信息
        if (this.selectedDate) {
          this.loadBookedSlots(this.selectedDate);
        }
      }
    },

    // 获取申请状态文本
    getStatusText(status) {
      const statusMap = {
        0: "待审核",
        1: "审核通过",
        2: "审核拒绝",
        3: "已取消",
      };
      return statusMap[status] || "未知状态";
    },

    // 获取申请状态样式类
    getStatusClass(status) {
      const classMap = {
        0: "status-pending",
        1: "status-approved",
        2: "status-rejected",
        3: "status-cancelled",
      };
      return classMap[status] || "";
    },

    // 获取今天的日期字符串，格式为 YYYY-MM-DD
    getTodayString() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    // 从服务器加载已预订的时间段
    async loadBookedSlots(date = "") {
      try {
        const params = date ? { date: date } : {};
        const res = await getBookedTimeSlots(params);
        if (res.status === 200) {
          if (date) {
            // 如果指定了日期，只更新该日期的预订信息
            this.bookedSlots = this.bookedSlots.filter(
              (slot) => slot.date !== date
            );
            this.bookedSlots = [...this.bookedSlots, ...(res.data || [])];
          } else {
            // 如果没有指定日期，更新所有预订信息
            this.bookedSlots = res.data || [];
          }
        }
      } catch (error) {
        console.error("获取已预订时间段失败:", error);
        uni.showToast({
          title: "获取时间段信息失败",
          icon: "none",
        });
      }
    },

    // 刷新已预订时间段
    refreshBookedSlots(date) {
      this.loadBookedSlots(date);
    },

    selectAgree(value) {
      this.formData.agree_public = value;
      // 如果选择不同意，则清空已选时间和日期
      if (value === "0") {
        this.selectedDate = "";
        this.selectedTimeSlot = "";
        this.formData.expected_date = "";
        this.formData.expected_time = "";
      }
    },

    selectAdjust(value) {
      this.formData.accept_adjust = value;
    },

    onDateChange(e) {
      this.selectedDate = e.detail.value;
      this.selectedTimeSlot = "";
      // 当日期改变时，加载该日期的预订信息
      this.loadBookedSlots(this.selectedDate);
    },

    selectTimeSlot(slot) {
      if (slot.booked) return;
      this.selectedTimeSlot = slot.time;
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      const weekday = weekdays[date.getDay()];
      return `${year}-${month}-${day} (${weekday})`;
    },

    isBooked(date, time) {
      return this.bookedSlots.some(
        (slot) => slot.date === date && slot.time === time
      );
    },

    async submitForm() {
      // 表单验证
      if (!this.formData.name) {
        uni.showToast({ title: "请输入您的姓名", icon: "none" });
        return;
      }

      if (!this.formData.project_name) {
        uni.showToast({ title: "请输入项目名称", icon: "none" });
        return;
      }

      if (!this.formData.agree_public) {
        uni.showToast({ title: "请选择是否同意公开讲解", icon: "none" });
        return;
      }

      // 如果同意公开讲解，需要选择时间和日期
      if (this.formData.agree_public === "1") {
        if (!this.selectedDate) {
          uni.showToast({ title: "请选择期望的直播日期", icon: "none" });
          return;
        }

        if (!this.selectedTimeSlot) {
          uni.showToast({ title: "请选择具体时间段", icon: "none" });
          return;
        }

        if (!this.formData.accept_adjust) {
          uni.showToast({ title: "请选择是否接受时间调剂", icon: "none" });
          return;
        }

        // 设置表单数据
        this.formData.expected_date = this.selectedDate;
        this.formData.expected_time = this.selectedTimeSlot;
      }

      if (!this.formData.contact) {
        uni.showToast({ title: "请输入联系方式", icon: "none" });
        return;
      }

      // 如果用户不同意公开讲解，则不提交排期信息
      if (this.formData.agree_public === "0") {
        uni.showModal({
          title: "提示",
          content: "由于您选择不同意公开讲解BP，本次申请将不会安排直播排期。",
          showCancel: false,
          confirmText: "我知道了",
        });
        return;
      }

      // 实际提交表单逻辑
      uni.showLoading({
        title: "提交中...",
      });

      try {
        const res = await applyLiveApply(this.formData);
        uni.hideLoading();
        console.log(res);

        if (res.status === 200) {
          uni.showModal({
            title: "提交成功",
            content: "您的申请已提交，我们会尽快与您联系确认直播时间",
            showCancel: false,
            success: () => {
              // 提交成功后刷新已预订时间段
              this.refreshBookedSlots(this.selectedDate);
              // 重新检查申请状态
              this.checkExistingApplication();
              // 可以根据需要跳转页面或重置表单
              // uni.navigateBack();
            },
          });
        } else {
          uni.showToast({
            title: res.msg || "提交失败",
            icon: "none",
          });
        }
      } catch (error) {
        uni.hideLoading();
        console.error("提交失败:", error);
        uni.showToast({
          title: error || "提交失败，请稍后重试",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tips {
  .tips-t {
    font-size: 26rpx;
    color: #666;
  }
}
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.form-container {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
}

.application-status {
  background-color: #f0f9ff;
  border: 1px solid #ccecff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
}

.status-success {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
}

.success-icon {
  color: #4caf50;
  font-size: 36rpx;
  font-weight: bold;
  margin-right: 10rpx;
}

.success-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.application-details {
  padding: 15rpx 0;
}

.detail-item {
  display: flex;
  margin-bottom: 10rpx;
  font-size: 28rpx;
}

.detail-item .label {
  color: #666;
  width: 180rpx;
}

.detail-item .value {
  color: #333;
  flex: 1;
}

.status-pending {
  color: #ff9800;
}

.status-approved {
  color: #4caf50;
}

.status-rejected {
  color: #f44336;
}

.status-cancelled {
  color: #9e9e9e;
}

.date-display {
  padding: 20rpx;
  background-color: #f5f5f5;
  border-radius: 10rpx;
  font-size: 28rpx;
  color: #333;
}

.applied-tip {
  text-align: center;
  padding: 30rpx;
  color: #666;
  font-size: 28rpx;
}

.required {
  color: #ff4d4f;
  margin-right: 8rpx;
}

.form-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40rpx;
  color: #333;
}

.form-item {
  margin-bottom: 40rpx;
}

.form-label {
  font-size: 30rpx;
  color: #333;
  margin-bottom: 20rpx;
  line-height: 1.5;
}

.form-input {
  height: 80rpx;
  border: 1rpx solid #ddd;
  border-radius: 10rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}

.radio-group {
  display: flex;
  flex-direction: column;
}

.radio-item {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;

  radio {
    transform: scale(0.8);
    margin-right: 10rpx;
  }

  text {
    font-size: 28rpx;
    color: #333;
  }
}

.date-selector {
  margin-bottom: 30rpx;
}

.date-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
  border: 1rpx solid #ddd;
  border-radius: 10rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #666;
}

.arrow {
  color: #999;
  transform: rotate(90deg);
  font-size: 24rpx;
}

.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.time-slot {
  width: calc(50% - 10rpx);
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1rpx solid #2969ff;
  border-radius: 10rpx;
  color: #2969ff;
  font-size: 26rpx;
  position: relative;

  &.selected {
    background-color: #2969ff;
    color: #fff;
  }

  &.disabled {
    background-color: #f5f5f5;
    border-color: #ccc;
    color: #999;
    cursor: not-allowed;
  }
}

.booked-tag {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  background-color: #ff4d4f;
  color: #fff;
  font-size: 20rpx;
  padding: 2rpx 10rpx;
  border-radius: 10rpx;
}

.no-slots {
  text-align: center;
  color: #999;
  font-size: 28rpx;
  padding: 30rpx 0;
}

.submit-btn {
  background-color: #2969ff;
  color: #fff;
  font-size: 32rpx;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 12rpx;
  margin-top: 30rpx;
}
</style>

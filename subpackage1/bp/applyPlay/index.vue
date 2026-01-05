<!-- /subpackage1/bp/applyPlay/index.vue -->
<template>
  <view class="booking-page">
    <!-- 提示横幅 -->
    <view class="alert-banner">
      <image class="alert-icon" src="/static/images/code/error.png" mode="aspectFit"></image>
      <text class="alert-text">3月15日场次当前可约,快来抢占名额!</text>
    </view>

    <!-- 第一步：选择您的创业导师 -->
    <view class="section">
      <view class="section-title">第一步: 选择您的创业导师</view>
      <scroll-view class="mentor-list" scroll-x>
        <view 
          class="mentor-card" 
          v-for="(mentor, index) in mentorList" 
          :key="index"
          :class="{ selected: selectedMentor === mentor.id }"
          @click="selectMentor(mentor.id)"
        >
          <image class="mentor-avatar" :src="mentor.avatar" mode="aspectFill"></image>
          <text class="mentor-name">{{ mentor.name }}</text>
          <view class="mentor-tag">{{ mentor.track }}</view>
          <text class="mentor-desc">{{ mentor.desc }}</text>
          <text class="mentor-exp">{{ mentor.experience }}</text>
        </view>
      </scroll-view>
    </view>

    <!-- 第二步：选择日期 -->
    <view class="section">
      <view class="calendar-header">
        <text class="calendar-title">{{ currentYear }}年 {{ currentMonth }}月</text>
        <view class="month-switch">
          <view class="switch-btn" :class="{ active: currentMonthType === 'current' }" @click="switchMonth('current')">当月</view>
          <view class="switch-btn" :class="{ active: currentMonthType === 'next' }" @click="switchMonth('next')">下月</view>
        </view>
      </view>
      <view class="calendar-weekdays">
        <text class="weekday" v-for="(day, index) in weekdays" :key="index">{{ day }}</text>
      </view>
      <view class="calendar-days">
        <view 
          class="calendar-day" 
          v-for="(day, index) in calendarDays" 
          :key="index"
          :class="getDayClass(day)"
          @click="selectDate(day)"
        >
          <text class="day-number">{{ day.date }}</text>
          <text class="day-status" v-if="day.status">{{ day.status }}</text>
        </view>
      </view>
    </view>

    <!-- 第三步：选择时段 -->
    <view class="section" v-if="selectedDate">
      <view class="section-title">{{ selectedDate.date }}日 可选时段</view>
      <view class="time-slots">
        <view 
          class="time-slot-card" 
          v-for="(slot, index) in availableTimeSlots" 
          :key="index"
          :class="{ selected: selectedTimeSlot === slot.time }"
          @click="selectTimeSlot(slot)"
        >
          <text class="time-text">{{ slot.time }}</text>
          <text class="time-remaining">剩余{{ slot.remaining }}</text>
        </view>
      </view>
    </view>

    <!-- 确认预约按钮 -->
    <view class="confirm-btn-wrapper">
      <view class="confirm-btn" @click="confirmBooking">
        <image class="confirm-icon" src="/static/images/icons/icon-check.png" mode="aspectFit"></image>
        <text class="confirm-text">确认预约</text>
      </view>
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
      // 导师列表
      mentorList: [
        {
          id: 1,
          name: "赵总",
          avatar: "/static/images/mentors/zhao.png",
          track: "人工智能赛道",
          desc: "专注AI与大数据投资",
          experience: "10年经验"
        },
        {
          id: 2,
          name: "赵总",
          avatar: "/static/images/mentors/zhao2.png",
          track: "人工智能赛道",
          desc: "专注AI与大数据投资",
          experience: "10年经验"
        }
      ],
      selectedMentor: null,
      
      // 日历相关
      currentYear: 2025,
      currentMonth: 12,
      currentMonthType: 'current', // 'current' 或 'next'
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      calendarDays: [],
      selectedDate: null,
      
      // 时段相关
      availableTimeSlots: [],
      selectedTimeSlot: null,
      
      // 表单数据
      formData: {
        name: "",
        project_name: "",
        agree_public: "1",
        expected_date: "",
        expected_time: "",
        accept_adjust: "1",
        contact: "",
      },
      bookedSlots: [],
    };
  },
  mounted() {
    this.initCalendar();
    this.loadBookedSlots();
  },
  methods: {
    // 初始化日历
    initCalendar() {
      const today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      
      if (this.currentMonthType === 'next') {
        month = month + 1;
        if (month > 12) {
          month = 1;
          year = year + 1;
        }
      }
      
      this.currentYear = year;
      this.currentMonth = month;
      this.generateCalendarDays(year, month);
    },
    
    // 生成日历天数
    generateCalendarDays(year, month) {
      const days = [];
      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);
      const daysInMonth = lastDay.getDate();
      const startWeekday = firstDay.getDay();
      
      // 填充前面的空白
      for (let i = 0; i < startWeekday; i++) {
        days.push({ date: '', status: '', disabled: true });
      }
      
      // 填充日期
      const today = new Date();
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month - 1, i);
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        let status = '';
        
        // 判断日期状态
        if (date < today) {
          status = ''; // 过去的日期，不可选
        } else if (i === 28) {
          status = '已满';
        } else if (i === 29) {
          status = '可约';
        } else if (i === 30) {
          status = '选中';
        }
        
        days.push({
          date: i,
          dateStr: dateStr,
          status: status,
          disabled: date < today
        });
      }
      
      this.calendarDays = days;
    },
    
    // 获取日期样式类
    getDayClass(day) {
      if (day.disabled || !day.date) return 'disabled';
      if (day.status === '选中') return 'selected';
      if (day.status === '已满') return 'full';
      if (day.status === '可约') return 'available';
      return '';
    },
    
    // 选择日期
    selectDate(day) {
      if (day.disabled || !day.date || day.status === '已满') return;
      this.selectedDate = day;
      this.formData.expected_date = day.dateStr;
      // 加载该日期的时段
      this.loadTimeSlots(day.dateStr);
    },
    
    // 切换月份
    switchMonth(type) {
      this.currentMonthType = type;
      this.initCalendar();
    },
    
    // 选择导师
    selectMentor(mentorId) {
      this.selectedMentor = mentorId;
    },
    
    // 加载时段
    loadTimeSlots(date) {
      // 模拟时段数据
      this.availableTimeSlots = [
        { time: '13:00 - 13:30', remaining: 1 },
        { time: '13:00 - 13:30', remaining: 1 }
      ];
    },
    
    // 选择时段
    selectTimeSlot(slot) {
      this.selectedTimeSlot = slot.time;
      this.formData.expected_time = slot.time;
    },
    
    // 加载已预订时段
    async loadBookedSlots() {
      try {
        const res = await getBookedTimeSlots();
        if (res.status === 200) {
          this.bookedSlots = res.data || [];
        }
      } catch (error) {
        console.error("获取已预订时间段失败:", error);
      }
    },
    
    // 确认预约
    async confirmBooking() {
      if (!this.selectedMentor) {
        uni.showToast({ title: "请选择创业导师", icon: "none" });
        return;
      }
      
      if (!this.selectedDate) {
        uni.showToast({ title: "请选择预约日期", icon: "none" });
        return;
      }
      
      if (!this.selectedTimeSlot) {
        uni.showToast({ title: "请选择预约时段", icon: "none" });
        return;
      }
      
      uni.showLoading({ title: "提交中..." });
      
      try {
        const res = await applyLiveApply(this.formData);
        uni.hideLoading();
        
        if (res.status === 200) {
          uni.showModal({
            title: "预约成功",
            content: "您的预约已提交，我们会尽快与您联系确认",
            showCancel: false,
            success: () => {
              uni.navigateBack();
            }
          });
        } else {
          uni.showToast({
            title: res.msg || "预约失败",
            icon: "none"
          });
        }
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: "预约失败，请稍后重试",
          icon: "none"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.booking-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 200rpx;
}

// 提示横幅
.alert-banner {
  display: flex;
  align-items: center;
  padding: 24rpx 32rpx;
  background: #fff7ed;
  margin-bottom: 24rpx;
  
  .alert-icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 16rpx;
  }
  
  .alert-text {
    font-size: 28rpx;
    color: #1a1a1a;
  }
}

// 通用区块
.section {
  background: #ffffff;
  padding: 32rpx;
  margin-bottom: 24rpx;
  
  .section-title {
    width: 674rpx;
    height: 32rpx;
    opacity: 1;
    color: #596b86;
    text-align: left;
    font-size: 24rpx;
    font-weight: 600;
    font-family: "PingFang SC";
    line-height: 32rpx;
    letter-spacing: 2rpx;
    margin-bottom: 24rpx;
  }
}

// 导师列表
.mentor-list {
  white-space: nowrap;
  
  .mentor-card {
    display: inline-block;
    width: 280rpx;
    padding: 24rpx;
    margin-right: 24rpx;
    border: 2rpx solid #f1f5f9;
    border-radius: 16rpx;
    text-align: center;
    vertical-align: top;
    
    &.selected {
      border-color: #2969ff;
      background: #f0f9ff;
    }
    
    .mentor-avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      margin-bottom: 16rpx;
    }
    
    .mentor-name {
      display: block;
      font-size: 32rpx;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 12rpx;
    }
    
    .mentor-tag {
      display: inline-block;
      padding: 8rpx 16rpx;
      background: #e0f2fe;
      color: #0369a1;
      font-size: 24rpx;
      border-radius: 20rpx;
      margin-bottom: 12rpx;
    }
    
    .mentor-desc {
      display: block;
      font-size: 24rpx;
      color: #64748b;
      margin-bottom: 8rpx;
    }
    
    .mentor-exp {
      display: block;
      font-size: 24rpx;
      color: #64748b;
    }
  }
}

// 日历
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
  
  .calendar-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1a1a1a;
  }
  
  .month-switch {
    display: flex;
    gap: 16rpx;
    
    .switch-btn {
      padding: 8rpx 24rpx;
      background: #f1f5f9;
      border-radius: 20rpx;
      font-size: 24rpx;
      color: #64748b;
      
      &.active {
        background: #2969ff;
        color: #ffffff;
      }
    }
  }
}

.calendar-weekdays {
  display: flex;
  margin-bottom: 16rpx;
  
  .weekday {
    flex: 1;
    text-align: center;
    font-size: 24rpx;
    color: #64748b;
  }
}

.calendar-days {
  display: flex;
  flex-wrap: wrap;
  
  .calendar-day {
    width: calc(100% / 7);
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8rpx;
    margin-bottom: 8rpx;
    
    &.disabled {
      opacity: 0.3;
    }
    
    &.selected {
      background: #2969ff;
      color: #ffffff;
    }
    
    &.full {
      background: #f1f5f9;
    }
    
    &.available {
      background: #f0fdf4;
    }
    
    .day-number {
      font-size: 28rpx;
      font-weight: 600;
    }
    
    .day-status {
      font-size: 20rpx;
      margin-top: 4rpx;
    }
  }
}

// 时段选择
.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  
  .time-slot-card {
    flex: 1;
    min-width: calc(50% - 8rpx);
    padding: 24rpx;
    border: 2rpx solid #f1f5f9;
    border-radius: 12rpx;
    text-align: center;
    
    &.selected {
      border-color: #2969ff;
      background: #f0f9ff;
    }
    
    .time-text {
      display: block;
      font-size: 28rpx;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8rpx;
    }
    
    .time-remaining {
      display: block;
      font-size: 24rpx;
      color: #64748b;
    }
  }
}

// 确认按钮
.confirm-btn-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24rpx 32rpx;
  background: #ffffff;
  box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.1);
  
  .confirm-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88rpx;
    background: #0f172a;
    border-radius: 12rpx;
    gap: 12rpx;
    
    .confirm-icon {
      width: 32rpx;
      height: 32rpx;
    }
    
    .confirm-text {
      font-size: 32rpx;
      font-weight: 600;
      color: #ffffff;
    }
  }
}
</style>

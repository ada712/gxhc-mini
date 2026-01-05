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
    <view class="section time-section" v-if="selectedDate">
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
        <image class="confirm-icon" src="/static/images/my/confirm.png" mode="aspectFit"></image>
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
        },
        {
          id: 3,
          name: "李总",
          avatar: "/static/images/mentors/zhao.png",
          track: "人工智能赛道",
          desc: "专注AI与大数据投资",
          experience: "10年经验"
        },
        {
          id: 4,
          name: "王总",
          avatar: "/static/images/mentors/zhao2.png",
          track: "人工智能赛道",
          desc: "专注AI与大数据投资",
          experience: "10年经验"
        },
        {
          id: 5,
          name: "张总",
          avatar: "/static/images/mentors/zhao.png",
          track: "人工智能赛道",
          desc: "专注AI与大数据投资",
          experience: "10年经验"
        },
        {
          id: 6,
          name: "刘总",
          avatar: "/static/images/mentors/zhao2.png",
          track: "人工智能赛道",
          desc: "专注AI与大数据投资",
          experience: "10年经验"
        },
        {
          id: 7,
          name: "陈总",
          avatar: "/static/images/mentors/zhao.png",
          track: "人工智能赛道",
          desc: "专注AI与大数据投资",
          experience: "10年经验"
        },
        {
          id: 8,
          name: "杨总",
          avatar: "/static/images/mentors/zhao2.png",
          track: "人工智能赛道",
          desc: "专注AI与大数据投资",
          experience: "10年经验"
        },
        {
          id: 9,
          name: "周总",
          avatar: "/static/images/mentors/zhao.png",
          track: "人工智能赛道",
          desc: "专注AI与大数据投资",
          experience: "10年经验"
        },
        {
          id: 10,
          name: "吴总",
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
    // 默认选中第一个导师
    if (this.mentorList.length > 0) {
      this.selectedMentor = this.mentorList[0].id;
    }
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
      // 随机生成6个可预约时间段
      const timeSlots = [];
      const startHour = 9; // 从9点开始
      const endHour = 18; // 到18点结束
      const slotDuration = 30; // 每个时段30分钟
      
      // 生成所有可能的时间段
      const allSlots = [];
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += slotDuration) {
          const startTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
          const endMinute = minute + slotDuration;
          const endHourTime = endMinute >= 60 ? hour + 1 : hour;
          const endMinuteTime = endMinute >= 60 ? endMinute - 60 : endMinute;
          const endTime = `${String(endHourTime).padStart(2, '0')}:${String(endMinuteTime).padStart(2, '0')}`;
          allSlots.push({ time: `${startTime} - ${endTime}`, remaining: Math.floor(Math.random() * 5) + 1 });
        }
      }
      
      // 随机选择6个时间段
      const shuffled = allSlots.sort(() => 0.5 - Math.random());
      this.availableTimeSlots = shuffled.slice(0, 6);
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
  background: #f8fafc;
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
      height: 30rpx;
      opacity: 1;
      color: #d97757;
      text-align: left;
      font-size: 24rpx;
      font-weight: 600;
      font-family: "PingFang SC";
      line-height: 30rpx;
    font-size: 28rpx;
    color: #1a1a1a;
  }
}

// 通用区块
.section {
  background: #ffffff;
  padding: 32rpx;
  margin-bottom: 24rpx;
  
  // 时段选择区块的特殊样式
  &.time-section {
    border-radius: 32rpx;
    opacity: 1;
    border: 2rpx solid #e6edf4;
    background: #ffffff;
    box-shadow: 0 8rpx 20rpx 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }
  
  .section-title {
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
  
  // 时段选择区块的标题样式
  &.time-section .section-title {
    height: 30rpx;
    opacity: 1;
    color: #000000;
    text-align: left;
    font-size: 24rpx;
    font-weight: 600;
    font-family: "PingFang SC";
    line-height: 30rpx;
  }
}

// 导师列表
.mentor-list {
  white-space: nowrap;
  display: flex;
  justify-content: center;
  
  // 隐藏滚动条
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  .mentor-card {
    display: inline-block;
    width: 308rpx;
    height: 456rpx;
    padding: 24rpx;
    margin-right: 24rpx;
    border: 2rpx solid #f1f5f9;
    border-radius: 46rpx;
    opacity: 0.8;
    background: #ffffff;
    text-align: center;
    vertical-align: top;
    box-sizing: border-box;
    
    &.selected {
      border-color: #2969ff;
      background: #fff;
      opacity: 1;

    }
    
    .mentor-avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      margin-bottom: 16rpx;
    }
    
    .mentor-name {
      display: block;
      height: 50rpx;
      opacity: 1;
      color: #000000;
      text-align: center;
      font-size: 40rpx;
      font-weight: 600;
      font-family: "PingFang SC";
      line-height: 50rpx;
      margin-bottom: 16rpx;
    }
    
    &.selected .mentor-name {
      height: 50rpx;
      opacity: 1;
      color: #2969ff;
      text-align: center;
      font-size: 40rpx;
      font-weight: 600;
      font-family: "PingFang SC";
      line-height: 50rpx;
    }
    
    .mentor-tag {
      display: inline-block;
      width: 188rpx;
      height: 50rpx;
      border-radius: 268rpx;
      opacity: 1;
      background: #2969ff;
      box-shadow: 0 8rpx 20rpx 0 rgba(16, 26, 134, 0.3);
      color: #ffffff;
      font-size: 24rpx;
      line-height: 50rpx;
      text-align: center;
      margin-bottom: 18rpx;
      box-sizing: border-box;
    }
    
    &.selected .mentor-tag {
      height: 50rpx;
      border-radius: 268rpx;
      opacity: 1;
      background: #2969ff;
      box-shadow: 0 8rpx 20rpx 0 rgba(16, 26, 134, 0.3);
    }
    
    .mentor-desc {
      display: block;
      opacity: 0.5;
      color: #000000;
      text-align: center;
      font-size: 24rpx;
      font-weight: 400;
      font-family: "PingFang SC";
      line-height: 30rpx;
      margin-bottom: 8rpx;
    }
    
    .mentor-exp {
      display: block;
      opacity: 0.5;
      color: #000000;
      text-align: center;
      font-size: 24rpx;
      font-weight: 400;
      font-family: "PingFang SC";
      line-height: 30rpx;
    }
    
    &.selected .mentor-desc,
    &.selected .mentor-exp {
      opacity: 0.5;
      color: #000000;
  text-align: center;
      font-size: 24rpx;
      font-weight: 400;
      font-family: "PingFang SC";
      line-height: 30rpx;
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
    width: 352rpx;
    height: 32rpx;
    opacity: 1;
    color: #000000;
    text-align: center;
    font-size: 44rpx;
    font-weight: 600;
    font-family: "PingFang SC";
    line-height: 32rpx;
    letter-spacing: 2rpx;
  }
  
  .month-switch {
    display: flex;
    align-items: center;
    gap: 16rpx;
    width: 226rpx;
    height: 56rpx;
    border-radius: 8rpx;
    opacity: 1;
    background: #f1f2f3;
    padding: 0;
    box-sizing: border-box;
    
    .switch-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44rpx;
      opacity: 1;
      color: #171a1d;
      text-align: center;
    font-size: 28rpx;
      font-family: "PingFang SC";
      line-height: 44rpx;
      background: transparent;
      border-radius: 0;
      
      // 当月按钮样式
      &:first-child {
        width: 72rpx;
        font-weight: 600;
      }
      
      // 下月按钮样式
      &:last-child {
        width: 84rpx;
        font-weight: 400;
      }
      
      &.active {
        width: 104rpx;
        height: 48rpx;
        border-radius: 8rpx;
        opacity: 1;
        background: #ffffff;
        box-shadow: 0 2rpx 8rpx 0 rgba(0, 0, 0, 0.16);
        color: #171a1d;
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
      opacity: 1;
      
      .day-number {
        width: 64rpx;
        height: 44rpx;
        opacity: 1;
        color: #171a1d;
        text-align: center;
        font-size: 34rpx;
        font-weight: 400;
        font-family: "PingFang SC";
        line-height: 44rpx;
      }
    }

  &.selected {
      width: 82rpx;
      height: 108rpx;
      border-radius: 22rpx;
      opacity: 1;
      background: #2969ff;
      color: #ffffff;
      
      .day-number {
        color: #ffffff;
      }
      
      .day-status {
        color: #ffffff;
      }
    }
    
    &.full {
      background: #ffffff;
    }
    
    &.available {
      background: #ffffff;
    }
    
    .day-number {
  font-size: 28rpx;
      font-weight: 600;
    }
    
    .day-status {
      font-size: 22rpx;
      color: #171a1d;
      margin-top: 4rpx;
    }
    
    &.full .day-status {
      font-size: 22rpx;
      color: #171a1d;
    }
    
    &.available .day-status {
      font-size: 22rpx;
      color: #10b981;
    }
  }
}

// 时段选择
.time-slots {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  gap: 16rpx;
  
  .time-slot-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 316rpx;
    height: 128rpx;
    border-radius: 20rpx;
    opacity: 1;
    border: 2rpx solid #5a5a5a;
    background: #ffffff;
    text-align: center;
    box-sizing: border-box;

  &.selected {
      border-color: #2969ff;
      background: #f0f9ff;
      border: 1px solid #dbeafe;
    }
    
    .time-text {
      display: block;
      opacity: 1;
      color: #000000;
      text-align: center;
      font-size: 32rpx;
      font-weight: 700;
      
      line-height: 50.6rpx;
      margin-top:20rpx;
    }
    &.selected .time-text {
      color: #2969ff;
    }
    
    
    
    .time-remaining {
      display: block;
      opacity: 1;
      color: #5a5a5a;
      text-align: center;
      font-size: 24rpx;
      font-weight: 500;
      
    }
    &.selected .time-remaining {
      color: #2969ff;
    }
  }
}

// 确认按钮
.confirm-btn-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  
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

<template>
  <view class="container">
    <!-- 顾问信息 -->
    <view class="consultant-info">
      <text class="consultant-name">中智飞</text>
      <text class="consultant-status">ONLINE CONSULTING</text>
    </view>

    <!-- 聊天消息区域 -->
    <scroll-view class="chat-messages" scroll-y :scroll-top="scrollTop" :scroll-into-view="scrollIntoView" scroll-with-animation>
      <!-- 助手消息 -->
      <view class="message-item assistant-message">
        <view class="avatar-wrapper">
          <image class="avatar-icon" src="/static/images/server/kefu.png" mode="aspectFit"></image>
        </view>
        <view class="message-content">
          <view class="message-bubble">
            <text class="message-text">您好!我是您的专属管家&lt;中智飞&gt;, 很高兴为您服务,请问有什么可以帮您的?</text>
          </view>
          <view class="suggested-questions">
            <text class="suggest-title">猜你想问</text>
            <view class="question-list">
              <view class="question-item" @click="sendQuestion('如何购买升级服务包?')">
                <text class="question-text">如何购买升级服务包?</text>
              </view>
              <view class="question-item" @click="sendQuestion('BP诊断需要长时间?')">
                <text class="question-text">BP诊断需要长时间?</text>
              </view>
              <view class="question-item" @click="sendQuestion('直播连线预约规则?')">
                <text class="question-text">直播连线预约规则?</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 消息列表（按时间顺序一问一答） -->
      <view 
        v-for="(msg, index) in messages" 
        :key="index"
        :id="`msg-${index}`"
        class="message-item"
        :class="msg.type === 'user' ? 'user-message' : 'assistant-message'"
      >
        <!-- 用户消息 -->
        <template v-if="msg.type === 'user'">
          <view class="message-content">
            <view class="message-bubble user-bubble">
              <text class="message-text">{{ msg.content }}</text>
            </view>
          </view>
          <view class="avatar-wrapper user-avatar">
      <image 
              v-if="userInfo.avatar" 
              class="avatar-icon" 
              :src="userInfo.avatar" 
              mode="aspectFill"
            ></image>
            <view v-else class="avatar-icon user-avatar-icon"></view>
          </view>
        </template>
        
        <!-- 助手消息 -->
        <template v-else>
          <view class="avatar-wrapper">
            <image class="avatar-icon" src="/static/images/server/kefu.png" mode="aspectFit"></image>
          </view>
          <view class="message-content">
            <view class="message-bubble">
              <text class="message-text" v-if="!msg.isWeChat">{{ msg.content }}</text>
              <!-- 微信客服信息 -->
              <view v-if="msg.isWeChat" class="wechat-info">
                <text class="wechat-tip">如需人工咨询,请添加下方我们的人工客服微信号。</text>
                <view class="wechat-box">
                  <text class="wechat-label">WECHAT ID</text>
                  <text class="wechat-id">lamgxhcZZF</text>
                  <view class="copy-btn" @click="copyWeChatId">
                  <image class="copy-icon" src="/static/images/server/copy.png" mode="aspectFit"></image>
                  <text class="copy-text">复制微信号</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </template>
      </view>
    </scroll-view>

    <!-- 底部输入栏 -->
    <view class="input-bar">
      <view class="transfer-human" @click="transferToHuman">
        <image class="transfer-icon" src="/static/images/server/rengong.png" mode="aspectFit"></image>
        <text class="transfer-text">转人工</text>
      </view>
      <input 
        class="input-field" 
        placeholder="输入您的问题..." 
        v-model="inputText"
        @confirm="sendMessage"
        confirm-type="send"
      />
      <view class="send-btn" @click="handleSendClick">
        <image class="send-icon" src="/static/images/server/send.png" mode="aspectFit"></image>
      </view>
    </view>
  </view>
</template>

<script> 
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      inputText: "",
      messages: [], // 统一的消息数组，按时间顺序一问一答
      scrollTop: 0,
      scrollIntoView: '', // 用于 scroll-into-view 滚动
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    handleSendClick() {
      // 处理发送按钮点击，直接使用 inputText
      this.sendMessage();
    },
    sendQuestion(question) {
      this.sendMessage(question);
    },
    sendMessage(text) {
      // 如果传入了 text 参数，使用它；否则使用 inputText
      const message = (text && typeof text === 'string') ? text : this.inputText;
      // 确保 message 是字符串类型
      if (!message || typeof message !== 'string' || !message.trim()) return;

      // 添加用户消息到统一的消息数组
      this.messages.push({
        type: 'user',
        content: message,
        time: new Date(),
      });

      // 清空输入框
      this.inputText = "";

      // 滚动到底部
      this.$nextTick(() => {
        this.scrollToBottom();
      });

      // 模拟助手回复（实际应该调用API）
      setTimeout(() => {
        // 添加助手回复到统一的消息数组
        this.messages.push({
          type: 'assistant',
          content: "感谢您的咨询，我会尽快为您解答。",
          time: new Date(),
        });
        // 助手回复后也滚动到底部，延迟确保 DOM 渲染完成
        this.$nextTick(() => {
          setTimeout(() => {
            this.scrollToBottom();
          }, 300);
        });
      }, 1000);
    },
    transferToHuman() {
      // 添加助手回复消息（微信客服信息）到统一的消息数组
      this.messages.push({
        type: 'assistant',
        content: "",
        isWeChat: true,
        time: new Date(),
      });
      
      // 滚动到底部
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    copyWeChatId() {
      const wechatId = "lamgxhcZZF";
      // #ifdef MP-WEIXIN
      uni.setClipboardData({
        data: wechatId,
        success: () => {
          uni.showToast({
            title: "微信号已复制",
            icon: "success",
          });
        },
      });
      // #endif
      // #ifndef MP-WEIXIN
      // 其他平台的处理
      uni.setClipboardData({
        data: wechatId,
        success: () => {
          uni.showToast({
            title: "微信号已复制",
            icon: "success",
          });
        },
      });
      // #endif
    },
    scrollToBottom() {
      // 滚动到底部
      if (this.messages.length > 0) {
        // 使用 scroll-into-view 滚动到最后一条消息
        const lastIndex = this.messages.length - 1;
        this.scrollIntoView = `msg-${lastIndex}`;
        // 同时设置 scrollTop 作为备用方案
        this.scrollTop = 999999;
        
        // 延迟再次设置，确保滚动完成
        this.$nextTick(() => {
          this.scrollIntoView = `msg-${lastIndex}`;
          this.scrollTop = 999999;
          setTimeout(() => {
            this.scrollIntoView = `msg-${lastIndex}`;
            this.scrollTop = 999999;
          }, 200);
        });
      } else {
        // 如果没有消息，使用 scrollTop
        this.scrollTop = 999999;
        this.$nextTick(() => {
          this.scrollTop = 999999;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f8fafc;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden !important; // 禁止页面滚动
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

// ::v-deep .uni-page-head__title {
//   width: 184rpx; // 92px * 2
//   height: 104rpx; // 52px * 2
//   opacity: 1;
//   color: #000000;
//   text-align: center;
//   font-size: 32rpx; // 16px * 2
//   font-weight: 400 !important;
//   font-family: "Inter";
//   line-height: 102.44rpx; // 51.22px * 2
//   display: block;
//   margin: 0 auto;
//   position: absolute;
//   left: 50%;
//   transform: translateX(-50%);
// }

// ::v-deep .uni-page-head {
//   width: 100%;
//   height: 108rpx; // 54px * 2
//   opacity: 1;
//   background: #ffffff;
//   position: relative; // 系统导航栏自动固定在顶部，参考 energy 页面
// }

.container {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  overflow: hidden !important; // 禁止容器滚动
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.consultant-info {
  position: fixed;
  top: 94rpx; // 导航栏高度
  left: 0;
  right: 0;
  width: 100%;
  height: 156rpx; // 78px * 2
  opacity: 1;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 40rpx 0;
  box-sizing: border-box;
  z-index: 100;

  .consultant-name {
    width: 96rpx; // 48px * 2
    height: 104rpx; // 52px * 2
    opacity: 1;
    color: #000000;
    text-align: center;
    font-size: 32rpx; // 16px * 2
    font-weight: 400;
    font-family: "Inter";
    line-height: 102.44rpx; // 51.22px * 2
    display: block;
    margin-bottom: 8rpx;
  }

  .consultant-status {
    width: 256rpx; // 128px * 2
    height: 30rpx; // 15px * 2
    opacity: 1;
    color: #94acd1;
    text-align: left;
    font-size: 24rpx; // 12px * 2
    font-weight: 600;
    font-family: "PingFang SC";
    line-height: 30rpx; // 15px * 2
    display: block;
  }
}

.chat-messages {
  position: absolute;
  top: 260rpx; 
  bottom: 184rpx; // 输入栏高度
  left: 0;
  right: 0;
  width: 100%;
  height: auto; // 自动填充剩余高度（通过 top 和 bottom 自动计算）
  padding: 32rpx 28rpx;
  padding-top: 0rpx;
  box-sizing: border-box;

  .message-item {
    display: flex;
    margin-bottom: 32rpx;

    &.assistant-message {
      justify-content: flex-start;

      .avatar-wrapper {
      
        margin-right: 16rpx;

        .avatar-icon {
          width: 72rpx; // 36px * 2
          height: 72rpx; // 36px * 2
        }
      }

      .message-content {
        width: 526rpx; // 263px * 2
        // min-height: 542rpx; // 271px * 2
        border-radius: 24rpx; // 12px * 2
        opacity: 1;
        background: #ffffff;
        box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        padding: 36rpx;
      }
    }

    &.user-message {
      justify-content: flex-end;
      align-items: flex-end;

      .message-content {
        max-width: 526rpx; // 263px * 2
        margin-right: 16rpx;
        border-radius: 24rpx 24rpx 0 24rpx; // 12px * 2
        opacity: 1;
        border: 1rpx solid #979797; // 0.5px * 2
        background: #2563eb;
        box-sizing: border-box;
      }

      .user-avatar {
        width: 72rpx; // 36px * 2
        height: 72rpx; // 36px * 2
        flex-shrink: 0;

        .avatar-icon {
          width: 72rpx;
          height: 72rpx;
          border-radius: 50%;
        }

        .user-avatar-icon {
          width: 72rpx;
          height: 72rpx;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          
          &::before {
            content: "👤";
            font-size: 40rpx;
          }
        }
      }
    }

    .message-bubble {
      // padding: 24rpx;
      padding-left: 0rpx;
      padding-top: 0rpx;
      border-radius: 24rpx;
      box-sizing: border-box;

      &.user-bubble {
        background: transparent;
        padding: 24rpx;
        border-radius: 0;
        .message-text {
          color:#fff;
        }
      }

      .message-text {
        max-width: 444rpx; // 222px * 2
        opacity: 1;
        color: #030303; // 系统回答使用黑色
        text-align: left;
        font-size: 28rpx; // 14px * 2
        font-weight: 400;
        font-family: "PingFang SC";
        letter-spacing: -0.28rpx; // -0.14px * 2
        display: block;
        line-height: 1.6;
        word-wrap: break-word;
        word-break: break-all;

        // 用户提问使用白色字体
        .user-bubble & {
          width: 526rpx; // 263px * 2
          height: 78rpx; // 39px * 2
          opacity: 1;
          color: #ffffff; // 用户提问使用白色
          text-align: left;
          font-size: 28rpx; // 14px * 2
          font-weight: 400;
          font-family: "PingFang SC";
          letter-spacing: -0.38rpx; // -0.19px * 2
        }
      }

      // 微信客服信息样式
      .wechat-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24rpx;

        .wechat-tip {
          width: 100%;
          color: #030303;
          text-align: left;
          font-size: 28rpx;
          font-weight: 400;
          font-family: "PingFang SC";
          line-height: 1.6;
          display: block;
        }

        .wechat-box {
          width: 100%;
          background: #fff4e6;
          border-radius: 24rpx;
          padding: 32rpx;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16rpx;

          .wechat-label {
            width: 340.08rpx; // 170.04px * 2
            height: 30rpx; // 15px * 2
            opacity: 1;
            color: #f97316;
            text-align: center;
            font-size: 24rpx; // 12px * 2
            font-weight: 600;
            font-family: "PingFang SC";
            line-height: 30rpx; // 15px * 2
            display: block;
            text-transform: uppercase;
            letter-spacing: 2rpx;
          }

          .wechat-id {
            width: 340.08rpx; // 170.04px * 2
            height: 98rpx; // 49px * 2
            opacity: 1;
            color: #ff6600;
            font-size: 48rpx;
            font-weight: 700;
            font-family: "PingFang SC";
            letter-spacing: 2rpx;
            display: block;
          }

          .copy-btn {
            width: 340rpx; // 170px * 2
            height: 68rpx; // 34px * 2
            border-radius: 268rpx; // 134px * 2
            opacity: 1;
            background: #f97316;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12rpx;
            cursor: pointer;
            margin-top: 8rpx;

            .copy-icon {
              width: 32rpx;
              height: 32rpx;
            }

            .copy-text {
              width: 132rpx; // 66px * 2
              height: 30rpx; // 15px * 2
              opacity: 1;
              color: #ffffff;
              text-align: center;
              font-size: 24rpx; // 12px * 2
              font-weight: 600;
              font-family: "PingFang SC";
              line-height: 30rpx; // 15px * 2
              display: block;
            }
          }
        }
      }
    }

    .suggested-questions {
      margin-top: 24rpx;

      .suggest-title {
        font-size: 24rpx;
        color: #999999;
        margin-bottom: 16rpx;
        display: block;
        font-family: "PingFang SC";
      }

      .question-list {
        display: flex;
        flex-direction: column;
        gap: 12rpx;

        .question-item {
          width: 444rpx; // 222px * 2
          height: 68rpx; // 34px * 2
          border-radius: 268rpx; // 134px * 2
          opacity: 1;
          background: #f8fafc;
          padding: 16rpx 24rpx;
          cursor: pointer;
          box-sizing: border-box;
          display: flex;
          align-items: center;

          .question-text {
            width: 340.08rpx; // 170.04px * 2
            height: 30rpx; // 15px * 2
            opacity: 1;
            color: #2969ff;
            text-align: left;
            font-size: 24rpx; // 12px * 2
            font-weight: 600;
            font-family: "PingFang SC";
            line-height: 30rpx; // 15px * 2
            display: block;
            font-family: "PingFang SC";
          }
        }
      }
    }
  }
}

.input-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 184rpx; // 92px * 2
  border-radius: 64rpx 64rpx 0 0; // 32px * 2
  opacity: 1;
  background: #ffffff;
  box-shadow: 0 -2rpx 32rpx 0 #e5e5e552; // 0 -1px 16px * 2
  display: flex;
  align-items: flex-start; // 底部对齐
  padding: 24rpx 28rpx;
  padding-bottom: 24rpx; // 确保底部有统一的内边距
  box-sizing: border-box;
  z-index: 100;

  .transfer-human {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 24rpx;
    cursor: pointer;

    .transfer-icon {
      width: 100rpx; // 50px * 2
      height: 100rpx; // 50px * 2
      margin-bottom: 8rpx;
    }

    .transfer-text {
      width: 80rpx; // 40px * 2
      height: 44rpx; // 22px * 2
      opacity: 1;
      color: #171a1d;
  text-align: center;
      font-size: 20rpx; // 10px * 2
      font-weight: 400;
      font-family: "PingFang SC";
      line-height: 44rpx; // 22px * 2
      display: block;
    }
  }

  .input-field {
    width: 442rpx; // 221px * 2
    height: 100rpx; // 50px * 2
    border-radius: 24rpx; // 12px * 2
    opacity: 1;
    background: #f8fafc;
    flex: 1;
    padding: 0 32rpx;
  font-size: 28rpx;
    color: #333333;
    box-sizing: border-box;

    &::placeholder {
      width: 252rpx; // 126px * 2
      height: 44rpx; // 22px * 2
      opacity: 0.4000000059604645;
      color: #171a1d;
      text-align: left;
      font-size: 24rpx; // 12px * 2
      font-weight: 400;
      font-family: "PingFang SC";
      line-height: 44rpx; // 22px * 2
    }
  }

  ::v-deep .uni-input-wrapper {
    width: 442rpx; // 221px * 2
    height: 100rpx; // 50px * 2
    border-radius: 24rpx; // 12px * 2
    opacity: 1;
    // border: 1rpx solid #979797; // 0.5px * 2
    background: #f8fafc;
    box-sizing: border-box;
  }

  .send-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16rpx;
    cursor: pointer;

    .send-icon {
      width: 100rpx; // 50px * 2
      height: 100rpx; // 50px * 2
    }
  }
}
</style>

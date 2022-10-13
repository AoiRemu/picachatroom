<template>
  <div class="main_warp">
    <div class="nav_warp">
      <div class="online_number_warp">
        <el-tag v-show="isShowOnlineNumber"
                type="warning"
                effect="dark">在线人数:{{ onlineNumber }}</el-tag>
      </div>
    </div>
    <div ref="chat_window"
         class="chat_window">
      <el-scrollbar ref="chat_message_scrollbar"
                    style="height:100%">
        <div class="chat_message_container">
          <ChatMessage v-for="(item, index) in msgList"
                       :key="index"
                       :data="item.data"
                       :type="item.type"
                       @reply="reply"
                       @userAt="userAt" />
          <div v-show="isViewWindowEnd"
               class="chat_scroll_end"
               @click="scrollToEnd">
            <i class="el-icon-arrow-down"></i>
          </div>
          <div ref="chat_end_tag"
               class="chat_end_tag"
               @click="scrollToEnd"></div>
        </div>
      </el-scrollbar>

      <div class="send_warp">
        <div class="input_chat">
          <div v-if="msg.data.reply_name || msg.data.at"
               class="reply_warp"
               @click="cancelReply">
            <div class="reply_name">
              {{msg.data.reply_name ? msg.data.reply_name : `@ ${msg.data.at}`}}
            </div>
            <div class="reply_msg">
              {{msg.data.reply}}
            </div>
          </div>
          <el-input ref="sendInput"
                    v-model="msg.data.message"
                    type='textarea'
                    @keyup.ctrl.enter.native="sendMsg"></el-input>
        </div>
        <div class="chat_btn">
          <el-button type="primary"
                     @click="sendMsg">发送</el-button>
        </div>
      </div>

    </div>
    <div></div>
  </div>
</template>

<script>
import ChatMessage from '@/components/ChatMessage'
import { Init, HeartBeats, SendMessage } from '@/api/websocket'
import { mapState } from 'vuex'
export default {
  components: {
    ChatMessage,
  },
  data() {
    return {
      msgList: [],
      chatUrl: '',
      user: {
        name: '用户名',
        level: 1,
        platform: 'PC',
        title: '称号',
        user_id: '',
        avatar: '',
      },
      inputMsg: '',
      msg: {
        type: 'broadcast_message',
        data: {
          at: '',
          audio: '',
          avatar:
            'https://storage.wikawika.xyz/static/04e2a7a3-34a7-469f-9320-cffac35e1ad3.jpg',
          block_user_id: '',
          character:
            'https://pica-pica.wikawika.xyz/special/frame-253.png?g\u003d2',
          email: 'futarisuki',
          event_icon: '',
          gender: 'm',
          image: '',
          level: 4,
          message: '',
          name: '神经变态绅士耶',
          platform: 'android',
          reply: '',
          reply_name: '',
          title: '纯爱蕾姆女仆娇小阔爱温柔体贴病娇状态赛高',
          type: 3,
          unique_id: '',
          user_id: '58bc4224712c5d0778c5ec1d',
          verified: false,
          isSelf: true,
        },
      },
      msgTypeList: ['broadcast_message', 'broadcast_audio', 'broadcast_image'],
      onlineNumber: 0,
      isShowOnlineNumber: false,
      isViewWindowEnd: false,
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    // 初始化消息对象
    resetMegModel() {
      this.msg.data.message = ''
      this.msg.data.at = ''
      this.msg.data.audio = ''
      this.msg.data.image = ''
      this.msg.data.reply = ''
      this.msg.data.reply_name = ''
    },
    // 发送消息
    sendMsg() {
      if (this.msg.data.message === '') {
        this.$message.info('发送内容不能为空')
        return false
      }
      let tempMsg = JSON.parse(JSON.stringify(this.msg))
      SendMessage(tempMsg.data)

      this.resetMegModel()
      tempMsg.isSelf = true
      this.msgList.push(tempMsg)
      this.scrollToEnd()
    },
    // 初始化
    init() {
      const params = {
        url: this.chatUrl,
        render: this.receiveMsg,
      }
      Init(params)
      HeartBeats(params)
    },
    // 接收消息
    receiveMsg(data) {
      if (data instanceof Array) {
        const msgModel = {
          type: data[0],
          data: data[1],
        }

        if (msgModel.type === 'new_connection') {
          this.onlineNumber = msgModel.data.connections
          this.showOnlineNumber()
        } else if (msgModel.type === 'receive_notification') {
          this.$message.info(msgModel.data.message)
        } else if (this.msgTypeList.indexOf(msgModel.type) > -1) {
          this.msgList.push(msgModel)
          this.scrollMsg()
        }
      }
    },
    // 获取用户信息
    getUserInfoToMsg() {
      if (this.userInfo) {
        this.msg.data.avatar = this.userInfo.avatar
        this.msg.data.character = this.userInfo.character
        this.msg.data.email = this.userInfo.email
        this.msg.data.level = this.userInfo.level
        this.msg.data.name = this.userInfo.name
        this.msg.data.title = this.userInfo.title
        this.msg.data.type = this.userInfo.type
        this.msg.data.user_id = this.userInfo.user_id
        this.msg.data.platform = this.userInfo.platform
      }
    },
    // 消息自动滚动
    scrollMsg() {
      if (!this.$refs.chat_message_scrollbar) {
        return
      }
      if (
        this.$refs.chat_message_scrollbar.wrap.scrollTop +
          this.$refs.chat_message_scrollbar.wrap.clientHeight ===
        this.$refs.chat_message_scrollbar.wrap.scrollHeight
      ) {
        this.scrollToEnd()
      }
    },
    // 消息框滚动到底部
    scrollToEnd() {
      this.$nextTick(() => {
        this.$refs.chat_message_scrollbar.update()
        this.$refs.chat_message_scrollbar.wrap.scrollTop =
          this.$refs.chat_message_scrollbar.wrap.scrollHeight
      })
    },
    // 展示在线人数
    showOnlineNumber() {
      this.isShowOnlineNumber = true
      setTimeout(() => {
        this.isShowOnlineNumber = false
      }, 3000)
    },
    // 观察是否到了消息底部
    bindObserver() {
      const intersectionObserver = new IntersectionObserver((entries) => {
        // 如果不可见，就返回
        if (entries[0].intersectionRatio <= 0) {
          this.isViewWindowEnd = true
        } else {
          this.isViewWindowEnd = false
        }
      })
      intersectionObserver.observe(this.$refs.chat_end_tag)
    },
    // at用户
    userAt(name) {
      this.msg.data.at = name
      this.msg.data.reply_name = ''
      this.msg.data.reply = ''
      this.$refs.sendInput.focus()
    },
    reply(params) {
      this.msg.data.reply = params.reply
      this.msg.data.reply_name = params.reply_name
      this.$refs.sendInput.focus()
    },
    cancelReply() {
      this.msg.data.reply = ''
      this.msg.data.reply_name = ''
      this.msg.data.at = ''
    },
  },
  mounted() {
    // for (let index = 0; index < 20; index++) {
    //   this.msgList.push(this.msg)
    // }

    this.chatUrl = process.env.VUE_APP_PICA_CHAT_HOT_URL
    this.getUserInfoToMsg()
    this.init()
    this.bindObserver()
  },
}
</script>

<style lang="scss" scoped>
.main_warp {
  padding: 10px;
  .nav_warp {
    display: flex;
    justify-content: center;

    .online_number_warp {
      position: fixed;
      top: 10px;
      left: auto;
    }
  }
  .chat_message_container {
    height: 480px;
    .chat_scroll_end {
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      position: absolute;
      right: 40px;
      bottom: 20px;
      font-size: 24px;
      text-align: center;
      line-height: 40px;
      background-color: rgb(165, 159, 159);
      color: #fff;
      cursor: pointer;
    }

    .chat_end_tag {
      height: 20px;
      content: '';
    }
  }

  .send_warp {
    border-top: 1px solid rgb(177, 177, 177);
    padding: 10px;

    .input_chat {
      width: 100%;
      .reply_warp {
        background-color: #ffd9df;
        font-size: 14px;
        padding: 10px;
        height: 40px;
        margin-bottom: 10px;

        .reply_name {
          font-weight: bold;
          padding: 5px 0;
        }
      }
      :deep .el-textarea {
        height: 120px;
        .el-textarea__inner {
          border: none;
          outline: none;
          resize: none;
          height: 100%;
          padding: 0;
        }
      }
    }

    .chat_btn {
      text-align: right;
    }
  }
}
</style>

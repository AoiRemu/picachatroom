<template>
  <div class="main_warp">
    <div class="nav_warp">
      导航栏
    </div>
    <div ref="chat_window"
         class="chat_window">
      <el-scrollbar ref="chat_message_scrollbar"
                    style="height:100%">
        <div class="chat_message_container">
          <ChatMessage v-for="(item, index) in msgList"
                       :key="index"
                       :data="item" />
        </div>
      </el-scrollbar>

      <div class="send_warp">
        <div class="input_chat">
          <el-input v-model="msg.message"
                    type='textarea'></el-input>
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
        message: '测试',
        name: '神经变态绅士耶',
        platform: 'android',
        reply: '',
        reply_name: '',
        title: '纯爱蕾姆女仆娇小阔爱温柔体贴病娇状态赛高',
        type: 3,
        unique_id: '',
        user_id: '58bc4224712c5d0778c5ec1d',
        verified: false,
      },
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    sendMsg() {
      let msg = JSON.parse(JSON.stringify(this.msg))
      SendMessage(msg)
      this.msg.message = ''
      msg.isSelf = true
      this.msgList.push(msg)
      this.scrollToEnd()
    },
    init() {
      const params = {
        url: this.chatUrl,
        render: this.receiveMsg,
      }
      Init(params)
      HeartBeats(params)
    },
    receiveMsg(data) {
      if (data instanceof Array) {
        const type = data[0]
        if (type === 'broadcast_message') {
          let msg = data[1]
          this.msgList.push(msg)
          this.scrollToEnd()
        }
      }
    },
    getUserInfoToMsg() {
      if (this.userInfo) {
        this.msg.avatar = this.userInfo.avatar
        this.msg.character = this.userInfo.character
        this.msg.email = this.userInfo.email
        this.msg.level = this.userInfo.level
        this.msg.name = this.userInfo.name
        this.msg.title = this.userInfo.title
        this.msg.type = this.userInfo.type
        this.msg.user_id = this.userInfo.user_id
        this.msg.platform = this.userInfo.platform
      }
    },
    scrollToEnd() {
      this.$nextTick(() => {
        this.$refs.chat_message_scrollbar.update()
        this.$refs.chat_message_scrollbar.wrap.scrollTop =
          this.$refs.chat_message_scrollbar.wrap.scrollHeight
      })
    },
  },
  mounted() {
    // for (let index = 0; index < 20; index++) {
    //   this.msgList.push(this.msg)
    // }
    this.chatUrl = process.env.VUE_APP_PICA_CHAT_HOT_URL
    this.getUserInfoToMsg()
    this.init()
  },
}
</script>

<style lang="scss" scoped>
.main_warp {
  padding: 10px;
  .chat_message_container {
    height: 600px;
  }

  .send_warp {
    border-top: 1px solid rgb(177, 177, 177);
    padding: 10px;
    .input_chat {
      width: 100%;
      height: 200px;
      ::v-deep .el-textarea {
        height: 100%;
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

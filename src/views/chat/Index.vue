<template>
  <div class="main_warp">
    <div class="nav_warp">
      <div class="online_number_warp">
        <el-tag v-if="onlineNumber > 0"
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
                       :type="item.type" />
        </div>
      </el-scrollbar>

      <div class="send_warp">
        <div class="input_chat">
          <el-input v-model="msg.data.message"
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
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    sendMsg() {
      if (this.msg.data.message === '') {
        this.$message.info('发送内容不能为空')
        return false
      }
      let msg = JSON.parse(JSON.stringify(this.msg))
      SendMessage(msg.data)
      this.msg.data.message = ''
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
        const msgModel = {
          type: data[0],
          data: data[1],
        }

        if (msgModel.type === 'new_connection') {
          this.onlineNumber = msgModel.data.connections
        } else if (this.msgTypeList.indexOf(msgModel.type) > -1) {
          this.msgList.push(msgModel)
          this.scrollToEnd()
        }
      }
    },
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
    scrollToEnd() {
      if (!this.$refs.chat_message_scrollbar) {
        return
      }
      if (
        this.$refs.chat_message_scrollbar.wrap.scrollTop +
          this.$refs.chat_message_scrollbar.wrap.clientHeight ===
        this.$refs.chat_message_scrollbar.wrap.scrollHeight
      ) {
        this.$nextTick(() => {
          this.$refs.chat_message_scrollbar.update()
          this.$refs.chat_message_scrollbar.wrap.scrollTop =
            this.$refs.chat_message_scrollbar.wrap.scrollHeight
        })
      }
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
  .nav_warp {
    display: flex;
    justify-content: center;
  }
  .chat_message_container {
    height: 600px;
  }

  .send_warp {
    border-top: 1px solid rgb(177, 177, 177);
    padding: 10px;
    .input_chat {
      width: 100%;
      height: 200px;
      :deep .el-textarea {
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

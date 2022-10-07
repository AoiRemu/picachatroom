<template>
  <div :class="'chat_msg_warp ' + selfClass">
    <div class="chat_avatar">
      <el-avatar :size="50"
                 :src="data.avatar"></el-avatar>
    </div>
    <div class="chat_msg">
      <div class="chat_header">
        <div class="user_title">
          <span class="user_level">Lv.{{data.level}}</span>
          <el-tag type="warning"
                  effect="dark"
                  size="mini"
                  color="#FFB400">{{data.title}}</el-tag>
        </div>
        <div class="user_name">
          {{data.name}}
        </div>
      </div>
      <div class="user_msg">
        <div v-if="type === 'broadcast_image'">
          <el-image style="width: 200px;"
                    :src="data.image"
                    :preview-src-list="[data.image]">
          </el-image>
        </div>
        <div v-else-if="type === 'broadcast_audio'">
          <audio :src="audioPrefix + data.audio"
                 controls="controls"></audio>
        </div>
        <div v-else>
          {{data.message}}
        </div>
      </div>
      <div class="system_info">
        <div class="system_time">{{ nowTime }}</div>
        <div class="system_type">{{ data.platform }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      },
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      message: {},
      selfClass: '',
      nowTime: '',
      audioPrefix: 'data:audio/wav;base64,',
    }
  },
  methods: {},
  mounted() {
    // this.message = {
    //   data: {
    //     "at": "",
    //     "audio": "",
    //     "avatar": "https://storage.wikawika.xyz/static/04e2a7a3-34a7-469f-9320-cffac35e1ad3.jpg",
    //     "block_user_id": "",
    //     "character": "https://pica-pica.wikawika.xyz/special/frame-253.png?g\u003d2",
    //     "email": "futarisuki",
    //     "event_icon": "",
    //     "gender": "m",
    //     "image": "",
    //     "level": 4,
    //     "message": "测试",
    //     "name": "神经变态绅士耶",
    //     "platform": "android",
    //     "reply": "",
    //     "reply_name": "",
    //     "title": "纯爱蕾姆女仆娇小阔爱温柔体贴病娇状态赛高",
    //     "type": 3,
    //     "unique_id": "",
    //     "user_id": "58bc4224712c5d0778c5ec1d",
    //     "verified": false
    //   },
    //   isSelf:false
    // }

    if (this.data.isSelf) {
      this.selfClass = 'self'
    }

    this.nowTime = this.$moment().format('HH:mm:ss')
  },
}
</script>

<style lang="scss" scoped>
$user_msg_bordercolor: #dfdbdc;
$user_msg_bgcolor: #fefefe;
.chat_msg_warp {
  display: flex;
  .chat_msg {
    margin: 10px;
    .chat_header {
      font-size: 12px;
      color: #909399;
      margin-bottom: 5px;

      .user_level {
        color: #ee9ebb;
        display: inline-block;
        margin-right: 10px;
      }
    }
    .user_msg {
      position: relative;
      padding: 10px;
      border-radius: 5px;
      border-top-left-radius: 0px;
      border: 1px solid $user_msg_bordercolor;
      background-color: $user_msg_bgcolor;
    }
    .user_msg::after {
      content: '';
      display: block;
      position: absolute;
      top: -1px;
      left: -20px;
      border-top: 0px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid $user_msg_bordercolor;
      border-left: 10px solid transparent;
    }
    .user_msg::before {
      content: '';
      position: absolute;
      display: block;
      top: 0px;
      left: -18px;
      border-top: 0px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid $user_msg_bgcolor;
      border-left: 10px solid transparent;
      z-index: 10;
    }

    .system_info {
      color: #909399;
      font-size: 6px;
      display: flex;
      justify-content: right;
      margin-top: 5px;

      > div {
        padding: 0 5px;
      }

      > div + div {
        border-left: 1px solid #acacb1;
      }
    }
  }
}
.chat_msg_warp.self {
  justify-content: right;
  flex-direction: row-reverse;

  .user_msg {
    border-top-right-radius: 0px;
    border-top-left-radius: 5px;
  }
  .user_msg::after {
    content: '';
    position: absolute;
    top: -1px;
    right: -20px;
    left: unset;
    border-top: 0px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid transparent;
    border-left: 10px solid $user_msg_bordercolor;
  }
  .user_msg::before {
    content: '';
    position: absolute;
    top: 0px;
    right: -18px;
    left: unset;
    border-top: 0px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid transparent;
    border-left: 10px solid $user_msg_bgcolor;
  }
}
</style>
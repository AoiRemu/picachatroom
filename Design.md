# 设计文档
## 聊天基本功能
1. 接收消息
    - 文字    ✔
    - 语音    ✔
    - 图片    ✔
    - 回复    ✔
    - 悄悄话  ✔
    - 悄悄话提醒
    - 被@提醒
    - 底部提示最新信息
2. 发送消息
    - 文字  ✔
    - 图片
    - 回复  ✔
    - 悄悄话
    - @指定人 ✔
3. 人数提示   ✔
4. 滚动到底部  ✔
   使用 IntersectionObserver 判断元素是否在可视区域内,然后选择是否显示 箭头按钮 
   参考 [IntersectionObserver API 使用教程](https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)
5. 虚拟DOM加载
6. 点击头像查看用户信息
7. 右键消息菜单
   - 复制
   - 回复
   - 悄悄话
8. 右键头像菜单
   - @
   - 加关注
  
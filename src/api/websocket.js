export let WebSocketClient

export function Init(params){
    if (WebSocketClient) {
        WebSocketClient.close()
    }

    WebSocketClient = new WebSocket(params.url)
    WebSocketClient.onmessage = function (rec) { ReceiveHandler(rec, params.render) }
    WebSocketClient.onerror = function (err) {
        console.log(err)
    }
}

export function HeartBeats(params) {
    console.log('websocket init')
    let interval = setInterval(function () {
        console.log(WebSocketClient)
        if (!WebSocketClient || WebSocketClient.readyState !== 1) {
            Init(params)
        }

        console.log("------heart beats--------")
    }, 25000)
}

export function ReceiveHandler(rec, renderMessage) {
    console.log(rec)
    const jsonStr = rec.data.replace(/^[0-9]+/,'')
    if(jsonStr){
      const data = JSON.parse(jsonStr)
      renderMessage(data)
    }
}

export function SendMessage(message){
    const msg = [
        'send_message',
        message
    ]
    WebSocketClient.send('42' + JSON.stringify(msg))
}

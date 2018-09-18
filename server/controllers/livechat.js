module.exports = class livechat {
  constructor(app){
    this.app=app
    this.clients={}
    this.chatid=app.env.TELEGRAM_CHATID,
    this.closeWS=this.closeWS.bind(this)
    this.app.bot.on('message', (msg) => {
      msg=msg.text.split(' ')
      let token=msg[0].replace('@','')
      this.sendClient(token,msg.slice(1).join(' '))
    });
  }
  closeWS(ws){
    this.clients[ws.auth]=setTimeout(()=>{
      this.sendServer(ws,'Left the page');
      delete this.clients[ws.auth];
    },1000*10)
    console.log('close '+ws.auth)
  }
  message(ws,message){
      switch (message.action) {
        case 'message':
          this.sendServer(ws,message.message)
        case 'enter':
          if(!this.clients[ws.auth])
            this.enter(ws)
          clearTimeout(this.clients[ws.auth])
          break;
        default:
          console.log(message)

      }
  }
  enter(ws){
    this.sendServer(ws,'New guy on the page ('+ws._socket.remoteAddress+')')
  }
  sendServer(ws,message){
    this.app.bot.sendMessage(this.chatid,'@'+ws.auth+' '+message)
  }
  isNew(token){
    let i=0;
    this.app.ws.getWss().clients.forEach(e=>{
      if(i>1)  return false
      if( e.auth===token)i++
    })
    return (i<=1)
  }
  sendClient(token,text){
    this.app.ws.getWss().clients.forEach(ws=>{
      if( ws.auth===token)
        ws.send(JSON.stringify({
          module:'livechat',
          data:{
            action:'message',
            text:text,
          }
        }))
    })
  }
}

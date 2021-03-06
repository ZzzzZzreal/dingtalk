import path from 'path'
import notifier from 'node-notifier'
import { ipcRenderer, remote } from 'electron'

notifier.on('click', () => {
  ipcRenderer.send('MAINWIN:window-show')
})

let notify
export default message => {
  notifier.notify({
    title: '钉钉',
    message,
    icon: `file://${path.join(remote.app.getAppPath(), './icon/128x128.png')}`
  }, err => {
    if (!err) return
    if (notify instanceof Notification) {
      notify.close()
    }
    if (Notification.permission === 'granted') {
      notify = new Notification('钉钉', {
        body: message,
        icon: 'https://g.alicdn.com/dingding/web/0.1.8/img/logo.png'
      })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(permission => {
        // 如果用户同意，就可以向他们发送通知
        if (permission === 'granted') {
          notify = new Notification('钉钉', {
            body: message,
            icon: 'https://g.alicdn.com/dingding/web/0.1.8/img/logo.png'
          })
        }
      })
    }
  })
}

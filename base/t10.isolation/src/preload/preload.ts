// https://www.wakuwakubank.com/posts/773-electron-ipc/
// https://stackoverflow.com/questions/55164360/with-contextisolation-true-is-it-possible-to-use-ipcrenderer
// https://www.electronjs.org/docs/latest/tutorial/context-isolation#after-context-isolation-enabled
// https://mattallan.me/posts/electron-context-bridge/


import { contextBridge, ipcRenderer } from "electron"
// // 这里出现警告是因为 window.d.ts 文件没有定义
// window.ipcRenderer = ipcRenderer
// // 去掉安全警告
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"
//! 上下文隔离配置
contextBridge.exposeInMainWorld("ipcRenderer", {
    //! 其实, 这样的导出还是有安全问题的, 需要加一个验证
    // any 类型不报警
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send: (channel: string, args: any) => {
        console.log("send on channel " + channel)
        // 设置一个白名单
        const validChannels: string[] = ['ping']
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, args)
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    receive: (channel: string, f: (...args: any[]) => ({/*  */})) => {
        console.log("reveive on channel " + channel)
        const validChannels: string[] = [
            "set-auth-token",
            "set-window-name",
            "get-window-name",
            "send-message-to-one-drive",
            "update-badge",
            "is-hidden",
            "open-google-sign-in",
        ]
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => f(...args))
        }
    },
})

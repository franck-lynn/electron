// 一个对象就是一个菜单名
// https://www.bilibili.com/video/BV1sv41137wW?p=3&spm_id_from=pageDriver
import { MenuItemConstructorOptions,BrowserWindow, MenuItem, Menu,  } from "electron"

const menuTemple: (MenuItemConstructorOptions | MenuItem)[] =  [
    { 
        label: "主菜单1", 
        submenu: [
            { 
                id: '1',
                label: "菜单1.1",
                // 注册点击事件
                click: (): void => {
                    const win = new BrowserWindow({
                        width: 300,
                        height: 200,
                        show: false,
                    })
                    const URL = `http://localhost:3000`
                    win.loadURL(URL)
                    win.on('close', () => {
                        console.log("菜单点击产生的窗口关闭")
                        win.close()
                    })
                    win.on('ready-to-show', () => {
                        console.log("监听到ready-to-show")
                        win.show()
                    })
                    
                } 
            },
            { label: "菜单1.2" },
            { label: "菜单1.3" },
            { label: "菜单1.4" },
        ] 
    },
    { 
        label: "主菜单2", 
        submenu: [
            { label: "菜单2.1" },
            { label: "菜单2.2" },
            { label: "菜单2.3" },
            { label: "菜单2.4" },
        ] 
    }
]
// 创建菜单
const mymenu = Menu.buildFromTemplate(menuTemple)
// 设置应用程序菜单, 
Menu.setApplicationMenu(mymenu)
// 然后在主线程创建 createWindow()  中 import(./menu/menu.ts) 就可以创建菜单了

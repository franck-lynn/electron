import { MenuItemConstructorOptions, MenuItem, IpcMainEvent } from "electron"

const rightClickTemplate = (e: IpcMainEvent): (MenuItemConstructorOptions | MenuItem)[] => [
    {
        label: "复制",
        role: "copy", // 只需设置菜单role值为如下示之一，Electron便会自动认出并设置成标准菜单
        accelerator: "ctrl+c",
    },
    {
        label: "粘贴",
        role: "paste",
        
        accelerator: "ctrl+v",
    },
    {
        label: "剪切",
    },
    {
        label: "非标菜单",
        click: (): void => {
            // 主进程向客户端发送
            e.sender.send("context-menu-command", "非标菜单")
        },
    },
]

export { rightClickTemplate }

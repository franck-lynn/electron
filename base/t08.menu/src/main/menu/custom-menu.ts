import { BrowserWindow } from "electron"

const createNewWindow = (): void => {
    new BrowserWindow({
        width: 300,
        height: 200,
    })
}

export {createNewWindow}

// 插件的入口文件
import * as vscode from "vscode"

/**
 * 插件被激活时触发, 所有代码总入口
 * @param {*} context 插件上下文
 */

// const provideCompletionItems = (document, position, token, context: vscode.ExtensionContext): void => {
//     const line = document.lineAt(position)
//     const projectPath = util.getProjectPath(document)
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function activate(context: vscode.ExtensionContext) {
    console.log("恭喜, 您的扩展'vscode-plugin-hello'已被激活")

    let disposable = vscode.commands.registerCommand("helloworld.helloWorld", () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage("插件带来的 hello world! ")
    })
    // 注册命令
    context.subscriptions.push(disposable)
}

export function deactivate() {
    console.log("您的扩展 vscode-plugin-hello 已被释放")
}

import path from "path"
// import commonjsExternals from 'vite-plugin-commonjs-externals'


import { UserConfig } from "vite"
import vue from "@vitejs/plugin-vue" // vue 插件

const mode = process.env.MODE
console.log("mode is ---> ", mode)
const config: UserConfig = {
    mode,
    //! 本地文件启动需要采用的是绝对路径, 用 './dist' 不行, 得用 path.resolve()
    base: mode === "production" ? path.resolve(__dirname, "./dist/") : "./",
    build: {
        outDir: path.resolve(__dirname, "./dist"),
        assetsDir: "assets",
    },
    // resolve: {
    //     alias: {
    //         "@": path.resolve(__dirname, "src"),
    //         "@render": path.resolve(__dirname, 'src/render/'),
    //         "~": "F:/node/node_modules",
    //         scss: "./scss",
    //         typings: "./typings"
    //     }
    // },
    plugins: [
        vue(),
        // commonjsExternals({
        //     externals:['path', /^electron(\/.+)?$/],
        // })
    ],
    // server: {
    //     host: '0.0.0.0',
    //     port: 8080,
    // }
}

export default config

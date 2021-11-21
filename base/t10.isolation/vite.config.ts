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
        assetsDir: "assets",
        rollupOptions: {
            // vite 自定义入口
            input: {
                main: path.resolve(__dirname, 'render/index.html'), 
            }
        }, 
        outDir: path.resolve(__dirname, "./dist"),
        
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@render": path.resolve(__dirname, 'src/render/'),
            "~": "F:/node/node_modules",
            scss: path.resolve(__dirname, "src/render/scss"),
            typings: "./typings"
        }, 
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
               @use "sass:math"; // 需要在任意规则之前, 那就放在这里
               @import '~/compass-mixins/lib/compass.scss';
               @import "scss/scss/entries/main.scss";
               @import "~/include-media/dist/include-media.scss";
               `
            }
        }
    },
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

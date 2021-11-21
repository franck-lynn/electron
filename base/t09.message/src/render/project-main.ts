
// vite 用的主入口文件

import { createApp } from "vue"
import ProjectApp from "./ProjectApp.vue"

const app = createApp(ProjectApp)

app.mount("#root")

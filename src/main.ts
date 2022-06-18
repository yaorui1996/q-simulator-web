import './index.css'
import 'vue-select/dist/vue-select.css'
import 'element-plus/dist/index.css'

import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent
} from 'echarts/components'
import { use } from 'echarts/core'
// import ECharts modules manually to reduce bundle size
import { CanvasRenderer } from 'echarts/renderers'
import { createApp } from 'vue'
import ECharts from 'vue-echarts'
import App from './App.vue'
import ElementPlus from 'element-plus'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent
])

const app = createApp(App)

// register globally (or you can do it locally)
app.component('VChart', ECharts)

app.use(ElementPlus)

app.mount('#app')

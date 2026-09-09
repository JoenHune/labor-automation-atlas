import DefaultTheme from 'vitepress/theme'
import './style.css'
import AtlasHome from './components/AtlasHome.vue'
import CountryView from './components/CountryView.vue'
import IndustryView from './components/IndustryView.vue'
import TaskView from './components/TaskView.vue'
import CandidateTaskView from './components/CandidateTaskView.vue'
import AnnotationLayer from './components/AnnotationLayer.vue'
import CurrencyControls from './components/CurrencyControls.vue'
import {h} from 'vue'
export default {
 extends:DefaultTheme,
 Layout:()=>h(DefaultTheme.Layout,null,{'layout-bottom':()=>h(AnnotationLayer),'nav-bar-content-after':()=>h(CurrencyControls)}),
 enhanceApp({app}:any) {
  app.component('AtlasHome',AtlasHome)
  app.component('CountryView',CountryView)
  app.component('IndustryView',IndustryView)
  app.component('TaskView',TaskView)
  app.component('CandidateTaskView',CandidateTaskView)
 },
}

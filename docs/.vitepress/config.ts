import { defineConfig } from 'vitepress'
export default defineConfig({
 title:'人力与自动化图谱',description:'从最新行业增加值到实体劳动任务、自动化证据与成立条件。',lang:'zh-CN',
 base:'/labor-automation-atlas/',cleanUrls:true,lastUpdated:true,appearance:false,
 themeConfig:{
  nav:[{text:'中国',link:'/cn/'},{text:'美国',link:'/us/'},{text:'研究方法',link:'/methodology'}],
  sidebar:[],outline:false,
  socialLinks:[{icon:'github',link:'https://github.com/JoenHune/labor-automation-atlas'}],
  docFooter:{prev:false,next:false},
  lastUpdated:{text:'页面更新'},
 },
 vite:{server:{fs:{allow:['..']},watch:{ignored:['**/.vitepress/dist/**']}}},
})

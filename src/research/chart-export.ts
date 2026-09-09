import type {ECharts} from 'echarts/core'
import type {Observation,Research} from './schema'
export function chartRecord(research:Research,country:'cn'|'us',title:string,observations:(Observation|undefined)[]) {
 const points=observations.filter((o):o is Observation=>Boolean(o))
 if(points.some(o=>o.country!==country))throw new Error('图表导出包含其他国家数据')
 const sourceIds=new Set(points.flatMap(o=>o.evidence.map(r=>r.sourceId)))
 const industryIds=new Set(points.map(o=>o.industryId))
 return {title,country,version:research.version,checkedAt:research.checkedAt,profile:research.countries.find(p=>p.country===country),observations:points,industries:research.industries.filter(i=>industryIds.has(i.id)).map(({inventory,...i})=>i),sources:research.sources.filter(s=>sourceIds.has(s.id))}
}
function download(blob:Blob,name:string) {
 const link=document.createElement('a'),url=URL.createObjectURL(blob)
 link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
export function downloadChartData(record:ReturnType<typeof chartRecord>,name:string) {
 download(new Blob([JSON.stringify(record,null,2)],{type:'application/json'}),name+'.json')
}
export function downloadChartSvg(instance:ECharts,title:string,subtitle:string,name:string) {
 const data=instance.getSvgDataURL(),comma=data.indexOf(',')
 const xml=data.slice(0,comma).includes(';base64')?atob(data.slice(comma+1)):decodeURIComponent(data.slice(comma+1))
 const chart=new DOMParser().parseFromString(xml,'image/svg+xml').documentElement
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),width=instance.getWidth(),height=instance.getHeight()
 const lines:{text:string;size:number;y:number}[]=[];let y=24
 for(const [text,size] of [[title,17],[subtitle,11]] as const) {
  let line='',used=0
  for(const char of text){const weight=/[\u0000-\u007f]/.test(char)?.65:1;if(used+weight>(width-20)/size&&line){lines.push({text:line,size,y});y+=size+7;line='';used=0}line+=char;used+=weight}
  if(line){lines.push({text:line,size,y});y+=size+7}
 }
 const headingHeight=y+8
 svg.setAttribute('width',String(width));svg.setAttribute('height',String(height+headingHeight));svg.setAttribute('viewBox',`0 0 ${width} ${height+headingHeight}`)
 const background=document.createElementNS(ns,'rect');background.setAttribute('width','100%');background.setAttribute('height','100%');background.setAttribute('fill','white');svg.appendChild(background)
 for(const {text,y,size} of lines) {
  const line=document.createElementNS(ns,'text');line.textContent=text;line.setAttribute('x','8');line.setAttribute('y',String(y));line.setAttribute('font-size',String(size));line.setAttribute('font-family','system-ui,sans-serif');line.setAttribute('fill','#263548');svg.appendChild(line)
 }
 chart.setAttribute('x','0');chart.setAttribute('y',String(headingHeight));svg.appendChild(chart)
 download(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml;charset=utf-8'}),name+'.svg')
}

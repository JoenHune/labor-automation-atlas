import {canDrill,orbitPath,type OrbitSector} from './orbit'
import {scaleIndex,type ScaleNode} from './industry-scale'

export function singleOrbitBranch(root:ScaleNode,id:string){
 return orbitPath(scaleIndex([root]),id).filter(n=>n.id!==root.id&&canDrill(n)).map(n=>n.id)
}
export function orbitRadii(count:number,depth:number){
 const inner=count===1?48:count===2?32:24,step=(80-inner)/count
 return {inner:inner+depth*step,outer:inner+(depth+1)*step-1}
}
/** Terminal siblings stay substantial beside their parent, with equal radii for faithful comparisons. */
export function orbitBandRadii(bands:OrbitSector[][],depth:number){
 const base=orbitRadii(bands.length,depth),band=bands[depth]
 if(depth===0||depth!==bands.length-1||!band?.length||band.some(s=>canDrill(s.node)))return base
 const parentId=band[0].node.parentId
 if(band.some(s=>s.node.parentId!==parentId))return base
 const parent=bands[depth-1].find(s=>s.node.id===parentId)
 if(!parent)return base
 const arcLength=base.inner*parent.share*2*Math.PI
 const thickness=Math.min(base.outer-base.inner,Math.max((base.outer-base.inner)*.72,arcLength*.23))
 const previous=orbitRadii(bands.length,depth-1)
 const inner=previous.outer+Math.min(base.inner-previous.outer,thickness*.12)
 return {inner,outer:inner+thickness}
}
export const orbitMaxZoom=32
export function orbitStrokeWidth(depth:number,share:number,radiusPx:number,zoom:number){
 return Math.min((depth?.7:1.5)/zoom,Math.max(0,share)*2*Math.PI*radiusPx*.18)
}
/** Bounds of an annular wedge, relative to the original circle's center. */
export function wedgeBounds(start:number,share:number,inner:number,outer:number){
 const end=start+share,angles=[start,end,...[0,.25,.5,.75,1].filter(a=>a>=start&&a<=end)]
 const points=angles.flatMap(a=>[inner,outer].map(r=>({x:Math.sin(a*2*Math.PI)*r,y:-Math.cos(a*2*Math.PI)*r})))
 const left=Math.min(...points.map(p=>p.x)),right=Math.max(...points.map(p=>p.x)),top=Math.min(...points.map(p=>p.y)),bottom=Math.max(...points.map(p=>p.y))
 return {left,right,top,bottom,width:right-left,height:bottom-top,cx:(left+right)/2,cy:(top+bottom)/2}
}
export function orbitCamera(bands:OrbitSector[][],id:string,width:number,height:number){
 let sector=bands.flat().find(s=>s.node.id===id)
 if(!sector||width<=0||height<=0)return {zoom:1,x:0,y:0}
 // Selecting a terminal item keeps its siblings in the same comparison frame.
 if(!canDrill(sector.node)&&sector.node.parentId){
  const parent=bands.flat().find(s=>s.node.id===sector!.node.parentId)
  if(!parent)return {zoom:1,x:0,y:0}
  sector=parent
 }
 const childBand=bands[sector.depth+1]?.some(s=>s.node.parentId===sector!.node.id)
 const radius=orbitBandRadii(bands,sector.depth+(childBand?1:0)),unit=Math.min(width,height)/200
 const terminal=childBand&&bands[sector.depth+1].every(s=>!canDrill(s.node))
 const parentRadius=orbitBandRadii(bands,sector.depth)
 // Frame part of the parent and its children together, rather than fitting a thin outer strip.
 const inset=terminal?(parentRadius.outer-parentRadius.inner)*.65:childBand?(radius.outer-radius.inner)*.16:0
 const inner=(radius.inner-inset)*unit
 const bounds=wedgeBounds(sector.start,sector.share,inner,radius.outer*unit),padding=width<500?32:44
 // Very small terminal angles must not drive an extreme zoom that erases the circular context.
 const previous=terminal&&sector.depth>0?orbitCamera(bands.slice(0,sector.depth+1),sector.node.parentId!,width,height):null
 const ceiling=previous?previous.zoom*2.2:orbitMaxZoom
 const zoom=Math.min(orbitMaxZoom,ceiling,Math.max(1,Math.min((width-2*padding)/Math.max(1,bounds.width),(height-2*padding)/Math.max(1,bounds.height))))
 // Shift the pair slightly outward, leaving room toward the circle center for its ancestor.
 const angle=(sector.start+sector.share/2)*2*Math.PI,offset=terminal?Math.min(width,height)*.08:0
 return {zoom,x:(-bounds.cx*zoom+Math.sin(angle)*offset)/width,y:(-bounds.cy*zoom-Math.cos(angle)*offset)/height}
}

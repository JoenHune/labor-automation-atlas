import type {Rect} from './schema'

/** Keep the selection controls beside visible content, including at narrow widths. */
export function selectionToolbarPosition(selection:Rect,viewport:{width:number;height:number},size:{width:number;height:number}) {
 const margin=8,gap=12,topInset=72
 const right=viewport.width-margin,bottom=viewport.height-margin
 if(selection.x+selection.width<=margin||selection.x>=right||selection.y+selection.height<=topInset||selection.y>=bottom)return null
 const width=Math.min(size.width,Math.max(0,viewport.width-margin*2))
 const height=Math.min(size.height,Math.max(0,bottom-topInset))
 const left=Math.max(margin,selection.x),top=Math.max(topInset,selection.y)
 const visibleRight=Math.min(right,selection.x+selection.width),visibleBottom=Math.min(bottom,selection.y+selection.height)
 let x=left,y=top
 if(visibleRight+gap+width<=right)x=visibleRight+gap
 else if(left-gap-width>=margin)x=left-gap-width
 else if(visibleBottom+gap+height<=bottom)y=visibleBottom+gap
 else y=top-gap-height
 return {left:Math.max(margin,Math.min(x,right-width)),top:Math.max(topInset,Math.min(y,bottom-height)),maxWidth:right-margin,maxHeight:Math.max(0,bottom-topInset)}
}

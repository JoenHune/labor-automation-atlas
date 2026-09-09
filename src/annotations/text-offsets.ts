import {normalizeText} from './anchors'

/** Each normalized UTF-16 position points to a complete original grapheme.
 * Several positions may share one span (emoji, flags, or combining sequences).
 * Original offsets remain usable after NFC shortens a combining sequence. */
export interface TextSpan {start:number;end:number}
export function normalizeTextOffsets(raw:string):{text:string;spans:TextSpan[]} {
 const segmenter=new Intl.Segmenter(undefined,{granularity:'grapheme'})
 let text='';const spans:TextSpan[]=[]
 for(const segment of segmenter.segment(raw)) {
  const value=segment.segment.normalize('NFC'),span={start:segment.index,end:segment.index+segment.segment.length}
  for(let i=0;i<value.length;i++) {
   if(/\s/.test(value[i])) {
    if(text&&!text.endsWith(' ')){text+=' ';spans.push(span)}
    else if(text.endsWith(' '))spans[spans.length-1]={start:spans[spans.length-1].start,end:span.end}
   }else{text+=value[i];spans.push(span)}
  }
 }
 while(text.endsWith(' ')){text=text.slice(0,-1);spans.pop()}
 if(text!==normalizeText(raw))throw new Error('文字规范化结果不一致，无法安全定位选区')
 return {text,spans}
}

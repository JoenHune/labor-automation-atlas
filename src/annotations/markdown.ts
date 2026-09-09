import MarkdownIt from 'markdown-it'
const md=new MarkdownIt({html:false,linkify:false,breaks:true,typographer:false})
const defaultLink=md.renderer.rules.link_open??((tokens,idx,options,_env,self)=>self.renderToken(tokens,idx,options))
md.renderer.rules.link_open=(tokens,idx,options,env,self)=>{
 tokens[idx].attrSet('target','_blank');tokens[idx].attrSet('rel','noopener noreferrer nofollow')
 return defaultLink(tokens,idx,options,env,self)
}
// External comment images are links, so opening a thread sends no image request
// to a comment author's server. Research snapshots use the site's own R2 API.
md.renderer.rules.image=(tokens,idx)=>{
 const t=tokens[idx],url=String(t.attrGet('src')??''),label=md.utils.escapeHtml(t.content||'图片')
 return /^https?:\/\//i.test(url)?'<a target="_blank" rel="noopener noreferrer nofollow" href="'+md.utils.escapeHtml(url)+'">['+label+']</a>':'['+label+']'
}
export const safeMarkdown=(body:string)=>md.render(body)

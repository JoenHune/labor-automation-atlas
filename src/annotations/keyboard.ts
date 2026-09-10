// Keyboard focus is independent of persistent anchor identity. Nested paragraphs
// must remain selectable without changing the IDs or fingerprints of old anchors.
const contentSelector='[data-content-id],p,h1,h2,h3,h4,h5,h6,li,tr,img,pre,blockquote,dt,dd,figcaption,summary,[role="img"]'
const editorSelector='input,textarea,select,[contenteditable]:not([contenteditable="false"])'
const controlSelector='a,button,input,textarea,select,[role="button"],[role="link"]'

export function prepareKeyboardTargets(root:HTMLElement) {
 for(const el of root.querySelectorAll<HTMLElement>(contentSelector)) {
  if(el.closest('[data-annotation-ui],'+editorSelector)||el.closest(controlSelector))continue
  if(!el.hasAttribute('tabindex')&&!el.matches('summary'))el.tabIndex=0
  if(!el.hasAttribute('aria-keyshortcuts'))el.setAttribute('aria-keyshortcuts','Alt+Shift+A')
 }
}

export function keyboardAnnotationTarget(target:EventTarget|null,root:HTMLElement):HTMLElement|null {
 if(!(target instanceof Element)||!root.contains(target)||target.closest('[data-annotation-ui],'+editorSelector))return null
 const el=target.closest<HTMLElement>(contentSelector)
 return el instanceof HTMLElement&&root.contains(el)?el:null
}

export function isAnnotationShortcut(event:KeyboardEvent) {
 // Option can change event.key on macOS; code still identifies the A key.
 return event.altKey&&event.shiftKey&&!event.ctrlKey&&!event.metaKey&&!event.repeat&&!event.isComposing&&(event.code==='KeyA'||event.key.toLowerCase()==='a')
}

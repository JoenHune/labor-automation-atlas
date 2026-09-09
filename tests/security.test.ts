import {describe,it,expect} from 'vitest'
import {b64url,unb64,sha256,encrypt,decrypt,sign,verifyWebhook,safeReturnUrl,readLimitedBody} from '../worker/security'
describe('后台凭证与请求边界',()=>{
 it('PKCE S256符合RFC7636向量',async()=>expect(await sha256('dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk')).toBe('E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM'))
 it('GitHub令牌加密后可解密，错密钥或篡改不能读取',async()=>{
  const key=b64url(new Uint8Array(32).fill(7)),other=b64url(new Uint8Array(32).fill(9))
  const value=await encrypt('synthetic-test-credential',key)
  expect(value).not.toContain('synthetic')
  expect(await decrypt(value,key)).toBe('synthetic-test-credential')
  await expect(decrypt(value,other)).rejects.toThrow()
  const [iv,payload]=value.split('.'),bytes=unb64(payload);bytes[0]^=1
  await expect(decrypt(iv+'.'+b64url(bytes),key)).rejects.toThrow()
 })
 it('Webhook严格验签，不接受修改后的载荷',async()=>{
  const body='{"action":"opened"}',secret='test-webhook-secret'
  const hash=Array.from(unb64(await sign(body,secret))).map(x=>x.toString(16).padStart(2,'0')).join('')
  expect(await verifyWebhook(body,'sha256='+hash,secret)).toBe(true)
  expect(await verifyWebhook(body+' ','sha256='+hash,secret)).toBe(false)
  expect(await verifyWebhook(body,'sha1='+hash,secret)).toBe(false)
 })
 it('阻止登录重定向到站外或站点之外路径',()=>{
  expect(safeReturnUrl('/labor-automation-atlas/cn/?year=2023','https://joenhune.github.io','/labor-automation-atlas/')).toBe('https://joenhune.github.io/labor-automation-atlas/cn/?year=2023')
  for(const url of ['https://attacker.example/','//attacker.example','/other/','/labor-automation-atlas/../outside/'])expect(()=>safeReturnUrl(url,'https://joenhune.github.io','/labor-automation-atlas/')).toThrow()
 })
 it('分块请求无Content-Length仍执行大小限制',async()=>{
  const stream=new ReadableStream<Uint8Array>({start(c){c.enqueue(new Uint8Array(10));c.enqueue(new Uint8Array(10));c.close()}})
  const request=new Request('https://local.test',{method:'POST',body:stream,duplex:'half'} as RequestInit)
  await expect(readLimitedBody(request,12)).rejects.toThrow('内容过大')
 })
})


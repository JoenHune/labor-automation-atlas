export interface Env {
 DB:D1Database
 SNAPSHOTS:R2Bucket
 SITE_ORIGIN:string
 SITE_BASE_PATH:string
 API_ORIGIN:string
 GITHUB_OWNER:string
 GITHUB_REPO:string
 GITHUB_REPOSITORY_ID:string
 GITHUB_CLIENT_ID:string
 GITHUB_CLIENT_SECRET:string
 GITHUB_APP_ID:string
 GITHUB_APP_PRIVATE_KEY:string
 GITHUB_INSTALLATION_ID:string
 TOKEN_ENCRYPTION_KEY:string
 METADATA_SIGNING_KEY:string
 GITHUB_WEBHOOK_SECRET:string
}
export interface Session {
 token_hash:string;user_id:number;user_login:string;avatar_url:string;token_cipher:string;
 created_at:number;expires_at:number;github_expires_at:number;
}
export class HttpError extends Error {
 constructor(public status:number, public code:string, message:string) {super(message)}
}
export const now=()=>Math.floor(Date.now()/1000)
export const json=(data:unknown,status=200,headers:HeadersInit={})=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json;charset=utf-8','Cache-Control':'no-store',...headers}})


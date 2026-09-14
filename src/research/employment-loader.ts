import {validateEmployment} from './employment'
import type {Country,EmploymentDataset} from './schema'

/** Country files keep the full research evidence out of the initial chart bundle. */
export async function loadEmployment(url:string,country:Country,version:string,signal:AbortSignal,request:typeof fetch=fetch):Promise<EmploymentDataset>{
 let response:Response
 try{response=await request(url,{signal})}catch(error){if(signal.aborted)throw error;throw new Error('网络连接失败，请重新读取就业资料')}
 if(!response.ok)throw new Error('就业资料暂时无法读取')
 let data:EmploymentDataset
 try{data=validateEmployment(await response.json())}catch(error){if(signal.aborted)throw error;throw new Error('就业资料未能完整读取，请稍后重试')}
 if(data.version!==version)throw new Error('就业资料与页面版本不同，请刷新后重试')
 if(data.records.some(r=>r.country!==country)||data.sources.some(s=>s.country!==country&&s.country!=='global'))throw new Error('就业资料国家不匹配')
 return data
}

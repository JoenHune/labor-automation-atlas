/** Keep existing records in their established order after replacing an imported
 * batch. New IDs follow in importer order; removed IDs remain removed. */
export function preserveRecordOrder<T extends {id:string}>(records:T[],originalIds:readonly string[]):T[] {
 const index=new Map(records.map(record=>[record.id,record]))
 if(index.size!==records.length||new Set(originalIds).size!==originalIds.length)throw new Error('研究记录编号重复，不能恢复顺序')
 const result:T[]=[]
 for(const id of originalIds){const record=index.get(id);if(record){result.push(record);index.delete(id)}}
 for(const record of records)if(index.has(record.id))result.push(record)
 return result
}

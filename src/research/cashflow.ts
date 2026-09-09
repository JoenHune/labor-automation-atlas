export type CashFlowInput = {
  country:'cn'|'us'
  currency:'CNY'|'USD'
  initial:Record<string,number|null>
  periods:{
    year:number
    realizableLaborSaving:number|null
    demandBackedMargin:number|null
    provenScrapSaving:number|null
    residualLabor:number|null
    maintenance:number|null
    software:number|null
    energyDelta:number|null
    exceptionAndDowntime:number|null
    otherIncrementalCost:number|null
  }[]
  discountRate:number|null
}

export function incrementalCashFlow(input:CashFlowInput) {
  if(input.currency !== (input.country==='cn'?'CNY':'USD')) throw new Error('货币与国家不符')
  const required=['equipment','tooling','integration','safety','facility','training','commissioningDowntime','workingCapital']
  const missing=required.filter(k=>input.initial[k]==null).map(k=>'initial.'+k)
  if(input.discountRate==null) missing.push('discountRate')
  if(!input.periods.length) missing.push('periods')
  const years=new Set<number>()
  input.periods.forEach(p=>{
    if(!Number.isInteger(p.year)||p.year<1||years.has(p.year)) throw new Error('现金流年份必须为唯一正整数')
    years.add(p.year)
    Object.entries(p).forEach(([k,v])=>{ if(v==null) missing.push('year'+p.year+'.'+k); else if(!Number.isFinite(v)) throw new Error('参数必须为有限数值') })
  })
  for(const value of Object.values(input.initial)) if(value!=null && (!Number.isFinite(value)||value<0)) throw new Error('初始投入必须为非负有限数值')
  if(input.discountRate!=null && (!Number.isFinite(input.discountRate)||input.discountRate<=-1)) throw new Error('无效折现率')
  if(missing.length) return {status:'insufficient' as const,missing,npv:null,paybackYear:null,flows:[]}
  const initial=Object.values(input.initial).reduce<number>((sum,v)=>sum+v!,0)
  const flows=[...input.periods].sort((a,b)=>a.year-b.year).map(p=>({
    year:p.year,
    net:p.realizableLaborSaving!+p.demandBackedMargin!+p.provenScrapSaving!
      -p.residualLabor!-p.maintenance!-p.software!-p.energyDelta!-p.exceptionAndDowntime!-p.otherIncrementalCost!
  }))
  let cumulative=-initial, paybackYear:number|null=null
  for(const flow of flows) { cumulative+=flow.net; if(cumulative>=0 && paybackYear===null) paybackYear=flow.year }
  return {
    status:'calculated' as const,missing:[],
    npv:-initial+flows.reduce((sum,f)=>sum+f.net/(1+input.discountRate!)**f.year,0),
    // Annual end-of-period recovery only; no unsupported within-year interpolation.
    paybackYear,flows,
  }
}


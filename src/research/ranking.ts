import type { Country, Industry, Observation } from './schema'

export function annualRanking(country: Country, year: number, industries: Industry[], observations: Observation[]) {
  const universe = industries.filter(i => i.country === country && i.rankingUniverse)
  const ids = new Set(universe.map(i => i.id))
  for (const i of universe) {
    let parent = i.parentId
    const seen = new Set<string>()
    while (parent) {
      if (seen.has(parent)) throw new Error('行业分类存在循环')
      seen.add(parent)
      if (ids.has(parent)) throw new Error('同一榜单不能包含父子行业')
      parent = industries.find(item => item.id === parent)?.parentId ?? null
    }
  }
  const rows = universe.map(industry => {
    const cells = observations.filter(o => o.country === country && o.industryId === industry.id
      && o.period === String(year) && o.frequency === 'annual'
      && o.measure === 'value-added' && o.priceBasis === 'current' && !o.annualized)
    if (cells.length > 1) throw new Error('同一年度存在多个修订版本，必须先明确最新有效值')
    return { industry, observation: cells[0] ?? null }
  })
  const units = new Set(rows.flatMap(r => r.observation?.value == null ? [] : [r.observation.unit + ':' + r.observation.currency]))
  if (units.size > 1) throw new Error('同榜的单位或货币不同')
  const comparable = rows.filter(r => r.observation?.value != null)
    .sort((a,b) => b.observation!.value! - a.observation!.value! || a.industry.id.localeCompare(b.industry.id))
  const top10 = comparable.slice(0, 10)
  const covered = new Set(top10.flatMap(r => r.industry.sectors))
  const supplements = (['primary','secondary','tertiary'] as const).flatMap(sector => {
    if (covered.has(sector)) return []
    const row = comparable.find(r => r.industry.sectors.includes(sector))
    if (row) row.industry.sectors.forEach(s => covered.add(s))
    return row ? [row] : []
  })
  return {top10, supplements, excludedMissing:rows.filter(r=>r.observation?.value == null)}
}

import {describe,expect,it} from 'vitest'
import {normalizeTextOffsets} from '../src/annotations/text-offsets'
import {normalizeText} from '../src/annotations/anchors'

describe('normalized text offsets preserve original grapheme boundaries',()=>{
 it('maps the character after a shortened NFC sequence to its original offset',()=>{
  const map=normalizeTextOffsets('前e\u0301后')
  expect(map.text).toBe('前é后')
  expect(map.spans).toEqual([{start:0,end:1},{start:1,end:3},{start:3,end:4}])
 })
 it('preserves original offsets while collapsing and trimming whitespace',()=>{
  const map=normalizeTextOffsets(' \n甲\t \n乙  ')
  expect(map.text).toBe('甲 乙')
  expect(map.spans).toEqual([{start:2,end:3},{start:3,end:6},{start:6,end:7}])
 })
 it.each(['😀','👩🏽‍🔬','🇨🇳','가','가','e\u0301','a\u0315\u0300','क्‍ष',' \u0301'])('maps every normalized unit in grapheme %s back to the complete original',glyph=>{
  const map=normalizeTextOffsets('前'+glyph+'后'),value=glyph.normalize('NFC')
  expect(map.text).toBe(normalizeText('前'+glyph+'后'))
  const start=map.text.indexOf(value)
  for(let i=start;i<start+value.length;i++)expect(map.spans[i]).toEqual({start:1,end:1+glyph.length})
  expect(map.spans.at(-1)).toEqual({start:1+glyph.length,end:2+glyph.length})
 })
 it.each(['',' \n\t','A\r\nB','前e\u0301后 😀','\u00e9 et e\u0301','x\u00a0\u00a0y'])('uses exactly the fingerprint normalization for %j',text=>{
  const map=normalizeTextOffsets(text)
  expect(map.text).toBe(normalizeText(text));expect(map.spans).toHaveLength(map.text.length)
  expect(map.spans.every(s=>s.start>=0&&s.start<s.end&&s.end<=text.length)).toBe(true)
 })
})

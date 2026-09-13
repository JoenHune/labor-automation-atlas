#!/usr/bin/env python3
"""Archive only public bibliographic/publisher pages used in this follow-up.
No account, purchase, message submission, guessed resource URLs, or bulk crawling.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, quote
import concurrent.futures
import datetime as dt
import hashlib
import json
import requests

ROOT = Path(__file__).resolve().parent
SOURCES = [
 ('publisher-home', 'https://www.zgtjcbs.com/', 'publisher'),
 ('publisher-industrial-search', 'https://www.zgtjcbs.com/search?keyword=' + quote('工业统计年鉴'), 'publisher-search'),
 ('publisher-accounts-search', 'https://www.zgtjcbs.com/search?keyword=' + quote('国民经济核算'), 'publisher-search'),
 ('publisher-accounts2025-search', 'https://www.zgtjcbs.com/search?keyword=' + quote('中国国民经济核算统计年鉴2025'), 'publisher-search'),
 ('publisher-accounts2026-search', 'https://www.zgtjcbs.com/search?keyword=' + quote('中国国民经济核算统计年鉴2026'), 'publisher-search'),
 ('publisher-industrial2025-search', 'https://www.zgtjcbs.com/search?keyword=' + quote('中国工业统计年鉴2025'), 'publisher-search'),
 ('publisher-abstract2026', 'https://www.zgtjcbs.com/xinshushangshi/5918', 'publisher-catalogue'),
 ('publisher-digital-arm', 'https://www.zgtjcbs.com/shutongdianzi/5833', 'publisher'),
 ('ndl-industrial2025', 'https://ndlsearch.ndl.go.jp/en/books/R100000136-I1970026605772909061', 'public-library-bibliography'),
 ('cinii-industrial2025', 'https://ci.nii.ac.jp/ncid/BD18653837', 'public-library-bibliography'),
 ('tsinghua-yearbooks', 'https://www.sem.tsinghua.edu.cn/info/1165/33094.htm', 'university-library-bibliography'),
 ('nbs-industrial2024-nonpublication', 'https://www.stats.gov.cn/hd/lyzx/zxgk/202504/t20250430_1959550.html', 'official-statistical-agency'),
]

class VisibleText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.skip = 0
        self.links = []
        self.current_link = None
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'style'):
            self.skip += 1
        if self.skip: return
        if tag in ('p', 'div', 'tr', 'li', 'h1', 'h2', 'h3', 'br', 'dt', 'dd'):
            self.parts.append('\n')
        if tag == 'td': self.parts.append(' | ')
        if tag == 'a' and attrs.get('href'):
            self.current_link = {'href': attrs['href'], 'text': ''}
    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip = max(0, self.skip - 1)
        if self.skip: return
        if tag == 'a' and self.current_link:
            self.links.append(self.current_link)
            self.current_link = None
        if tag in ('p', 'div', 'tr', 'li', 'h1', 'h2', 'h3', 'dt', 'dd'):
            self.parts.append('\n')
    def handle_data(self, data):
        if self.skip: return
        self.parts.append(data)
        if self.current_link is not None:
            self.current_link['text'] += data
    def clean(self):
        return '\n'.join(x for x in (' '.join(s.split()) for s in ''.join(self.parts).splitlines()) if x) + '\n'

def fetch(s):
    sid, url, role = s
    entry = {'id': sid, 'url': url, 'role': role, 'checkedAt': dt.datetime.now(dt.timezone.utc).isoformat()}
    try:
        r = requests.get(url, timeout=35)
        entry.update({'status': r.status_code, 'finalUrl': r.url, 'contentType': r.headers.get('Content-Type')})
        if r.status_code != 200:
            return entry
        r.encoding = r.apparent_encoding
        raw = ROOT / 'originals' / (sid + '.html')
        raw.write_bytes(r.content)
        parser = VisibleText(); parser.feed(r.text)
        visible = ROOT / 'originals' / (sid + '.txt')
        visible.write_text(parser.clean(), encoding='utf-8')
        entry.update({'raw': str(raw.relative_to(ROOT)), 'sha256': hashlib.sha256(r.content).hexdigest(), 'text': str(visible.relative_to(ROOT))})
        if role.startswith('publisher'):
            links = [{'url': urljoin(r.url, a['href']), 'text': ' '.join(a['text'].split())} for a in parser.links]
            linkfile = ROOT / 'originals' / (sid + '-links.json')
            linkfile.write_text(json.dumps(links,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
            entry['links'] = str(linkfile.relative_to(ROOT))
    except Exception as e:
        entry['error'] = str(e)
    return entry

if __name__ == '__main__':
    (ROOT/'originals').mkdir(exist_ok=True)
    results = list(concurrent.futures.ThreadPoolExecutor(4).map(fetch, SOURCES))
    (ROOT/'source-manifest.json').write_text(json.dumps({'checkedDate': '2026-09-14', 'sources': results},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps([{'id': x['id'], 'status': x.get('status'), 'archived': 'raw' in x, 'error': x.get('error')} for x in results],ensure_ascii=False,indent=2))

"""Display complete extracted PDF pages. Selecting a page does not certify it read."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[4]
company, period, selection = sys.argv[1:4]
pages = (ROOT / 'research/industry-analysis/companies/extracts' / f'{company}-{period}.txt').read_text().split('\f')
chosen = []
for token in selection.split(','):
    bounds = [int(n) for n in token.split('-')]
    chosen.extend(range(bounds[0], bounds[-1] + 1))
for number in chosen:
    print(f'\n[REPORT {company}-{period} PDF PAGE {number}]\n{pages[number-1]}')

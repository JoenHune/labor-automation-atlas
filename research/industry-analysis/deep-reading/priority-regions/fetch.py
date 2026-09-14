from pathlib import Path
import subprocess,sys,json,hashlib,datetime
P=Path(__file__).resolve().parent
def fetch(id,url):
 out=P/'originals'/id
 run=subprocess.run(['curl','-f','-L','-sS','--max-time','35','-A','Mozilla/5.0','-o',str(out),'-w','%{http_code}',url],capture_output=True,text=True)
 receipt={'id':id,'url':url,'checkedAt':'2026-09-14','httpStatus':run.stdout,'error':run.stderr,'success':run.returncode==0}
 if run.returncode==0:receipt.update(bytes=out.stat().st_size,sha256=hashlib.sha256(out.read_bytes()).hexdigest())
 with (P/'fetch-log.jsonl').open('a') as f:f.write(json.dumps(receipt,ensure_ascii=False)+'\n')
 print(json.dumps(receipt,ensure_ascii=False))
 return receipt
if __name__=='__main__':fetch(sys.argv[1],sys.argv[2])

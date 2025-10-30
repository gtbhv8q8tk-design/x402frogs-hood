import fs from 'fs';
import path from 'path';
const salesPath = path.join(process.cwd(), 'data', 'sales.json');

export function isTxProcessed(txHash: string): boolean {
  if (!fs.existsSync(salesPath)) return false;
  try {
    const arr = JSON.parse(fs.readFileSync(salesPath, 'utf8'));
    return Array.isArray(arr) && arr.includes(txHash);
  } catch { return false; }
}

export function recordTx(txHash: string) {
  let arr: string[] = [];
  if (fs.existsSync(salesPath)) {
    try { arr = JSON.parse(fs.readFileSync(salesPath, 'utf8')); } catch { arr = []; }
  }
  arr.push(txHash);
  fs.writeFileSync(salesPath, JSON.stringify(arr, null, 2));
}

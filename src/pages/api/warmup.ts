import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // GETリクエストのみ許可
  if (req.method === 'GET') {
    // HTMLファイルのパスを指定
    // process.cwd() は通常プロジェクトのルートディレクトリ（例えば package.json があるディレクトリ）を指します
    const filePath = path.join(process.cwd(), 'resource', 'html', 'warmup_clouge.html');
    
    // ファイルの内容を読み込む
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        // Content-TypeをHTMLに設定し、ファイルの内容を返す
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(data);
      }
    });
  } else {
    // GET以外のリクエストは許可しない
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

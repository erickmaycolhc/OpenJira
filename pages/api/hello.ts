import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok: boolean,
  message: string,
  method:string,
  secret?: string
}

export default function handler(  req: NextApiRequest, res: NextApiResponse<Data>) {

  console.log(process.env);

  res.status(200).json({
     ok: true,
     message: 'Todo correcto',
     method: req.method || 'no hay metodo',
     secret: process.env.SECRET_KEY
    
    })
}




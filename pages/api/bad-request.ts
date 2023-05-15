import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok: boolean,
  message: string | string[]
}
          //   validando las notificaciones de errores cuando se pide el id
export default function handler(  req: NextApiRequest, res: NextApiResponse<Data>) {

  const { message = 'bad request' } = req.query

  res.status(400).json({
     ok: false,
     message
    
    })
}
import { Response, Request, response } from 'express'
import { MessageService } from '../services/MessageServices'

class MessageController {

    async create(req:Request,res:Response){
        const { admin_id,text,user_id } = req.body

        const messageService = new MessageService()

        const message = await messageService.create({
            admin_id,text,user_id
        })

        return res.json(message)
    }

    async showByUser(req:Request,res:Response){

        const { id } = req.params

        const messageService = new MessageService()

        const list = await messageService.listbyUser(id)

        return res.json(list)

    }

}

export {MessageController} 
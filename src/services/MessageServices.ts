import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessageRep } from "../reps/MessageRep";

interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string
}

class MessageService {


    private messagesRep:Repository<Message>

    constructor (){
        this.messagesRep = getCustomRepository(MessageRep)
    }

    async create({ admin_id, text, user_id }: IMessageCreate) {
       const message =  this.messagesRep.create({
            admin_id,
            text,
            user_id
        })
        await this.messagesRep.save(message)

        return message
    }
    async listbyUser(user_id:string){
        const list = await this.messagesRep.find({
            where:{user_id},
            relations:["user"]
        })

        return list

    }
}

export {MessageService}
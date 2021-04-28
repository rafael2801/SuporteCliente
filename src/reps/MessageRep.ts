import { EntityRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";

@EntityRepository(Message)
class MessageRep extends Repository<Message> {

}

export {MessageRep}
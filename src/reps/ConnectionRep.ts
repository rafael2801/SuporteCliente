import { EntityRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";

@EntityRepository(Connection)
class ConnectionRep extends Repository<Connection> {

}

export {ConnectionRep}
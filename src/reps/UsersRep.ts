import { EntityRepository, Repository } from "typeorm";
import { Users } from '../entities/Users'


@EntityRepository(Users)
class UsersRep extends Repository<Users> {



}

export {UsersRep}
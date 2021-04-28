import { getCustomRepository, Repository } from "typeorm"
import { Users } from "../entities/Users"
import { UsersRep } from "../reps/UsersRep"


class UsersService{

    private usersRep: Repository<Users>

    constructor(){
        this.usersRep = getCustomRepository(UsersRep)
    }

    async create(email:string){

        const userJaExiste = await this.usersRep.findOne({email})

        if(userJaExiste){
            return userJaExiste
        }
        const user = this.usersRep.create({
            email
        })
        await this.usersRep.save(user)

        return user
    }
    async findByEmail(email: string) {
        const user = await this.usersRep.findOne({ email });
      
        return user;
      }

}

export {UsersService}
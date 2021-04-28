import { getCustomRepository, Repository } from "typeorm"
import { Settings } from "../entities/Settings"
import { SettingsRep } from "../reps/SettingsRep"


interface ISettingsCreate{
    chat:boolean,
    username:string
}

class SettingsService {

    private settingsRep: Repository<Settings>

    constructor(){
        this.settingsRep = getCustomRepository(SettingsRep)
    }

    async create({chat,username}:ISettingsCreate){
        

        const userJaExiste = await this.settingsRep.findOne({
            username
        })

        if(userJaExiste){
            throw new Error("Usuario ja Existe!")
        }

        const settings = this.settingsRep.create({
            chat,
            username
        })
        await this.settingsRep.save(settings)

        return settings
    }

    async findByUserName(username:string){

        const settings = await this.settingsRep.findOne({
            username
        })

        return settings

    }
    async update(username:string,chat:boolean){

        await this.settingsRep.createQueryBuilder()
        .update(Settings)
        .set({chat})
        .where("username = :username",{username}).execute()

    }
}

export  { SettingsService }
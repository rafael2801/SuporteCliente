
import { getCustomRepository, Repository } from 'typeorm'
import { Connection } from '../entities/Connection'
import { ConnectionRep } from '../reps/ConnectionRep'

interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionService {

    private ConnectionsRep: Repository<Connection>
    constructor() {
        this.ConnectionsRep = getCustomRepository(ConnectionRep)
    }
    async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {

        const connection = this.ConnectionsRep.create({
            socket_id,
            user_id,
            admin_id,
            id
        })

        await this.ConnectionsRep.save(connection)

        return connection

    }

    async findByUserId(user_id:string){
        const connection = await this.ConnectionsRep.findOne({
            user_id
        })

        return connection
    }

    async findAllConNoAdm(){
        const connection = this.ConnectionsRep.find({
            where: {
              admin_id: null,
            },
            relations: ['user'],
          })
        return connection
    }

    async findBySocketID(socket_id: string) {
        const connection = this.ConnectionsRep.findOne({ socket_id });
    
        return connection;
      }
    
      async updateAdminID(user_id: string, admin_id: string) {
        await this.ConnectionsRep
          .createQueryBuilder()
          .update(Connection)
          .set({ admin_id })
          .where('user_id = :user_id', {
            user_id,
          })
          .execute();
      }



}

export { ConnectionService }
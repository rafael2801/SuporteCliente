
import { io } from '../http'
import { ConnectionService } from '../services/ConnectionsService'
import { UsersService } from '../services/UsersServices'
import { MessageService } from '../services/MessageServices'


interface IParams {
    text: string;
    email: string;
}

io.on("connect", (socket) => {

    const connectionService = new ConnectionService()
    const userService = new UsersService()
    const messageService = new MessageService()

    socket.on("client_first_access", async (params) => {

        let user_id = null
        const socket_id = socket.id
        const { text, email } = params as IParams

        const userExists = await userService.findByEmail(email)

        if (!userExists) {
            const user = await userService.create(email)
            await connectionService.create({
                socket_id,
                user_id: user.id
            })
            user_id = user.id
        }
        else {
            user_id = userExists.id
            const connection = await connectionService.findByUserId(userExists.id)
            if (!connection) {
                await connectionService.create({
                    socket_id,
                    user_id: userExists.id
                })
            }
            else {
                connection.socket_id = socket_id
                await connectionService.create(connection)
            }
        }

        await messageService.create({
            text,
            user_id
        })

       const allMessages = await messageService.listbyUser(user_id)

       socket.emit("client_list_all_messages",allMessages)
       const allUsers = await connectionService.findAllConNoAdm();
       io.emit('admin_list_all_users', allUsers);
     });
   
     socket.on('client_send_to_admin', async params => {
       const { text, socket_admin_id } = params;
   
       const socket_id = socket.id;
   
       const { user_id } = await connectionService.findBySocketID(socket_id);
   
       const message = await messageService.create({
         text,
         user_id,
       });
   
       io.to(socket_admin_id).emit('admin_receive_message', {
         message,
         socket_id,
       });

    })
})
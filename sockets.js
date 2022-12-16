import TaskModel  from './src/model/task.js';

export default (io) => {

    io.on('connection', (socket) => {
        console.log('user connected');

        socket.emit("listTask", async () => {
          console.log('listTask in node')
          try {
            const list = await TaskModel.find({});
            console.log({list});
            return list;
          } catch (error) {
            console.log(error);
          }
        });

        socket.emit('hello', () => {
          return 'new word'
        });

        socket.on('createTask', async (taks) => {
          try {
            const taskModel = new TaskModel(taks);
            const newTask = await taskModel.save();
            console.log({newTask});
          } catch (error) {
            console.log(error)
          }
        });

        socket.on("join_room", (room) => {
            socket.join(room);
            socket.on("message", (msg) => {
              io.to(room).emit("update_msg", msg);
            });
          });

       /*  socket.on('disconnect', function () {
          console.log('user disconnected');
        }); */
      });
} 
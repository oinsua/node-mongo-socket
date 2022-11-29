import TaskModel  from '../model/task.js';


export default (io) => {

    io.on('connection', (socket) => {
        console.log('user connected');
        
        socket.on('client:listTasks', async() => {
            try { 
                const list = await TaskModel.find({});
                socket.emit('server:listTasks', list);
              } catch (error) {
                console.log(error);
              }
        })

        socket.emit('hello', 'world');

        socket.on('client:createTask', async (taks) => {
          try {
            const taskModel = new TaskModel(taks);
            const newTask = await taskModel.save();
            socket.emit('server:createTask', newTask);
          } catch (error) {
            console.log(error)
          }
        });

        socket.on('disconnect', function () {
          console.log('user disconnected');
        });
      });
} 
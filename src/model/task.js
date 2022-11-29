import {Schema, model} from 'mongoose';

const task = new Schema({
                            id: String,
                            name: String,
                            status: String,
                            time: Number
                        },
                        {
                            timestamps: true
                        });

task.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
    })

export default  model('TaskModel', task);

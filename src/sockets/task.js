import task from "../model/task";


export const listTask = async () => {
    try { 
      const list = await task.find({});
      return list;
    } catch (error) {
      console.log(error);
    }
  };
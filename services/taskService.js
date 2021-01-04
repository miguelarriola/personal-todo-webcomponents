const setTask = async (request, response, next) => {
  const newTask = request.body;

  newTask.scheduled = newTask.scheduled === 'true' ? true : false;

  newTask.done = newTask.done === 'true' ? true : false;

  const task = new Task(newTask);

  try {
    const result = await task.save();
    response.json(result);
  } catch (error) {
    response.json(error);
  }
};

const getTasks = async (request, response, next) => {
  try {
    const result = await Task.find();
    response.json(result);
  } catch (error) {
    response.json(error);
  }
};

const getTask = async (request, response, next) => {
  try {
    const result = await Task.findById(request.params.id);
    response.json(result);
  } catch (error) {
    response.json(error);
  }
};

const updateTask = async (request, response, next) => {
  try {
    const result = await Task.findOneAndUpdate(
      { _id: request.params.id },
      request.body,
      { new: true }
    );
    response.json(result);
  } catch (error) {
    response.json(error);
  }
};

const deleteTask = async (request, response, next) => {
  try {
    const result = await Task.findOneAndDelete({ _id: request.params.id });
    response.json(result);
  } catch (error) {
    response.json(error);
  }
};

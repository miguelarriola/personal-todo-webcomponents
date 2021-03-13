const host = 'https://todo-api-007.herokuapp.com';
const resurce = 'tasks';
const url = `${host}/${resurce}`;

const TASK_ID_REGEX = /^[0-9a-z]{24}$/;

const validId = (id) => TASK_ID_REGEX.test(id);

const hasContent = (value) => value && String(value).trim();

export const setTask = async (task) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const addedTask = await response.json();
    return addedTask;
    // window.location.href = 'index.html';
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async () => {
  try {
    const response = await fetch(url);
    const fetchedTasks = await response.json();
    return fetchedTasks;
  } catch (error) {
    console.error(error);
  }
};

export const getTask = async (id) => {
  if (!validId(id)) return;
  try {
    const response = await fetch(`${url}/${id}`);
    const fetchedTask = await response.json();
    return fetchedTask;
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (id, task) => {
  if (!validId(id)) return;
  if (!hasContent(task?.title)) return;
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title: task.title }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const updatedTask = await response.json();
    return updatedTask;
    // window.location.href = 'index.html';
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (id) => {
  if (!validId(id)) return;
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    const deletedTask = await response.json();
    return deletedTask;
  } catch (error) {
    console.error(error);
  }
};

export default {
  set: setTask,
  list: getTasks,
  get: getTask,
  update: updateTask,
  delete: deleteTask,
};

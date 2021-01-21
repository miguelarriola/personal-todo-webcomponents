const host = 'https://todo-api-007.herokuapp.com';
const resurce = 'tasks';
const url = `${host}/${resurce}`;

export const setTask = async (task) => {
  try {
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // window.location.href = 'index.html';
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async () => {
  try {
    const result = await fetch(url);
    const tasks = await result.json();
    return tasks;
  } catch (error) {
    console.error(error);
  }
};

export const getTask = async (id) => {
  try {
    const result = await fetch(`${url}/${id}`);
    const task = await result.json();
    return task;
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (task) => {
  try {
    await fetch(`${url}/${task.id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // window.location.href = 'index.html';
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (id) => {
  try {
    await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }
};

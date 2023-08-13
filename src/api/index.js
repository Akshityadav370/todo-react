const todoURL = "https://jsonplaceholder.typicode.com/todos";

// Getting all tasks (READ)
export const allTasks = async () => {
  try {
    const response = await fetch(todoURL, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("API call failed!");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API call error", error);
  }
};

// Creating a task (CREATE)
export const createTask = async (todo) => {
  try {
    const response = await fetch(todoURL, {
      method: "POST",
      body: JSON.stringify({
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("API call failed!");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API call error", error);
  }
};

// Updating a task (UPDATE)
export const updateTask = async (id, newTodo) => {
  try {
    const response = await fetch(`${todoURL}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: newTodo.title,
        userId: newTodo.userId,
        completed: newTodo.completed,
        id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("API call failed!");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API call error", error);
  }
};

// Deleting a task (DELETE)
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${todoURL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("API call failed!");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API call error", error);
  }
};

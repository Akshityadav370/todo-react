

const todoURL = "https://jsonplaceholder.typicode.com/todos";

// Getting all tasks
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


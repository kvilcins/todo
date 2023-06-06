import {createAppContainer, createH3, createForm, createTableWrapper} from './createElements.js';

const renderApp = (userName) => {
  const tasks = JSON.parse(localStorage.getItem(userName)) || [];

  const updateTaskStatus = (task) => {
    task.completed = true;
    localStorage.setItem(userName, JSON.stringify(tasks));

    renderApp(userName);
  };

  const deleteTask = (task) => {
    const taskIndex = tasks.indexOf(task);
    tasks.splice(taskIndex, 1);
    localStorage.setItem(userName, JSON.stringify(tasks));

    renderApp(userName);
  };

  const addTask = (taskText, priority) => {
    tasks.push({
      text: taskText,
      completed: false,
      priority,
    });

    localStorage.setItem(userName, JSON.stringify(tasks));

    renderApp(userName);
  };

  document.body.innerHTML = '';
  const appContainer = createAppContainer();
  appContainer.appendChild(createH3());
  appContainer.appendChild(createForm(addTask));
  appContainer.appendChild(createTableWrapper(tasks, updateTaskStatus, deleteTask));

  document.body.appendChild(appContainer);
};

export {
  renderApp,
};
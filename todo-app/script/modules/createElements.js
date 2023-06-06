const createAppContainer = () => {
  const appContainer = document.createElement('div');
  appContainer.className = 'app-container vh-100 w-100 d-flex align-items-center justify-content-center flex-column';

  return appContainer;
};

const createH3 = () => {
  const h3 = document.createElement('h3');
  h3.textContent = 'Todo App';

  return h3;
};

const createForm = (addTask) => {
  const form = document.createElement('form');
  form.className = 'd-flex align-items-center mb-3';

  const label = document.createElement('label');
  label.className = 'form-group me-3 mb-0';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'form-control';
  input.placeholder = 'Ввести задачу';
  input.addEventListener('input', (event) => {
    saveButton.disabled = !event.target.value;
  });

  label.appendChild(input);
  form.appendChild(label);

  const select = document.createElement('select');
  select.className = 'form-select me-3';
  select.innerHTML = `
    <option value="table-light">Обычная</option>
    <option value="table-warning">Важная</option>
    <option value="table-danger">Срочная</option>
  `;

  form.appendChild(select);

  const saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.className = 'btn btn-primary me-3';
  saveButton.textContent = 'Сохранить';
  saveButton.disabled = true;

  form.appendChild(saveButton);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(input.value, select.value);
    input.value = '';
    saveButton.disabled = true;
  });

  const resetButton = document.createElement('button');
  resetButton.type = 'reset';
  resetButton.className = 'btn btn-warning';
  resetButton.textContent = 'Очистить';

  form.appendChild(resetButton);

  return form;
};

const createTableWrapper = (tasks, updateTaskStatus, deleteTask) => {
  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-wrapper';

  const table = document.createElement('table');
  table.className = 'table table-hover table-bordered';

  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');

  const th1 = document.createElement('th')
  th1.textContent = '№'
  trHead.appendChild(th1)

  const th2 = document.createElement('th')
  th2.textContent = 'Задача'
  trHead.appendChild(th2)

  const th3 = document.createElement('th')
  th3.textContent = 'Статус'
  trHead.appendChild(th3)

  const th4 = document.createElement('th')
  th4.textContent = 'Действия'
  trHead.appendChild(th4)
  thead.appendChild(trHead)
  table.appendChild(thead)

  const tbody = document.createElement('tbody')

  tasks.forEach((task, index) => {
    const trBody = document.createElement('tr')
    trBody.className = task.completed ? 'table-success' : task.priority

    const td1TrBody = document.createElement('td')
    td1TrBody.textContent = index + 1
    trBody.appendChild(td1TrBody)

    const td2TrBody = document.createElement('td')
    td2TrBody.className = task.completed ? 'text-decoration-line-through' : ''
    td2TrBody.contentEditable = true
    td2TrBody.textContent = task.text
    td2TrBody.addEventListener('input', (event) => {
      task.text = event.target.textContent;
      localStorage.setItem(userName, JSON.stringify(tasks));
    });
    trBody.appendChild(td2TrBody)

    const td3TrBody = document.createElement('td')
    td3TrBody.textContent = task.completed ? 'Выполнена' : 'В процессе'
    trBody.appendChild(td3TrBody)

    const td4TrBody = document.createElement('td')

    const deleteButton = document.createElement('button')
    deleteButton.className = 'btn btn-danger me-1'
    deleteButton.textContent = 'Удалить'
    deleteButton.addEventListener('click', () => {
      if (confirm(`Вы уверены, что хотите удалить задачу "${task.text}"?`)) {
        deleteTask(task);
      }
    });

    td4TrBody.appendChild(deleteButton)

    if (!task.completed) {
      const finishButton = document.createElement('button')
      finishButton.className = 'btn btn-success me-1'
      finishButton.textContent = 'Завершить'
      finishButton.addEventListener('click', () => {
        updateTaskStatus(task);
      });
      td4TrBody.appendChild(finishButton)
    }

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-secondary';
    editButton.textContent = 'Редактировать';
    editButton.addEventListener('click', () => {
      td2TrBody.focus();
    });

    td4TrBody.appendChild(editButton);

    trBody.appendChild(td4TrBody)
    tbody.appendChild(trBody)
  });

  table.appendChild(tbody);
  tableWrapper.appendChild(table);

  return tableWrapper;
};

export {
  createAppContainer,
  createH3,
  createForm,
  createTableWrapper,
};
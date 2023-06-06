import {renderApp} from './render.js';

const createModal = (onSubmit) => {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;
  modal.style.display = 'block';

  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog';
  modal.appendChild(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalDialog.appendChild(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  modalContent.appendChild(modalHeader);

  const h5 = document.createElement('h5');
  h5.className = 'modal-title';
  h5.textContent = 'Добро пожаловать!';
  modalHeader.appendChild(h5);

  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  modalContent.appendChild(modalBody);

  const p = document.createElement('p');
  p.textContent = 'Пожалуйста, представьтесь:';
  modalBody.appendChild(p);

  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group mb-3';
  modalBody.appendChild(inputGroup);

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'form-control';
  input.placeholder = 'Ваше имя';
  inputGroup.appendChild(input);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      onSubmit(input.value);
      modal.style.display = 'none';
    }
  });

  const modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';
  modalContent.appendChild(modalFooter);

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'btn btn-secondary';
  closeButton.textContent = 'Закрыть';
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modalFooter.appendChild(closeButton);

  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.className = 'btn btn-primary';
  submitButton.textContent = 'Отправить';
  submitButton.addEventListener('click', () => {
    onSubmit(input.value);
    modal.style.display = 'none';
  });

  modalFooter.appendChild(submitButton);

  return modal;
};

document.body.appendChild(createModal((userName) => {
  renderApp(userName);
}));

export {
  createModal,
};
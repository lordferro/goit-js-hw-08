import throttle from '../../node_modules/lodash.throttle/index.js';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.getElementById('email'),
  textarea: document.getElementById('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';


refs.form.addEventListener('input', throttle(onFormChange, 500));
refs.form.addEventListener('submit', onSubmit);

const formData = {};

populateForm();

function onFormChange(evt) {
  formData[evt.target.name] = evt.target.value;

  const stringFormData = JSON.stringify(formData);

  localStorage.setItem(STORAGE_KEY, stringFormData);
}

function populateForm() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
// В случае если пользователь ввёл только одно поле и перезагрузил страницу обычно второе поле получило бы undefined, а с это проверкой останется пустое.
  
    if (savedFormData?.message) {
    refs.textarea.value = savedFormData.message;
    }
    if (savedFormData?.email) {
      refs.email.value = savedFormData.email;
    }
}

function onSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
}

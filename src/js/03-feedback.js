import throttle from '../../node_modules/lodash.throttle/index.js';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.getElementById('email'),
  textarea: document.getElementById('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';


refs.form.addEventListener('input', throttle(onFormChange, 500));
refs.form.addEventListener('submit', onSubmit);

populateForm();

function onFormChange(evt) {

  let savedFormData = localStorage.getItem(STORAGE_KEY);
  // check if localStorage has some data
  savedFormData = savedFormData ? JSON.parse(savedFormData) : {};
  // write new typed data in object
  savedFormData[evt.target.name] = evt.target.value;
  // inject object in localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFormData));

}

function populateForm() {
  let savedFormData = localStorage.getItem(STORAGE_KEY);

  if (savedFormData) {
    savedFormData = JSON.parse(savedFormData)
    Object.entries(savedFormData).forEach(([name, value]) => {      
      refs.form[name].value = value;
    })
  } 
}

function onSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { email, message },
  } = evt.currentTarget;

   if (email.value === '' || message.value === '') {
         return alert('Все поля должны быть заполнены.');
   }
  evt.currentTarget.reset();

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}
 
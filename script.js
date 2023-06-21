let passwords = [];
document.addEventListener('DOMContentLoaded', function() {

  function displayPasswords() {
    const passwordTableBody = document.querySelector('#password-table tbody');
    passwordTableBody.innerHTML = '';

    passwords.forEach(function(password, index) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${password.label}</td>
        <td>${password.password}</td>
        <td>
          <button class="btn btn-primary btn-sm edit-password" data-bs-toggle="modal" data-bs-target="#editModal" data-index="${index}">Edit</button>
          <button class="btn btn-danger btn-sm delete-password" data-index="${index}">Delete</button>
        </td>
      `;
      passwordTableBody.appendChild(row);
    });
  }

  function savePasswords() {
    localStorage.setItem('passwords', JSON.stringify(passwords));
  }

  function addPassword(label, password) {
    const newPassword = {
      label: label,
      password: password
    };
  
    passwords.push(newPassword);
    savePasswords();
  }

  function editPassword(index, label, password) {
    passwords[index].label = label;
    passwords[index].password = password;
    savePasswords();
  }

  function deletePassword(index) {
    passwords.splice(index, 1);
    savePasswords();
  }

  document.getElementById('password-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const labelInput = document.getElementById('label');
    const passwordInput = document.getElementById('password');
  
    addPassword(labelInput.value, passwordInput.value);
  
    labelInput.value = '';
    passwordInput.value = '';
  
    displayPasswords();
  });

  document.getElementById('password-table').addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-password')) {
      const index = e.target.dataset.index;
      const password = passwords[index];
  
      const editLabelInput = document.getElementById('edit-label');
      const editPasswordInput = document.getElementById('edit-password');
  
      editLabelInput.value = password.label;
      editPasswordInput.value = password.password;
  
      const saveChangesButton = document.getElementById('save-changes');
      saveChangesButton.dataset.index = index;
    } else if (e.target.classList.contains('delete-password')) {
      const index = e.target.dataset.index;
      deletePassword(index);
      displayPasswords();
    }
  });

  const editModal = new bootstrap.Modal(document.getElementById('editModal'));
  document.getElementById('editModal').addEventListener('show.bs.modal', function(e) {
    const button = e.relatedTarget;
    const index = button.dataset.index;
    const password = passwords[index];

    const editLabelInput = document.getElementById('edit-label');
    const editPasswordInput = document.getElementById('edit-password');

    editLabelInput.value = password.label;
    editPasswordInput.value = password.password;

    const saveChangesButton = document.getElementById('save-changes');
    saveChangesButton.dataset.index = index;
  });

  document.getElementById('save-changes').addEventListener('click', function() {
    const index = this.dataset.index;
    const editLabelInput = document.getElementById('edit-label');
    const editPasswordInput = document.getElementById('edit-password');

    editPassword(index, editLabelInput.value, editPasswordInput.value);

    editLabelInput.value = '';
    editPasswordInput.value = '';
    editModal.hide();

    displayPasswords();
  });

  document.getElementById('password-table').addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-password')) {
      const index = e.target.dataset.index;
      const password = passwords[index];

      const editLabelInput = document.getElementById('edit-label');
      const editPasswordInput = document.getElementById('edit-password');

      editLabelInput.value = password.label;
      editPasswordInput.value = password.password;

      const saveChangesButton = document.getElementById('save-changes');
      saveChangesButton.dataset.index = index;
    }
  });

  // Initialize passwords from local storage
  const storedPasswords = localStorage.getItem('passwords');
  if (storedPasswords) {
    passwords = JSON.parse(storedPasswords);
  }

  displayPasswords();
});

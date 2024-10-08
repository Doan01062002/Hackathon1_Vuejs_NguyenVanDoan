<template>
  <div class="modal">
    <div class="modal-content">
      <h2>{{ isEdit ? "Edit User" : "Add User" }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            placeholder="Enter name"
            autofocus
          />
          <p v-if="ErrorName" class="error">Tên không được để trống</p>
        </div>

        <div class="form-group">
          <label>Gender</label>
          <div class="gender-options">
            <label>
              <input type="radio" value="Male" v-model="formData.gender" /> Male
            </label>
            <label>
              <input type="radio" value="Female" v-model="formData.gender" />
              Female
            </label>
            <label>
              <input type="radio" value="Other" v-model="formData.gender" />
              Other
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="birth">Date Of Birth</label>
          <input type="date" id="birth" v-model="formData.birth" />
          <p v-if="ErrorBirth" class="error">
            Ngày sinh không được lớn hơn ngày hiện tại và không được để trống
          </p>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="Enter email"
          />
          <p v-if="ErrorEmail" class="error">Thông tin email không chính xác</p>
        </div>

        <div class="form-actions">
          <button type="button" @click="closeForm">Close</button>
          <button type="submit">{{ isEdit ? "Save" : "Add" }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  showModal: Boolean,
  initialData: Object,
  isEdit: Boolean,
});

const emit = defineEmits(["submit", "close"]);

const formData = ref({
  name: "",
  gender: "",
  birth: "",
  email: "",
});

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = { ...newData };
    }
  },
  { immediate: true }
);

// State errors
const ErrorName = ref(false);
const ErrorBirth = ref(false);
const ErrorEmail = ref(false);

// Handle form submit
const handleSubmit = () => {
  if (validateForm()) {
    emit("submit", { ...formData.value });
  }
};

// Close form modal
const closeForm = () => {
  emit("close");
  resetForm();
};

// Reset form data and error
const resetForm = () => {
  formData.value = {
    name: "",
    gender: "",
    birth: "",
    email: "",
  };
  ErrorName.value = false;
  ErrorBirth.value = false;
  ErrorEmail.value = false;
};

// Validate form data
const validateForm = () => {
  let valid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.value.name) {
    ErrorName.value = true;
    valid = false;
  } else {
    ErrorName.value = false;
  }

  if (!emailRegex.test(formData.value.email)) {
    ErrorEmail.value = true;
    valid = false;
  } else {
    ErrorEmail.value = false;
  }

  if (new Date(formData.value.birth) > new Date() || !formData.value.birth) {
    ErrorBirth.value = true;
    valid = false;
  } else {
    ErrorBirth.value = false;
  }

  return valid;
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 24px;
  margin: 0;
}

.add-new-user {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-new-user:hover {
  background-color: #0056b3;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.user-table th {
  background-color: #f4f4f4;
}

.edit-btn,
.delete-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #ffc107;
  color: white;
  margin-right: 5px;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.gender-options {
  display: flex;
  gap: 15px;
}
.gender-options label {
  display: flex;
  align-items: center;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.form-actions button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-actions button[type="submit"] {
  background-color: #007bff;
  color: white;
}

.form-actions button[type="button"] {
  background-color: #6c757d;
  color: white;
}
.error {
  color: red;
}
</style>

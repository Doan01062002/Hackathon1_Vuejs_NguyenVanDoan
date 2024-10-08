<template>
  <div>
    <header class="header">
      <h1>Manager User</h1>
      <button class="add-new-user" @click="openAddModal">Add New User</button>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by name or email"
      />
    </header>

    <table class="user-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Gender</th>
          <th>DateOfBirth</th>
          <th>Email</th>
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.birth }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="openEditModal(user)" class="edit-btn">Edit</button>
            <button @click="openDeleteModal(index)" class="delete-btn">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <UserForm
      v-if="showModal"
      :isEdit="isEdit"
      :initialData="currentUser"
      @submit="handleFormSubmit"
      @close="closeModal"
    />

    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <h2>Xác nhận</h2>
        <p>Bạn có muốn xóa tài khoản này?</p>
        <div class="form-actions">
          <button @click="closeDeleteModal" class="close-btn">Cancel</button>
          <button @click="confirmDelete" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import UserForm from "./Form.vue";

// Users state
const users = ref(JSON.parse(localStorage.getItem("users")) || []);

// Modal control
const showModal = ref(false);
const isEdit = ref(false);
const currentUser = ref({ name: "", gender: "", birth: "", email: "" });

// Delete modal control
const showDeleteModal = ref(false);
const currentUserIndex = ref(null);

// Search query
const searchQuery = ref("");

// Open modal add new user
const openAddModal = () => {
  currentUser.value = { name: "", gender: "", birth: "", email: "" };
  isEdit.value = false;
  showModal.value = true;
};

// Open modal edit
const openEditModal = (user) => {
  currentUser.value = { ...user };
  isEdit.value = true;
  showModal.value = true;
};

// Close form modal
const closeModal = () => {
  showModal.value = false;
};

// Handle form submit
const handleFormSubmit = (user) => {
  if (isEdit.value) {
    const index = users.value.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      users.value.splice(index, 1, user);
    }
  } else {
    users.value.push(user);
  }
  localStorage.setItem("users", JSON.stringify(users.value));
  closeModal();
};

// Open delete confirm modal
const openDeleteModal = (index) => {
  currentUserIndex.value = index;
  showDeleteModal.value = true;
};

// Close delete modal
const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

// Confirm delete
const confirmDelete = () => {
  users.value.splice(currentUserIndex.value, 1);
  localStorage.setItem("users", JSON.stringify(users.value));
  closeDeleteModal();
};

// search
const filteredUsers = computed(() => {
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
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

.close-btn {
  background-color: #6c757d;
  color: white;
}
</style>

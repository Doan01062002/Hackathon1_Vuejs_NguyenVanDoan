<template>
  <div class="container">
    <aside class="sidebar">
      <nav>
        <ul>
          <li>
            <router-link exact-active-class="active" to="/admin"
              >Dashboard</router-link
            >
          </li>
          <li>
            <router-link active-class="active" to="/admin/manager-user"
              >Manager User</router-link
            >
          </li>
          <li>
            <router-link active-class="active" to="/admin/manager-product"
              >Manager Product</router-link
            >
          </li>
        </ul>
      </nav>
    </aside>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #333;
  padding: 20px;
  color: white;
}

.sidebar nav ul {
  list-style-type: none;
  padding: 0;
}

.sidebar nav ul li {
  margin-bottom: 10px;
}

.active {
  color: white;
  text-decoration: none;
  display: block;
  padding: 10px;
  background-color: #444;
  border-radius: 4px;
}

.sidebar nav ul li a {
  text-decoration: none;
  display: block;
  padding: 10px;
  border-radius: 4px;
  color: white;
}

.sidebar nav ul li a:hover {
  background-color: #555;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>

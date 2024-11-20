<!-- HelpListView.vue -->
<template>
  <div class="page-container">

    <!-- Main Content -->
    <main class="main-content">
      <h1 class="board-title">질문 있어요</h1>
      <router-link to="/help/create">
        <button class="create-btn">글쓰기</button>
      </router-link>

      <table class="board-table">
        <thead>
          <tr>
            <th>No</th>
            <th>카테고리</th>
            <th>닉네임</th>
            <th>제목</th>
            <th>작성 날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(help, index) in helps" :key="help.id">
            <td>{{ help.id }}</td>
            <td>{{ help.category || '질문 있어요' }}</td>
            <td>{{ help.nickname || '사용자' }}</td>
            <td class="title-cell">
              <router-link :to="`/help/${help.id}`">
                {{ help.help_title }}
              </router-link>
            </td>
            <td>{{ formatDate(help.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </main>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useHelpStore } from '@/stores/help';

const store = useHelpStore();

onMounted(() => {
  store.getHelps();
});

const helps = store.helps;

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #40A2E3;
}

.nav-links {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.nav-item {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  z-index: 1;
}

.dropdown-content a {
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  flex-grow: 1;
}

.board-title {
  color: #40A2E3;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.create-btn {
  background-color: #40A2E3;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.board-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.board-table th,
.board-table td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.board-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.title-cell {
  text-align: left;
}

.title-cell a {
  color: #333;
  text-decoration: none;
}

.title-cell a:hover {
  color: #40A2E3;
}

</style>
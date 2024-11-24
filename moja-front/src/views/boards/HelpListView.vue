<!-- HelpListView.vue -->
<template>
  <div class="page-container">

    <!-- Main Content -->
    <main class="main-content">
      <div class="header-section">
        <h1 class="board-title">질문 있어요</h1>
          <button class="create-btn" @click="goToCreate">글쓰기</button>
      </div>

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
          <tr class="tr-cell" v-for="help in helps" :key="help.id" @click="goToDetail(help.id)">
            <td>{{ help.id }}</td>
            <td>질문 있어요</td>
            <td>{{ help.user }}</td>
            <td>
                {{ help.help_title }}
            </td>
            <td>{{ formatDate(help.help_date) }}</td>
          </tr>
        </tbody>
      </table>
    </main>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useHelpStore } from '@/stores/help';
import { useAccountStore } from '@/stores/account';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const store = useHelpStore();
const accountStore = useAccountStore()
const router = useRouter()

const goToCreate = function () {
  if (accountStore.token === '') {
    Swal.fire({
      title: '로그인 필요',
      text: '로그인을 해야 질문을 남길 수 있어요!',
      timer: 1500,
      icon: 'error', // success, error, warning, info
      confirmButtonText: '확인',
      customClass: {
        confirmButton: 'custom-warning-button', // 버튼에 커스텀 클래스 추가
      },
    });
  } else {
    router.push({name: 'help-create'})
  }
}
const goToDetail = function (helpId) {
  if (accountStore.token === '') {
    Swal.fire({
      title: '로그인 필요',
      text: '로그인을 해야 게시글을 볼 수 있어요!',
      timer: 1500,
      icon: 'error', // success, error, warning, info
      confirmButtonText: '확인',
      customClass: {
        confirmButton: 'custom-warning-button', // 버튼에 커스텀 클래스 추가
      },
    });
  } else {
    router.push({name: 'help-detail', params:{id: helpId}})
  }
}

onMounted(async () => {
  await store.getHelps()
});

const helps = computed(() => store.helps);

const formatDate = (date) => {
  if (!date) return '';
  return date.split('T')[0];
};
</script>

<style scoped>
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

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
  /* margin-bottom: 1.5rem; */
  margin: 0;
}

.create-btn {
  background-color: #40A2E3;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-btn:hover {
  background-color: #2C7BA8;
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
  color: inherit;
  text-decoration: none;
}

.tr-cell:hover {
  color: #40A2E3;
  /* text-decoration: solid underline #40A2e3 4px; */
}
</style>
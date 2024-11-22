<template>
  <div class="help-container">
    <div class="help-detail">
      <h1>{{ help?.help_title }}</h1>
      <div class="post-info">
        <span>작성일: {{ formatDate(help?.help_date) }}</span>
        <div class="like-section">
          <button
            @click="toggleLike"
            class="like-btn"
            :class="{ liked: isLiked }"
          >
            ❤️ {{ likeCount }}
          </button>
        </div>
      </div>
      <p class="content">{{ help?.help_content }}</p>

      <!-- 작성자만 보이는 수정/삭제 버튼 -->
      <div v-if="help?.is_author" class="author-actions">
        <button @click="editPost" class="btn edit-btn">수정</button>
        <button @click="deletePost" class="btn delete-btn">삭제</button>
      </div>

      <!-- 댓글 -->
      <div v-if="isLoggedIn" class="comments-section">
        <h3>댓글</h3>
        <div class="comment-form">
          <textarea
            v-model="newComment"
            placeholder="댓글을 작성해주세요"
            rows="3"
          ></textarea>
          <button @click="submitComment" class="btn comment-btn">
            댓글 작성
          </button>
        </div>

        <div class="comments-list">
          <div v-for="comment in comments" :key="comment.id" class="comment">
            <div class="comment-header">
              <span class="comment-author">{{ comment.user }}</span>
              <span class="comment-date">{{
                formatDate(comment.help_comment_date)
              }}</span>
            </div>
            <p class="comment-content">{{ comment.help_comment_content }}</p>
            <!-- 댓글 작성자만 보이는 수정/삭제 버튼 -->
            <div v-if="comment.is_author" class="comment-actions">
              <button @click="editComment(comment)" class="btn edit-btn-sm">수정</button>
              <button @click="deleteComment(comment.id)" class="btn delete-btn-sm">삭제</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="login-message">
        <p>댓글을 작성하려면 로그인 해주세요.</p>
      </div>

      <router-link to="/help">
        <button class="btn back-btn">목록으로 돌아가기</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useAccountStore } from "@/stores/account";

const route = useRoute();
const router = useRouter();
const accountStore = useAccountStore();
const help = ref(null);
const comments = ref([]);
const newComment = ref("");
const isLiked = ref(false);
const likeCount = ref(0);


const formatDate = (date) => {
  if (!date) return "";
  return date.split("T")[0];
};
const isLoggedIn = computed(() => !!accountStore.token);
const isAuthor = ref(false);
const isCommentAuthor = (comment) => comment.user_id === accountStore.userId;


// 게시글 데이터 로드 및 좋아요 상태 초기화
onMounted(async () => {
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }

  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/boards/help/${route.params.id}/`,
      {
        headers: {
          Authorization: `Token ${accountStore.token}`,
        },
      }
    );
    help.value = response.data;
    likeCount.value = response.data.like_count;
    isLiked.value = response.data.is_liked;

    loadComments();
  } catch (error) {
    console.error("게시글 로드 실패", error);
  }
});

// 게시글 수정
const editPost = () => {
  router.push(`/help/edit/${route.params.id}`);
};

// 게시글 삭제
const deletePost = async () => {
  if (!confirm('정말 삭제하시겠습니까?')) return;
  
  try {
    await axios.delete(
      `http://127.0.0.1:8000/boards/help/${route.params.id}/`,
      {
        headers: {
          Authorization: `Token ${accountStore.token}`,
        },
      }
    );
    router.push('/help');
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    alert(error.response?.data?.error || '삭제에 실패했습니다.');
  }
};

// 댓글 목록 로드
const loadComments = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/boards/help/${route.params.id}/comments/`,
      {
        headers: {
          Authorization: `Token ${useAccountStore().token}`,
        },
      }
    );
    comments.value = response.data;
  } catch (error) {
    console.error("댓글 로드 실패:", error);
  }
};

// 댓글 작성
const submitComment = async () => {
  if (!newComment.value.trim()) return;
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/boards/help/${route.params.id}/comments/`,
      { help_comment_content: newComment.value },
      { headers: { Authorization: `Token ${useAccountStore().token}` } }
    );
    comments.value.unshift(response.data);
    newComment.value = "";
  } catch (error) {
    console.error("댓글 작성 실패:", error.response?.data);
  }
};

// 댓글 수정
const editComment = async (comment) => {
  // 구현 예정
  console.log('댓글 수정:', comment);
};

// 댓글 삭제
const deleteComment = async (commentId) => {
  if (!confirm('댓글을 삭제하시겠습니까?')) return;
  
  try {
    await axios.delete(
      `http://127.0.0.1:8000/boards/help/comments/${commentId}/`,
      {
        headers: {
          Authorization: `Token ${accountStore.token}`,
        },
      }
    );
    loadComments(); // 댓글 목록 새로고침
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    alert('댓글 삭제에 실패했습니다.');
  }
};

// 좋아요 토글
const toggleLike = async () => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/boards/help/${route.params.id}/like/`,
      {},
      {
        headers: {
          Authorization: `Token ${useAccountStore().token}`,
        },
      }
    );

    // 서버에서 받은 최신 좋아요 수와 상태로 업데이트
    likeCount.value = response.data.like_count;
    isLiked.value = response.data.is_liked;
  } catch (error) {
    console.error("좋아요 처리 실패:", error);
  }
};
</script>

<style scoped>
.help-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.help-detail {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.help-detail h1 {
  color: #40a2e3;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.help-detail p {
  color: #444;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.btn {
  background-color: #40a2e3;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #2c7ba8;
}

.back-btn {
  margin-top: 1rem;
  display: inline-block;
}

.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: #666;
}

.content {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.like-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #40a2e3;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.like-btn.liked {
  background: #40a2e3;
  color: white;
}

.comments-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.comment-form {
  margin-bottom: 2rem;
}

.comment-form textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  resize: vertical;
}

.comment-btn {
  background-color: #40a2e3;
  color: white;
}

.comment {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: bold;
  color: #40a2e3;
}

.comment-date {
  color: #666;
  font-size: 0.9rem;
}

.comment-content {
  color: #444;
  line-height: 1.4;
}

.author-actions {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.edit-btn, .edit-btn-sm {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn, .delete-btn-sm {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn-sm, .delete-btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}

.comment-actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.login-message {
  text-align: center;
  padding: 1rem;
  color: #666;
}

.btn {
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  opacity: 0.9;
}
</style>

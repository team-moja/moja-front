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

      <!-- 댓글 -->
      <div class="comments-section">
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
          </div>
        </div>
      </div>

      <router-link to="/help">
        <button class="btn back-btn">목록으로 돌아가기</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
// import { compileScript } from "vue/compiler-sfc";

const route = useRoute();
const help = ref(null);
const comments = ref([]);
const newComment = ref("");
const isLiked = ref(false);
const likeCount = ref(0);
const TOKEN = "cbb6b39a5e1c06f66b2e3fc705cfa9a25f0da6f5";

const formatDate = (date) => {
  if (!date) return "";
  return date.split("T")[0];
};

// 게시글 데이터 로드
onMounted(async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/boards/help/${route.params.id}/`,
      {
        headers: {
          Authorization: `Token ${TOKEN}`,
        },
      }
    );
    help.value = response.data;
    loadComments();
  } catch (error) {
    console.error("게시글 로드 실패", error);
  }
});

// 댓글 목록 로드
const loadComments = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/boards/help/${route.params.id}/comments/`,
      {
        headers: {
          Authorization: `Token ${TOKEN}`,
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
      {
        help_comment_content: newComment.value,
      },
      {
        headers: {
          Authorization: `Token ${TOKEN}`,
        },
      }
    );
    comments.value.unshift(response.data);
    newComment.value = "";
  } catch (error) {
    console.error("댓글 작성 실패:", error);
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
          Authorization: `Token ${TOKEN}`,
        },
      }
    );
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
  border: 1px solid #40A2E3;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.like-btn.liked {
  background: #40A2E3;
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
  background-color: #40A2E3;
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
  color: #40A2E3;
}

.comment-date {
  color: #666;
  font-size: 0.9rem;
}

.comment-content {
  color: #444;
  line-height: 1.4;
}
</style>

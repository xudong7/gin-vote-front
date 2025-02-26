<template>
  <div class="auth-container">
    <h1>验证身份</h1>
    <div class="form-group">
      <input
        type="text"
        v-model="username"
        placeholder="用户名"
        @keyup.enter="login"
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        v-model="password"
        placeholder="密码"
        @keyup.enter="login"
      />
    </div>
    <div class="error-message" v-if="errorMsg">{{ errorMsg }}</div>
    <button @click="login" :disabled="isLoading">
      {{ isLoading ? "登录中..." : "登录" }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMsg = ref("");
const isLoading = ref(false);

const login = async () => {
  // 输入验证
  if (!username.value || !password.value) {
    errorMsg.value = "用户名和密码不能为空";
    return;
  }
  isLoading.value = true;
  errorMsg.value = "";

  // 发送登录请求到后端API
  // const response = await axios.post("/api/auth/login", {
  //   username: username.value,
  //   password: password.value,
  // });
  const response = {
    data: {
      token: "fake-token",
      user: {
        id: 1,
        username: "admin",
        role: "admin",
      },
    },
  };

  // 处理登录成功
  if (response.data && response.data.token) {
    // 保存认证信息
    localStorage.setItem("auth", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  } else {
    errorMsg.value = "登录失败，请检查响应数据";
  }

  isLoading.value = false;
  router.push("/admin");
};
</script>

<style scoped>
</style>
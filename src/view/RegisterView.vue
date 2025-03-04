<template>
    <div class="auth-container">
      <h1>注册</h1>
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
        {{ isLoading ? "注册中..." : "注册" }}
      </button>
      <button @click="goToLogin">去登录</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { authRegister } from "../api/auth";
  
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
  
    // 发送注册请求到后端API
    const response = await authRegister({
      username: username.value,
      password: password.value,
      role: "user",
      formList: [],
    })
    
    // 处理注册成功
    confirm("注册成功");
    console.log("注册成功:", response.data);
    if (response.data && response.data.token) {
      // 保存认证信息
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userId", response.data.userId)
    } else {
      errorMsg.value = "注册失败，请检查响应数据";
    }
  
    isLoading.value = false;
    const authRole = JSON.parse(localStorage.getItem("role"));
    if (authRole === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  const goToLogin = () => {
    router.push("/login");
  };
  </script>
  
  <style scoped>
  </style>
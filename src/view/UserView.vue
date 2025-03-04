<template>
  <div class="user-container">
    <div class="user-header">
      <h1>待完成投票</h1>
    </div>
    <div class="poll-list">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="forms.length === 0" class="no-data">暂无投票数据</div>
      <div class="poll-item" v-for="form in forms" :key="form.id">
        <h2>{{ form.title }}</h2>
        <p>类型: {{ pollTypes[form.type] }}</p>
        <div class="actions">
          <button @click="viewDetail(form.ID)" class="view-btn">
            查看详情
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getPollData } from "../api/form";

const router = useRouter();
const forms = ref([]);
const loading = ref(true);
const pollTypes = {
  1: "单选",
  2: "二分选项",
  3: "多选",
};

// 获取所有表单数据
const fetchForms = async () => {
  try {
    loading.value = true;
    const response = await getPollData();
    forms.value = response.data;
    // 筛选出启用的表单
    forms.value = forms.value.filter((form) => form.status === 1);  
    console.log("获取到的表单数据:", forms.value);
  } catch (error) {
    console.error("获取表单数据失败:", error);
  } finally {
    loading.value = false;
  }
};

// 查看表单详情
const viewDetail = (id) => {
  router.push(`/form/${id}`);
};

// 组件挂载时获取数据
onMounted(() => {
  fetchForms();
});
</script>

<style scoped>

</style>
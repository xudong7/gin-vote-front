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
        <p>类型: {{ form.type === 1 ? "单选" : "多选" }}</p>
        <div class="actions">
          <button @click="viewDetail(form.ID)" class="view-btn">
            查看详情
          </button>
          <button @click="deletePoll(form.id)" class="delete-btn">删除</button>
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

// 创建新表单
const createNewPoll = () => {
  router.push("/admin/new");
};

// 查看表单详情
const viewDetail = (id) => {
  router.push(`/form/${id}`);
};

// 删除表单
const deletePoll = async (id) => {
  if (confirm("确定要删除这个投票吗？")) {
    try {
      console.log("删除表单:", id);
      // await deleteForm(id);
      // 删除成功后重新加载数据
      fetchForms();
    } catch (error) {
      console.error("删除失败:", error);
    }
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchForms();
});
</script>

<style scoped>

</style>
<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>投票管理</h1>
      <button class="create-btn" @click="createNewPoll">创建新投票</button>
    </div>
    <div class="poll-list">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="forms.length === 0" class="no-data">暂无投票数据</div>
      <div class="poll-item" v-for="form in forms" :key="form.ID">
        <h2>{{ form.title }}</h2>
        <p>类型: {{ pollTypes[form.type] }}</p>
        <div class="poll-options">
          <div
            class="option"
            v-for="(option, index) in form.optionList"
            :key="option.ID"
          >
            <span>{{ optionName[index + 1] }}</span>
            <span>{{ option.content }}</span>
          </div>
        </div>
        <div class="actions">
          <button @click="viewDetail(form.ID)" class="view-btn">
            查看详情
          </button>
          <button @click="viewChart(form.ID)" class="chart-btn">
            查看图表
          </button>
          <button @click="deletePoll(form.ID)" class="delete-btn">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getPollData, deletePollDataById } from "../api/form";

const router = useRouter();
const forms = ref([]);
const loading = ref(true);
const optionName = {
  1: "A. ",
  2: "B. ",
  3: "C. ",
  4: "D. ",
  5: "E. ",
  6: "F. ",
};
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
  router.push(`/admin/form/${id}`);
};

// 查看图表
const viewChart = (id) => {
  router.push(`/form/display/${id}`);
};

// 删除表单
const deletePoll = async (id) => {
  if (confirm("确定要删除这个投票吗？")) {
    try {
      console.log("删除表单:", id);

      await deletePollDataById(id);

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
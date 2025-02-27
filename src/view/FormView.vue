<template>
  <div class="form-container">
    <div class="form-header">
      <h1>{{ form.title }}</h1>
      <p>{{ form.description }}</p>
    </div>
    <div class="form-body">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else>
        <div class="poll-options">
          <div
            class="option"
            v-for="option in form.optionList"
            :key="option.ID"
          >
            <span>{{ optionName[option.ID] }}</span>
            <span>{{ option.content }}</span>
          </div>
        </div>
        <button>提交</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 获得url中的id参数
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getPollDataById } from "../api/form";

const route = useRoute();
const formId = ref(route.params.id);
const form = ref({});
const loading = ref(true);
const optionName = {
  1: "A. ",
  2: "B. ",
  3: "C. ",
  4: "D. ",
  5: "E. ",
  6: "F. ",
};

// 获取表单数据
const fetchForm = async () => {
  try {
    loading.value = true;
    const response = await getPollDataById(formId.value);
    form.value = response.data;
    console.log("获取到的表单数据:", form.value);
  } catch (error) {
    console.error("获取表单数据失败:", error);
  } finally {
    loading.value = false;
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchForm();
});
</script>

<style scoped>
</style>

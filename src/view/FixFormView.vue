<template>
  <div class="form-view">
    <h1>修改投票</h1>
    <div class="form-container">
      <div class="form-group">
        <label for="theme">投票主题</label>
        <input
          id="theme"
          type="text"
          v-model="theme"
          placeholder="请输入投票主题"
        />
      </div>

      <div class="form-group">
        <label for="poll-type">选项类型</label>
        <select id="poll-type" v-model="selectedType">
          <option v-for="type in pollTypes" :key="type.id" :value="type.id">
            {{ type.name }}
          </option>
        </select>
      </div>

      <!-- 选项管理区域 -->
      <div class="form-group options-section">
        <label>添加选项</label>
        <div class="option-input">
          <input
            type="text"
            v-model="option"
            placeholder="输入选项内容"
            @keyup.enter="addOption"
          />
          <button
            class="add-option-btn"
            @click="addOption"
            :disabled="!option.trim()"
          >
            添加选项
          </button>
        </div>

        <!-- 错误提示 -->
        <div class="error-message" v-if="errorMsg">{{ errorMsg }}</div>

        <!-- 已添加选项列表 -->
        <div class="options-list" v-if="optionList.length > 0">
          <h3>已添加选项</h3>
          <div class="options-container">
            <div
              v-for="(item, index) in optionList"
              :key="index"
              class="option-item"
            >
              <div class="option-content">
                <span class="option-marker">{{ getOptionMarker(index) }}</span>
                <span class="option-text">{{ item }}</span>
              </div>
              <button
                class="delete-option-btn"
                @click="removeOption(index)"
                title="删除此选项"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button class="submit-btn" @click="submitForm" :disabled="!canSubmit">
          保存投票
        </button>
        <button class="cancel-btn" @click="returnToAdmin">返回</button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { savePollData, deletePollDataById } from "../api/form";

const router = useRouter();
const route = useRoute();
const theme = ref("");
const option = ref("");
const optionList = ref([]);
const errorMsg = ref("");
const formId = ref(route.params.id);
const form = ref({});

// 定义投票类型及对应编号
const pollTypes = [
  { id: 1, name: "单选" },
  { id: 2, name: "二分选项" },
  { id: 3, name: "多选" },
];

// 默认选中单选类型
const selectedType = ref(1);

// 是否可以提交表单
const canSubmit = computed(() => {
  return theme.value.trim() && optionList.value.length >= 2;
});

// 获取选项标记文字 (A, B, C...)
const getOptionMarker = (index) => {
  return String.fromCharCode(65 + index); // A=65, B=66, ...
};

// 添加选项
const addOption = () => {
  const trimmedOption = option.value.trim();

  if (!trimmedOption) {
    errorMsg.value = "选项内容不能为空";
    return;
  }

  // 检查重复选项
  if (optionList.value.includes(trimmedOption)) {
    errorMsg.value = "已存在相同的选项";
    return;
  }

  // 二分选项类型只允许两个选项
  if (selectedType.value === 2 && optionList.value.length >= 2) {
    errorMsg.value = "二分选项类型最多只能有两个选项";
    return;
  }

  // 添加选项到列表
  optionList.value.push(trimmedOption);
  option.value = ""; // 清空输入框
  errorMsg.value = ""; // 清空错误消息
};

// 删除选项
const removeOption = (index) => {
  optionList.value.splice(index, 1);
};

// 提交表单
const submitForm = async () => {
  // 表单验证
  if (!theme.value.trim()) {
    errorMsg.value = "请输入投票主题";
    return;
  }

  if (optionList.value.length < 2) {
    errorMsg.value = "至少需要添加两个选项";
    return;
  }

  // 创建投票数据对象
  const pollData = {
    title: theme.value,
    type: selectedType.value,
    status: 1,
    optionList: optionList.value.map((text, index) => ({
      parentId: 0,
      content: text,
      votes: 0,
    })),
  };

  console.log("保存的投票数据:", pollData);

  // 删除原有投票数据
  await deletePollDataById(formId.value);

  // 保存投票数据
  await savePollData(pollData);

  alert("投票修改成功!");
  router.push("/admin");
};

// 返回管理页面
const returnToAdmin = () => {
  if (theme.value || optionList.value.length > 0) {
    if (confirm("确定要放弃当前编辑吗？")) {
      router.push("/admin");
    }
  } else {
    router.push("/admin");
  }
};

onMounted(() => {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    alert("您无权访问该页面");
    router.push("/");
  }
});

</script>
  
<style scoped>
</style>
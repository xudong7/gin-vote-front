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
          <div class="option-type">类型: {{ pollTypes[form.type] }}</div>
          <div
            class="option"
            v-for="(option, index) in form.optionList"
            :key="option.ID"
          >
            <span>{{ optionName[index + 1] + ". " }}</span>
            <span>{{ option.content }}</span>
          </div>
        </div>
        <input type="text" v-model="answer" placeholder="请输入答案" />
        <button @click="submit(answer)">提交</button>
        <button @click="returnToPreviousPage">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 获得url中的id参数
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getPollDataById, updatePollData } from "../api/form";

const route = useRoute();
const router = useRouter();
const formId = ref(route.params.id);
const form = ref({});
const loading = ref(true);
const optionName = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
};
const pollTypes = {
  1: "单选",
  2: "二分选项",
  3: "多选",
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

const returnToPreviousPage = () => {
  router.go(-1);
};

const submit = async (answerCh) => {
  console.log("提交答案:", answerCh);

  const type = form.value.type;
  const userId = localStorage.getItem("userId");

  alert(type);

  if (type === 3) // 多选
  {
    // 将字母间的空格去掉，如 "A B C" => "ABC"
    const answer_no_space = answerCh.replace(/\s+/g, "");

    // 将["ABC"]分拆成["A", "B", "C"]
    const answers = answer_no_space.split("");

    // 将答案分拆出来
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      console.log(i, " 答案: ", answer);
      // 找到answerCh对应index的选项
      const option = form.value.optionList.find(
        (item, index) => optionName[index + 1] === answer
      );
      // 如果找不到对应选项
      if (!option) {
        alert("请输入正确选项，如 ABC");
        return;
      }
      console.log("选项:", option);
      // 修改选项的投票数
      option.votes += 1;
      form.value.optionList = form.value.optionList.map((item) =>
        item.ID === option.ID ? option : item
      );
    }

    await updatePollData(userId, form.value);

    returnToPreviousPage();

    return;
  }

  // 找到answerCh对应index的选项
  const option = form.value.optionList.find(
    (item, index) => optionName[index + 1] === answerCh
  );

  // 如果找不到对应选项
  if (!option) {
    alert("请输入对应选项，如 A, B, C...");
    return;
  }

  console.log("选项:", option);
  // 修改选项的投票数
  option.votes += 1;

  form.value.optionList = form.value.optionList.map((item) =>
    item.ID === option.ID ? option : item
  );

  console.log(form.value);

  // 提交数据
  await updatePollData(userId, form.value);

  returnToPreviousPage();
};

// 组件挂载时获取数据
onMounted(() => {
  fetchForm();
});
</script>

<style scoped>
</style>

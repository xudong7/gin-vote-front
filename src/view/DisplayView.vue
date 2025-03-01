<template>
  <div class="display-container">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else class="chart-container">
      <h1>{{ pollData.title }} - 投票结果</h1>

      <!-- 饼图展示 -->
      <div class="chart-section">
        <h2>投票占比</h2>
        <div ref="pieChartRef" class="chart pie-chart"></div>
      </div>

      <!-- 柱状图展示 -->
      <div class="chart-section">
        <h2>投票数量</h2>
        <div ref="barChartRef" class="chart bar-chart"></div>
      </div>

      <!-- 表格展示详细数据 -->
      <!-- <div class="data-table">
        <h2>详细数据</h2>
        <table>
          <thead>
            <tr>
              <th>选项</th>
              <th>内容</th>
              <th>票数</th>
              <th>占比</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(option, index) in pollData.optionList" :key="option.ID">
              <td>{{ optionName[index + 1] }}</td>
              <td>{{ option.content }}</td>
              <td>{{ option.votes }}</td>
              <td>{{ calculatePercentage(option.votes) }}%</td>
            </tr>
          </tbody>
        </table>
      </div> -->

      <div class="actions">
        <button @click="returnToList" class="btn">返回列表</button>
        <button @click="exportData" class="btn export-btn">导出数据</button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPollDataById } from "../api/form";
// 导入图表库
import * as echarts from "echarts";

const route = useRoute();
const router = useRouter();
const formId = ref(route.params.id);
const pollData = ref({ optionList: [] });
const loading = ref(true);
const pieChartRef = ref(null);
const barChartRef = ref(null);
let pieChart = null;
let barChart = null;

const optionName = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
};

// 计算总票数
const totalVotes = computed(() => {
  if (!pollData.value || !pollData.value.optionList) return 0;
  return pollData.value.optionList.reduce(
    (sum, option) => sum + (option.votes || 0),
    0
  );
});

// 计算百分比
const calculatePercentage = (votes) => {
  if (totalVotes.value === 0) return 0;
  return ((votes / totalVotes.value) * 100).toFixed(2);
};

// 获取投票数据
const fetchPollData = async () => {
  try {
    loading.value = true;
    const response = await getPollDataById(formId.value);
    pollData.value = response.data;
    console.log("获取到的投票数据:", pollData.value);
  } catch (error) {
    console.error("获取投票数据失败:", error);
  } finally {
    loading.value = false;
  }
};

// 初始化饼图
const initPieChart = () => {
  if (!pieChartRef.value) return;

  pieChart = echarts.init(pieChartRef.value);

  const options = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      bottom: 10,
      data: pollData.value.optionList.map(
        (option, index) => `${optionName[index + 1]}: ${option.content}`
      ),
    },
    series: [
      {
        name: "投票结果",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "18",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: pollData.value.optionList.map((option, index) => ({
          value: option.votes || 0,
          name: `${optionName[index + 1]}: ${option.content}`,
        })),
      },
    ],
  };

  pieChart.setOption(options);
};

// 初始化柱状图
const initBarChart = () => {
  if (!barChartRef.value) return;

  barChart = echarts.init(barChartRef.value);

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: pollData.value.optionList.map(
        (option, index) => `${optionName[index + 1]}`
      ),
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "票数",
        type: "bar",
        barWidth: "60%",
        data: pollData.value.optionList.map((option) => option.votes || 0),
        itemStyle: {
          color: function (params) {
            const colorList = [
              "#5470c6",
              "#91cc75",
              "#fac858",
              "#ee6666",
              "#73c0de",
              "#3ba272",
            ];
            return colorList[params.dataIndex % colorList.length];
          },
        },
      },
    ],
  };

  barChart.setOption(options);
};

// 窗口大小变化时重新适应图表尺寸
const handleResize = () => {
  if (pieChart) pieChart.resize();
  if (barChart) barChart.resize();
};

// 返回列表
const returnToList = () => {
  router.push("/admin");
};

// 导出数据
const exportData = () => {
  // 创建CSV内容
  let csvContent = "选项,内容,票数,占比\n";

  pollData.value.optionList.forEach((option, index) => {
    const percentage = calculatePercentage(option.votes);
    csvContent += `${optionName[index + 1]},${option.content},${
      option.votes
    },${percentage}%\n`;
  });

  // 创建下载链接
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `投票结果_${pollData.value.title}_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 监控role，如果不是admin则跳转到首页
onMounted(async () => {
  await fetchPollData();
  // 数据加载完成后初始化图表
  setTimeout(() => {
    initPieChart();
    initBarChart();
  }, 100);

  window.addEventListener("resize", handleResize);
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (pieChart) pieChart.dispose();
  if (barChart) barChart.dispose();
});
</script>
  
<style scoped>
.display-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 18px;
}

.chart-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.chart-section {
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 15px;
  color: #444;
}

.chart {
  width: 100%;
  height: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.data-table {
  margin-bottom: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  color: #333;
}

tr:hover {
  background-color: #f5f5f5;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn:hover {
  background-color: #45a049;
}

.export-btn {
  background-color: #2196f3;
}

.export-btn:hover {
  background-color: #0b7dda;
}
</style>
  
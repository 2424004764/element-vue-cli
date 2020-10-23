<template>
  <div>
    <el-row>
    <el-col :xs="12" :span="8"><div class="grid-content bg-purple">
        <ve-pie :data="chartData"></ve-pie>
      </div></el-col>
    <el-col :xs="12" :span="8"><div class="grid-content bg-purple-light">
      <ve-pie :data="chartData"></ve-pie>
    </div></el-col>
    <el-col :xs="12" :span="8"><div class="grid-content bg-purple">
      <ve-pie :data="chartData"></ve-pie>  
    </div></el-col>
  </el-row>
  </div>
</template>



<script>

  export default {
    created(){
    },
    methods: {
    },

    data() {
      return {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        }
      }
    }
  }
</script>
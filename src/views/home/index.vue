<template>
<!--最外层容器-->
  <el-container>
<el-aside style='width:200px;height:100vh;background-color:#323745'>
  <!--左侧-->
   <layout-aside></layout-aside>
</el-aside>
 <el-container>
  <el-header>
    <layout-header></layout-header>
  </el-header>
  <el-main>中间</el-main>
   </el-container>
   </el-container>
</template>

<script>
export default {}

</script>

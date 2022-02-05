<template>
  <div>
    <el-form :inline="true" :model="categoryId" class="demo-form-inline" :disabled="!isShow">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="categoryId.category1Id"
         @change="handlerCategory1"
        >
          <el-option
            :label="item.name"
            v-for="item in category1"
            :key="item.id"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" >
        <el-select placeholder="请选择" v-model="categoryId.category2Id" @change="handlerCategory2">
          <el-option :label="item.name" :value="item.id" v-for="item in category2" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="categoryId.category3Id" @change="handlerCategory3">
          <el-option :label="item.name" :value="item.id" v-for="item in category3" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "FormInline",
  data() {
    return {
      category1: [],
      category2: [],
      category3: [],
      categoryId: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  props:["isShow"],
  mounted() {
    // 获取一级列表
    this.getCategory1list();
  },
  methods: {
    // 获取一级列表
    async getCategory1list() {

      try {
        const rel = await this.$api.attr.getCategory1();
        if (rel.code === 20000 || rel.code === 200) {
          this.category1 = rel.data;
        } else {
          this.$message.error("获取列表失败~~");
        }
      } catch (error) {
        this.$message.error("请求列表失败~~");
      }
    },
    // 发送二级列表请求
    async handlerCategory1() {
        // 点击一级列表获取二级列表前清除data中的id与数组
        this.categoryId.category2Id=""
        this.categoryId.category3Id=""
        this.category2=[]
        this.category3=[]
      try {
        const rel = await this.$api.attr.getCategory2(this.categoryId.category1Id);
        if (rel.code === 20000 || rel.code === 200) {
          this.category2 = rel.data;
          this.$emit("changeListId",{categoryId:this.categoryId.category1Id,level:1})
        } else {
          this.$message.error("获取列表失败~~");
        }
      } catch (error) {
        this.$message.error("请求列表失败~~");
      }
    },
    // 发送三级列表请求
    async handlerCategory2() {
        // 点击一级列表获取二级列表前清除data中的id与数组
        this.categoryId.category3Id=""
        this.category3=[]
      try {
        const rel = await this.$api.attr.getCategory3(this.categoryId.category2Id);
        if (rel.code === 20000 || rel.code === 200) {
          this.category3 = rel.data;
          this.$emit("changeListId",{categoryId:this.categoryId.category2Id,level:2})
        } else {
          this.$message.error("获取列表失败~~");
        }
      } catch (error) {
        this.$message.error("请求列表失败~~");
      }
    },
    // 选择第3个框
    handlerCategory3(){
        this.$emit("changeListId",{categoryId:this.categoryId.category3Id,level:3})
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
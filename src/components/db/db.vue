<template>
<div name="db">
  <el-row :gutter="20">
    <el-col :span="10">
      <el-form class="form" label-width="200px" :model="dbParam">
        <el-form-item label="数据库IP:端口">
          <el-input v-model="dbParam.url"></el-input>
        </el-form-item>
        <el-form-item label="数据库名">
          <el-input v-model="dbParam.dbName"></el-input>
        </el-form-item>
        <el-form-item label="数据库用户">
          <el-input v-model="dbParam.user"></el-input>
        </el-form-item>
        <el-form-item label="数据库密码">
          <el-input v-model="dbParam.password"></el-input>
        </el-form-item>
        <el-form-item label="基础包名">
          <el-input v-model="dbParam.baseModelName"></el-input>
        </el-form-item>
        <el-form-item label="表明 多个|分隔">
          <el-input v-model="dbParam.tableNames"></el-input>
        </el-form-item>
        <el-button class="but" type="primary" @click="generator">生成代码</el-button>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
    export default {
        name: "db",
        data() {
            return {
                dbParam: {
                    dbName: null,
                    baseModelName: null,
                    user: null,
                    password: null,
                    tableNames: null,
                    url: null,
                }
            }
        },
        methods: {
            success(successMessage, duration) {
                if (successMessage) {
                    this.$message({
                        showClose: true,
                        message: successMessage,
                        type: 'success',
                        duration: duration || 3 * 1000
                    })
                }
            },
            fail(failMessage) {
                if (failMessage) {
                    this.$message({
                        showClose: true,
                        message: failMessage,
                        type: 'warning'
                    })
                }
            },
            download (data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', 'DbGenerator.zip')

                document.body.appendChild(link)
                link.click()
            },
            generator:function(){
                var that = this;
                this.axios.get('/DB/generator', {params: that.dbParam, responseType: 'blob'}).then(function c(response) {
                    console.log(response);
                    that.download(response.data);
                })
            }
        },
    }
</script>

<style scoped>
  .but{
    margin-left: 200px;
  }
  .form{
    margin-top: 20px;
  }
</style>

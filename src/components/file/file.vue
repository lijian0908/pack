<template>
    <div name="file">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form class="form"  label-width="200px" :model="startRequestParam" label-position="right">
            <el-form-item label="项目地址">
              <el-input v-model="startRequestParam.url"></el-input>
            </el-form-item>
            <el-form-item label="分支">
              <el-input v-model="startRequestParam.branch"></el-input>
            </el-form-item>
            <el-form-item label="应用">
              <el-input v-model="startRequestParam.project"></el-input>
            </el-form-item>
            <!--<el-form-item label="探活地址" >
                <el-input v-model="startRequestParam.checkHealthUrl"></el-input>
            </el-form-item>-->
            <el-form-item label="是否根路径运行" >
              <el-switch v-model="startRequestParam.rootProject"></el-switch>
            </el-form-item>
            <el-button class="but" type="primary" @click="deploy">发布</el-button>
          </el-form>
        </el-col>
        <el-col :span="10">
          <div v-html="log" id="logDiv" style=" overflow-y:auto; overflow-x:auto; height:600px;"></div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "file",
        data(){
            return {startRequestParam: {
                url: null,
                branch: null,
                project: null,
                rootProject:null,
                checkHealthUrl:null,
            },
            logParam: {
                type: null,
                offset: null,
            },
            log: null,
            logTimer: null,
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
            deploy: function () {
                var that = this;
                this.axios.post('/deploy', this.startRequestParam)
                    .then(function c(response) {
                        if (response.data.code == 0) {
                            that.success(response.data.message);
                            that.startLog()
                        } else {
                            that.error(response.data.message);
                        }
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                        that.error(response.data.message);
                    });
            },
            rangeLog: function () {
                var that = this;
                this.axios.get('/log', {params: that.logParam})
                    .then(function c(response) {
                        that.log += response.data.data.data;
                        if (response.data.data.offset == undefined || response.data.data.offset < 0) {
                            that.logParam.offset = 0;
                        } else {
                            that.logParam.offset = response.data.data.offset;
                            var div = document.getElementById('logDiv');
                            console.log(div.scrollTop, div.scrollHeight);
                            div.scrollTop = div.scrollHeight;
                        }
                        if (response.data.data.over == true) {
                            clearInterval(that.timer);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            startLog: function () {
                this.logParam.offset = 0;
                this.logParam.type = "packageLog";
                this.logParam.project = this.startRequestParam.project;
                this.timer = setInterval(this.rangeLog, 3000);
            },
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

<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="12"><h1 font="bold">区块链工程214班第一组</h1></el-col>
      </el-row>
      
    </el-header>
    <el-main>
      <el-row :gutter=20 type="flex" >
        <el-col :span="9">
          <div class="connect-url">
            <label for="url">url:&nbsp;</label>
            <el-input v-model="reqObj_login.url" id="url" placeholder="Please input url" required>
              <template #prepend>jdbc:mysql://</template>
              </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="connect-name">
            <label for="dbName">name:&nbsp;</label>
            <el-input v-model="reqObj_login.user" id="dbName" placeholder="Please input user name" required>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="connect-pwd">
            <label for="dbPwd">password:&nbsp;</label>
            <el-input v-model="reqObj_login.password" id="dbPwd" placeholder="Please input password" show-password />
          </div>
        </el-col>
        <el-col :span="3">
          <div class="connect-btn">
            <el-button type="primary" @click.prevent="submit">连接</el-button>
          </div>
        </el-col>

      </el-row>
      <el-row v-if=isConnected >
        <el-col :span="6" class="second-row-left-input">
          
          <el-input id="genCode" placeholder="请输入代码包名" v-model="reqObj.packageName" />
        </el-col>
        <el-col :span="4">
          <el-button color="blue" :dark="isDark" @click="confirmPackageName">生成代码</el-button>
        </el-col>
        <el-col :span="6">
          <el-input id="genZip" placeholder="请输入压缩包名" v-model="reqObj.zipName" />
        </el-col>
        <el-col :span="4">
          <el-button color="blue" :dark="isDark" @click="confirmZipName">生成压缩包</el-button>
        </el-col>
      </el-row>
      <el-empty v-if="!isConnected">
        请先连接数据库
      </el-empty>
      <div class="hint" v-if="message">
        <p>{{ message }}</p>
      </div>
      <div v-if="isConnected"> 
        <el-tree :data="treeData" :props="defaultProps" @node-click="confirmDataBase" />
      </div>

    </el-main>
    <el-footer>@作者：张锭航、熊灵欣、王一迪、谭明月、方妤心</el-footer>
  </el-container>
</template>
  
<script>
import { connectDatabase } from "../service/connect/connect.js";
import { getAllDatabase, getAllTable, generateCode } from '../service/connect/connect';
import { allPort } from '@/service/api';
import { ElTree } from 'element-plus';

export default {
  name: "MenuView",
  data() {
    // login part
    return {
      urlSpan: "url",
      dbNameSpan: "用户名",
      dbPwdSpan: "密码",
      reqObj_login: {
        url: "jdbc:mysql://localhost:3307",
        user: "root",
        password: "123456",
      },
      message: "",
      isConnected: false,
      isFull: false,
    // select database part
      databaseList: [],
        tableList: [],
        reqObj: {
            database: '',
            table: '',
            packageName: '',
            zipName: '',
        },
        isGenCode: false,
        isGenZip: false,
        tip: "",
        zipHref: '',
        // tree part
      treeData: [], // 数据源
      defaultProps: {
        children: 'children', // 子节点字段名
        label: 'label' // 节点显示的字段名
      },
    };
  },
  components: {
    ElTree,
  },
  mounted() {
        // this.$store.state.JSESSIONID
        getAllDatabase(this.$store.state.JSESSIONID).then(res => {
            const { code, data } = res.data;
            console.log('mounted res => ',res);
            if (code === 200) {
                this.databaseList = data;
                console.log('databaseList => ',this.databaseList);
                this.transformData(); // 转换数据结构
            }
        },
        getAllTable({ database: this.reqObj.database }, this.$store.state.JSESSIONID)
              .then(res => {
                  this.tableList = res.data.data;
                  console.log('tableList => ',this.tableList);
              })
        );
    },
  methods: {
    submit() {
      const { url, user, password } = this.reqObj_login;
      if (url && user && password) {
        connectDatabase(this.reqObj_login, this.$store.state.JSESSIONID)
          .then((response) => {
            const { code, message } = response.data;
            console.log(response);
            if (code === 200) {
              console.log("submit success");
              // TODO ：连接成功后，显示数据库列表
              getAllDatabase(this.$store.state.JSESSIONID).then(res => {
                const { code, data } = res.data;
                console.log('after submit success => ',res);
                if (code === 200) {
                  let tempArr=[]
                  res.data.data.forEach((item) =>{
                      tempArr.push({
                        label: item,
                        children:[{label:null}]
                      })
                    })
                this.treeData = tempArr;
                console.log('tempArr => ',tempArr);
                  
              }
          }
        );
              this.isConnected = true;
            } else {
              this.message = message;
            }
          });
      } else {
        this.$message.error('请填写完全');
        this.isFull = true;
      }
    },
    transformData() {
      const data = [];

      // this.databaseList.forEach(database => {
      //   // 添加数据库节点
      //   data.push({
      //     label: database.name,
      //     children: [
      //       {label:null}
      //     ]
      //   });
        this.databaseList.forEach(database => {
        // 添加数据库节点
          const databaseNode = {
            label: database.name,
            children: [
              { label: null }
            ]     
        };
        data.push(databaseNode);
        
        // console.log('push tableList => ',this.tableList);
        // 添加表节点
        if (this.tableList) {
            this.tableList.forEach(table => {
            const tableNode = {
              label: table.name
            };
            databaseNode.children.push(tableNode);
          });
        }
      });

      this.treeData = data; // 将转换后的数据赋值给组件的 data 属性
    },
    confirmDataBase(data) {  
      console.log('confirmDataBase => ',data);
          this.reqObj.database = data.label;
          console.log('database =>',this.reqObj.database);
          getAllTable({ database: this.reqObj.database }, this.$store.state.JSESSIONID)
              .then(res => {
                  this.tableList = res.data.data;
                  console.log('confirmDataBase() tableList => ',this.tableList);
                  const databaseNode = this.treeData.find(node => node.label === data.label);
                  console.log('databaseNode',databaseNode)
                  if (databaseNode) {
                    databaseNode.children = [];
                    this.tableList.forEach(table => {
                        const tableNode = {
                          label: table
                        };
                        databaseNode.children.push(tableNode);
                    })
                  }  
              })
          this.isGenCode = false;
          this.isGenZip = false;
       },
      confirmTable(data) {
          this.reqObj.table = data.label;
          console.log('confirmTable-data => ',data);
          this.isGenCode = true;
      },
      confirmPackageName() {
          if (this.reqObj.packageName !== '' && this.isGenCode) {
              generateCode({
                  package_name: this.reqObj.packageName,
                  table_name: this.reqObj.table
              }, this.$store.state.JSESSIONID)
                  .then(res => {
                      const { code } = res.data;
                      if (code === 200) {
                          this.isGenZip = true;
                          this.tip = "代码生成成功"
                      }
                  })
          } else {
              this.tip = "还不能填写 code 文件夹名哦";
          }
      },
      confirmZipName() {
          if (this.reqObj.zipName !== '' && this.isGenZip) {
              this.zipHref = `${allPort.GENERATE_ZIP}/${this.reqObj.zipName}?JSESSIONID=${this.$store.state.JSESSIONID}`
              this.tip = "请点击超链接";
          } else {
              this.tip = "还不能填写压缩包名哦";
          }
      },
  },
};
</script>


<style lang="scss">
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.connect-url,
.connect-name,
.connect-pwd,
.connect-btn {
  display: flex;
  align-items: center;
  margin: 1rem;
}
.connect-url label,
.connect-name label {
  margin-right: 10px;
}
.span{
  align-items: center;
}
.second-row-left-input{
  margin-left: 2rem;
}
</style>

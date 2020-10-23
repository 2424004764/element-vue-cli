<template>
  <div>
    <el-table
    :data="imagesList"
    border
    style="width: 100%">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        fixed
        prop="RepoTags[0]"
        label="标签"
        width="150">
      </el-table-column>

      <el-table-column
        fixed
        prop="VirtualSize"
        label="大小"
        width="150">
      </el-table-column>

      <el-table-column
        fixed
        label="创建日期"
        width="150">
          <template slot-scope="scope">
            {{scope.row.Created}}
          </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button @click="showImageDetail(scope.row.imageId)" type="text" size="small">查看</el-button>
          <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{'cmd':'del', 'imageId': scope.row.imageId}">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>



<script>
  import * as imagesRequest from '../../api/images'
  import {timeStampToDate} from '../../utils/time'

  export default {
    
    data() {
      return {
        imagesList: [],
      }
    },
    created(){
      this.fetchImages()
    },
    methods: {
      // 处理更多菜单点击事件
      handleCommand({cmd, imageId}){
        console.log(cmd)
        console.log(imageId)
        switch(cmd){
          case 'del':
            this.delImage(imageId)
            break
          default:
            break;
        }
      },
      // 删除镜像
      delImage(imageId){
        imagesRequest.delImage({loading: true}, {imageId: imageId}).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      // 查找镜像列表
      fetchImages(){
        imagesRequest.fetchImages({
          all: false,
        }, {
          loading: true
        }).then(res => {
          var data = res.data
          console.log('fetchImages', data)
          data && data.forEach(element => {
            element.Created = timeStampToDate(element.Created)
            element.VirtualSize = (element.VirtualSize / 1024 / 1024).toFixed(2) + "MB"
            // 新增字段 
            element.imageId = element.Id.split(':')[1]
          })
          this.imagesList = data
        }).catch((res) => {
          console.log(res.message)
        })
      },
      // 镜像详情
      showImageDetail(imageId){
        if(!imageId){
          this.$message.error(`imageId 为空`)
          return
        }
        imagesRequest.getImagesDetail({}, {
          imageId: imageId
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },

  }
</script>

<style lang="sass" scope>
.el-dropdown-link
  cursor: pointer;
  color: #409EFF;
.el-icon-arrow-down 
  font-size: 12px;
</style>
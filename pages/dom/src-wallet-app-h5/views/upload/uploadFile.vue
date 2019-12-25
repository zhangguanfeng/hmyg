  <template>
    <div class="holder">
      <div class="list">
        <select name="" id="" @change="selected">
          <option value="ijikee">即刻交易</option>
          <option value="wallet">钱包</option>
          <option value="bitgoe">比特购</option>
          <option value="img">其他</option>
        </select>
        <br>
        <br>
        <br>
        <input type="file" value="" :disabled="type == ''" id="file" placeholder="请选择图片" @change='onUpload' />
        <br>
        <br>
        <img :src="url" width="200px"  alt="">
        <p>图片地址：</p>
        <p>{{url}}</p>
      </div>
    </div>
  </template>

  <script>
import axios from 'axios';
  export default {
    name: 'uploadFile',
    data: function() {
      return {
        url:'',
        files:'',
        type:'ijikee',
      }
    },
    methods: {
      selected(e){
        this.type = e.target.value;
      },
      onUpload(e){
            let formData = new FormData();
            this.files = e.target.files[0];
            formData.append('files', this.files);
            formData.append('type', 'ijikee')
            axios.post(
              window.justTokenBaseURL + 'wallet/util/open/uploadFile.do',
              formData,
              {headers: {'Content-Type': 'multipart/form-data'}}
              ).then((res)=>{
              this.url = res.data.result.urls[0];
            }).catch(()=>{
            })

        }
    }
  }
  </script>

  <style scoped lang="less">
    .holder{
      background: #f4f6fa;
      height: 100%;
      padding: 100px 50px;
      text-align: left;
      p{
        margin-top: 30px;
      }
      .list{
        // border: 2px solid #e5e5e5;
        border-radius: 4px;
        padding: 20px;
      }
    }
  </style>

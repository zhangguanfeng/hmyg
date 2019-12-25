/**
*  Created by   阿紫
*  On  2019/10/25
*  Content 图片上传组件
*/
<template>
    <div class="upload-base64">
        <input @change="uploadPhoto($event)" type="file" class="kyc-passin" :ref="refName">
        <div class="upload-box">
            <img @click="clickUpload" :src="inputVal?inputVal:defaultImg" alt="" do_not_open=false :style="{width: preWidth, height: preHeight}">
            <p>{{caption}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                inputVal:''
            }
        },
        model: {
            event: "change"
        },
        props: {
            preWidth: {
                default: ''
            },
            preHeight: {
                default: '100px'
            },
            value: [String, Number],
            refName:{
                type: String,
                default: "vueFileUploader"
            },
            defaultImg:{
                type: String,
                default: '/img/user/default1.png',
            },
            caption:{
                type: String,
            },
        },
        methods:{
            /**
             * 触发上传图片(解决ios点击两次问题)
             */
            clickUpload(){
                // let u = navigator.userAgent;
                // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                // if(isAndroid){
                //     this.$refs[this.refName].click()
                // }else{
                //     this.$refs[this.refName].click()
                //     this.$refs[this.refName].click()
                // }
                this.$refs[this.refName].click()
            },
            /**
             * 上传图片
             */
            uploadPhoto (e) {
                // 利用fileReader对象获取file
                const file = e.target.files[0];
                const filesize = file.size;
                const filename = file.name;
                const filetype = file.type;
                if(/image/.test(filetype)) {
                    if(filesize > 2097152) {
                        this.$toast('图片超出限制大小,请保持2M以内')
                        return
                    }
                }else {
                    this.$toast('请上传jpg/png格式文件')
                    return
                }
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {

                    // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
                    const imgcode = e.target.result;

                    this.$toast.loading({
                        message: '正在上传...',
                        forbidClick: true,
                        duration:0
                    });

                    //上传接口
                    const postData={
                        file_content:imgcode
                    }
                    this.$http.post('/CommonFun/uploadImage',postData).then(res=>{
                        this.$toast('上传成功')
                        this.inputVal = res.img_url;
                        this.$emit("change", this.inputVal);
                    }).finally(e => {
                        this.$toast.clear();
                    });

                }
            }
        },
        mounted(){
            this.inputVal = this.value;
        }
    }
</script>
<style lang="scss" scoped>
    .upload-base64{
        .kyc-passin{
            display:none;
        }
        .upload-box{
            text-align:center;
            cursor: pointer;
            img{
                max-width:100%;
                display:block;
                width:auto;
                height:100px;
                margin:0 auto;
                /*border: 1px dashed #C1BFBF;*/
                border-radius: 8px;
            }
            p{
                color: #666666;
                font-size:12px;
                text-align:center;
                margin-top: 10px;
            }
        }
    }
</style>

<template>
    <div class="tncode" style="text-align: center;margin: 10px auto;">
        <!-- 点击按钮进行验证 -->
        <!-- <div class="tncode_div_bg" id="tncode_div_bg"></div> -->
        <div class="tncode_div" id="tncode_div">
            <div class="loading">加载中</div>
            <canvas class="tncode_canvas_bg"></canvas>
            <canvas class="tncode_canvas_mark"></canvas>
            <div class="hgroup"></div>
            <div class="tncode_msg_ok" v-show="tncode._result">验证成功</div>
            <div class="slide">
                <!-- <div class="slide_block" @mousedown="_block_start_move" @mousemove="_block_on_move" @mouseup="_block_on_end"></div> -->
                <div class="slide_block" @mousedown="_block_start_move"></div>
                <div class="slide_block_text">{{tncode._tips}}</div>
            </div>
            <div class="tools">

                <div class="tncode_refresh" @click="refresh"></div>

            </div>
        </div>
    </div>
</template>
<script>
import "@/common/tn_code";
import { bindEvent, unBindEvent } from '@/common/util.js';

export default {
    props: {
        value: {
            default: false
        }
    },
    model: {
        event: "change"
    },
    data(){
        return{
            tncode : {
                _obj:null,
                _tncode:null,
                _img:null,
                _img_loaded:false,
                _is_draw_bg:false,
                _is_moving:false,
                _block_start_x:0,
                _block_start_y:0,
                _doing:false,
                _mark_w:50,
                _mark_h:50,
                _mark_offset:0,
                _img_w:240,
                _img_h:150,
                _result:false,
                _err_c:0,
                _onsuccess:null,
                _tips:'拖动左边滑块完成上方拼图',
                ramdon_t:''
            }
        }
    },
    methods:{
        refresh(){
            var isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
            var _this = this;
            this.tncode._err_c = 0;
            this.tncode._is_draw_bg = false;
            this.tncode._result = false;
            this.tncode._img_loaded = false;
            var obj = document.querySelector('.tncode_canvas_bg');
            obj.style.display="none";
            obj = document.querySelector('.tncode_canvas_mark');
            obj.style.display="none";
            this.tncode._img = new Image();
            this.tncode._img.crossOrigin='anonymouse'
            var img_url = SERVER_PATH+"/Home/tncode?t="+this.tncode.ramdon_t;
            if(!isSupportWebp){//浏览器不支持webp
                img_url+="&nowebp=1";
            }
            this.tncode._img.src = img_url;
            this.tncode._img.onload = function(){
                _this._draw_fullbg();
                var canvas_mark = document.querySelector('.tncode_canvas_mark');
                var ctx_mark = canvas_mark.getContext('2d');
                //清理画布
                ctx_mark.clearRect(0,0,canvas_mark.width,canvas_mark.height);
                _this.tncode._img_loaded = true;
                obj = document.querySelector('.tncode_canvas_bg');
                obj.style.display="";
                obj = document.querySelector('.tncode_canvas_mark');
                obj.style.display="";
                setTimeout(() => {
                    _this._draw_bg();
                }, 500);
            };
            //alert("Hong Kong ForHarvest Technology and Culture Development Co. Limited".length);
            obj = document.querySelector('.slide_block');
            obj.style.cssText = "transform: translate(0px, 0px)";
            obj = document.querySelector('.slide_block_text');
            obj.style.display="block";
            /* this._draw_bg(); */
            /*  this._draw_bg(); */

        },
        _draw_fullbg(){
            var canvas_bg = document.querySelector('.tncode_canvas_bg');
            var ctx_bg = canvas_bg.getContext('2d');
            ctx_bg.drawImage(this.tncode._img, 0, this.tncode._img_h*2, this.tncode._img_w, this.tncode._img_h, 0, 0, this.tncode._img_w, this.tncode._img_h);
        },
        _block_start_move(e){
            if(this.tncode._doing||!this.tncode._img_loaded){
                return;
            }

            e.preventDefault();
            var theEvent = window.event || e;
            if(theEvent.touches){
                theEvent = theEvent.touches[0];
            }
            var obj = document.querySelector('.slide_block_text');
            obj.style.display="none";
            this._draw_bg();
            /* tncode._draw_bg(); */
            this.tncode._block_start_x = theEvent.clientX;
            this.tncode._block_start_y = theEvent.clientY;
            this.tncode._doing = true;
            this.tncode._is_moving = true;
        },
        _block_on_move(e){
            if(!this.tncode._doing)return true;
            if(!this.tncode._is_moving)return true;
            e.preventDefault();
            var theEvent = window.event || e;
            if(theEvent.touches){
                theEvent = theEvent.touches[0];
            }
            this.tncode._is_moving = true;
                    //document.getElementById('msg').innerHTML = "move:"+theEvent.clientX+";"+theEvent.clientY;
            var offset = theEvent.clientX - this.tncode._block_start_x;
            if(offset<0){
                offset = 0;
            }
            var max_off = this.tncode._img_w - this.tncode._mark_w;
            if(offset>max_off){
                offset = max_off;
            }
            var obj = document.querySelector('.slide_block');

            obj.style.cssText = "transform: translate("+offset+"px, 0px)";
            this.tncode._mark_offset = offset/max_off*(this.tncode._img_w-this.tncode._mark_w);
            //this._draw_bg();
            this._draw_mark()
        },
        _block_on_end(e){
            if(!this.tncode._doing)return true;
            e.preventDefault();
            var theEvent = window.event || e;
            if(theEvent.touches){
                theEvent = theEvent.touches[0];
            }
            console.log("_block_on_end");
            this.tncode._is_moving = false;
            this._send_result();
        },
        _send_result:function(){
            this.tncode._result = false

            this.$http.post('/Home/check',{
                tn_r:this.tncode._mark_offset,
                t:this.tncode.ramdon_t
            }).then(res=>{
                this.$emit("change", true);
                this.tncode._result = true;
            }).catch(e=>{
                var obj = document.getElementById('tncode_div');
                this.addClass( obj,'dd');
                setTimeout(()=>{
                    this.removeClass( obj,'dd');
                },200);
                this.tncode._result = false;

                /* this.refresh(); */

                this._reset()
                this.tncode._err_c++;
                console.log(this.tncode._err_c)
                if(this.tncode._err_c>5){
                    this.refresh();
                }
            }).finally(e=>{
                this.tncode._doing = false;
            })
            /* var haddle = {success:tncode._send_result_success,failure:tncode._send_result_failure};
            tncode._result = false;
            var re = new _ajax();
            re.request('get',tncode._currentUrl()+'check.php?tn_r='+tncode._mark_offset,haddle); */
        },
        _draw_bg(){
            if(this.tncode._is_draw_bg){
                return;
            }
            this.tncode._is_draw_bg = true;
            var canvas_bg = document.querySelector('.tncode_canvas_bg');
            var ctx_bg = canvas_bg.getContext('2d');
            ctx_bg.drawImage(this.tncode._img, 0, 0, this.tncode._img_w, this.tncode._img_h, 0, 0, this.tncode._img_w, this.tncode._img_h);
        },
        _draw_mark(){
            var canvas_mark = document.querySelector('.tncode_canvas_mark');
            var ctx_mark = canvas_mark.getContext('2d');
            //清理画布
            ctx_mark.clearRect(0,0,canvas_mark.width,canvas_mark.height);
            ctx_mark.drawImage(this.tncode._img, 0, this.tncode._img_h, this.tncode._mark_w,this.tncode._img_h,this.tncode._mark_offset,0,this.tncode._mark_w, this.tncode._img_h);
            var imageData = ctx_mark.getImageData(0, 0, this.tncode._img_w, this.tncode._img_h);
            // 获取画布的像素信息
            // 是一个一维数组，包含以 RGBA 顺序的数据，数据使用  0 至 255（包含）的整数表示
            // 如：图片由两个像素构成，一个像素是白色，一个像素是黑色，那么 data 为
            // [255,255,255,255,0,0,0,255]
            // 这个一维数组可以看成是两个像素中RBGA通道的数组的集合即:
            // [R,G,B,A].concat([R,G,B,A])
            var data = imageData.data;
            //alert(data.length/4);
            var x = this.tncode._img_h,y=this.tncode._img_w;
            for(var j = 0; j < x; j++) {
                var ii = 1,k1=-1;
                for(var k=0;k<y&&k>=0&&k>k1;){
                // 得到 RGBA 通道的值
                    var i = (j*y+k)*4;
                    k+=ii;
                    var r = data[i]
                    , g = data[i+1]
                    , b = data[i+2];
                    // 我们从最下面那张颜色生成器中可以看到在图片的右上角区域，有一小块在
                    // 肉眼的观察下基本都是白色的，所以我在这里把 RGB 值都在 245 以上的
                    // 的定义为白色
                    // 大家也可以自己定义的更精确，或者更宽泛一些
                    if(r+g+b<200) data[i+3] = 0;
                    else{
                        var arr_pix = [1,-5];
                        var arr_op = [250,0];
                        for (var i =1; i<arr_pix[0]-arr_pix[1]; i++) {
                            var iiii = arr_pix[0]-1*i;
                            var op = parseInt(arr_op[0]-(arr_op[0]-arr_op[1])/(arr_pix[0]-arr_pix[1])*i);
                            var iii = (j*y+k+iiii*ii)*4;
                            data[iii+3] = op;
                        }
                        if(ii==-1){
                            break;
                        }
                        k1 = k;
                        k = y-1;
                        ii = -1;
                    };
                }
            }
            ctx_mark.putImageData(imageData, 0, 0);
        },
        addClass( elements,cName ){
            if( !this.hasClass( elements,cName ) ){
                elements.className += " " + cName;
            };
        },
        removeClass( elements,cName ){
            if( this.hasClass( elements,cName ) ){
                elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换
            };
        },
        hasClass(elem, cls) {
            cls = cls || '';
            if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
            var ret = new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
            return ret;
        },
        _reset(){
            this.tncode._mark_offset = 0;
            this._draw_bg();
            this._draw_mark();
            var obj = document.getElementByClassName('slide_block');
            obj.style.cssText = "transform: translate(0px, 0px)";
        },
        randomCoding(){
            //创建26个字母数组
            var arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var idvalue ='';
            var n = 4;//这个值可以改变的，对应的生成多少个字母，根据自己需求所改
            for(var i=0;i<n;i++){
                idvalue+=arr[Math.floor(Math.random()*26)];
            }
            return idvalue;

        }
    },
    mounted(){
        //this.init()
        this.tncode._result=this.value
        this.tncode.ramdon_t=new Date().getTime()+this.randomCoding()
        this.refresh()
        bindEvent(document, 'mousemove', this._block_on_move);
        bindEvent(document, 'mouseup', this._block_on_end);
    },
    beforeDestroy() {
        unBindEvent(document, 'mousemove', this._block_on_move);
        unBindEvent(document, 'mouseup', this._block_on_end);
    }
}
</script>
<style scoped lang="scss">
@import '~@/styles/tn_code.css';
</style>

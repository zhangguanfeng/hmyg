/**
*  Created by Hansen
*  On  2018-12-13
*  导航栏
*/
<template>
  <div>
    <x-header
        :left-options="{backText: '',preventGoBack:true}"
        @on-click-back="clickBack"
        style="background:linear-gradient(to right,#745BFF, #6f98ff);"
        >{{title}}
        <a slot="right" @click="showRightText ? clickRigntText() : ''">{{showRightText ? rightText:''}}</a>
    </x-header>
  </div>
</template>

<script>
import {XHeader} from 'vux'
export default {
  name: 'NavBar',
  data: function() {
    return {
    }
  },
  props:{
    clickBack:Function,
    showRightText:false,
    rightText:String,
    clickRigntText:Function,
    title:String
  },
  methods: {}
}
</script>

<style scoped>

</style>

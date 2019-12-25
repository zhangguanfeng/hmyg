<!--
 * @ Author: Diskfan
 * @ Create Time: 2019-12-10 22:56:21
 * @ Modified by: Your name
 * @ Modified time: 2019-12-17 08:06:44
 * @ Description: 全屏
 -->


<template>
  <div class="fullscreen" :title="title">
    <svg
      v-if="!isFullscreen"
      @click="fullscreenChange(false)"
      class="icon full"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3498"
      width="12"
      height="12"
    >
      <path
        d="M640 0v128h179.2L600.32 346.88l76.8 76.8L896 204.8V384h128V0z m256 128zM128 204.8l218.88 218.88 76.8-76.8L204.8 128H384V0H0v384h128V204.8zM896 819.2l-218.88-218.88-76.8 76.8L819.2 896H640v128h384v-384h-128z m0 76.8zM346.88 600.32L128 819.2V640H0v384h384v-128H204.8l218.88-218.88-76.8-76.8z"
        fill="#fff"
        p-id="3499"
      />
    </svg>
    <svg
      v-else
      @click="fullscreenChange(true)"
      class="icon exit"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4836"
      width="12"
      height="12"
    >
      <path
        d="M226.624 318.272l-137.888 0.576c-20.416-0.544-39.328 14.72-42.4 40.8v28.16c0.512 22.112 17.344 40.416 37.728 40.896l263.296-1.696c0.384 0.032 0.672 0.192 0.992 0.192l18.464 0.448a33.6 33.6 0 0 0 25.856-11.232c6.592-7.104 9.056-17.056 8.768-28.16l-1.984-20.032c0-0.416 1.376-0.672 1.376-1.12l-1.024-286.464c-0.448-22.08-17.312-35.328-37.728-35.808h-27.424c-20.384-0.448-36.576 18.784-36.128 40.832l1.152 155.808-181.536-193.408a47.68 47.68 0 0 0-71.392 0 58.112 58.112 0 0 0 0 77.408l179.872 192.8z m399.392 337.248c0.032 0.512-1.344 0.768-1.344 1.152h0.032l1.024 282.08c0.544 22.048 17.376 35.264 37.792 35.712l25.952 0.064c20.32 0.512 36.576-18.784 36.064-40.832l-1.152-152.48 181.504 194.688c19.744 21.408 51.648 21.408 71.36 0s19.712-56 0-77.408L795.712 704l137.728-0.608c20.384 0.512 39.264-13.088 42.368-39.168v-28.128c-0.512-22.112-17.44-40.416-37.76-40.96l-259.904 1.696c-0.416 0-0.672-0.16-1.024-0.16l-18.432-0.512a33.6 33.6 0 0 0-25.888 11.264c-6.688 7.04-9.024 16.992-8.832 28.128l2.048 19.968zM46.72 975.84a47.744 47.744 0 0 0 71.392 0l181.536-193.408-1.184 153.376c-0.448 22.08 15.744 41.376 36.064 40.832h27.424c20.448-0.576 37.312-13.728 37.76-35.84l1.056-284.16c0-0.416-1.376-0.672-1.376-1.12l1.984-19.968c0.224-11.136-2.144-21.088-8.768-28.128a33.664 33.664 0 0 0-25.824-11.264l-18.464 0.512c-0.384 0-0.64 0.16-1.056 0.16l-263.264-1.696c-20.384 0.576-37.248 18.816-37.76 40.96v28.128c3.072 26.048 21.984 39.616 42.336 39.168l139.488 0.512-181.376 194.496c-19.616 21.344-19.616 56 0.032 77.44z m586.112-559.328c6.496 7.168 15.68 11.488 25.888 11.168l18.4-0.448c0.416 0 0.672-0.16 1.056-0.224l263.648 1.696c20.416-0.512 37.248-18.784 37.76-40.928l0.064-28.16c-3.136-26.08-22.048-41.344-42.368-40.832l-139.904-0.608 179.744-192.8a57.92 57.92 0 0 0 0.064-77.344 47.68 47.68 0 0 0-71.36 0l-181.504 194.592 1.152-156.992c0.512-22.048-15.776-41.344-36.096-40.864h-25.92c-20.416 0.576-37.248 13.76-37.76 35.84l-1.056 286.528c0 0.448 1.344 0.704 1.344 1.12l-1.984 20.032c-0.192 11.168 2.176 21.12 8.832 28.224z m0 0"
        fill="#fff"
        p-id="4837"
      />
    </svg>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Fullscreen extends Vue {
  public isFullscreen: boolean = false;
  protected bySelf: number = 0;
  get title(): string {
    return this.isFullscreen ? "全屏模式" : "退出全屏";
  }
  protected created() {
    this.$util.bindEvent(window, "resize", () => {
      if (this.bySelf == 1) {
        this.bySelf = 2;
      } else if (this.bySelf == 2) {
        this.bySelf = 0;
        this.isFullscreen = false;
      }
    });
  }
  protected fullscreenChange(target: boolean) {
    const document = window.document as any;
    const element = document.documentElement;
    if (target) {
      const handle =
        document.exitFullscreen ||
        document.webkitCancelFullScreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen;
      if (handle) {
        handle.call(document);
        this.isFullscreen = false;
      } else if (typeof (window as any).ActiveXObject !== "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
          this.isFullscreen = false;
        }
      }
    } else {
      const handle =
        element.requestFullscreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullscreen;
      if (handle) {
        handle.call(element);
        this.isFullscreen = true;
        this.bySelf = 1;
      } else if (typeof (window as any).ActiveXObject !== "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
          this.isFullscreen = true;
          this.bySelf = 1;
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.fullscreen {
  width: 40px;
  height: 40px;
  @include flex();
  > * {
    width:18px;
    height: 18px;
    opacity: 0.8;
    cursor: pointer;
    @include transition();
    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }
  .exit {
    transform: scale(1.1);
    &:hover {
      transform: scale(1);
    }
  }
}
</style>
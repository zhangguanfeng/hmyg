<template>
  <el-dialog
    :custom-class="`${$attrs.customClass || ''}  b-dialog-contain`"
    :visible.sync="show"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    v-on="$listeners"
    v-bind="$attrs">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Template extends Vue {
  @Prop({ default: false, type: Boolean }) protected visible!: boolean;

  protected get show(): boolean {
    return this.visible;
  }
  protected set show(val: boolean) {
    this.$emit("update:visible", val);
  }
}
</script>
<style lang="scss">
.b-dialog-contain {
  .el-dialog__header {
    background: $dialog-header-bg;
    border-radius: 8px 8px 0 0;
  }
}
.el-dialog__wrapper {
  transition-duration: 0.3s;
}
.dialog-fade-enter-active {
  animation: none !important;
}
.dialog-fade-leave-active {
  transition-duration: 0.35s !important;
  animation: none !important;
}
.dialog-fade-enter-active .el-dialog,
.dialog-fade-leave-active .el-dialog {
  animation-fill-mode: forwards;
}
.dialog-fade-enter-active .el-dialog {
  animation-duration: 0.3s;
  animation-name: anim-open;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
}
.dialog-fade-leave-active .el-dialog {
  animation-duration: 0.3s;
  animation-name: anim-close;
}
@keyframes anim-open {
  0% {
    opacity: 0;
    transform: scale3d(.7, .7, 1);
  }
  80% {
    opacity: 1;
    transform: scale3d(1.07, 1.07, 1);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
@keyframes anim-close {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale3d(0.7, 0.7, 1);
  }
}
</style>
<template>
  <viewer
    :options="options"
    data-title=""
    :images="images"
    class="viewer-wrap-single"
    ref="viewer">
    <template slot-scope="scope">
      <img
        v-for="src in scope.images"
        ref="imgViewer"
        class="viewer-single"
        :src="src"
        :key="src"
      />
    </template>
  </viewer>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import 'viewerjs/dist/viewer.css';
@Component
export default class BSingleViewer extends Vue {
  protected readonly options: {} = {
    inline: false,
    button: true,
    navbar: false,
    title: (): string => {
      return this.$store.state.singleViewerTitle;
    }
  };
  protected get images() {
    return this.$store.state.singleViewerImages;
  }
  @Watch("images", { deep: true })
  showChange(): void {
    this.$nextTick(() => {
      const dom: HTMLElement|null = this.$el.querySelector(".viewer-single");
      if (dom === null) {
        return;
      }
      this.$nextTick(() => {
        dom.click();
      });
    });
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .viewer-wrap-single {
    visibility: hidden;
    position: absolute;
    left: -10000px;
    top: -1000px;
    .viewer-title {
      color: #ffffff;
      font-size: 20px;
    }
  }
</style>
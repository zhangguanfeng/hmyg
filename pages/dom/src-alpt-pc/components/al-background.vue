<template>
  <div class="al-background-wrap"></div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import * as THREE from "three";

@Component
export default class AlBackground extends Vue {
  @Prop({ type: Number, default: 50 }) protected amountX!: number;
  @Prop({ type: Number, default: 50 }) protected amountY!: number;
  @Prop({ type: Number, default: "0xffffff" }) protected color!: number;
  @Prop({ type: Number, default: 350 }) protected top!: number;
  protected count: number = 0;
  // 用来跟踪鼠标水平位置
  protected mouseX: number = 0;
  protected windowHalfX: number = 0;
  // 相机
  protected camera: any = null;
  // 场景
  protected scene: any = null;
  // 批量管理粒子
  protected particles: any = null;
  // 渲染器
  protected renderer: any = null;
  protected timmer: any = null;
  protected init() {
    const SEPARATION = 100;
    const SCREEN_WIDTH: number = window.innerWidth;
    const SCREEN_HEIGHT: number = window.innerHeight;
    const container = document.createElement("div");
    this.windowHalfX = window.innerWidth / 2;
    container.style.position = "relative";
    container.style.top = `${this.top}px`;
    container.style.height = `${SCREEN_HEIGHT - this.top}px`;
    (document as any)
      .querySelector(".al-background-wrap")
      .appendChild(container);

    this.camera = new THREE.PerspectiveCamera(
      65,
      SCREEN_WIDTH / SCREEN_HEIGHT,
      1,
      100000
    );
    this.camera.position.z = 800;

    this.scene = new THREE.Scene();

    const numParticles = this.amountX * this.amountY;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);
    // 初始化粒子位置和大小
    let i = 0;
    let j = 0;
    for (let ix = 0; ix < this.amountX; ix++) {
      for (let iy = 0; iy < this.amountY; iy++) {
        positions[i] = ix * SEPARATION - (this.amountX * SEPARATION) / 2;
        positions[i + 1] = 0;
        positions[i + 2] = iy * SEPARATION - (this.amountY * SEPARATION) / 2;
        scales[j] = 1;
        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute("scale", new THREE.BufferAttribute(scales, 1));
    // 初始化粒子材质
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(this.color) }
      },
      vertexShader: `
        attribute float scale;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 2.0 );
          gl_PointSize = scale * ( 300.0 / - mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
          gl_FragColor = vec4( color, 1.0 );
        }
      `
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearAlpha(0);
    container.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.onWindowResize, { passive: false });
    // document.addEventListener('mousemove', this.onDocumentMouseMove, { passive: false })
    // document.addEventListener('touchstart', this.onDocumentTouchStart, { passive: false })
    // document.addEventListener('touchmove', this.onDocumentTouchMove, { passive: false })
  }
  protected renderHandle() {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y = 400;
    this.camera.lookAt(this.scene.position);
    const positions = this.particles.geometry.attributes.position.array;
    const scales = this.particles.geometry.attributes.scale.array;
    // 计算粒子位置及大小
    let i = 0;
    let j = 0;
    for (let ix = 0; ix < this.amountX; ix++) {
      for (let iy = 0; iy < this.amountY; iy++) {
        positions[i + 1] =
          Math.sin((ix + this.count) * 0.3) * 100 +
          Math.sin((iy + this.count) * 0.1) * 100;
        scales[j] =
          (Math.sin((ix + this.count) * 0.3) + 1) * 8 +
          (Math.sin((iy + this.count) * 0.5) + 1) * 4; /* 颗粒大小 */
        i += 3;
        j++;
      }
    }
    // 重新渲染粒子
    this.particles.geometry.attributes.position.needsUpdate = true;
    this.particles.geometry.attributes.scale.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
    this.count += 0.1;
  }
  protected animate() {
    requestAnimationFrame(this.animate);
    this.renderHandle();
  }
  protected onDocumentMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX - this.windowHalfX;
  }
  protected onDocumentTouchStart(event: TouchEvent) {
    if (event.touches.length === 1) {
      this.mouseX = event.touches[0].pageX - this.windowHalfX;
    }
  }
  protected onDocumentTouchMove(event: TouchEvent) {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.mouseX = event.touches[0].pageX - this.windowHalfX;
    }
  }
  protected onWindowResize() {
    clearTimeout(this.timmer);
    this.timmer = setTimeout(() => {
      this.$el.innerHTML = "";
      this.init();
    }, 100);
    // this.windowHalfX = window.innerWidth / 2
    // this.camera.aspect = window.innerWidth / window.innerHeight
    // this.camera.updateProjectionMatrix()
    // this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
  protected mounted() {
    this.init();
    this.animate();
  }
}
</script>
<style lang="scss">
.al-background-wrap {
  width: 100%;
  height: 100%;
}
</style>
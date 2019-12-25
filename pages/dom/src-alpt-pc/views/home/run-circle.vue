<template>
    <div class="run-circle">
        <ul class="circle-wrap">
            <div class="bg-line">
                <img src="/img/layer.png" alt="">
            </div>
            <li
                    :class="`single-circel item${key}`"
                    v-for="(item, key) in $root.$t('home.circel')"
                    :key="key">
        <span class="title">
          {{item.title}}
        </span>
                <span class="content">
          {{item.content}}
        </span>
            </li>
        </ul>
        <div ref="systemName" class="system-name">
            {{$t('home.system_name')}}
            <p>{{$t('home.system_name')}}</p>
        </div>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';

    @Component
    export default class RunCircle extends Vue {
        protected done: boolean = false;
        protected runHandle: number = 0;
        protected calRunCitcel() {
            const els: any = this.$el.querySelectorAll('li');
            let count = 0;
            const slice = Array.prototype.slice;
            const delay = 1000; // 延迟
            let requestDelay = 1500;
            const run = () => {
                count += 0.0008;
                const desc = 3.78;
                for (let i = 0; i < els.length; i++) {
                    const cos = Math.cos(count + i * desc);
                    let x = 0;
                    let y = 0;
                    if (document.documentElement.clientWidth > 500) {
                        x = 470 * Math.sin(count + i * desc);
                        y = 160 * cos;
                    } else {
                        x = 120 * Math.sin(count + i * desc);
                        y = 80 * cos;
                    }
                    const c = .75 + .25 * cos;
                    const o = .9 + .1 * cos;
                    els[i].style.transform =
                        `translate(${x}px, ${y}px) scale(${c})`;
                    els[i].style.opacity = o;
                }
                if (requestDelay !== 0) {
                    setTimeout(() => {
                        if (requestDelay !== 0) {
                            requestDelay = 0;
                        }
                        this.runHandle = requestAnimationFrame(run);
                    }, requestDelay);
                } else {
                    this.runHandle = requestAnimationFrame(run);
                }
            };
            run();
        }

        protected animation() {
            if (this.done) {
                return;
            }
            this.done = true;
            const className = (this as any).$refs.systemName.className;
            (this as any).$refs.systemName.className = className + ' slide-up';
            setTimeout(() => {
                this.calRunCitcel();
            }, 1000);
        }
        protected beforeDestroy() {
            cancelAnimationFrame(this.runHandle);
        }
    }
</script>
<style lang="scss">
    @import '@/style/mixin.scss';

    .run-circle {
        width: 1100px;
        height: 600px;
        margin: 50px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;

        .circle-wrap {
            width: 1100px;
            height: 600px;
            display: flex;
            justify-content: center;
            align-items: center;
            // flex-wrap: wrap;
            position: absolute;

            .single-circel {
                width: 328px;
                height: 339px;
                background: url('/img/global.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: absolute;

                .title {
                    font-size: 28px;
                    color: #56DAFF;
                    width: 100%;
                    text-align: center;
                    padding: 70px 0 10px 0;
                }

                .content {
                    font-size: 18px;
                    color: #56DAFF;
                    width: 200px;
                }
            }

            .item0, .item1, .item2, .item3, .item4 {
                transition: 800ms all cubic-bezier(0.14, 0.89, 0.56, 0.91);
                opacity: 0;
                transform: scale(.3);
            }

            .item1 {
                .title {
                    margin-top: 20px;
                    font-size: 31px;
                    margin-left: -10px;
                }
            }
        }

        .bg-line {
            position: absolute;
            width: 100%;

            img {
                width: 100%;
                margin-top: 180px;
            }
        }

        .system-name {
            position: absolute;
            font-size: 41px;
            color: #56DAFF;
            z-index: 10;
            margin-top: -150px;
            opacity: 0;
            font-family: PingFangSC-Medium, PingFang SC;

            p {
                position: absolute;
                bottom: 0;

                padding: 0;
                margin: 0;
                filter: blur(20px);
            }
        }

        .slide-up {
            animation: bounceInDowns;
            animation-fill-mode: forwards;
            animation-duration: 1000ms;
            opacity: 1;
        }
    }
</style>

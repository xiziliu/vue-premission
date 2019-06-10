<template>
    <div id="app">
        <router-view name="navbar"></router-view>
        <div class="rv">
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
        <router-view name="footer"></router-view>

        <div class="btn-back-to-top">
            <BackTop title="返回顶部" :bottom="60"></BackTop>
        </div>

        <div v-show="isShowLoading" @touchmove.prevent>
            <Spin fix>
                <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </div>
    </div>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                screenWidth: window.innerWidth
            }
        },
        mounted() {
            
            window.onresize = () => { // 监听页面缩放
                window.innerWidth = window.innerWidth;
            }

            var body = document.getElementsByTagName('body')[0];

            // 阻止右键
            body.addEventListener('contextmenu', (e) => {
                if (e.target.tagName == 'IMG' || e.target.tagName == 'img') {
                    e.preventDefault();
                }
            }, false)

            // 阻止拖拽
            body.addEventListener('mousedown', (e) => {

                if (e.target.tagName == 'IMG' || e.target.tagName == 'img') {
                    e.preventDefault();
                    return false;
                }
            }, false)
        },
        watch: {

        },
        computed: {
            isShowLoading() {
                return this.$store.state.isShowLoading;
            }
        }
    };
</script>

<style lang="scss">
    /* 公用样式 */
    body {
        overflow-y: scroll;
    }

    #app {
        // position: relative;
        background: $bg-gray;
    }

    .rv {
        width: 100%;
    }

    .layout {
        min-height: calc(100vh - #{$navbarHeight});

        @media (max-width: 768px) {
            min-height: calc(100vh - #{$mobiNavbarHeight} - #{$footerHeight});
        }

    }

    .container {
        width: 80%;
        max-width: 1440px;
        margin: 0 auto;

        .main-content {
            padding-top: 1.5rem;
            padding-bottom: 3rem;
        }
    }

    @media (max-width: 768px) {
        .container {
            width: 100%;

            .main-content {
                padding-top: 14px;
                padding-bottom: calc(3rem + #{$footerHeight});
            }
        }
    }


    .vertical-divider {
        background: #808080;
    }

    /* 公用样式 */


    /* iview样式重置 */

    .ivu-btn:focus {
        box-shadow: none;
    }

    .ivu-input {
        &:focus {
            box-shadow: none;
        }

        -webkit-appearance: none;
    }

    .ivu-btn[disabled] {
        color: #c5c8ce !important;
        background-color: #f7f7f7 !important;
        border-color: #dcdee2 !important;
    }

    .ivu-tree-children {
        font-size: 14px !important;
    }

    .ivu-message {
        z-index: 1500;
    }

    /* iview样式重置 */

    .level_one {
        padding-left: 20px;
    }

    .level_two {
        padding-left: 40px;
    }

    .level_thr {
        padding-left: 60px;
    }

    .level_four {
        padding-left: 80px;
    }

    .level_five {
        padding-left: 100px;
    }


    /* swiper 样式重置 */
    .swiper-button-prev,
    .swiper-button-next {
        &:focus {
            outline: none;
        }
    }

    /* swiper 样式重置 */



    /* loading */
    @keyframes ani-spin {
        from {
            transform: rotate(0deg);
        }

        50% {
            transform: rotate(180deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    .spin-icon-load {
        animation: ani-spin 1s linear infinite;
    }

    /* loading */
</style>

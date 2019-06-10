<template>
    <div class="">
        <div class="menu"> 
            <div class="menuTop" >
                <h2>Vue Premission</h2>
            </div>
            <div class="menuContainer">
                <Menu v-on:on-select="menuRoute" ref="menu" :active-name="activename" theme="dark" width="auto" :open-names="[extendsno]">
                        <Submenu :name="index" v-for="(menu, index) in menus" v-bind:key="menu.name">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                {{menu.name}}
                            </template>
                            <MenuItem :name="submenu.path" v-for="submenu in menu.submenu" v-bind:key="submenu.path">{{submenu.name}}</MenuItem>
                        </Submenu>
                </Menu>
            </div>

            <div class="menuBottom" >
                <Icon type="ios-power" size="24" color="#ffffff" @click="logout"/>
            </div>
        </div>
        <Layout :style="{marginLeft: '16vw', height: '100vh', overflow: 'scorll'}">
            <Content :style="{padding: '0 16px 16px', overflow: 'scorll'}">
                <h1 id="optionName" class="title_name">{{titleName}}</h1>
                <Card style="min-height: 600px">
                    <div>
                        <transition name="enter" mode="out-in">
                            <keep-alive :exclude="['caseupload', 'brand', 'goodsupload']">
                                <router-view :key="$route.fullPath" ></router-view>
                            </keep-alive>
                        </transition>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                modal11: false,
                titleName: "首页",
                extendsno: '0',
                iconMap:{
                    '首页':''
                }
            }
        },
        computed :{
            menus(){ 
                return this.$store.getters.getCacheRouters;
            }
        },
        created() {
            this.showMenuAndTitle();
        },
        updated() {
        },
        methods: {
          
            showMenuAndTitle(){
                var pathArr =  location.pathname.split('/')
                this.activename = pathArr[pathArr.length -1];
                let node = this.$store.getters.getCacheRouterParentIndex(this.activename);
                this.extendsno = node.parentIdx;
                this.titleName = node.name;
                document.title= '后台管理 - '+ node.name;
            },
            logout (){
                localStorage.setItem('loginRole','');
                this.$router.push('login');
               
            },
            menuRoute (path) {
                this.$router.push(path);
                 this.showMenuAndTitle();
            },
            modal () {
                this.$data.modal11 = true;
            }
        },
        mounted() {
        },
    };
</script>
<style scoped lang="scss">
/* USAGE */
h2{
    color: white;
    line-height: 64px;
}
.menu{
    position: fixed;
    // display: flex;
    flex-direction: column;
    height: 100vh;
    width : 16vw;
    left: 0;
    background:rgb(81, 90, 110);

    .menuTop{
        height: 64px;
        width: 100%;
        padding-left: 30px;

        background-position: 24px center;
    }

    .menuContainer{
        height: calc(100% - 128px);
        overflow-y: scroll;
        &::-webkit-scrollbar {display:none}
    }
    .menuBottom{
        height: 64px;
        padding: 24px;
        width: 100%;
        display: flex;
        justify-content: flex-start;

        i:hover {
            cursor: pointer;
        }
    }
}

.title_name{
    margin: 10px 0;
}

.enter-enter-active, .enter-leave-active {
  transition-duration: 0.1s;
}
.enter-enter, .enter-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* iview样式重置 */
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{
    background: #3da1ff !important;
}

.ivu-layout {
    margin-left: '16vw';
    height: '100vh';
    overflow: scroll;
}

/* iview样式重置 */
</style>

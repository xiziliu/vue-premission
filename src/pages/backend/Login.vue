<template>
    <div class='bg full-page'>
        <div class='login-box bg-white px-5 py-4'>
            <div class='title'>
                <h3>Vue Premission</h3>
                <span class='align-middle'></span>
            </div>
            <div class='col pr-4 border-right'>
                <Form ref='loginForm' :model='loginForm' @keyup.native.enter='handleSubmit'>
                    <Input @on-focus='clearErrText' class='mb-3' type='text' v-model.trim='loginForm.account' placeholder='账号'></Input>
                    <Input @on-focus='clearErrText' class='mb-3' type='password' v-model='loginForm.password' placeholder='密码'></Input>
                    <Button class='mt-3' type='primary' long @click.enter='handleSubmit()'>登录</Button>
                </Form>
                <p class='error-text mt-2' v-show='hasError'>{{errorText}}</p>
            </div>

            <div class='col pl-4'>
                <p style='text-align:justify'>
                    演示账号：<br>
                    超管账号：admin / 123<br>
                    普通账号：test / 123
                </p>
            </div>
        </div>
    </div>
</template>
<script>

import commonUtil from './commonUtil ';
    export default {
        data() {
            return {
                loginForm: {
                    account: '',
                    password: '',
                },
                hasError: false,
                errorText: ''
            }
        },
        created() {

        },
        methods: {
            handleSubmit() {
                if((this.loginForm.account != 'admin' || this.loginForm.account != 'test') &&
                    this.loginForm.password != '123'){
                        this.hasError = true;
                        this.errorText = '账号或密码错误';
                        return;
                    }
                //通过不同api模拟登陆接口不同角色返回的结果
                let url= this.loginForm.account == 'admin' 
                    ? 'http://www.mocky.io/v2/5cfe0cb63200004f0045edf2' 
                    : 'http://www.mocky.io/v2/5cfe1180320000540045ee1d';
                this.axios.post(url, {
                    'account': this.loginForm.account,
                    'pwd': this.loginForm.password
                }).then(res => {
                    if (res.data.status) {
                        localStorage.setItem('loginRole',this.loginForm.account);
                        commonUtil.generateRoutes(res.data.data.menus,this.$router);
                        this.$router.push('/back/index');
                    } else {
                        this.hasError = true;
                        this.errorText = res.data.errmsg
                    }
                })
            },
            clearErrText() {
                this.hasError = false;
            }
        }
    }
</script>
<style lang='scss' scoped>
    .bg {
        background: rgba(0, 0, 0, .8);
    }

    .login-box {
        .title {
            font-size: 20px;
            height: 64px;
        }
        position: absolute;
        top: 217px;
        left: 50%;
        transform: translateX(-50%);
        width: 640px;
        .col {
            float: left;
            width: 50%;
        }
        .error-text {
            font-size: $size12;
            color: #FF2323;
        }
    }
</style>
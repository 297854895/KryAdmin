<template>
  <div class="login_container">
		<p style="color: #888;">登录</p>
		<div class="login_username">
			<span style="color: #888;">帐户</span>
			<input type="text" class="reg_container_input" v-model="acc">
		</div>
		<div class="login_password">
			<span style="color: #888;">密码</span>
			<input type="password" class="reg_container_input" v-model="pass">
		</div>
		<div class="login_sumbit" @click="Login">登录</div>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        acc: '',
        pass: ''
      };
    },
    methods: {
      Login() {
        console.log(this.$data.acc);
      }
    }
  }
</script>
<style scoped>
  body,div,ul,li,p{
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: "微软雅黑";
  }
  @media only screen and (min-width: 960px){
    .login_container{
      width: 600px;
      height: 300px;
      top: 0;
      bottom: 0;
    }
    .login_username,.login_password{
      width: 60%;
    }
    .reg_container_input{
      width: 300px;
    }
    .reg_container_input:last-child{
      width: 270px;
    }
    .login_sumbit{
      width: 360px;
    }
    .not_login{
      margin-right: 120px;
    }
    .reg_back{
      margin-right: 120px;
    }
  }
  @media only screen and (max-width: 959px) {
    .login_container{
      width: 300px;
      height: 300px;
      top: 0;
      bottom: 0;
    }
    .reg_container_input{
      width: 240px;
    }
    .reg_container_input:last-child{
      width: 210px;
    }
    .login_sumbit{
      width: 300px;
    }
  }
  body{
    overflow: hidden;
  }
  #background{
    position: relative;
    width: 100%;
    height: 100%;
    background-size:100% 100% ;
  }
  .login_username,.login_password{
    position: relative;
    height: 40px;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5px;
    background: rgba(0,0,0,0.1);
    margin-top: 30px;
    box-shadow: 0px 0px 2px #888;
  }
  .reg_container span{
    color: #fff;
    line-height: 40px;
    font-family: "微软雅黑";
    font-size: 14px;
    margin-left: 8px;
  }
  .reg_container_input{
    height: 37px;
    border: none;
    outline: none;
    padding-left: 10px;
    background: none;
  }
  .login_container{
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    transform: rotateX(90deg) rotateY(90deg);
    transition: all .7s;
  }
  .login_container p{
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    font-family: "微软雅黑";
    text-align: center;
  }
  .login_container span{
    color: #fff;
    line-height: 40px;
    font-family: "微软雅黑";
    font-size: 14px;
    margin-left: 8px;
  }
  .login_sumbit{
    position: relative;
    height: 40px;
    background:rgba(0,0,0,0.6);
    line-height: 40px;
    color: #fff;
    text-align: center;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5px;
    margin-top: 30px;
    cursor: pointer;
    transition: all .3s ease-out;
  }
  .login_sumbit:hover{
    background: rgba(0,0,0,0.3);
  }
  .login_sumbit:active{
    background: rgba(0,0,0,0.65);
  }
  .login_container{
  	transform: rotateX(0deg) rotateY(0deg);
  }
</style>

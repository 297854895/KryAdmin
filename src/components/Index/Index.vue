<template>
  <div id="index">
    <k-nav
        scrollDOM=".doc-container"
        type="dark" backgroundColor="#222" navBorderColor="#111" navHoverColor="#eee" navHoverBgColor="#111">
      <span slot="left">
        <label style="font-size:18px;font-weight:bold;margin-left: 10px;">KryAdmin</label>
      </span>
      <ul slot="right">
        <label>
          <a>Zkc</a>
          <a style="padding: 0 16px;"><i class="fa fa-power-off"></i></a>
        </label>
      </ul>
    </k-nav>
    <div :style="`height: ${height};width: 100%;`">
      <div class="nav-aside-menu">
        <ul class="nav-asideMenu" v-for="item of asideMenu">
          <h3><i :class="item.icon"></i>&nbsp;&nbsp;{{item.label}}</h3>
          <li class="nav-asideMenu-li" @click="toggleRouter(item_.key, item_.path)" v-for="item_ of item.childs" :class="activeMenu === item_.key ? 'nav-asideMenu-active' : ''">
            {{item_.label}}
          </li>
        </ul>
      </div>
      <div :style="`height: ${height};`" class="index-right">
        <div class="admin-wrap" :style="`height: ${parseInt(height, 10) - 48 + 'px'};`">
          <div class="admin-con">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {
      this.$data.activeMenu = this.$route.path.substring(1);
      this.$data.height = document.documentElement.clientHeight + 'px';
    },
    data() {
      return {
        height: 'auto',
        activeMenu: 'publishArticle',
        asideMenu: [
          {
            label: "Article",
            icon: "fa fa-edit",
            childs: [
              {label: '发布文章', path: '/publishArticle', key: 'publishArticle'},
              {label: '管理文章', path: '/manageArticle', key: 'manageArticle'}
            ]
          },
          {
            label: "Novel",
            icon: "fa fa-book",
            childs: [
              {label: '发布小说', path: '/publishNovel', key: 'publishNovel'},
              {label: '管理小说', path: '/manageNovel', key: 'manageNovel'}
            ]
          },
          {
            label: "Comment",
            icon: "fa fa-comments",
            childs: [
              {label: '管理评论', path: '/manageComment', key: 'manageComment'}
            ]
          },
        ]
      }
    },
    methods: {
      toggleRouter(key, path){
        this.$data.activeMenu = key;
        this.$router.push(path);
      }
    }
  }
</script>
<style scoped>
  a:hover{
    color: red;
    cursor: pointer;
  }
  .nav-aside-menu{
    height: 100%;
    width: 250px;
    border-right: 1px solid #ccc;
    background: #302f2f;
    position: fixed;
    top: 0;
    color: #fff;
    padding-top: 48px;
    box-sizing: border-box;
  }
  .nav-aside-menu h3{
    padding: 0 26px;
    color: #fff;
  }
  .nav-asideMenu{
  }
  .nav-asideMenu-li{
    padding: 10px 36px;
    cursor: pointer;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    transition: all .25s ease-out;
  }
  .nav-asideMenu li:hover{
    color: #e0e0e0;
  }
  .nav-asideMenu-active{
    background: #222;
    border-top: 1px solid rgb(17, 17, 17);
    border-bottom: 1px solid rgb(17, 17, 17);
  }
  .index-right{
    padding: 48px 0 0 251px;
    box-sizing: border-box;
  }
  .admin-wrap{
    width: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 20px;
  }
  .admin-con{
    background: #fff;
    padding: 20px;
  }
</style>

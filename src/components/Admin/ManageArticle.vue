<template>
  <div>
    <h2>Manage Article</h2>
    <hr>
    <div style="height: 20px;"></div>
    <k-input
      :value="searchTitle"
      iconAfter="fa fa-search"
      placeholder="请输入标题查询..."
      width="183px"
      :onChange="searchKeyChange"
      :btnCallBack="{
        after: searchByKey
      }"/>
    <k-select
      :select="filter"
      :selectChange="toggleFilterKey"
      width="183px"></k-select>
    <div style="height: 20px;"></div>
    <mtable
      v-if = "!getStatus"
      :head="[
        {text: '标题', dataIndex: 'title'},
        {text: '类型', dataIndex: 'type'},
        {text: '作者', dataIndex: 'auth'},
        {text: 'ID', dataIndex: '_id'},
        {text: '发布日期', dataIndex: 'createTime'},
        {text: '操作', dataIndex: 'handle', needCommponents: true, components: [
          {type: 'button', label: '阅读原文', options: {
            size: 'small'
          }},
          {type: 'button', label: '编辑', options: {
            type: 'info',
            size: 'small'
          }},
          {type: 'button', label: '删除', options: {
            type: 'danger',
            size: 'small',
            callBack: deleteArticle
          }},
        ]},
      ]"
      :data="this.getManageArticleList.data || []"
      :options="{
          pagination: {
            size: 10,
            current: parseInt(this.getManageArticleList.index),
            total: Math.ceil(this.getManageArticleList.total / parseInt(this.getManageArticleList.size)),
            callBack: togglePage
          }
        }"/>
      <div v-else>
        <i class="fa fa-spinner fa-spin"></i>
      </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import axios from 'axios';

  import Table from './Table';
  export default {
    components: {
      'mtable': Table
    },
    data() {
      return {
        getStatus: false,
        filterKey: 'All',
        searchTitle: '',
        filter: [
          {text: '全部', key: 'All'},
          {text: '前端攻城', key: 'web'},
          {text: '污文弄墨', key: 'word'},
        ]
      }
    },
    mounted() {
      this.$data.getStatus = true;
      this.updateArticleList({index: 1, size: 10, type: 'list', filterKey: this.$data.filterKey, searchTitle: this.$data.searchTitle});
    },
    computed: {
      ...mapGetters([
        'getManageArticleList',
      ])
    },
    watch: {
      getManageArticleList(newValue, oldValue) {
        if (newValue!==oldValue) {
          this.$data.getStatus = false;
        }
      }
    },
    methods: {
      ...mapActions([
        'updateArticleList'
      ]),
      toggleFilterKey(data) {
        this.$data.filterKey = data.key;
        this.$data.getStatus = true;
        this.updateArticleList({index: 1, size: 10, type: 'list', filterKey: this.$data.filterKey, searchTitle: this.$data.searchTitle});
      },
      searchKeyChange(value) {
        this.$data.searchTitle = value;
      },
      searchByKey() {
        this.$data.getStatus = true;
        this.updateArticleList({index: 1, size: 10, type: 'list', filterKey: this.$data.filterKey, searchTitle: this.$data.searchTitle});
      },
      togglePage(page) {
        if (isNaN(page)) return;
        this.$data.getStatus = true;
        this.updateArticleList({index: page, size: 10, type: 'list', filterKey: this.$data.filterKey, searchTitle: this.$data.searchTitle})
      },
      deleteArticle(data) {
        this.$Kui.Dialog({title: '是否删除该文章', content: `是否删除该文章 ${data.title} ${data._id}`, button: [
          {label: 'Sure', callBack: this.deleteHandle, data: data},
          {label: 'Cancel'},
        ]});
      },
      deleteHandle(data) {
        axios.delete('/admin/article', {params: {_id: data._id}})
        .then(resp => {
          if (resp.status === 200) {
            this.$Kui.Notification.success({title:'成功', content: `删除文章 ${data.title} ${data._id} 成功...`, autoClose: true});
            this.$data.getStatus = true;
            this.updateArticleList({index: parseInt(this.getManageArticleList.index), size: 10, type: 'list', filterKey: this.$data.filterKey, searchTitle: this.$data.searchTitle})
          }
        })
        .catch(err => {
          this.$Kui.Notification.error({title:'失败', content: `删除文章 ${data.title} ${data._id} 失败...`});
        });
      }
    }
  }
</script>
<style scoped>
  h2{
    font-size: 26px;
    font-weight: 400;
    text-align: left;
  }
  hr{
    height: 1px;
    border: none;
    background-color: #ddd;
  }
</style>

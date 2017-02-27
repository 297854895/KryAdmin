<template>
  <div v-if="!view">
    <h2>Publish Article</h2>
    <hr>
    <div style="height: 20px;"></div>
    <k-input width="906px" placeholder="请输入文章标题..." :onChange="saveTitle" :value="title" textBefore="标题"></k-input>
    <div style="height: 20px;"></div>
    <k-input width="906px" placeholder="请输入图片地址..." :onChange="saveImgUrl" :value="imgUrl" textBefore="图片"></k-input>
    <div style="height: 20px;"></div>
    <k-select :select="typeSelect" :selected="typeSelected" :selectChange="typeSelectValue" width="183px"></k-select>
    <!-- <k-select :select="tagSelect" :selected="tagSelected" :selectChange="tagSelectValue" width="183px"></k-select> -->
    <k-select
      type="mut"
      placeholder="请选择标签"
      :selectChange="tagSelectValue"
      :select="tagSelect" width="169px"></k-select>
    <k-select :select="daySelect" :selected="daySelected" :selectChange="daySelectValue" width="182px"></k-select>
    <k-select :select="weatherSelect" :selected="weatherSelected" :selectChange="weatherSelectValue" width="182px"></k-select>
    <div style="height: 20px;"></div>
    <textarea class="text-area" placeholder="请输入正文..." v-model="content"></textarea>
    <div style="height: 30px;"></div>
    <k-button type="info" size="large" width="477px" :callBack="viewArticle">预览</k-button>&nbsp;&nbsp;<k-button type="danger" size="large" width="477px" :callBack="publish">发布</k-button>
    <div style="height: 40px;"></div>
  </div><div v-else>
    <div style="height: 10px;"></div>
    <k-button type="info" size="large" width="120px" iconBefore="fa fa-close" :callBack="backPublish">退出预览</k-button>
    <div style="height: 20px;"></div>
    <hr>
    <div style="height: 40px;"></div>
    <div class="article-wrap">
      <div class="article-title" style="margin-top: 10px;">
        <div class="TitleIcon">
          <div class="TitleIcon-0"></div>
          <div class="TitleIcon-1"></div>
          <div class="TitleIcon-2"></div>
          <div class="TitleIcon-3"></div>
        </div>
        <a style="font-size: 18px; font-weight: bold; color: rgb(85, 85, 85);">{{title}}</a>
      </div>
      <div class="article-title">
        <i class="fa fa-clock-o"></i><span>2016-10-06 24:00:00</span>
        <i class="fa fa-heart"></i><span>2016</span>
        <i class="fa fa-comments"></i><span>2016</span>
        <i class="fa fa-user"></i><span>空如也</span>
      </div>
      <div class="article-imgview">
        <img :src="imgUrl"/>
      </div>
      <div ref="view" class="article-content"></div>
    </div>
    <div style="height: 40px;"></div>
  </div>
</template>
<script>
  import marked from 'marked';
  import hljs from 'highlight.js';
  import axios from 'axios';

  export default {
    data() {
      let article = localStorage.getItem('article');
      const localData = {};
      if (article) {
        article = JSON.parse(article);
        Object.keys(article).forEach((item) => {
          const value = typeof article[item] === 'object' ? JSON.parse(JSON.stringify(article[item])) : article[item];
          localData[item] = value;
        });
      }
      return {
        view: false,
        title: localData.title || '',
        typeSelected: localData.typeSelected || {text: '前端攻城', key: 'web'},
        typeSelect: [
           {text: '前端攻城', key: 'web'},
           {text: '污文弄墨', key: 'word'},
         ],
        tagSelect: [
         {text: 'Html', key: 'Html'},
         {text: 'Javascript', key: 'Javascript'},
         {text: 'Css', key: 'Css'},
         {text: 'React', key: 'React'},
         {text: 'Vue', key: 'Vue'},
         {text: 'Other', key: 'Other'}
       ],
        daySelected: localData.daySelected || {text: '周一', key: 'Monday'},
        daySelect: [
          {text: '周一', key: 'Monday'},
          {text: '周二', key: 'Tuesday'},
          {text: '周三', key: 'Wednesday'},
          {text: '周四', key: 'Thursday'},
          {text: '周五', key: 'Friday'},
          {text: '周六', key: 'Saturday'},
          {text: '周日', key: 'Sunday'}
        ],
        weatherSelected: localData.weatherSelected || {text: '晴', key: 'Sun'},
        weatherSelect: [
          {text: '晴', key: 'Sun'},
          {text: '阴', key: 'Yin'},
          {text: '雨', key: 'Rain'},
          {text: '雪', key: 'Snow'}
        ],
        imgUrl: localData.imgUrl || '',
        content: localData.content || '',
      }
    },
    watch: {
      content(newValue) {
        if (!newValue) return;
        this.savArticleAtLocal('content', newValue);
      }
    },
    methods: {
      publish() {
        const tagArr = [];
        this.$data.tagSelect.forEach((item) => {
          if (item.status) {
            tagArr.push(item.text);
          }
        });
        let article = {
          title: this.$data.title,
          imgUrl: this.$data.imgUrl,
          type: this.$data.typeSelected.key,
          tag: tagArr,
          dayInfo: this.$data.daySelected.text + ' ' + this.$data.weatherSelected.text,
          content: this.$data.content
        }
        let dataComplete = true;
        Object.keys(article).forEach((item) => {
          if (!article[item]) {
            dataComplete = false;
          }
        });
        //数据完整性
        if (!dataComplete) {
          this.$Kui.Notification.info({title:'提示', content: '请检查各项内容是否输入完整...', autoClose: true});
          return;
        };
        const p = document.createElement('p');
        p.innerHTML = marked(article.content.substring(0,500));
        article.intro = p.innerText.replace(/\s+/g,"");
        axios.post('/admin/article', article)
        .then(resp => {
          if (resp.status === 200) {
            this.$Kui.Notification.success({title:'成功', content: '发布文章成功...', autoClose: true});
            // localStorage.removeItem('article');
            // this.$data.content = '';
            // this.$data.title = '';
            // this.$data.imgUrl = '';
          }
        })
        .catch(err => {
          console.log(err);
        });
      },
      replaceAll(str, key, word) {
        const words = str.replace(/^\s+|\s+$/g, word);
        return words;
      },
      saveTitle(value) {
        const val = value.substring(2);
        this.savArticleAtLocal('title', val);
        this.$data.title = val;
      },
      saveImgUrl(value) {
        const val = value.substring(2);
        this.savArticleAtLocal('imgUrl', val);
        this.$data.imgUrl = val;
      },
      typeSelectValue(cur) {
        this.savArticleAtLocal('typeSelected', cur);
        this.$data.typeSelected = cur;
      },
      tagSelectValue(cur) {
        // this.savArticleAtLocal('tagSelect', cur);
      },
      daySelectValue(cur) {
        this.savArticleAtLocal('daySelected', cur);
        this.$data.daySelected = cur;
      },
      weatherSelectValue(cur) {
        this.savArticleAtLocal('weatherSelected', cur);
        this.$data.weatherSelected = cur;
      },
      backPublish() {
        this.$data.view = !this.$data.view;
      },
      savArticleAtLocal(path, newValue) {
        let article = localStorage.getItem('article');
        if (!article) {
          article = {};
        } else {
          article =  JSON.parse(article);
        }
        article[path] = newValue;
        localStorage.setItem('article', JSON.stringify(article));
      },
      viewArticle() {
        this.$data.view = !this.$data.view;
        marked.setOptions({
          highlight: function(code){
            return hljs.highlightAuto(code).value;
          }
        });
        const viewTimer = setInterval(() => {
          if (!this.$refs.view) return;
          clearInterval(viewTimer);
          this.$refs.view.innerHTML = marked(this.$data.content);
        }, 100)
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
  .div-title{
    color: #666;
  }
  .text-area{
    border: 1px solid #ccc;
    width: 963px;
    box-sizing: border-box;
    resize: none;
    outline: none;
    vertical-align: top;
    border-radius: 4px;
    padding: 5.5px 8px;
    min-height: 500px;
    line-height: 18px;
  }
  .article-wrap{
    position: relative;
    width: 960px;
    box-sizing: border-box;
    background: #f7f6f7;
    border-right: 2px solid rgb(48, 47, 47);
    padding: 30px 35px;
  }
  .article-title {
    position: relative;
    width: 100%;
    height: 38px;
    line-height: 38px;
    padding-left: 34px;
    color: #302f2f;
    font-size: 16px;
    cursor: pointer;
  }
  .article-title span {
    font-size: 14px;
    color: #6f6f6f;
    margin: 0 20px 0 5px;
    display: inline-block;
    height: 38px;
    vertical-align: top;
  }
  .article-imgview{
    width: 822px;
    margin: 10px 34px 0 34px;
    box-sizing: border-box;
  }
  .article-imgview img{
    width: inherit;
  }
  .article-content{
    padding: 20px 34px;
  }
  .TitleIcon{
    position: absolute;
    width: 18px;
    height: 18px;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: rotate(45deg);
    transition: all .5s;
  }
  .TitleIcon .TitleIcon-0 {
    position: absolute;
    left: 0;
    top: 0;
    width: 8px;
    height: 8px;
    background: #302f2f;
    transition: all .5s;
  }
  .TitleIcon .TitleIcon-1 {
    position: absolute;
    right: 0;
    top: 0;
    width: 8px;
    height: 8px;
    background: #302f2f;
    transition: all .5s;
  }
  .TitleIcon .TitleIcon-2 {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 8px;
    height: 8px;
    background: #302f2f;
    transition: all .5s;
  }
  .TitleIcon .TitleIcon-3 {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 8px;
    height: 8px;
    background: #302f2f;
    transition: all .5s;
  }
</style>

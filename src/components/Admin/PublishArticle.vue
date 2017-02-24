<template>
  <div>
    <h2>Publish Article</h2>
    <hr>
    <div style="height: 20px;"></div>
    <k-input width="960px" placeholder="请输入文章标题..."></k-input>
    <div style="height: 20px;"></div>
    <k-select :select="[
       {text: '前端攻城', key: 'web'},
       {text: '污文弄墨', key: 'word'},
     ]" width="263px"></k-select>
    <k-select :select="[
      {text: 'Andy', key: 'Andy'},
      {text: 'Kid', key: 'Kid'},
      {text: 'Fzx', key: 'Fzx'},
      {text: 'Pawn', key: 'Pawn'}
    ]" width="263px"></k-select>
    <k-select :select="[
      {text: 'Andy', key: 'Andy'},
      {text: 'Kid', key: 'Kid'},
      {text: 'Fzx', key: 'Fzx'},
      {text: 'Pawn', key: 'Pawn'}
    ]" width="263px"></k-select>
    <div style="height: 20px;"></div>
    <textarea class="text-area" placeholder="请输入正文..." v-model="markText"></textarea>
    <div style="height: 30px;"></div>
    <k-button type="info" size="large" width="477px">预览</k-button>&nbsp;&nbsp;<k-button type="danger" size="large" width="477px">发布</k-button>
    <div style="height: 40px;"></div>
    <div ref="code"></div>
  </div>
</template>
<script>
  import marked from 'marked';
  import hljs from 'highlight.js';
  export default {
    data() {
      return {
        markText: ''
      }
    },
    watch: {
      markText(newValue, oldValue) {
        marked.setOptions({
          highlight: function(code){
            return hljs.highlightAuto(code).value;
          }
        });
        this.$refs.code.innerHTML = marked(newValue);
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
    min-height: 600px;
    line-height: 18px;
  }
</style>

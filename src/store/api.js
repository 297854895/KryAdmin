import axios from 'axios';

export default {
  getArticleList: (params) =>  {return axios.get('/admin/article', {params})}
}

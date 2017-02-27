<template>
  <div class="k">
    <table>
      <thead>
        <tr>
          <th v-for="item of headData">{{item.text}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of tableData">
          <td v-for="idx in headData.length" v-if="!headData[idx-1].needCommponents">
            {{item[headData[idx-1].dataIndex]}}
          </td>
          <td v-else-if="headData[idx-1].needCommponents">
            <span v-for="com in item[headData[idx-1].dataIndex]" class="k-table-components-space">
              <k-button :data="{_id: item._id, title: item.title}" v-if="com.type === 'button'" :set="com.options || null">{{com.label}}</k-button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <k-page
      v-if="this.options.pagination"
      :pageSet="{
        current: this.options.pagination.current,
        total: this.options.pagination.total,
        callBack: this.options.pagination.callBack
        }"></k-page>
  </div>
</template>
<script>
  export default{
    props: {
      head: {
        type: Array,
        default: null
      },
      data: {
        type: Array,
        default: null
      },
      options: {
        type: Object,
        default: () => {
          return {
            size: 10,
            pagination: false
          }
        }
      }
    },
    data() {
      const tableData_ = this.handleTableData(this.data);
      return {
        headData: this.head,
        tableData: this.data
      }
    },
    methods: {
      handleTableData(data) {
        let tableData_ = data;
        if (!data) return [];
        const tableData_length = data.length;
        if (this.head) {
          for (const item of this.head) {
            if (item.needCommponents) {
              for (let num = 0; num < tableData_length; num ++) {
                tableData_[num][item.dataIndex] = item.components;
              }
            }
          }
        }
        return tableData_;
      }
    }
  }
</script>
<style scoped>
  /*table*/
  .k table {
    font-size: 14px;
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  .k th{
    text-align: left;
    padding: 10px 8px;
    color: #fff;
    min-width: 40px;
    background: #20a0ff;
  }
  .k td {
    text-align: left;
    overflow: auto;
    color: #888;
    padding: 8px 8px;
    border-bottom: 1px solid #ccc;
  }
  .k tr {
    transition: background-color .3s ease-in;
  }
  .k tr:hover {
    background: #DDF1FF;
  }
  .k-table-components-space{
    margin-right: 8px;
  }
</style>

<template>
  <div class="index">
    <div class="index-list">
      <el-popover
        width="200"
        trigger="hover"
        placement="right"
        v-for="item in typeList"
        :open-delay="500"
        :key="item.name"
      >
        <img style="width: 100%;" :src="item.img" />
        <div class="index-list-item" slot="reference">
          <h5 class="index-list-item-name">{{ item.label }}</h5>
          <h4 class="index-list-item-icon">+</h4>
        </div>
      </el-popover>
    </div>
    <div class="index-preview">
      <div class="line-chart chart" v-for="item in chartList" :key="item.id" :ref="item.name"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'index',
  data() {
    return {
      // 类型列表
      typeList: [
        {
          name: 'Line',
          label: '折线图',
          img: require('~/assets/images/line-simple.jpg'),
        },
        {
          name: 'Bar',
          label: '柱状图',
          img: require('~/assets/images/bar-simple.jpg'),
        },
        {
          name: 'Pie',
          label: '饼图',
          img: require('~/assets/images/pie-simple.jpg'),
        },
      ],
      // 图标列表
      chartList: [{ id: 1, name: '1', type: '' }],
      //
      chartInstance: null,
    }
  },
  mounted() {
    // this.createChart()
  },
  methods: {
    // 创建
    createChart() {
      this.chartInstance = echarts.init(this.$refs.lineChart)
      this.chartInstance.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
          },
        ],
      })
    },
  },
}
</script>
<style lang="scss">
@import '~/assets/styles/variables.scss';
.index {
  display: flex;
  height: 100vh;
  &-list {
    width: 200px;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
    &-item {
      width: 100%;
      height: 70px;
      text-align: center;
      border-radius: 4px;
      transition: $transition-primary;
      margin-bottom: 20px;
      position: relative;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: $background-color-deep;
      &:hover {
        background-color: $color-primary;
        .index-list-item-name {
          color: $color-white;
          margin-bottom: 4px;
        }
        .index-list-item-icon {
          opacity: 1;
        }
      }
      &-name {
        font-size: $font-size-small;
        transition: $transition-primary;
        margin-bottom: -16px;
      }
      &-icon {
        opacity: 0;
        color: $color-white;
        font-size: $font-size-large;
        transition: $transition-primary;
      }
    }
  }
  &-preview {
    width: calc(100% - 200px);
    background-position: 0px 0px, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(
        45deg,
        #eee 25%,
        transparent 25%,
        transparent 75%,
        #eee 75%,
        #eee 100%
      ),
      linear-gradient(
        45deg,
        #eee 25%,
        white 25%,
        white 75%,
        #eee 75%,
        #eee 100%
      );
  }
}
.chart {
  width: 300px;
  height: 300px;
}
</style>
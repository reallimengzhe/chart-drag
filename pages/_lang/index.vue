<template>
  <div class="index">
    <div class="index-list">
      <NuxtLink
        v-if="$i18n.locale === 'zh-CN'"
        :to="`/en-US` + $route.fullPath"
        class="Header__Link"
        active-class="none"
        exact
      >
        {{ $t('links.lang') }}
      </NuxtLink>
      <NuxtLink
        v-else
        :to="$route.fullPath.replace(/^\/[^\/]+/, '')"
        class="Header__Link"
        active-class="none"
        exact
      >
        {{ $t('links.lang') }}
      </NuxtLink>
      <el-popover
        width="200"
        trigger="hover"
        placement="right"
        v-for="item in typeList"
        :key="item.name"
      >
        <img style="width: 100%" :src="item.img" />
        <div
          class="index-list-item"
          slot="reference"
          @click="handleInsertChart(item)"
        >
          <h5 class="index-list-item-name">{{ item.label }}</h5>
          <h4 class="index-list-item-icon">+</h4>
        </div>
      </el-popover>
    </div>
    <div class="index-preview">
      <vue-draggable-resizable
        parent
        class="chart"
        v-for="item in chartList"
        :w="item.width"
        :h="item.height"
        :x="item.x"
        :y="item.y"
        :min-width="100"
        :min-height="100"
        :grid="[10, 10]"
        :key="item.id"
        @resizing="handleChartResize(item)"
      >
        <div class="chart-dom" :id="item.id"></div>
        <div class="chart-operation">
          <el-link
            icon="el-icon-edit"
            type="primary"
            :underline="false"
            @click="handleConfig(item)"
          ></el-link>
          <el-link
            icon="el-icon-delete"
            type="danger"
            :underline="false"
          ></el-link>
        </div>
      </vue-draggable-resizable>
    </div>
    <el-drawer title="配置" :visible.sync="configDialog" size="700px">
      <el-form size="mini" :model="currentChart" label-width="80px">
        <el-form-item label="图例:">
          <el-switch v-model="currentChart.legend.show"></el-switch>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="configDialog = false">取消</el-button>
        <el-button type="primary" @click="handleSaveConfig">确定</el-button>
      </footer>
    </el-drawer>
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
      // 默认宽高
      defaultWidth: 400,
      defaultHeight: 300,
      // 图表列表
      chartList: [],
      // 当前配置的图表
      currentChartID: 0,
      //
      currentChart: {
        label: '',
        legend: {
          show: false,
        },
      },
      //
      chartInstance: null,
      // 配置
      configDialog: false,
      // loading
      createLoading: false,
      // 位置
      position: 0,
    }
  },
  mounted() {},
  methods: {
    // 添加新图表
    handleInsertChart(item) {
      this.currentChartID++
      this.createLoading = true
      this.position += 50
      //
      let data = {
        x: this.position,
        y: this.position,
        id: item.name + this.currentChartID,
        type: item.name,
        width: this.defaultWidth,
        height: this.defaultHeight,
        instance: null,
        legend: {
          show: false,
        },
      }
      this.chartList.push(data)
      //
      this.$nextTick(() => {
        switch (item.name) {
          case 'Line':
            this.createLine(data)
            break
          case 'Bar':
            this.createBar(data)
            break
          case 'Pie':
            this.createPie(data)
            break
        }
        this.createLoading = false
      })
    },
    // 创建折线图
    createLine(data) {
      data.instance = echarts.init(document.getElementById(data.id))
      data.instance.setOption({
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
    // 创建柱状图
    createBar(data) {
      data.instance = echarts.init(document.getElementById(data.id))
      data.instance.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
          },
        ],
      })
    },
    // 创建饼图
    createPie(data) {
      data.instance = echarts.init(document.getElementById(data.id))
      data.instance.setOption({
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      })
    },
    // 调整尺寸
    handleChartResize(item) {
      console.log(item)
      item.instance.resize()
    },
    // 打开配置
    handleConfig(item) {
      console.log(item)
      this.currentChart = item
      this.configDialog = true
    },
    // 保存配置
    handleSaveConfig(item) {},
  },
}
</script>
<style lang="scss">
@import '~/assets/styles/variables.scss';
.index {
  display: flex;
  height: 100vh;
  overflow: hidden;
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
    height: 100%;
    overflow: hidden;
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
  &-dom {
    width: 100%;
    height: 100%;
    background-color: $background-color-shallow;
  }
  &-operation {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    // background-color: rgba($color: $color-white, $alpha: 0.2);
    // backdrop-filter: blur(10px) saturate(80%);
    backdrop-filter: saturate(180%);
    opacity: 0;
    transition: $transition-primary;
    &:hover {
      opacity: 1;
    }
    .el-link {
      font-size: $font-size-large;
    }
  }
}
</style>
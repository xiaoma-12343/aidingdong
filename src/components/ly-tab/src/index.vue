<template>
<div class="ly-tab div-component">
  <ly-tabbar
    v-model="selectedId"
    v-bind="options"
  >
    <ly-tab-item
      v-for="(item, index1) in items"
      :key="index1"
      @getWord="getWord(index1)"
      >
      <span
        v-if="options.fixBottom && item.icon"
        slot="icon">
        <i :class="item.icon"></i>
      </span>
      <span>{{ item[labelKey] }}</span>
    </ly-tab-item>
  </ly-tabbar>
</div>
</template>

<script>
import LyTabbar from './tabbar'
import LyTabItem from './tab-item'

export default {
  name: 'LyTab',
  components: {
    LyTabbar,
    LyTabItem
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      selectedId: this.value
    }
  },
  computed: {
    labelKey () {
      return this.options.labelKey || 'label'
    }
  },
  methods: {
    getWord(value){
      this.$emit('change', this.items[value], value, this.index);
    }
  },
  watch: {
    value (value) {
      this.selectedId = value
    },
    selectedId (value) {
      // this.$emit('input', value);
      // console.log('changechange', value)
      // console.log('this.items', this.items)
      this.$emit('change', this.items[value], value, this.index);
    }
  }
}
</script>

<style>

</style>

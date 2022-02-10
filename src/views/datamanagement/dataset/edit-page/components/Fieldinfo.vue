<template>
  <div class="field_main">
    <div class="field_head">
      <span>字段信息</span>
      <el-divider />
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="选择模式">
        <div>
          <el-form label-position="right" label-width="100px">
            <el-form-item label="id">
              <el-select v-model="FirstValue" placeholder="请选择">
                <el-option
                  v-for="item in FirstOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="doc">
              <el-select v-model="SecondValue" placeholder="请选择">
                <el-option
                  v-for="item in SecondOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="其他">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="pid" />
                <el-checkbox label="name" />
                <el-checkbox label="age" />
                <el-checkbox label="desc" />
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="代码模式">
        <div>
          <div>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              limit="10"
              show-word-limit
              :autosize="{ minRows: 8.5, maxRows: 20 }"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Fieldinfo',
  data() {
    return {
      FirstOption: [
        {
          value: 'test',
          label: 'test'
        }
      ],
      FirstValue: '',
      SecondOption: [
        {
          value: 'test',
          label: 'test'
        }
      ],
      SecondValue: '',
      checkList: [],

      active: true
    }
  },
  methods: {
    changeActive(active) {
      this.active = !active
    }
  }
}
</script>

<style scoped lang="scss">
.field_main {
  .field_head {
    font-weight: bold;
    color: black;
  }

}
</style>

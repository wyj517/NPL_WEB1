/**
 * 展开行
 */
export default {
  name: 'expand',
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Array,
      default: () => []
    },
    expandColumns: {
      type: Array,
      default: () => []
    }
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index
    }

    if (ctx.props.column) params.column = ctx.props.column
    if (ctx.props.expandColumns) params.expandColumns = ctx.props.expandColumns
    if (ctx.props.render) {
      return ctx.props.render(h, params)
    }
    return h(
      'el-form',
      {
        'label-position': 'left',
        inline: true
      },
      params.expandColumns.map(item => {
        console.log(params.row)
        return h(
          'div',
          { class: 'el-form-item' },
          [
            h('label', { class: 'el-form-item__label', style: 'color:#99a9bf;width: 90px;' }, item.label),
            h('span', { class: 'el-form-item__content' }, params.row[item.key])
          ]
        )
      })
    )
  }
}

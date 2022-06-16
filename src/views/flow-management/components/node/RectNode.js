import { RectResize,RectNodeModel } from '@logicflow/extension'
import { getShapeStyleFuction, getTextStyleFunction } from './getShapeStyleUtil'

// 矩形
class RectNewModel extends RectResize.model {

  setToBottom () {
    this.zIndex = 0
  }

  getNodeStyle () {
    const style = super.getNodeStyle()
    const properties = this.getProperties()
    style.stroke = "#606B85";
    return getShapeStyleFuction(style, properties)
  }

  getTextStyle () {
    const style = super.getTextStyle()
    const properties = this.getProperties()
    return getTextStyleFunction(style, properties)
  }
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 150;
    this.height = 40;
    this.text.editable = false;
    // this.isHovered = false;
    // this.isSelected = false;
  }
}

export default {
  type: 'pro-rect',
  view: RectResize.view,
  model: RectNewModel
}

import { Lightning, Router } from '@lightningjs/sdk'
import { CFruitList } from './FruitList'
import { CFruitDetail } from './FruitDetail'
import { emptyFruit, fruitsJSON } from './fruitsData'

interface FruitPageTemplateSpec extends Lightning.Component.TemplateSpec {
  FruitList: typeof CFruitList
  FruitDetail: typeof CFruitDetail
}

export class FruitPage
  extends Lightning.Component<FruitPageTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<FruitPageTemplateSpec>
{
  /**
   * Application wrapper for placing the created components
   */

  private readonly _FruitList = this.getByRef('FruitList')!
  private readonly _FruitDetail = this.getByRef('FruitDetail')!
  private focusIndex = 0

  static override _template(): Lightning.Component.Template<FruitPageTemplateSpec> {
    return {
      x: 0,
      y: 0,
      FruitDetail: {
        type: CFruitDetail,
        fruit: emptyFruit,
      },
      FruitList: {
        type: CFruitList,
        itemsLoaded: false,
        zIndex: 1,
        signals: {
          changedFocusIndex: '_changedFocusIndex',
        },
      },
    }
  }

  _changedFocusIndex(newIndex: number) {
    this.focusIndex = newIndex
    this._FruitDetail.fruit = fruitsJSON.fruits[this.focusIndex]!
  }

  override _init() {
    this._FruitList.itemsLoaded = true
    this._FruitList.items = fruitsJSON.fruits
    this._FruitDetail.fruit = fruitsJSON.fruits[0]!
  }

  override _getFocused() {
    return this._FruitList
  }

  override _handleBack() {
    Router.focusWidget('menu')
  }
}

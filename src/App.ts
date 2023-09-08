import { Lightning } from '@lightningjs/sdk'
import { CFruitList } from './components/FruitList'
import { CFruitDetail } from './components/FruitDetail'
import { emptyFruit, fruitsJSON } from './fruits'

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  FruitList: typeof CFruitList
  FruitDetail: typeof CFruitDetail
}

export interface ItemFromAPI {
  label: string
}

export class App
  extends Lightning.Component<AppTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  private readonly _FruitList = this.getByRef('FruitList')!
  private readonly _FruitDetail = this.getByRef('FruitDetail')!
  private focusIndex = 0

  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
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
}

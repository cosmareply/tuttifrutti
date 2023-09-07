import { Lightning } from '@lightningjs/sdk'
import { CFruitList } from './components/FruitList'

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  FruitList: typeof CFruitList
}

export interface ItemFromAPI {
  label: string
}

export class App
  extends Lightning.Component<AppTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  private readonly _FruitList = this.getByRef('FruitList')!

  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      x: 0,
      y: 0,
      FruitList: {
        type: CFruitList,
        itemsLoaded: false,
        signals: {
          changedFocusIndex: '_changedFocusIndex',
        },
      },
    }
  }

  _changedFocusIndex(newIndex: number) {
    console.log(newIndex)
  }

  override _init() {
    this._FruitList.itemsLoaded = true
    this._FruitList.items = Array.from([1, 2, 3, 4].map((i) => ({ label: i.toString() })))
  }

  override _getFocused() {
    return this._FruitList
  }
}

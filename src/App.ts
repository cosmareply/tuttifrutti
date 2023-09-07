import { Lightning, Utils } from '@lightningjs/sdk'

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  FruitList: typeof CFruitList
}

export class App
  extends Lightning.Component<AppTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  private readonly _FruitList = this.getByRef('FruitList')!

  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      x: 20,
      y: 20,
      FruitList: {
        type: CFruitList,
        itemsLoaded: false,
      },
    }
  }

  override _init() {
    this._FruitList.itemsLoaded = true
    this._FruitList.items = Array.from([1, 2, 3, 4].map((i) => ({ label: i.toString() })))
  }

  override _getFocused() {
    return this._FruitList
  }
}

interface ItemFromAPI {
  label: string
}

interface FruitListTemplateSpec extends Lightning.Component.TemplateSpec {
  itemsLoaded: boolean
  items: Array<ItemFromAPI>
}

class CFruitList
  extends Lightning.Component<FruitListTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<FruitListTemplateSpec>
{
  private _itemsLoaded = false
  private _items = Array<ItemFromAPI>()
  private _focusedIndex = 0

  static override _template(): Lightning.Component.Template<FruitListTemplateSpec> {
    return {
      x: 0,
      y: 0,
      w: 200,
      h: 200,
    }
  }

  set itemsLoaded(itemsLoaded: boolean) {
    this._itemsLoaded = itemsLoaded
  }

  get itemsLoaded(): boolean {
    return this._itemsLoaded
  }

  set items(items: Array<ItemFromAPI>) {
    this._items = items
    this.children = items.map((item, index) => {
      return {
        ref: 'FruitItem-' + index, //optional, for debug purposes
        type: FruitItemTemplate,
        x: index * 70, //item width + 20px margin
        item, //passing the item as an attribute
      }
    })
  }

  get items(): Array<ItemFromAPI> {
    return this._items
  }

  override _getFocused(): any {
    return this.children[this._focusedIndex]
  }

  override _handleLeft() {
    if (this._focusedIndex > 0) {
      this._focusedIndex--
    }
  }

  override _handleRight() {
    if (this._focusedIndex < this.children.length - 1) {
      this._focusedIndex++
    }
  }
}

export interface FruitItemTemplateSpec extends Lightning.Component.TemplateSpec {
  item: ItemFromAPI
  Label: {
    text: {
      text: string
    }
  }
}

class FruitItemTemplate
  extends Lightning.Component<FruitItemTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<FruitItemTemplateSpec>
{
  private readonly _Label = this.getByRef('Label')!
  private _item: ItemFromAPI = { label: '' }

  static override _template(): Lightning.Component.Template<FruitItemTemplateSpec> {
    return {
      rect: true,
      w: 50,
      h: 50,
      color: 0xffff00ff,
      alpha: 0.8,
      Label: {
        x: 25,
        y: 30,
        mount: 0.5,
      },
    }
  }

  get item(): ItemFromAPI {
    return this._item
  }

  set item(item: ItemFromAPI) {
    this._item = item
  }

  override _init() {
    this._Label.patch({ text: { text: this.item.label } })
  }
  override _focus() {
    this.patch({ smooth: { alpha: 1, scale: 1.2 } })
  }
  override _unfocus() {
    this.patch({ smooth: { alpha: 0.8, scale: 1 } })
  }
}

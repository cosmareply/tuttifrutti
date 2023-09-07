import { Lightning } from '@lightningjs/sdk'
import { ItemFromAPI } from '../App'

interface FruitListTemplateSpec extends Lightning.Component.TemplateSpec {
  itemsLoaded: boolean
  items: Array<ItemFromAPI>
}

interface FruitListSignalMap extends Lightning.Component.SignalMap {
  changedFocusIndex(newIndex: number): void
}

interface FruitListTypeConfig extends Lightning.Component.TypeConfig {
  SignalMapType: FruitListSignalMap
}

export class CFruitList
  extends Lightning.Component<FruitListTemplateSpec, FruitListTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<FruitListTemplateSpec>
{
  private _itemsLoaded = false
  private _items = Array<ItemFromAPI>()
  private _focusedIndex = 0

  static override _template(): Lightning.Component.Template<FruitListTemplateSpec> {
    return {
      x: 250,
      y: (window.innerHeight * 2) / 3,
      w: 0,
      h: 500,
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
        x: index * 320, //item width + 20px margin
        item, //passing the item as an attribute
      }
    })
    this.patch({ w: items.length * (300 + 20) })
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
      this.patch({ smooth: { x: this.x + 320 } })
      this.signal('changedFocusIndex', this._focusedIndex)
    }
  }

  override _handleRight() {
    if (this._focusedIndex < this.children.length - 1) {
      this._focusedIndex++
      this.patch({ smooth: { x: this.x - 320 } })
      this.signal('changedFocusIndex', this._focusedIndex)
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
      w: 300,
      h: 200,
      color: 0xffff00ff,
      alpha: 0.5,
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
    this.patch({ smooth: { alpha: 1, scale: 1.1 } })
  }
  override _unfocus() {
    this.patch({ smooth: { alpha: 0.5, scale: 1 } })
  }
}

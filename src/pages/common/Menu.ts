import { Lightning } from '@lightningjs/sdk'
import Router from '@lightningjs/sdk/src/Router'

export default class Menu extends Lightning.Component {
  /**
   * Menu component shown on pressing on Backspace in any page, it allows navigating
   * between the different routes
   */
  private _index = 0

  static override _template(): Lightning.Component.Template {
    return {
      rect: true,
      w: 500,
      h: 1920,
      color: 0xff3900a6,
      x: -500,
      transitions: {
        x: { duration: 0.3, timingFunction: 'cubic-bezier(0.17, 0.9, 0.32, 1.3)' },
        w: { duration: 0.3, timingFunction: 'cubic-bezier(0.17, 0.9, 0.32, 1.3)' },
      },
      Items: {
        y: 540,
        mountY: 0.5,
        flex: { direction: 'column' },
        Fruits: {
          x: 160,
          type: MenuItem,
          label: 'Fruits',
          pageId: 'fruits',
        },
        Photos: {
          x: 160,
          type: MenuItem,
          label: 'Photos',
          pageId: 'photos',
        },
      },
    }
  }

  override _focus() {
    this.patch({
      smooth: {
        x: -100,
      },
    })
  }

  override _unfocus() {
    this.patch({
      smooth: {
        x: -500,
      },
    })
  }

  override _handleUp() {
    if (this._index > 0) {
      this._index--
    }
  }

  override _handleDown() {
    if (this._index < this.tag('Items').children.length - 1) {
      this._index++
    }
  }

  override _handleRight() {
    Router.focusPage()
  }

  override _handleEnter() {
    Router.restoreFocus()
    Router.navigate(this.activeItem.pageId)
  }

  get activeItem() {
    return this.tag('Items').children[this._index]
  }

  override _getFocused() {
    return this.activeItem
  }
}

/* MENU ITEM */

interface MenuItemTemplateSpec extends Lightning.Component.TemplateSpec {
  label: string
  pageId: string
  Label: object
}

class MenuItem
  extends Lightning.Component<MenuItemTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<MenuItemTemplateSpec>
{
  private _pageId = ''
  private readonly _Label = this.getByRef('Label')!

  static override _template() {
    return {
      h: 100,
      alpha: 0.5,
      Label: {
        mountY: 0.5,
        y: 50,
        text: { fontSize: 64 },
      },
    }
  }

  set label(v: string) {
    this._Label.patch({ text: v })
  }

  set pageId(v: string) {
    this._pageId = v
  }

  get pageId() {
    return this._pageId
  }

  override _focus() {
    this.alpha = 1
  }

  override _unfocus() {
    this.alpha = 0.5
  }
}

import { Lightning } from '@lightningjs/sdk'
import { FruitData, emptyFruit } from '../fruits'

interface FruitDetailTemplateSpec extends Lightning.Component.TemplateSpec {
  fruit: FruitData
  UpperGradient: object
  Image: {
    Contain: object
  }
  Title: object
  Description: object
}

export class CFruitDetail
  extends Lightning.Component<FruitDetailTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<FruitDetailTemplateSpec>
{
  /**
   * This component shows the detailed information of a specified fruit in the
   * upper part of the screen.
   * It also applies a soft gradient on the background: upper color is the color
   * of the fruit, lower color is a soft grey for easy reading of the carousel.
   *
   * @param fruit - The detailed information on the fruit, UI refreshes on fruit set
   */

  private readonly _upperGradient = this.getByRef('UpperGradient')!
  private readonly _title = this.getByRef('Title')!
  private readonly _description = this.getByRef('Description')!
  private _fruit: FruitData = emptyFruit

  static override _template(): Lightning.Component.Template<FruitDetailTemplateSpec> {
    return {
      x: 0,
      y: 0,
      w: window.innerWidth,
      h: window.innerHeight,
      rect: true,
      colorTop: 0x00000000,
      colorBottom: 0xaa000000,
      UpperGradient: {
        rect: true,
        w: window.innerWidth,
        h: window.innerHeight,
        colorTop: 0x00000000,
        colorBottom: 0x00000000,
        zIndex: -11,
      },
      Image: {
        x: 100,
        y: 100,
        w: 600,
        h: 600,
        zIndex: -10,
        Contain: {
          x: (w) => w / 2,
          y: (h) => h / 2,
          mount: 0.5,
          texture: {
            resizeMode: { type: 'contain', w: 600, h: 600 },
            type: Lightning.textures.ImageTexture,
            src: '',
          },
        },
      },
      Title: {
        x: 800,
        y: 150,
        text: {
          text: '',
          fontSize: 80,
          fontStyle: 'bold',
          wordWrap: true,
          wordWrapWidth: 600,
          textColor: 0xffffffff,
          shadow: true,
          shadowOffsetX: 6,
          shadowOffsetY: 6,
          shadowBlur: 25,
          paddingRight: 30,
          paddingLeft: 30,
        },
      },
      Description: {
        x: 800,
        y: 280,
        text: {
          text: '',
          fontSize: 40,
          wordWrap: true,
          wordWrapWidth: 1000,
          textColor: 0xffffffff,
          shadow: true,
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowBlur: 25,
          paddingRight: 30,
          paddingLeft: 30,
        },
      },
    }
  }

  get fruit(): FruitData {
    return this._fruit
  }

  set fruit(fruit: FruitData) {
    this._fruit = fruit
    this._upperGradient.patch({
      smooth: {
        colorTop: this._fruit.color + 0x55000000,
      },
    })
    this.patch({ Image: { Contain: { texture: { src: this._fruit.imageUrl } } } })
    this._title.patch({ text: { text: this._fruit.name } })
    this._description.patch({ text: { text: this._fruit.description } })
  }
}

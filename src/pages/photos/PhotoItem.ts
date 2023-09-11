import { Lightning } from '@lightningjs/sdk'

interface PhotoItemTemplateSpec extends Lightning.Component.TemplateSpec {
  photoUrl: string
  photoId: string
  Image: object
  Label: object
}

export default class PhotoItem
  extends Lightning.Component<PhotoItemTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<PhotoItemTemplateSpec>
{
  private readonly _Image = this.getByRef('Image')!
  private readonly _Label = this.getByRef('Label')!
  private _photoUrl = ''
  private _photoId = ''

  // Dimensions of element for Grid alignment
  static get width() {
    return 400
  }

  static get height() {
    return 266
  }

  static override _template(): Lightning.Component.Template<PhotoItemTemplateSpec> {
    return {
      scale: 1,
      alpha: 0.5,
      Image: {
        w: 400,
        h: 266,
        texture: {
          resizeMode: {
            type: 'cover',
            w: 400,
            h: 266,
            clipY: 0,
          },
          type: Lightning.textures.ImageTexture,
          src: '',
        },
      },
      Label: {
        x: 20,
        y: 20,
        text: {
          text: '',
          textColor: 0xff000000,
        },
      },
    }
  }

  override _init() {
    this._photoUrl = this.photoUrl
    this._Image.patch({ texture: { src: this._photoUrl } })
  }

  set photoUrl(url: string) {
    this._photoUrl = url
    this._Image.patch({ texture: { src: this._photoUrl } })
  }

  get photoUrl(): string {
    return this._photoUrl
  }

  set photoId(id: string) {
    this._photoId = id
    this._Label.patch({ text: { text: this._photoId } })
  }

  get photoId(): string {
    return this._photoId
  }

  override _focus() {
    this.patch({ smooth: { alpha: 1, scale: 1.1 } })
  }
  override _unfocus() {
    this.patch({ smooth: { alpha: 0.5, scale: 1 } })
  }
}

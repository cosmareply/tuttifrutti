import { Lightning } from '@lightningjs/sdk'
import { Grid } from '@lightningjs/ui'
import PhotoItem from './PhotoItem'

interface PhotosPageTemplateSpec extends Lightning.Component.TemplateSpec {
  photos: Array<string>
  PhotosGrid: typeof Grid
}

export class PhotosPage
  extends Lightning.Component<PhotosPageTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<PhotosPageTemplateSpec>
{
  private _photos = Array<string>('')
  private readonly _PhotosGrid = this.getByRef('PhotosGrid')!

  static override _template(): Lightning.Component.Template<PhotosPageTemplateSpec> {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
      x: 100,
      y: 100,
      PhotosGrid: {
        w: window.innerWidth,
        h: window.innerHeight,
        type: Grid,
        columns: 4,
        spacing: 30,
      },
    }
  }

  set photos(photos: Array<string>) {
    this._photos = photos
  }

  get photos(): Array<string> {
    return this._photos
  }

  override _getFocused() {
    return this._PhotosGrid
  }

  override _onDataProvided() {
    if (this.photos != undefined) {
      this._PhotosGrid.reload(
        this.photos.map((photoUrl) => {
          return {
            type: PhotoItem,
            photoUrl: photoUrl,
          }
        }),
      )
    }
  }
}

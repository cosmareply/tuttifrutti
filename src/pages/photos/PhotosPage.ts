import { Lightning, Router } from '@lightningjs/sdk'
import { Grid } from '@lightningjs/ui'
import PhotoItem from './PhotoItem'
import { ResultPhoto } from '../../lib/requests'

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
      PhotosGrid: {
        w: window.innerWidth - 100,
        h: window.innerHeight - 200,
        x: 100,
        y: 100,
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
      const photos = this.photos as Array<ResultPhoto>
      this._PhotosGrid.reload(
        photos.map((photo) => {
          return {
            type: PhotoItem,
            photoUrl: photo.thumbnailUrl,
            photoId: photo.id,
          }
        }),
      )
    }
  }

  override _handleBack() {
    Router.focusWidget('menu')
  }
}

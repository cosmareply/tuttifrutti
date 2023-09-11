import { Lightning, Router } from '@lightningjs/sdk'
import { Grid } from '@lightningjs/ui'
import PhotoItem from './PhotoItem'
import { ResultPhoto } from '../../lib/requests'

interface PhotosPageTemplateSpec extends Lightning.Component.TemplateSpec {
  photos: Array<ResultPhoto>
  PhotosGrid: typeof Grid
  Title: object
}

interface IndexObject {
  index: number
  previousIndex: number
  dataLength: number
}

export class PhotosPage
  extends Lightning.Component<PhotosPageTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<PhotosPageTemplateSpec>
{
  /**
   * This is the page containing the grid of fetched user's photos.
   *
   * @param photos - array of ResultPhoto containing the photos
   */
  private _photos = Array<ResultPhoto>()
  private readonly _PhotosGrid = this.getByRef('PhotosGrid')!
  private readonly _Title = this.getByRef('Title')!

  static override _template(): Lightning.Component.Template<PhotosPageTemplateSpec> {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
      Title: {
        x: 100,
        y: 100,
        alpha: 1.0,
        text: {
          text: 'Photos',
          fontSize: 100,
          textColor: 0xff000000,
          fontStyle: 'bold',
        },
      },
      PhotosGrid: {
        w: window.innerWidth - 100,
        h: window.innerHeight - 400,
        x: 100,
        y: 300,
        type: Grid,
        columns: 4,
        spacing: 30,
        signals: {
          onIndexChanged: '_onIndexChanged',
        },
      },
    }
  }

  set photos(photos: Array<ResultPhoto>) {
    this._photos = photos
  }

  get photos(): Array<ResultPhoto> {
    return this._photos
  }

  /* Hide(show page title according to position in grid */
  _onIndexChanged(idx: IndexObject) {
    if (idx.index >= 8 && idx.previousIndex < 8) {
      // Over third row
      this._Title.patch({ smooth: { alpha: 0.0 } })
    } else if (idx.index < 4 && idx.previousIndex >= 4) {
      this._Title.patch({ smooth: { alpha: 1.0 } })
    }
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

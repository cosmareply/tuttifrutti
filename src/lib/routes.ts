import { Router } from '@lightningjs/sdk'
import NotFound from '../pages/common/NotFound'
import { FruitPage } from '../pages/fruits/FruitPage'
import { PhotosPage } from '../pages/photos/PhotosPage'
import { getPhotos } from './requests'

const routes: Router.Config = {
  root: 'fruits',

  routes: [
    {
      path: 'fruits',
      component: FruitPage,
      widgets: ['menu'],
    },
    {
      path: 'photos',
      component: PhotosPage,
      widgets: ['menu'],
      on: (page) => {
        return new Promise((resolve, reject) => {
          getPhotos()
            .then((result) => {
              page.photos = result
              resolve()
            })
            .catch((e) => reject(e))
        })
      },
    },
    {
      path: '*',
      component: NotFound,
    },
    /* {
          path: '!',
          component: Error,
        }, */
  ],
}

export default routes

import { request, gql } from 'graphql-request'

export interface ResultPhoto {
  id: string
  thumbnailUrl: string
}

interface Result {
  photos: {
    data: Array<ResultPhoto>
  }
}

export function getPhotos(): Promise<Array<ResultPhoto>> {
  return new Promise((resolve, reject) => {
    const options = {
      options: {
        paginate: {
          page: 1,
          limit: 20,
        },
      },
    }
    const document = gql`
      query ($options: PageQueryOptions) {
        photos(options: $options) {
          data {
            id
            thumbnailUrl
          }
          meta {
            totalCount
          }
        }
      }
    `

    request('https://graphqlzero.almansi.me/api', document, options)
      .then((result) => {
        if (
          typeof result != 'object' ||
          !result.photos ||
          typeof result.photos != 'object' ||
          !result.photos.data ||
          typeof result.photos.data != 'object'
        )
          reject()

        const parsedResult = result as Result
        resolve(parsedResult.photos.data)
      })
      .catch((e) => reject(e))
  })
}

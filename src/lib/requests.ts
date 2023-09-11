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
        const parsedResult = result as Result
        if (
          !parsedResult ||
          typeof parsedResult != 'object' ||
          !parsedResult.photos ||
          typeof parsedResult.photos != 'object' ||
          !parsedResult.photos.data ||
          typeof parsedResult.photos.data != 'object'
        )
          reject()

        resolve(parsedResult.photos.data)
      })
      .catch((e) => reject(e))
  })
}

import { request, gql } from 'graphql-request'

export function getPhotos(): Promise<Array<string>> {
  console.log('Ciao')
  return new Promise((resolve, reject) => {
    /*const document = gql`
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

    request('https://graphqlzero.almansi.me/api', document).then((result) => {
      console.log(result)
    })*/
    resolve(['static/images/banana.png', 'static/images/apple.png'])
  })
}

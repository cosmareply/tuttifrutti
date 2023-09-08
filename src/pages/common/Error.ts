import { Lightning, Router } from '@lightningjs/sdk'

export default class Error extends Lightning.Component {
  static override _template() {
    return {
      rect: true,
      w: 1920,
      h: 1080,
      color: 0xfff1465b,
      Header: {
        mount: 0.5,
        x: 960,
        y: 140,
        text: {
          text: 'Error',
          fontFace: 'Bold',
          fontSize: 128,
        },
      },
      Error: {
        mountX: 0.5,
        x: 960,
        y: 220,
        text: { text: '', fontFace: 'Regular', textAlign: 'center' },
      },
      Enter: {
        mountX: 0.5,
        x: 960,
        y: 980,
        text: { text: 'press [enter] to navigate to Home Page', fontFace: 'Regular' },
      },
    }
  }

  override _handleEnter() {
    Router.navigate('home')
  }

  override _focus() {
    console.log('focus error page')
  }

  override set params(args: { request: object }) {
    const { request } = args
    this.error = request
  }

  set error(obj: object) {
    if (!obj.page) {
      this.tag('Error').text = obj.error
    } else {
      const { page, error, hash, route } = obj
      const errorMessage = `error while loading page: ${page.constructor.name}
--
loaded via hash: ${hash}
resulted in route: ${route.path}
--
${error.toString()}`

      this.tag('Error').text = errorMessage
    }
  }
}

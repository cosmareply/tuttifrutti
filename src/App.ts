import { Router } from '@lightningjs/sdk'
import routes from './lib/routes'
import Menu from './pages/common/Menu'

export class App extends Router.App {
  /**
   * Application wrapper for the router
   */

  static override _template() {
    return {
      ...super._template(),
      Widgets: {
        Menu: {
          type: Menu,
        },
      },
    }
  }

  override _setup(): void {
    Router.startRouter(routes)
  }
}

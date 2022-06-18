import { RefreshScheme } from '~auth/runtime'

export default class CustomPassportScheme extends RefreshScheme {
  async login(endpoint, { reset = true } = {}) {
    if (this.options.clientSecret) {
      endpoint.data.client_secret = this.options.clientSecret;
    }

    return await super.login(endpoint, { reset });
  }
}

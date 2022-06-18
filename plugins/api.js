export default function ({ $axios, $config: { apiSecret, apiURL } }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })

  // Set baseURL to something different
  api.setBaseURL(`${apiURL}/api`)

  // Inject to context as $api
  inject('api', api)
}

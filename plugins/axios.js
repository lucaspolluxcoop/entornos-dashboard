export default function ({ $axios, $auth, error: nuxtError, redirect }) {

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      if ($auth.loggedIn) {
        $auth.logout()
      }
      redirect('/login')
    }

    if (code === 404) {
      redirect('/404')
    }

    if (error.response.status === 500) {
      redirect('/sorry')
    }

    if (error.response.status === 422) {
      return Promise.reject(error)
    }
    if (error.response.status === 405) {
      return Promise.reject(error)
    }
    if (error.response.status === 403) {
      return Promise.reject(error)
    }
    if (error.response.status === 400) {
      return Promise.reject(error)
    }
    nuxtError({
      statusCode: error.response.status,
      message: error.message,
    })

    return Promise.resolve(false)
  })
}

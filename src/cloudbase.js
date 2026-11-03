import cloudbase from '@cloudbase/js-sdk'

export const app = cloudbase.init({
  env: import.meta.env.VITE_CLOUDBASE_ENV_ID,
  region: 'ap-shanghai',
  accessKey: import.meta.env.VITE_PUBLISHABLE_KEY,
  auth: { detectSessionInUrl: true },
})

export const auth = app.auth
export const db = app.rdb()

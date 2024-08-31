export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined
      PORT?: string
      NODE_ENV?: string
      DATABASE_URL: string
      GEMINI_API_KEY: string
    }
  }
}

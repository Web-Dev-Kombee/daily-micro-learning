/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_API_URL: string;
  readonly MONGODB_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

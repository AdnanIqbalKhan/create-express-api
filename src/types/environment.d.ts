export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: "development" | "production"
            DB_STRING: string
        }
    }
}
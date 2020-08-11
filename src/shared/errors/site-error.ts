export  abstract class SiteError extends Error {
    abstract readonly status: number

    public sanitizeResponse(response: { [key: string]: any }) {
        return response;
    }

}
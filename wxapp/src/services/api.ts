import client from "./client"
import auth from "./auth";

export default {
    getSpeciesList(page) {
        const params = { page: page }
        return client.get("/species/", params)
    }
    auth(code) {
        const params = { code: code }
        return client.post("/auth", params)
    }
}
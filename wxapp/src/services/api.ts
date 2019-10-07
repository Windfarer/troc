import client from "./client"
import auth from "./auth";

export default {
    getSpeciesList(page, query) {
        const params = { page: page, query: query }
        console.log(params)
        return client.get("/species/", params)
    },
    getSpeciesDetail(id) {
        return client.get("/species/" + id + "/")
    },
    getRecordList(page) {
        const params = { page: page }
        return client.get("/species/", params)
    },
    createRecord(speciesId) {
        const data = { species: speciesId }
        return client.post("/record/", data)
    },
    auth(code) {
        const params = { code: code }
        return client.post("/auth/", params)
    }
}
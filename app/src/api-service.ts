import axios, { AxiosResponse } from "axios"
import { stringify } from "querystring"
import { Body, BodyApiResponse, LOCALSTORAGE_KEY } from "./types"





export class ApiService {
    private baseUrl = "https://api.le-systeme-solaire.net/rest.php"


    get = async<T extends unknown> (url: string, queryParams: Record<string, string>): Promise<AxiosResponse<T>> => {
        const urlWithParams = `${url}?${stringify(queryParams)}`
        console.log(`GET ${url}`)
        return axios.get(urlWithParams)
    }

    getOrCached = async (localStorageKey: LOCALSTORAGE_KEY, url: string, queryParams: Record<string, string>): Promise<Body[]> => {
        const localString = localStorage.getItem(localStorageKey)
        if (localString) {
            const localResults = JSON.parse(localString) as Body[]
            console.log(`using local copy of ${localStorageKey}`)
            return new Promise((resolve, reject) => {
                resolve(localResults)
            })
        } else {
            console.log(`Local copy not found. Fetching ${localStorageKey} from API`)
            const results = await this.get<BodyApiResponse>(url, queryParams)
            localStorage.setItem(localStorageKey, JSON.stringify(results.data.bodies))
            console.log(`Saved ${localStorageKey} to localStorage`)
            return new Promise<Body[]>((resolve, reject) => {
                resolve(results.data.bodies)
            })

        }

    }
    
    fetchPlanets = async (excludedAttributes: string[]): Promise<Body[]> =>{
        const url = `${this.baseUrl}/bodies`
        const queryParams = {
            filter: "isPlanet,eq,true",
            exclude: excludedAttributes.join(",")
        }
        return this.getOrCached(LOCALSTORAGE_KEY.API_PLANETS, url, queryParams)
    }

    fetchEnglishNames = async () => {
        const url = `${this.baseUrl}/bodies`
        const queryParams = {
            data: "id,englishName"
        }
        return this.getOrCached(LOCALSTORAGE_KEY.API_ENGLISH_NAMES, url, queryParams)
    }
}

const api = new ApiService()
export default api
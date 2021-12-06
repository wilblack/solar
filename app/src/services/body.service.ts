import api from "../api-service"
import { Body, CleanEnglishLexicon, LOCALSTORAGE_KEY, PlanetsDataframe } from "../types"
import { attrMap } from "./attribute-map"



type AttrType = "string" | "numeric" | "date" | "list" 

interface Attr {
    attribute: string // the attribute name in the web service and the input dictionary
    columnName: string // the corresponding column name in the dataframe after processing
    type: AttrType
    weight: number
}


export class BodyService {

    ALL_ATTRIBUTES =   ['id', 'name', 'englishName', 'isPlanet', 'moons', 'semimajorAxis', 
      'perihelion', 'aphelion', 'eccentricity', 'inclination', 'density', 
      'gravity', 'escape', 'meanRadius', 'equaRadius', 'polarRadius', 
      'flattening', 'dimension', 'sideralOrbit', 'sideralRotation', 
      'aroundPlanet', 'discoveredBy', 'discoveryDate', 'alternativeName', 
      'axialTilt', 'mass', 'vol', 'rel']
    

    getDataframe = async (): Promise<PlanetsDataframe> => {
        let df: Promise<PlanetsDataframe>
        const str = localStorage.getItem(LOCALSTORAGE_KEY.CLEANED_DF)
        if (!!str) {
            // TODO Add error handling if JSON fails parse
            const data = JSON.stringify(str)
            df = new Promise((resolve, reject) => resolve(df))
        } else {
            df = this.buildDataframe()
        }
        return df
    }

    buildExcludedAttributes = (): string[] => {
        const gameAttrs = attrMap.map(v => v.attribute)
        gameAttrs.concat(["id", "rel"])

        // Create a list of attrs to exlude by filter out game attrs from all attrs
        const excludedAttrs = this.ALL_ATTRIBUTES.filter(attr => gameAttrs.indexOf(attr) < 0)

        return excludedAttrs
    }

    buildDataframe = async(): Promise<PlanetsDataframe> => {
        const excludedAttributes = this.buildExcludedAttributes()
        const rawEnglishNames = api.fetchPlanets(excludedAttributes)
        
        const englishLexicon = await this.buildCleanEnglishLexicon()
        
        let df = await api.fetchPlanets(excludedAttributes)
        df = this.cleanMoons(df, englishLexicon)
        df = this.cleanAllFields(df)
        console.log(`Save ${LOCALSTORAGE_KEY.CLEANED_DF} to localStorage`)
        localStorage.setItem(LOCALSTORAGE_KEY.CLEANED_DF, JSON.stringify(df))
        return df
    }


    cleanAllFields = (df: Body[]): Body[] => {
        console.warn("NOT IMPLEMENTED")
        return df
    }

    cleanMoons = (df: Body[], englishLexicon: CleanEnglishLexicon[]): Body[] => {
        console.warn("NOT IMPLEMENTED")
        return df
    }

    buildCleanEnglishLexicon = async (): Promise<CleanEnglishLexicon[]> => {
        const rawNames = await api.fetchEnglishNames()
        const cleanedNames = rawNames.map(raw => { return { id: raw.id, name: this.cleanName(raw) } })
        return cleanedNames
    } 


    cleanName = (rawEnglishName: Body): string => {
        const re = /^(\(\d*\)|\d*)\s*/
        const str = (rawEnglishName.name ?? rawEnglishName.id)
        const cleanedName = str.replace(re, "")
        console.log(`Converted ${str} to ${cleanedName}`)
        return cleanedName
    }
    
}

const bodyService = new BodyService()
export default bodyService

export enum LOCALSTORAGE_KEY {
    API_PLANETS = "apiPlanets",
    API_ENGLISH_NAMES = "apiEnglishNames",
    CLEANED_DF = "cleanedDf"
}


export interface Body {
    alternativeName: string
    aphelion: number
    argPeriapsis: number
    aroundPlanet: {
        planet: string,
        rel: string
    }
    avgTemp: number
    axialTilt: number
    density: number
    dimension: string
    discoveredBy: string
    discoveryDate: string
    eccentricity: number
    englishName: string
    equaRadius: number
    escape: number
    flattening: number
    gravity: number
    id: string
    inclination: number
    isPlanet: false
    longAscNode: number
    mainAnomaly: number
    mass: { massValue: number, massExponent: number }
    meanRadius: number
    moons: any | null
    name?: string
    perihelion: number
    polarRadius: number
    rel: string
    semimajorAxis: number
    sideralOrbit: number
    sideralRotation: number
    vol: any | null
}

export interface BodyApiResponse {
    bodies: Body[]
}

export interface BodyOption {
    label: string
    value: number
}

export interface CleanEnglishLexicon {
    id: string
    name: string
}

export type PlanetsDataframe = Body[]


export interface PlanetFormData {
    englishName: string,
    moons: string[],
    perihelion: number,
    aphelion: number,
    mass: number,
    density: number,
    gravity: number,
    escape: number,
    meanRadius: number,
    discoveredBy: string[],
    discoveryDate: Date
    
}
import { SafeResourceUrl } from "@angular/platform-browser";

export interface LocationViewModel {
    id: number,
    title: string,
    name: string,
    city: string,
    area: number,
    soilType: string,
    altitude: string,
    cultivationMode: string,
    grade: string,
    lineDistance: string,
    orientation: string,
    plantationMethod: string,
    year: number,
    latitude: string,
    longitude: string
    safeUrl?: SafeResourceUrl,
    grapeVarietyEntityIds?: number[],
    grapeVarietyNames?: string
}

export interface WineFormViewModel {
    id?: number,
    name: string,
    year: number,
    description: string | null,
    locationEntityId: number | null,
    grapeVarietyEntityId: number | null,
    relativeDens: number | null,
    totalAlc: number | null,
    realAlc: number | null,
    totalExtract: number | null,
    totalAcid: number | null,
    volatileAcid: number | null,
    totalSDiox: number | null,
    freeSDiox: number | null,
    ph: number | null,
    totalSugar: number | null, 
    sugarFreeExtract: number | null,
    titratableAcid: number | null,
    picturePath: string | null,
    quantity: number | null,
    archivedFlag: boolean
} 
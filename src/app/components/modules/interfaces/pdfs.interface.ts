export interface PdfsInterface{
    title:string,
    dataInfo?:Format[]
}
interface Format{
    subtitule?: string
    table?: Tables[]
}
interface Tables{
    text:string,
    value:string
}
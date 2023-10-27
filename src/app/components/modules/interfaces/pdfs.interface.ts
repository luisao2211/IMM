export interface PdfsInterface{
    title:string,
    dataInfo?:Format[]
}
interface Format{
    subtitule?: string
    table?: Tables[]
    titleimg?:string
    img?:Img[]
}
interface Tables{
    text:string,
    value:string
}
interface Img{
    url:string
}
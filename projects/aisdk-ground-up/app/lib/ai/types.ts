import {
InferUITools,
UIDataTypes,
UIMessage
} from 'ai'
import type {  tools } from "./tools";

type chatTools = InferUITools<typeof tools>

export type chatMessage = UIMessage<never,UIDataTypes,chatTools>

export type searchJobresult = {
    company : string,
    title : string,
    location : string,
    salary : number
}

export type searchJobInput = {
    location : string,
    title : string,
}

export type serachResultObject = {
    structuredContent : {
            result : searchJobresult[]
    }

}
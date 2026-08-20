import {
InferUITools,
UIDataTypes,
UIMessage
} from 'ai'
import type {  tools } from "./tools";

type chatTools = InferUITools<typeof tools>

export type chatMessage = UIMessage<never,UIDataTypes,chatTools>
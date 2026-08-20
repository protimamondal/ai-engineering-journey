import {tool} from 'ai'
import z from 'zod'

const searchJob = tool({
 description : "search for job openings by title and location",
 inputSchema : z.object({
    title : z.string().describe("the job title to search for"),
    location : z.string().describe('the city to look in')
 }),
 execute : async ({title,location})=>{
    
    return [
        {company: "Acme Corp", title,location,salary_usd : 120000},
        {company: "Globex", title,location,salary_usd : 90000},
    ]
 }
})

export const tools = {
    searchJob,
}
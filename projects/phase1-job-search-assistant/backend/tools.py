from pydantic import BaseModel

class JobListing(BaseModel):
    company : str
    title : str
    location : str
    salary_usd : int | None
    url : str | None

tools = [
    {
        "type": "function",
        "function": {
            "name": "search_jobs",
            "description": "Search for job listings matching a title and location.",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {"type": "string", "description": "Job title to search for"},
                    "location": {"type": "string", "description": "City or 'remote'"},
                },
                "required": ["title", "location"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "estimate_salary",
            "description": "Estimate salary range for a role and years of experience.",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "years_exp": {"type": "integer"},
                },
                "required": ["title", "years_exp"],
            },
        },
    },
]

def search_jobs(title:str,location:str) -> list[JobListing]:
    # Stubbed results for now (real data comes later). The important thing is
    # the SHAPE matches the shared contract: a list of JobListing objects,
    # not a sentence. salary_usd/url are None when unknown.
    return [
        JobListing(company="XYZ Technologies", title=title, location=location, salary_usd=120000, url=None),
        JobListing(company="ABC Solutions", title=title, location=location, salary_usd=None, url=None),
        JobListing(company="Tech Innovations", title=title, location=location, salary_usd=180000, url=None),
    ]

def estimate_salary(title: str, years_exp : int) ->str:
    base = 10000 + years_exp * 50000
    return f"estimated salary for {title} with {years_exp} yrs of exp the estimated salary is between ${base} - ${base + 20000}"

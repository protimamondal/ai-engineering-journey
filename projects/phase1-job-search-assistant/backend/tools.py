tools = [
    {
        "type": "function",
        "function": {
            "name": "search_job",
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

def search_job(title:str,location:str) ->str:
    return f"Found three jobs for {title} in {location}"

def estimate_salary(title: str, years_exp : str) ->str:
    base = 10000 + years_exp * 50000
    return f"estimated salary for {title} with {years_exp} yrs of exp the estimated salary is between ${base} - ${base + 20000}"

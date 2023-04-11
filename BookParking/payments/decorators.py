import requests
from django.conf import settings


URL = settings.INSTAMOJO_URL
CLIENT_ID = settings.INSTAMOJO_CLIENT_ID
CLIENT_SECRET = settings.INSTAMOJO_CLIENT_SECRET


# Decorator : Generate Access Token 
def instamojo_access_token(func):

    def wrapper(*args, **kwargs):
        form_data = {
            "grant_type": "client_credentials",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET
        }
        response = requests.post(f"{URL}/oauth2/token/", data=form_data)
        print(response.json())

        if response.status_code == 200:
            access_token = response.json().get("access_token")
            print("-"*20, "Access Token", "-"*20)
            print(access_token)
            print("-"*20, "Access Token", "-"*20)

            return func(*args, access_token, **kwargs)

        return func(*args, "", **kwargs)
    
    return wrapper

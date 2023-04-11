import requests
from django.shortcuts import render, redirect
from django.views import View
from django.conf import settings
from payments.decorators import instamojo_access_token

# Create your views here.

URL = settings.INSTAMOJO_URL


class Payment:

    @classmethod
    @instamojo_access_token
    def request(self, data, access_token):
        
        name = data.get("user_name")
        amount = data.get("amount")
        email = data.get("email")
        phone = data.get("phone")
        redirect_url = data.get("redirect_url")

        if access_token:

            # Generate Payment Link
            form_data = {
                "purpose": "testing",
                "amount": amount,
                "buyer_name": name,
                "email": email,
                "phone": phone,
                "redirect_url": redirect_url, # f"http://localhost:8000/payments/redirect-response"
                "allow_repeated_payments": False,
            }
            
            headers = {
                "Authorization": f"Bearer {access_token}"
            }
            
            res = requests.post(f"{URL}/v2/payment_requests/", data=form_data, headers=headers)

            print("-"*20, "Payment Request", "-"*20)
            print(res.json())
            print("-"*20, "Payment Request", "-"*20)
            
            if res.status_code == 201:
                
                return True, res.json()
            
            return False, res.json()
                                
        return False, "Access Token has not generated"


    @classmethod
    @instamojo_access_token
    def get_detail(self, payment_id, access_token):

        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        
        if access_token: 
            res = requests.get(f"{URL}/v2/payments/{payment_id}/", headers=headers)

            if res.status_code == 200:
                
                return True, res.json()

            return False, res.json()

        return False, "Access Token has not generated"














class RedirectsResponse(View):
    
    @instamojo_access_token
    def get(self, request, access_token, *args, **kwargs):

        payment_id = request.GET.get("payment_id")
        payment_status = request.GET.get("payment_status")
        payment_request_id = request.GET.get("payment_request_id")
        
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        
        if access_token: 
            res = requests.get(f"{URL}/v2/payments/{payment_id}/", headers=headers)
            print(res.json())

            return render(request, "payments_redirect.html", context=res.json())

        return render(request, "payments_redirect.html", context={})
        



class PaymentDetail(View):
    
    def get(self, request, *args, **kwargs):
        return 



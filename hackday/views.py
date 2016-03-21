from django.shortcuts import render, render_to_response
from django.core.mail import send_mail

import re

# Create your views here.
def index(request):
    return render_to_response('hackday.html', {})

def showPage(request):
    return render_to_response('index.html', {})

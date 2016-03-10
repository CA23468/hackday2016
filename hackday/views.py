from django.shortcuts import render, render_to_response
from django.template.context_processors import csrf

import re

# Create your views here.
def index(request):
    context = {}
    context.update(csrf(request))
    return render_to_response('hackday.html', context)

def showPage(request):
    context = {};
    context.update(csrf(request))
    return render_to_response('index.html', context)

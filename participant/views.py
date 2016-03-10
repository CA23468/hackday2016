from django.shortcuts import render, render_to_response
from django.template.context_processors import csrf
from django.http import JsonResponse
from models import Participant, Team
from form import ParticipantForm

import re

# Create your views here.
def signup(request):
    result = {
        'success': False,
        'message': 'operation failed'
    }

    if request.method == 'POST':
        error_message = Participant.signup(request.POST)
        if error_message == None:
            result['success'] = True
            result['message'] = 'operation success'
            return JsonResponse(result, status = 200)
        else:
            result['message'] = error_message
            return JsonResponse(result, status = 422)
    else:
        result['message'] = 'method not support'
        return JsonResponse(result, status = 405)

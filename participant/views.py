# -*- coding: utf-8 -*-

from django.shortcuts import render, render_to_response
from django.template.context_processors import csrf
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponseRedirect
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


@csrf_protect
@ensure_csrf_cookie
def list(request):
    context = {
        'is_authenticated': False,
        'login_error': False,
        'mail_error': '',
    }
    context.update(csrf(request))

    if request.method == 'POST':
        try:
            mail = request.POST['mail']
            pwd = request.POST['pwd']
            user = authenticate(username = mail, password = pwd)
            if user is not None:
                context['is_authenticated'] = True
                login(request, user)
                # form提交后method为post，用redirect后method变为get
                return HttpResponseRedirect('/participant/list/')
            else:
                context['mail_error'] = mail
                context['login_error'] = True
        except:
            context['login_error'] = True
    else:
        user = request.user
        if user.is_authenticated():
            context['is_authenticated'] = True

    if context['is_authenticated']:
        context['participants'] = Participant.objects.all()
        return render_to_response('list.html', context)
    else:
        return render_to_response('login.html', context)

    # try:
    #     Participant.send()
    #     return JsonResponse({ 'Success': True }, status = 200)
    # except:
    #     return JsonResponse({ 'Success': False }, status = 422)

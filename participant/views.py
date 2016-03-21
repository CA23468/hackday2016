# -*- coding: utf-8 -*-

from django.shortcuts import render, render_to_response
from django.template.context_processors import csrf
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponseRedirect
from models import Participant, Team
from form import ParticipantForm

import re
import os
import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOG_PATH = '/var/log/hackday2016/'
LOG_FILE_NAME = 'log.txt'
LOG_FILE = os.path.join(BASE_DIR, LOG_FILE_NAME)

# Create your views here.
def log(data, error):
    if not os.path.exists(LOG_PATH):
        os.makedirs(LOG_PATH)

    f = open(LOG_FILE, 'a')
    f.write('\n\n')
    f.write(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S\n\n"))
    if data is not None:
        keys = [ 'name', 'tel', 'mail', 'department', 'grade', 'resume' ]
        for key in keys:
            value = (data.has_key(key) and data[key]) or ''
            f.write('%-20s %s\n' % (key, value))
    else:
        f.write('data is None\n')
    f.write('\n')
    f.write('%-20s %s\n\n' % ('error_message', error or 'None'))
    f.close()

def signup(request):
    result = {
        'success': False,
        'message': 'operation failed'
    }

    if request.method == 'POST':
        error_message, data = Participant.signup(request.POST)
        if error_message == None:
            result['success'] = True
            result['message'] = 'operation success'
            return JsonResponse(result, status = 200)
        else:
            log(data, error_message)
            result['message'] = error_message
            return JsonResponse(result, status = 422)
    else:
        log(None, 'method %s not support' % request.method)
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

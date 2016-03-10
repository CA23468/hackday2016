# -*- coding: utf-8 -*-

from django.shortcuts import render, render_to_response
from django.template.context_processors import csrf
from django.http import JsonResponse
from participant.models import Team


# Create your views here.
def index(request):
    context = {}
    context.update(csrf(request))
    return render_to_response('vote.html', context)

def init(request):
    result = {
        'success': True,
        'message': 'operations success',
        'data': []
    }

    teams = Team.objects.all()
    for team in teams:
        result['data'].append(team.getDetail())

    return JsonResponse(result, status = 200)

def update(request):
    result = {
        'success': True,
        'message': 'operations success',
        'data': [ team.votes for team in Team.objects.all() ]
    }
    return JsonResponse(result, status = 200)

def submit(request):
    teamId = int(request.POST['id'])
    try:
        team = Team.objects.get(id = teamId)
        team.votes += 1;
        team.save()
    except Team.DoesNotExist:
        result = {
            'success': False,
            'message': 'the team dose not exist',
        }
        return JsonResponse(result, status = 422)


    result = {
        'success': True,
        'message': 'operations success',
    }
    return JsonResponse(result, status = 200)

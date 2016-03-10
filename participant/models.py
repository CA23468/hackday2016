# -*- coding: utf-8 -*-

from django.db import models

import re

re_tel = re.compile('^(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$')
re_mail = re.compile('^[^\._-][\w\.-]+@([A-Za-z0-9]+\.)+[A-Za-z]+$')

# Create your models here.
class Participant(models.Model):
    name = models.CharField(u'姓名', max_length = 20)
    grade = models.CharField(u'年级', max_length = 5)
    department = models.CharField(u'专业', max_length = 40)
    tel = models.CharField(u'手机号', max_length = 11)
    mail = models.CharField(u'邮箱', max_length = 40)
    resume = models.TextField(u'简历')

    class Meta:
        verbose_name = u"报名选手类"
        verbose_name_plural = u"报名选手类"

    def __unicode__(self):
        return self.name

    @staticmethod
    def signup(raw_data):
        from form import ParticipantForm

        form = ParticipantForm(raw_data)
        if not form.is_valid():
            return 'argument error'

        data = form.cleaned_data
        if re_tel.match(data['tel']) == None:
            return 'tel invalid'
        if re_mail.match(data['mail']) == None:
            return 'mail invalid'

        try:
            participant = Participant.objects.get(name = data['name'], tel = data['tel'])
            return 'already sign up'
        except Participant.DoesNotExist:
            participant = Participant(name = data['name'], grade = data['grade'], department = data['department'],
                tel = data['tel'], mail = data['mail'], resume = data['resume'])
            participant.save()


class Team(models.Model):
    name = models.CharField(u'队名', max_length = 40)
    product = models.CharField(u'作品名称', max_length = 40)
    votes = models.IntegerField(u'票数', default = 0)

    class Meta:
        verbose_name = u"队伍类"
        verbose_name_plural = u"队伍类"

    def __unicode__(self):
        return self.name

    def getDetail(self):
        return {
            'id': self.id,
            'name': self.name,
            'product': self.product,
            'votes': self.votes
        }

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=40, verbose_name='\u961f\u540d')),
                ('product', models.CharField(max_length=40, verbose_name='\u4f5c\u54c1\u540d\u79f0')),
                ('votes', models.IntegerField(default=0, verbose_name='\u7968\u6570')),
            ],
            options={
                'verbose_name': '\u961f\u4f0d\u7c7b',
                'verbose_name_plural': '\u961f\u4f0d\u7c7b',
            },
        ),
    ]

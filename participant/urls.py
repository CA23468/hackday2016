from django.conf.urls import include, url

urlpatterns = [
    # Examples:
    # url(r'^$', 'hackday.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^signup/$', 'participant.views.signup'),
    # url(r'^list/$', 'participant.views.list'),
]

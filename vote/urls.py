from django.conf.urls import include, url

urlpatterns = [
    # Examples:
    # url(r'^$', 'hackday.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', 'vote.views.index'),
    url(r'^init/$', 'vote.views.init'),
    url(r'^update/$', 'vote.views.update'),
    url(r'^submit/$', 'vote.views.submit')
]

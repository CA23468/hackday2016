from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Examples:
    # url(r'^$', 'hackday.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'hackday.views.showPage'),
    url(r'^signup/', 'hackday.views.index'),
    url(r'^vote/', include('vote.urls')),
    url(r'^participant/', include('participant.urls')),
]

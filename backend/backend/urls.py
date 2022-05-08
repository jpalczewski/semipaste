# Django
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

# 3rd-Party
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie

# Project
from schema import schema_v1

# @TODO changeme
prefix = ""

# if settings.DEBUG:
#     prefix = "/api/"


urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        prefix + "graphql/v1/",
        csrf_exempt(jwt_cookie(GraphQLView.as_view(graphiql=True, schema=schema_v1))),
        name='Graphiql',
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

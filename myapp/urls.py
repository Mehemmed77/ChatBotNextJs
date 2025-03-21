from django.urls import path
from .views import register, login, get_current_user,logout_view

urlpatterns = [
    path('register/', register, name="register"),
    path('login/', login, name="login"),
    path('user/', get_current_user, name="get_current_user"),
    path('logout/', logout_view, name = "logout"),
]
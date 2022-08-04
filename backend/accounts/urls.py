from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='login'),
    path('register/',views.registerUser, name='register'),


    path('profile/', views.getUserProfile, name='user-profile'),
    path('profile/update/', views.updateUserProfile, name='user-update'),
]

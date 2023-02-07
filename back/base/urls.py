from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index ),
    # path('all', views.get_students ),
    # as_view() method is called on the view to create a view class instance
    path('student/',views.MyStudentView.as_view()),
    path('login/', views.MyTokenObtainPairView.as_view()),
]
"""
URL configuration for spendwiser project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views
from .views import CreateUserView, BudgetListCreate, GenerateRecommendationsView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('add_expense/', views.add_expense, name='add_expense'),
    path('get_expenses/', views.get_expenses, name='get_expenses'),
    path("api/user/register/",CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/expenses/", views.ExpenseListCreate.as_view(), name="expense-list"),
    path("api/expense/delete/<int:pk>/", views.ExpenseDelete.as_view(), name="delete-expense",),
    path("api/budgets/", views.BudgetListCreate.as_view(), name="budget-list"),
    path("api/budget/delete/<int:pk>/", views.BudgetDelete.as_view(), name="delete-budget",),
    path('api/generate-recommendation/', GenerateRecommendationsView.as_view(), name='generate-recommendation'),
]

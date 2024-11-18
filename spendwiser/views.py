from django.shortcuts import render
from .models import Expense
from django.http import JsonResponse
from datetime import date
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


def add_expense(request):
    description = "Grocery"
    amount = 60.50
    expense_date = date.today()

    expense = Expense(description= description, amount=amount, date=expense_date)
    expense.save()

    return JsonResponse ({"message":"Expense added successfully"})

def get_expenses(request):
    expenses = Expense.objects.all().values("description","amount","date")
    expenses_list = list(expenses)

    return JsonResponse(expenses_list, safe=False)

#Create User
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

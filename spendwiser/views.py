from django.shortcuts import render
from .models import Expense
from django.http import JsonResponse
from datetime import date

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
from django.urls import path
from spendwiser import views

urlpatterns = [
    path("expenses/", views.ExpenseListCreate.as_view(), name="expense-list"),
    path("expense/delete/", views.ExpenseDelete.as_view(), name="delete-expense",),
]
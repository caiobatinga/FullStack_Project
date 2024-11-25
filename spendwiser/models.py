from django.db import models
from django.contrib.auth.models import User

class Expense(models.Model):
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"{self.description} - ${self.amount} on {self.date}"
    
class Expenses(models.Model):
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_expenses")

    def __str__(self):
        return self.title
    
class Budget(models.Model):
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_budgets")

    def __str__(self):
        return self.title
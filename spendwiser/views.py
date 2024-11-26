from django.shortcuts import render
from .models import Expense
from django.http import JsonResponse
from datetime import date
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ExpenseSerializer, BudgetSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Expenses, Budget
import openai
from rest_framework.views import APIView
from rest_framework.response import Response


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


#Create Expense
class ExpenseListCreate(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expenses.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

#Delete Expense
class ExpenseDelete(generics.DestroyAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expenses.objects.filter(author=user)

#Create User
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


#Create Budget

class BudgetListCreate(generics.ListCreateAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Budget.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

#Delete Expense
class BudgetDelete(generics.DestroyAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Budget.objects.filter(author=user)
    

#OpenAI API
openai.api_key = "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"

class GenerateRecommendationsView(APIView):
    def post(self, request):
        budgets = request.data.get('budgets', [])
        expenses = request.data.get('expenses', [])

        # Prepare the prompt for OpenAI
        prompt = f"""
        You are a data visualization assistant. Generate Python code using Matplotlib and Seaborn to create charts based on the following data:
        Budgets: {budgets}
        Expenses: {expenses}
        
        Create the following charts:
        1. A bar chart showing each budget's title and amount.
        2. A pie chart showing the distribution of expenses across budgets.
        3. A line chart showing expenses over time.

        Make sure the code is complete and can be run directly.
        """

        try:
            # Call OpenAI API
            response = openai.Completion.create(
                engine="text-davinci-003",  # Use GPT-4 or the latest model
                prompt=prompt,
                max_tokens=500,
                temperature=0,
            )
            chart_code = response.choices[0].text.strip()
            return Response({"chart_code": chart_code})
        except Exception as e:
            return Response({"error": str(e)}, status=500)



    

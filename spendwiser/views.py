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
from rest_framework import status
import datetime


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

    
    #Singleton - Logger

class Logger:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(Logger, cls).__new__(cls)
            cls._instance.logs = []

        return cls._instance
    
    @staticmethod
    def get_instance():
        if Logger._instance is None:
            Logger()
        return Logger._instance
    
    def log(self, message):
        time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log = f"[{time}] {message}"
        self.logs.append(log)
        print(log)

#Create Expense
class ExpenseListCreate(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]
    logger = Logger.get_instance()
    

    def get_queryset(self):
        user = self.request.user
        return Expenses.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():

            validated_data = serializer.validated_data
            amount = validated_data.get('amount')
            title = validated_data.get('title')
            date = validated_data.get('date')
            budget = validated_data.get('budget') 
            
            serializer.save(author=self.request.user)
            

            self.logger.log(
                f"New expense created: Title - {title}, Amount - {amount}, "
                f"Date - {date}, Budget - {budget}, User - {self.request.user.username}"
            )
            
            
        else:
            print(serializer.errors)

#Delete Expense
class ExpenseDelete(generics.DestroyAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]
    logger = Logger.get_instance()

    def get_queryset(self):
        user = self.request.user
        return Expenses.objects.filter(author=user)
    
    def perform_destroy(self, instance):
        
        self.logger.log(f"Expense deleted: ID - {instance.id}")
        super().perform_destroy(instance)

#Create User
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    logger = Logger.get_instance()  

    def perform_create(self, serializer):
        user = serializer.save()
        self.logger.log(f"New user created: username={user.username}")


#Create Budget

class BudgetListCreate(generics.ListCreateAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]
    logger = Logger()

    def get_queryset(self):
        user = self.request.user
        return Budget.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            validated_data = serializer.validated_data
            amount = validated_data.get('amount')
            title = validated_data.get('title')
            date = validated_data.get('date')
            self.logger.log(
            f"New budget created: Title - {title}, Amount - {amount}, "
            f"Date - {date}, User - {self.request.user.username}"
            )
        else:
            self.logger.log(serializer.errors)

#Delete Budget
class BudgetDelete(generics.DestroyAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]
    logger = Logger.get_instance()

    def get_queryset(self):
        user = self.request.user
        return Budget.objects.filter(author=user)
    
    def perform_destroy(self, instance):
        
        self.logger.log(f"Budget deleted: ID - {instance.id}")
        super().perform_destroy(instance)
    

#OpenAI API
openai.api_key = "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"

class GenerateRecommendationsView(APIView):
    def post(self, request):
        budgets = request.data.get('budgets', [])
        expenses = request.data.get('expenses', [])
        logger = Logger.get_instance()


        try:
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo", 
                messages=[
                    {"role": "system", "content": "You are a financial advisor assistant. Analyze the following data and provide recommendations for optimizing the budget and reducing unnecessary expenses. "},
                    {"role": "user", "content": f"""Generate recommendations based on this data:         Budgets {budgets}   Expenses: {expenses}
                        Based on this information, suggest:
                        1. Areas where the user is overspending.
                        2. Opportunities to save money.
                        3. Adjustments to the budget allocation.
                        4. Potential ways to improve the user's financial health.
    """}
                ],
                max_tokens=300
            )
            reply = response.choices[0].message.content
            logger.log("Successfully generated recommendations.")

            return Response({"recommendation": reply}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.log(f"Error generating recommendation: {str(e)}")
            raise







    

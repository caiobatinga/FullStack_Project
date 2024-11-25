from django.contrib.auth.models import User
from rest_framework import serializers 
from .models import Expenses, Budget

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password": {"write_only":True}}

    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ExpenseSerializer(serializers.ModelSerializer):
    budget = serializers.PrimaryKeyRelatedField(queryset=Budget.objects.all(), required=True)
    class Meta:
        model = Expenses
        fields = ["id", "title", "amount", "date", "author", "budget"]
        extra_kwargs = {"author": {"read_only": True}}

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ["id", "title", "amount", "date", "author"]
        extra_kwargs = {"author": {"read_only": True}}
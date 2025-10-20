# 💰 SpendWiser

SpendWiser is a full-stack personal finance tracker built with Django and React.
It helps users manage their income, expenses, and budgets in one place — offering insightful summaries and reports that encourage smarter spending habits. The app integrates secure user authentication, dynamic dashboards, and a clean, responsive interface for an intuitive financial overview.

## 🛠️ Required Frameworks

```
asgiref==3.8.1
Django==4.2.16
psycopg2-binary==2.9.10
sqlparse==0.5.1
typing_extensions==4.12.2
whitenoise==6.8.2
django-cors-headers
djangorestframework
djangorestframework-simplejwt
PyJWT
pytz
python-dotenv
openai
```

# ⚙️Setting Up the Project

## Installation & Setup

### Backend (Django)
1. Create and activate a virtual environment:
   ```bash
   python -m venv project_env
   source project_env/bin/activate   # (on Windows: project_env\Scripts\activate)
This will allow you to interact with the project locally.

Install dependencies:

pip install -r requirements.txt


Run migrations and start the server:

python manage.py migrate
python manage.py runserver

### Frontend (React)

Navigate to the frontend folder:

cd frontend


Install dependencies and start the dev server:

npm install
npm run dev

# 🖼️ Demo & Screenshots

### Login
![Login Page](/frontend/src/assets/login.png)

### Dashboard
![Dashbaord](/frontend/src/assets/Dashboard.png)

# 🏗️ System Architecture

## 🖥️ Physical Viewpoint

The frontend is built with React and hosted on Azure Static Web Apps for fast and reliable delivery. Source code is managed on GitHub, with CI/CD workflows automating deployments on new commits. Data is stored in Azure PostgreSQL, ensuring secure and scalable data management.

![Physical Viewpoint](/frontend/src/assets/Physical.png)

## 🧰 Development Viewpoint

The backend is implemented using Django and follows a modular structure that separates data models, views, and APIs. The core data models maintain clear relational links to ensure consistency and scalability.

User: Represents an authenticated user, identified by a unique ID and secured with password-based authentication. Each user has access only to their own budgets and expense records through Django’s built-in authentication system.

Budget: Linked to the User model through a one-to-many relationship (ForeignKey). This allows each user to create and manage multiple budgets while maintaining clear ownership. Each budget instance stores information such as category, spending limit, and period.

Expense: Connected to the Budget model through a one-to-many relationship (ForeignKey). Every expense entry must be associated with a specific budget, ensuring that all transactions are properly categorized and aligned with the user’s financial structure.

![Development Viewpoint](/frontend/src/assets/Development.png)

## 🧩 Logical Viewpoint

The system enables users to efficiently create, view, and manage budgets and expenses, ensuring organized financial tracking and transparency.

Budget Creation:
Users can create personalized budgets by defining categories (e.g., Groceries, Rent, Entertainment) and setting spending limits for each. This structure helps users allocate and monitor their finances effectively.

Expense Management:
Users can record new expenses and associate each entry with an existing budget category. Expenses can be viewed in detailed or summarized form — filtered by category or date — and deleted when no longer needed.

![Development Viewpoint](/frontend/src/assets/Logical.png)

## 🔄 Scenario Viewpoint

The system enables users to manage their personal finances through intuitive, goal-driven interactions.

Primary Scenario:

The user logs into the application using secure authentication.

Once authenticated, the user can create budgets by defining categories (e.g., Groceries, Rent, Entertainment) and setting spending limits.

The user can then log expenses and associate each entry with an existing budget category.

The system automatically updates the remaining budget and provides summaries of spending by category or date.

The user can review, edit, or delete budgets and expenses at any time, maintaining full control over their financial data.

![Development Viewpoint](/frontend/src/assets/Scenario.png)

## 🚀 Features
- Secure user authentication (JWT-based)
- Create, update, and delete budgets and expenses
- Dynamic dashboard with real-time summaries
- Responsive design for desktop and mobile
- RESTful API built with Django REST Framework
- Deployed on Azure with CI/CD via GitHub Actions

## 🧠 Future Enhancements
- Add data visualization (charts and graphs)
- Enable recurring expenses and income tracking
- Integrate third-party APIs (e.g., Plaid for bank syncing)
- Add multi-currency support
- Implement dark mode for UI

## 🙌 Acknowledgements
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React](https://react.dev/)
- [Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/)

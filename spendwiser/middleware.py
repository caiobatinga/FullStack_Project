from .views import Logger

class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.logger = Logger()

    
    def __call__(self, request):
        self.logger.log(f"Incoming request: {request.method} {request.path}")

        response = self.get_response(request)

        self.logger.log(f"Responde status: {request.status_code} for {request.path}")

        return response
        
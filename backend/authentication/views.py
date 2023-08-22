import datetime, jwt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

from .serializers import CustomUserSerializer
from .models import CustomUser


class UserLoginView(APIView):
    def post(self, request):
        email    = request.data["email"]
        password = request.data["password"]
        
        user = CustomUser.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed("User not found!")
        if not user.check_password(password):
            raise AuthenticationFailed("Password is incorrect!")
        
        payload = {
            "id" : user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow()
        }
                
        token = jwt.encode(payload, 
                           "django-insecure-q*jygdox@4#y%$!y4e$a!9%$0p)h5!nqfl1*+pxa$alq+*ivd", 
                           algorithm="HS256").decode("utf-8")
        
        response = Response()
        response.set_cookie(key="jwt", value=token, httponly=True)
        response.data = {"detail": "successful", "token": token}
        
        return response

class UserRegisterView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            raise AuthenticationFailed("Unauthenticated user!")
        
        try:
            payload = jwt.decode(token,
                                "django-insecure-q*jygdox@4#y%$!y4e$a!9%$0p)h5!nqfl1*+pxa$alq+*ivd",
                                algorithms=["HS256"])
        except jwt.ExpiredSignatureError or jwt.InvalidTokenError or jwt.error:
            raise AuthenticationFailed("Unauthenticated user!")

        user        = CustomUser.objects.filter(id=payload["id"]).first()
        serializer  = CustomUserSerializer(user)
        response    = Response(serializer.data)
        response.data["detail"] = "successful"
            
        return response
    
class UserLogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {"detail": "successful"}
        return response
        
        
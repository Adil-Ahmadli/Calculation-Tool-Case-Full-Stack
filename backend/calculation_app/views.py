import  jwt

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.parsers import MultiPartParser, FormParser

from .models      import AppDataModel,      OutputPageModel
from .serializers import AppDataSerializer, OutputPageSerializer
        

class AppDataModelDetail(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def authenticate(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            raise AuthenticationFailed("Unauthenticated user!")
        
        try:
            payload = jwt.decode(token,
                                "django-insecure-q*jygdox@4#y%$!y4e$a!9%$0p)h5!nqfl1*+pxa$alq+*ivd",
                                algorithms=["HS256"])
        except jwt.ExpiredSignatureError or jwt.InvalidTokenError or jwt.error:
            raise AuthenticationFailed("Unauthenticated user!")
        
        return 0

    def get_object(self, pk):
        try:
            return AppDataModel.objects.get(pk=pk)
        except AppDataModel.DoesNotExist:
            raise Http404

    def post(self, request, format=None):
        self.authenticate(request)
        serializer = AppDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        snippets = AppDataModel.objects.all()
        print(snippets)
        serializer = AppDataSerializer(snippets, many=True, context={'request': request})
        response    = Response(serializer.data)
        print(serializer.data)
        response["detail"] = "successful"
        return response

    def put(self, request,  format=None):
        self.authenticate(request)
        snippet = self.get_object(0)
        serializer = AppDataSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        self.authenticate(request)
        snippets = AppDataModel.objects.all()
        snippets.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class OutputPageModelDetail(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def authenticate(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            raise AuthenticationFailed("Unauthenticated user!")
        
        try:
            payload = jwt.decode(token,
                                "django-insecure-q*jygdox@4#y%$!y4e$a!9%$0p)h5!nqfl1*+pxa$alq+*ivd",
                                algorithms=["HS256"])
        except jwt.ExpiredSignatureError or jwt.InvalidTokenError or jwt.error:
            raise AuthenticationFailed("Unauthenticated user!")
        
        return 0

    def get_object(self, pk):
        try:
            return OutputPageModel.objects.get(pk=pk)
        except OutputPageModel.DoesNotExist:
            raise Http404

    def post(self, request, format=None):
        self.authenticate(request)
        serializer = OutputPageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        snippets = OutputPageModel.objects.all()
        serializer = OutputPageSerializer(snippets, many=True, context={'request': request})
        response    = Response(serializer.data)
        response["detail"] = "successful"
        print(response["detail"])
        return response

    def put(self, request,  format=None):
        self.authenticate(request)
        snippet = self.get_object(0)
        serializer = OutputPageSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        self.authenticate(request)
        snippets = OutputPageModel.objects.all()
        snippets.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
from django.shortcuts import render
from .models import Student
# rest_framework is a package that used for creating RESTful web APIs
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes



# login - code : user = username + password => return token
# serializer class that is used to obtain a token pair for authentication(refresh, access )
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    # cls is like self, (self - instance-level attributes , cls - class-level attributes )
    def get_token(cls, user):
        # super method allows to call parent's class : TokenObtainPairSerializer and get his methods
        # pass to him argument - user and asiign it to token varible
        token = super().get_token(user)
        # Adding new keys to token distionary
        token['username'] = user.username
        token['eeeeemail'] = user.email
        token['waga'] = "baga"
        return token
 
# login code that create instance of the abouve class
# this occurs in url /login - by the definition in urls.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# serializer is a class that provides a way of converting complex data types, such as Django models, 
# into Python data types that can be easily rendered into JSON, XML or other content types.
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
    
    # def create(self, validated_data):
    #     return Task.objects.create(**validated_data)

@api_view(['GET'])
def index(req):
    return Response ( "hello")


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_students(request):
#     usr = request.user
#     my_model = usr.student_set.all()
#     serializer = StudentSerializer(my_model, many=True)
#     return Response(serializer.data)

@permission_classes([IsAuthenticated])
class MyStudentView(APIView):
    def get(self, request):
        # get the specific user and return his values
        usr = request.user
        # student_set - method in django - to get the specific values of the specific user
        my_model = usr.student_set.all()
        serializer = StudentSerializer(my_model, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # usr =request.user
        # print(usr)
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def put(self, request, pk):
        my_model = Student.objects.get(pk=pk)
        serializer = StudentSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def delete(self, request, pk):
        my_model = Student.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

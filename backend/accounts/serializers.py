from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = '__all__'
        
    def get_name(self, obj):
        name = obj.first_name + ' ' + obj.last_name
        if name == '':
            name = obj.email
        return name
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data.get('username'),
            email=validated_data['email'],
            first_name=validated_data['first_name'],            
        )
        user.set_password(validated_data.get('password'))
        user.save()
        return user

    def update(self, instance, validated_data):
        
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('email', instance.email)        
        instance.set_password(validated_data.get('password', instance.password))
        instance.save()
        return instance


class RegisterSerializerWithToken(UserSerializerWithToken):
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data.get('username'),
            email=validated_data['email'],
            first_name=validated_data['first_name'],            
        )
        user.set_password(validated_data.get('password'))
        user.save()
        return user
        
        

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    '''
    validate is for returning values when generating the token and refresh.
    This was taken from git repository of JWT simple
    '''
    
    def validate(self, attrs):
        data = super().validate(attrs)

        # data['username'] = self.user.username
        # data['email'] = self.user.email
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

    '''get_token is for returning values encrypted in the token'''
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     # Add custom claims
    #     token['username'] = user.username
    #     token['message'] = 'hello world'
    #     # ...

    #     return token
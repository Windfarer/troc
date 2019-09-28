from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class WxUserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['openid'] = user.openid
        token['unionid'] = user.unionid
        return token
    

from weixin import WXAPPAPI
from weixin.lib.wxcrypt import WXBizDataCrypt
from django.conf import settings

wx_api = WXAPPAPI(appid=settings.WEIXIN["APP_ID"],
                  app_secret=settings.WEIXIN["APP_SECRET"])


def get_session_info(code):
    session_info = wx_api.exchange_code_for_session_key(code=code)
    return session_info

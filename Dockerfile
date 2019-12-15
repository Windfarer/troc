FROM python:3.7

ENV TZ 'Asia/Shanghai'
ENV PYTHONUNBUFFERED '0'

WORKDIR /app

COPY requirements.txt requirements.txt

RUN set -ex && pip install -r requirements.txt -i https://mirrors.ustc.edu.cn/pypi/web/simple

COPY . /app

EXPOSE 5000

CMD ["sh","-c", "python manage.py collectstatic --noinput && \
     gunicorn -k gevent  \
     --max-requests 3000 \
     --access-logfile - \
     --error-logfile -  \
     -b 0.0.0.0:5000  \
     troc.wsgi:application"]
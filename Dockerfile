FROM python:3.7

ENV TZ 'Asia/Shanghai'
ENV PYTHONUNBUFFERED '0'

WORKDIR /app

RUN set -ex && pip install pipenv --upgrade -i https://mirrors.ustc.edu.cn/pypi/web/simple

COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock
RUN set -ex && pipenv install --deploy --system

COPY . /app

EXPOSE 5000

CMD ["gunicorn", "-k", "gevent", \
     "--max-requests", "3000", \
     "--access-logfile", "-", \
     "--error-logfile", "-", \
     "-b","0.0.0.0:5000", \
     "troc.wsgi:application"]
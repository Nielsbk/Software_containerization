# https://docs.docker.com/compose/gettingstarted/#step-2-create-a-dockerfile

FROM python:3.12-alpine

WORKDIR /app

ENV FLASK_APP=app.py

ENV FLASK_RUN_HOST=0.0.0.0

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

EXPOSE 5000

COPY . .

CMD ["waitress-serve", "--host","0.0.0.0","--port","5000", "app:app" ]

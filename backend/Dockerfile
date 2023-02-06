FROM python:3.9
RUN /usr/local/bin/python -m pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app /app
WORKDIR /app
CMD ["cherryd", "start", "-i", "app"]
EXPOSE 80

## Docker

Run containers with logs

```terminal
docker-compose up
```

Run containers without logs

```terminal
docker-compose up -d
```

Kill containers without logs

```terminal
docker-compose down -v
```

Build image

```terminal
docker build -t chat_app_back .
```

Windows Terminal

```terminal
docker run -v ${pwd}:/app:ro -v /app/node_modules  -p 4000:4000 -d --name chat-app-back chat_app_back
```

Mac Terminal

```terminal
docker run -v $(pwd):/app:ro -v /app/node_modules  -p 4000:4000 -d --name chat-app-back chat_app_back
```

See Runing containers

```terminal
docker ps
```

Kill container

```terminal
docker rm container_name -f
```

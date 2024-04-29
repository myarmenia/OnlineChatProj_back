## Docker

Run containers with logs

```Javascript
import pool from "./mysql.config.mjs";

export const createTable = async (name, columns) => {
  const query = `CREATE TABLE IF NOT EXISTS ${name} (${columns});`;
  pool.query(query, (err, result) => {
    if (err) throw err;
    console.log(`Table ${name} created successfully`);
  });
};
```

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

## Git

Pull changes

```terminal
git pull
```

Add changes

```terminal
git add .
```

Commit changes

```terminal
git commit -m "what changes have been done"
```

Push changes

```terminal
git push
```

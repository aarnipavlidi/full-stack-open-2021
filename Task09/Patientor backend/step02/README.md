## 9.9: Patientor backend, step2

1) Edit "Patientor frontend" project => "src/constants.ts" file and change the number based on your "backend" port.

```javascript

export const apiBaseUrl = 'http://localhost:YOUR_PORT_HERE/api';

```

2) Edit "Patientor backend" project => "index.ts" file and add following content. We have added "response.header(...)" content to fix "CORS" error and changed "/ping" into "/api/ping".

```javascript

app.get('/api/ping', (_req, response) => {
  response.header('Access-Control-Allow-Origin', '*');
  console.log('Someone just pinged to this url!')
  return response.send({ message: "I am working! :)"});
});

```

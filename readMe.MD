## Noppasivut-Front

### About Noppasivut

Noppasivut is a dice-roller and probability-calculator for a roleplaying system. It enables users to join same session in order to chat and share dicel rolls and probability calculations.

### Stuff used

Noppasivut-back uses React to run the front-end and socket.io to connect the back-end. React-bootstrap is used for the components.

### Build

With docker:

```
docker-compose up --build -d
```

With npm:

```
npm start
```

### Noppasivut back

Noppasivut-front works with Noppasivut-back:
https://github.com/ErkkoV/Noppasivut-server

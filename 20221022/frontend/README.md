# Frontend

```sh
npx create-react-app frontend
```

- `creat-react-app`을 통해 간단한 `React` 애플리케이션을 생성한다.

## nginx

```conf
server {
  listen 80;
  location / {
    root   /var/www;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
    root   /usr/share/nginx/html;
  }
}
```

- `nginx`는 단순 지시문과 블록 지문으로 나뉜다.
  - 단순 지시문은 공백으로 구분된 이름과 매개변수로 구분되며 세미콜론(;)으로 끝난다.
  - 블록 지시문은 단순 지시문과 구조가 동일하지만 세미콜론 대신 중괄호({})로 묶인 추가 명령 세트로 끝난다.
    - 블록 지시문의 중괄호 안에 다른 지시문을 포함할 수 있는 것을 컨텍스트(`Context`)라고 한다.
- `server`는 `nginx`가 만들어주는 가상 서버로 요청을 처리할 서버를 정의한다.
- `listen`은 가상 서버가 수신을 대기하는 포트 번호이다. 해당 포트로 들어오는 요청을 `server`에서 처리한다.
- `error_page`는 요청 후 결과가 지정한 `HTTP` 상태 코드와 일치할 경우 해당 `URL`로 이동한다.
  - 예를들어 `500`, `502`, `503`, `504`가 결과로 나타났을 때 `/50x.html`로 이동하며, `/50x.html`의 위치는 `/usr/share/nginx/html`이다.

## DockerFile

```dockerfile
FROM node:16-alpine as build
WORKDIR /tamastudy

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /tamastudy/build /var/www
COPY ./nginx /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
```

- `FROM` : node:16-alpine 레이어에서 이미지를 생성한다. 별칭으로 `build`를 지정한다.
  - `FROM nginx:alpine`를 통해 `nginx` 이미지를 생성한다.
- `COPY`에서 `--from`을 지정하여 이전에 빌드한 결과물을 사용할 수 있다.
  - 지정된 이름의 빌드 단계를 찾을 수 없는 경우 동일한 이름의 이미지를 대신 사용하려고 시도한다.

# backend

- See : [Express, Hello World!](https://expressjs.com/ko/starter/hello-world.html)

```sh
npm install express --save
```

## Dockerfile

- See : [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)

```dockerfile
FROM node:16-alpine
WORKDIR /tamastudy
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "index.j"]
```

- `FROM` : node:16-alpine 레이어에서 이미지를 생성한다.
- `WORKDIR` : `Docker` 파일의 `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, `ADD` 명령에 대한 작업 디렉터리를 설정한다. `WORKDIR`이 사용하지 않더라도 뒤따르는 `Dockerfile`의 지시에 의해 생성될 수 있다.
- `COPY` : `COPY <src>... <dest>` 형식으로 작성되며 `src`에서 새 파일 또는 디렉터리를 복사하여 `dest`에 있는 컨테이너의 파일 시스템에 추가한다.
  - `src`는 와일드카드를 포함할 수 있다.
  - 위의 파일을 보면 전체 파일을 `COPY` 하기전에 `package*.json`을 한 뒤, 의존성을 전부 설치한 후 다시 `COPY`한다. 따라서 `package.json`과 `package-lock.json`을 통해 의존성을 보장하고 이후 전체파일을 복사한다.
    - 참고로 `.dockerIgnore`에
- `EXPOSE` : `EXPOSE`는 컨테이너가 런타임에 지정된 네트워크 포트에서 수신하도록 한다. `TCP`, `UDP`를 지정할 수 있으며 지정하지 않은 경우 `TCP`로 지정된다
  - 이 때 지정되는 포트는 빌드하는 사용자와 컨테이너를 실행하는 사용자 간에 게시할 포트이다.
  ```dockerfile
  EXPOSE <port> [<port>/<protocol>...]
  ```
- `CMD` : 실행 중인 컨테이너에게 긴본값을 제공한다. 이러한 기본값은 실행 파일을 포함하거나 생략할 수 있으며 `ENTRYPOINT`를 지정해야 한다.
  - `DockerFile`에는 `CMD` 명령이 하나만 존재할 수 있다. 복수일 경우 마지막에 지정된 명령이 실행된다.
  - `CMD`를 사용하여 `ENTRYPOINT`로 인수를 전달하는 경우에는 `JSON`의 배열 형식으로 전해야 한다.
  ```dockerfile
  CMD ["executable","param1","param2"] // (exec form, this is the preferred form)
  CMD ["param1","param2"] // (as default parameters to ENTRYPOINT)
  CMD command param1 param2 // (shell form)
  ```

### 시작하기

```sh
docker build -t tamastudy/backend:0.1 .
```

- `-t`는 태그명이며 위와 같이 입력하면 이름과 태그를 지정해준다.

```sh
docker run -p 3000:3001 tamastudy/backend:0.1
```

- [http://localhost:3000/](http://localhost:3000/)에 접속하면 `Hello World!`를 확인할 수 있다.

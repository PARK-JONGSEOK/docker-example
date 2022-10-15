# DOCKER-EXAMPLE

## [PART 1 : Getting started](https://docs.docker.com/get-started/)

### Options

```sh
docker run -d -p 80:80 docker/getting-started
```

- `d` : 컨테이너를 백그라운드에서 실행한다.
- `p 80:80` : 호스트의 포트 `80`을 컨테이너의 포트 `80`에 매핑한다.
  - 단일 문자 플래그(`-d -p`)를 결합하여(`-dp`) 전체 명령을 단축할 수 있다.

```sh
docker build -t getting-started .
```

- `t` : 이미지에 태그를 지정한다.
  - 태그를 지정함으로써 사람이 읽을 수 있는 언어로 지정할 수 있다.

```sh
docker ps
```

- `docker ps`를 사용하여 실행중인 컨테이너 아이디를 얻을 수 있다.

```sh
Swap out <the-container-id> with the ID from docker ps
docker stop <the-container-id>
```

- `docker stop`을 사용하여 컨테이너를 중지시킬 수 있다.

```sh
docker rm <the-container-id>
```

- `docker rm`을 사용하여 컨테이너를 제거할 수 있다.
  `f` : `force` 플래그를 추가하여 컨테이너를 중지하고 제거할 수 있다.

## [PART 2 : Sample Application](https://docs.docker.com/get-started/02_our_app/)

- `Dockerfile`은 확장자가 없다.
- `build`를 하면 `Dockerfile`에 작성된것을 기준으로 필요한 이미지와 해당하는 레이어를 다운로드한다.

## [PART 3 : Update the application](https://docs.docker.com/get-started/03_updating_app/)

## [PART 4 : Share the application](https://docs.docker.com/get-started/04_sharing_app/)

```sh
docker push pjongsuk1/getting-started
```

- `Docker Hub`에 푸시한다.

```sh
docker image ls
```

- 가지고 있는 도커 이미지의 리스트를 보여준다.

```sh
docker login -u USERNAME\
```

- `docker`에 로그인한다.

```sh
 docker tag getting-started YOUR-USER-NAME/getting-started
```

- `docker tag` 명령을 사용하여 `getting-started`에 새 이름을 지정한다.

## [PART 5 : Persist the DB](https://docs.docker.com/get-started/05_persisting_data/)

- 컨테이너가 실행될 때 파일 시스템에 대해 다양한 이미지 계층을 사용한다. 또한 각 컨테이너에는 파일 생성/업데이트/제거를 위한 자체 스크래치 공간이 존재한다. 따라서 동일한 이미지를 사용하더라도 변경 사항은 다른 컨테이너에서 확인할 수 없다.
  - 하지만, 컨테이너가 제거되고 모든 변경사항이 해당 컨테이너에서 격리되면 손실된다.

### 볼륨

- 이렇게 손실되기 때문에 *볼륨*을 사용한다. 볼륨은 컨테이너의 특정 파일 시스템 경로를 호스트 시스템에 다시 연결하는 기능을 제공한다.
- 컨테이너의 디렉토리가 마운트되면 해당 디렉토리의 변경 사항은 호스트 시스템에서도 볼 수 있다. 또한 컨테이너가 다시 시작되는 동안 동일한 디렉터리를 마운트하면 동일한 파일이 표시된다.

```sh
docker volume create todo-db
```

- `volume create` 명령어를 사용하여 볼륨을 생성할 수 있다.
- `Docker`는 디스크의 물리적 위치를 유지하므로 볼륨 이름만 알고 있다면 지정할 수 있다.

```sh
docker run -dp 3000:3000 -v todo-db:/etc/todos getting-started
```

- `v`를 통해 볼륨을 지정할 수 있다.

## [PART 6 : Use bind mounts](https://docs.docker.com/get-started/06_bind_mounts/)

- `PART 5`에서 사용한 볼륨은 이름있는 볼륨이다.
  - 명명된 볼륨은 데이터가 저장되는 위치에 대해 걱정할 필요가 없기 때문에 단순히 데이터를 저장하려는 경우에 좋다.
- 바인드 마운트를 사용하면 어디에서 저장할지 정확한 마운트 지점을 정할 수 있다. 명명된 볼륨과 마찬가지로 데이터를 저장할 수 있다.
- 또한 컨테이너에 추가 데이터를 제공할 때 자주 사용되는데, 애플리케이션에서 작업할 때 바인드 마운트를 사용하여 소스 코드를 컨테이너에 마운트하여 코드 변경 사항을 확인할 수 있다.

```sh
docker run -dp 3000:3000 \
    -w /app -v "$(pwd):/app" \
    node:12-alpine \
    sh -c "yarn install && yarn run dev"
```

- `-d 3000:3000` : 백그라운드 모드로 호스트 `3000` 포트와 도커 `3000`포트를 연결시킨다.
- `-w /app` : 작업 디렉터리 또는 명령이 실행될 디렉터리를 설정한다.
- `-v "${pwd}:/app"` : 컨테이너의 최근 디렉터리를 `/app` 디렉터리로 바인드 마운트 한다.
- `node:12-alpine` : `Docker`에서 사용하는 이미지

```sh
docker logs -f <container-id>
```

- `docker logs`를 통해 로그를 확인할 수 있다.

## [PART 7 : Multi-container apps](https://docs.docker.com/get-started/07_multi_container/)

- 컨테이너는 한 가지 작업을 수행하고 집중해야 한다.
- 컨테이너는 격리되어 있기 때문에 같은 시스템의 다른 프로세스나 컨테이너에 대해 알 수 없다. 하지만 동일한 네트워크에서 동작하고 있다면 서로 통신할 수 있다.

```sh
docker network create todo-app
```

- `network`를 사용하여 네트워크를 생성한다.

```sh
docker run -d \
    --network todo-app --network-alias mysql \
    -v todo-mysql-data:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=secret \
    -e MYSQL_DATABASE=todos \
    mysql:5.7
```

- `network`를 통해 `MySQL`에 네트워크를 연결해준다.
  - `network-alias`를 통해 플래그를 지정할 수 있다.
- `v`를 통해 명명된 볼륨을 사용한다.
  - `docker volume create` 명령을 사용하지 않았음에도 위와 같이 입력하면 `Docker`에서 자동으로 볼륨을 만들어준다.
- `MySQL`에 필요한 환경변수를 설정한다.

```sh
docker run -it --network todo-app nicolaka/netshoot
dig mysql
```

- 네트워킹 문제를 해결하거나 디버깅하는데 좋은 라이브러리를 사용한다.
- `dig mysql`을 사용하여 내용을 확인한다.

```sh
...
;; ANSWER SECTION:
mysql.                  600     IN      A       172.18.0.2
```

- `--network-alias`로 작성한 `mysql`이라는 레코드가 표시되며 `IP`가 표시된다.

## [PART 8 : Use Docker Compose](https://docs.docker.com/get-started/08_using_compose/)

- `Docker Compose`를 사용하여 다중 컨테이너 애플리케이션을 정의할 수 있다.

```yml
version: "3.7"

services:
  app:
    image: node:12-alpine
    command: sh -c "yarn install && yarn run dev"
    ports:
      - 3000:3000
    working_dir: /app
    volumes:
      - ./:/app
    environment:
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: secret
      MYSQL_DB: todos

  mysql:
    image: mysql:5.7
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: todos

volumes:
  todo-mysql-data:
```

- `docker-compose.yml`을 위와 같이 작성하고 아래의 명령어를 사용하여 실행한다.

```sh
docker compose up -d
```

- 백그라운드에서 작성한 `docker-compose`를 실행한다.

```sh
docker compose logs -f
```

- 실행된 `docker-compose`의 로그를 확인할 수 있다.

```sh
docker compose logs -f app
```

- 특정 서비스에 대한 로그는 서비스의 이름을 넣어 확인할 수 있다.

```sh
docker compose down
```

- 전체 앱에 대해 컨테이너를 중지시키고 네트워크를 중지시킨다.
  - 다만 `volume`은 그대로 존재한다. `volume`을 삭제하고 싶다면 `--volume`을 통해 삭제해야 한다.

## [PART 9 : Image-building best practices](https://docs.docker.com/get-started/09_image_best/)

## [PART 10 : What next?](https://docs.docker.com/get-started/11_what_next/)

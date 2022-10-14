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

## [PART 6 : Ues bind mounts](https://docs.docker.com/get-started/06_bind_mounts/)

## [PART 7 : Multi-container apps](https://docs.docker.com/get-started/07_multi_container/)

## [PART 8 : Use Docker Compose](https://docs.docker.com/get-started/08_using_compose/)

## [PART 9 : Image-building best practices](https://docs.docker.com/get-started/09_image_best/)

## [PART 10 : What next?](https://docs.docker.com/get-started/11_what_next/)

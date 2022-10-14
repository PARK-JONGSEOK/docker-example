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

## [PART 6 : Ues bind mounts](https://docs.docker.com/get-started/06_bind_mounts/)

## [PART 7 : Multi-container apps](https://docs.docker.com/get-started/07_multi_container/)

## [PART 8 : Use Docker Compose](https://docs.docker.com/get-started/08_using_compose/)

## [PART 9 : Image-building best practices](https://docs.docker.com/get-started/09_image_best/)

## [PART 10 : What next?](https://docs.docker.com/get-started/11_what_next/)

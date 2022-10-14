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

## [PART 2 : Sample Application](https://docs.docker.com/get-started/02_our_app/)

- `Dockerfile`은 확장자가 없다.
- `build`를 하면 `Dockerfile`에 작성된것을 기준으로 필요한 이미지와 해당하는 레이어를 다운로드한다.

FROM alfg/ffmpeg:latest as ffmpeg
FROM ejnshtein/node-tdlib:14-1.6.0-alpine-3.12.0-1.0

WORKDIR /usr/src/app/

ADD . .

# set tdlib
RUN cp /usr/local/lib/libtdjson.so ./libtdjson.so

# set ffmpeg deps
RUN apk add --update \
  ca-certificates \
  openssl \
  pcre \
  lame \
  libogg \
  libass \
  libvpx \
  libvorbis \
  libwebp \
  libtheora \
  opus \
  rtmpdump \
  x264-dev \
  x265-dev

ENV PATH=/opt/ffmpeg/bin:$PATH

RUN yarn install --network-timeout 100000

RUN yarn build

#CMD [ "yarn", "start" ]
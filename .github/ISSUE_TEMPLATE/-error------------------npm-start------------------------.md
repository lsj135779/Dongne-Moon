---
name: "[Error][예시] (예시)배포 과정에서 npm start로 지정한 포트로 서버가 시작되지 않는 경우"
about: Error
title: ''
labels: ''
assignees: ''

---

> > 해결된 에러라면 라벨에 'Complete' 를 달아주세요.
> > 미해결된 에러라면 라벨을 'In progress' 로 변경해주세요.
> 
> ### 어떤 에러인가요?
> * `npm start` 에러 / 포트를 쓰고 있다고 할 때
> 
> ### 에러 메시지
> ```shell
> $ listen EADDRINUSE: address already in use :::4000
> ```
> 
> ### 에러 핸들링 방법
> * $ lsof -i TCP:서버번호 한 후, kill -9 PID번호 후, `npm start`
> 
> ```js
> // 코드가 들어가도 좋아요!
> ```
> 
> ### 에러 핸들링을 위해 참고한 레퍼런스 링크
> [링크](https://jootc.com/p/201912253249)

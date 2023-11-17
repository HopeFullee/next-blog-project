## Next.js 13 SSR + CSR 연습용 게시판

### 실행법

```
npm run dev
or
yarn dev
```

## 전체 기능 Summary

- **인가/인증**

  - 회원가입, 로그인
  - Acess Token, Refresh Token 발급
  - session 관리
  - 인증/인가 여부에 따라 API 통신 및 특정 페이지 라우팅

- **회원정보 수정**

  - 회원의 unique key "id"를 제외한 정보만 변경

- **게시판 기능**

  - 게시글 작성, 수정, 삭제
  - 댓글 작성, 수정, 삭제

## Frontend 기능 상세 설명

- **제어 컴포넌트 Controlled Form**

  - state 관리로 실시간 정규식 경고 표시/해지.
  - 정규식 경고가 있을 시 Submit 차단 (불필요한 API 통신 차단)
  - submit 스팸 클릭 방지를 위해 api 통신 시 submit 버튼 비활성
    - 통신 에러로 res.status !== 200 이면 재전송을 위해 submit 버튼 재활성

- **인증/인가**

  - 로그인 된 회원만 특정 UI 및 페이지 랜더
    - 비회원 유저가 회원 전용 URL 진입 시 로그인 페이지로 리다이렉트함
  - credentials 회원가입 및 로그인
    - 회원가입 <span style="color:#ADD8E6">{ email, nickName, password, rePassword }</span> Form 항목에 중복 및 형식 (정규식) 검사하고
      자체 DB에 저장하여 회원가입
    - 커스텀 로그인 페이지의 로그인 Form에 기입한 정보를 next-auth 에서 지원하는 signIn 함수에 전달하여
      next-auth API에 보냄
      - backend 정규식 검사 포함하여 frontend로 에러 반환하여 유저에게 알림 <span style="color: coral">(\*이메일 또는 비밀번호가 틀렸습니다.)</span>
  - next-auth backend에서 생성된 session <span style="color:#ADD8E6">{ id, token, nickname ...etc }</span>으로 사이트내 각종 UI 랜더,
    페이지 라우팅, API 통신에 사용됨
  - 인증/인가 필요한 API 를 위해 헤더에 accessToken 기입

- **회원정보 수정**

  - 닉네임 변경 시 next-auth의 session 정보를 update 해줌
    - 최초 로그인 시에만 session이 새로 생성됨으로 session에서 사용하던 user profile 정보가 변경 시 수동적으로 session을
      <span style="color: coral">update</span> 해줘야함.

- **게시판 기능**

  - next.js dynamic routing
    - 게시글의 unique key "id"로 URL 파라미터에 적용 (게시글 수정 페이지도 동일)
    - 적용된 id 파라미터로 게시글 상세 내용 API로 불러옴
    - SSR 이점으로 서치 엔진 적용 및 URL로 게시글 공유시 유용함
  - 본인이 작성한 게시글, 댓글만 수정, 삭제 UI 랜더
    - 작성자의 id를 게시글 및 댓글의 ownerId 에 저장
    - session을 통해 현제 로그인된 회원의 id와 게시글, 댓글의 ownerId 대조
    - 게시글 수정 페이지의 랜더 여부 또한 위 설명과 동일.
      - URL 변조로 타회원의 작성글로 수정 페이지 접근 시 목록 페이지로 리다이렉트 시킴.

## Backend 기능 상세 설명

- **인가/인증**

  - next-auth 라이브러리 환경에서 작성 <span style="color:#ADD8E6">src/pages/api/auth</span>
  - credentials 회원가입 및 로그인
    - credentials 회원가입 페이지에 기입한 Form 정보로 DB에 저장하여 회원가입
    - 커스텀 로그인 페이지에 기입한 로그인 Form 정보를 next-auth 에서 지원하는 signIn 함수에 전달 하여 로그인
      <span style="color:#ADD8E6">Credentials Provider</span>
  - oAuth 회원가입 및 로그인
    - 최초 oAuth 로그인 시 provider가 반환하는 유저정보내 <span style="color:#ADD8E6">{ email, name, id }</span>
      를 자체 DB에 저장하여 회원가입.
      - 자체 DB에 회원 정보를 등록해야 추후 유저 profile 정보를 변경 가능 (ex. 닉네임 etc...)
    - oAuth 로그인 시 provider가 반환한 { id } 와 동일한 id 가 회원목록 DB에 존제하는지 검사
      - 이미 등록된 회원이라면 -> 로그인
      - 등록되지 않은 회원이라면 상단 최초 oAuth 로그인 로직으로 -> 회원가입
  - Access Token 및 Refresh Token
    - oAuth 로그인 시 provider의 token, refresh token 발급
      - token 만료 시 provider의 end point에 token 재발급 요청
    - credentials 로그인은 토큰관련 backend 기술 부재로 기능 테스트용도를 위해 <span style="color: coral">DUMMY TOKEN</span> 발급
  - session 관리
    - 로그인한 회원정보 <span style="color:#ADD8E6">{ id, token, nickname ...etc }</span>를 next-auth 에서 제공하는 session (cookie)에 담아 생성

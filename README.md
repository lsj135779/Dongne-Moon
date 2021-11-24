# USER

{% swagger method="post" path="/user/email" baseUrl="" summary="이메일 중복확인" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="email" type="string" required="true" %}
가입할 이메일
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="이메일이 중복되지 않음" %}
```javascript
{
    "message":"ok"
}
```
{% endswagger-response %}

{% swagger-response status="409: Conflict" description="이메일이 중복됨" %}
```javascript
{
    "message":"email exists"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/user/withdrawal" baseUrl="" summary="회원탈퇴하기" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="accesstoken" type="string" required="true" %}
엑세스 토큰
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="회원탈퇴 성공" %}
```javascript
{
    "message":"ok"
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="회원탈퇴 실패" %}
```javascript
{
    "message":"invalid token"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/user/signout" baseUrl="" summary="로그아웃하기" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="accesstoken" type="string" required="true" %}
엑세스 토큰
{% endswagger-parameter %}

{% swagger-response status="205: Reset Content" description="로그아웃 성공" %}
```javascript
{
    "message":"Logged out successfully"
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="토큰이 없거나 유효하지 않은 경우" %}
```javascript
{
    "message":"invalid token"
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="로그아웃 실패" %}
```javascript
{
    "message":"server error"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/user/img" baseUrl="" summary="유저 이미지 수정하기" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" type="integer" required="true" name="id" %}
유저 아이디
{% endswagger-parameter %}

{% swagger-parameter in="body" name="img" required="true" type="string" %}
유저 이미지
{% endswagger-parameter %}

{% swagger-parameter in="header" name="accesstoken" required="true" type="string" %}
엑세스 토큰
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="이미지 수정 성공" %}
```javascript
{ 
    "img":"/uploads/image.png"
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="이미지 수정 실패" %}
```javascript
{
    "message":"fail"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/user/nickname" baseUrl="" summary="유저 닉네임 수정하기" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" type="integer" required="true" name="id" %}
유저 아이디
{% endswagger-parameter %}

{% swagger-parameter in="body" name="nickname" required="true" type="string" %}
유저 닉네임
{% endswagger-parameter %}

{% swagger-parameter in="header" name="accesstoken" required="true" type="string" %}
엑세스 토큰
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="닉네임 수정 성공" %}
```javascript
{
    "nickname":"김코딩"
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="닉네임 수정 실패" %}
```javascript
{
    "message":"fail"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/user/intro" baseUrl="" summary="유저 자기소개 수정하기" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" required="true" type="integer" name="id" %}
유저 아이디
{% endswagger-parameter %}

{% swagger-parameter in="body" name="intro" required="true" type="string" %}
유저 자기소개
{% endswagger-parameter %}

{% swagger-parameter in="header" name="accesstoken" required="true" type="string" %}
엑세스 토큰
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="자기소개 수정 성공" %}
```javascript
{
    "intro":"안녕하세요. 김코딩입니다."
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="자기소개 수정 실패" %}
```javascript
{
    "message":"fail"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/user/info" baseUrl="" summary="유저 정보 조회하기" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" required="true" type="integer" name="id" %}
유저 아이디
{% endswagger-parameter %}

{% swagger-parameter in="header" name="accesstoken" required="true" type="string" %}
엑세스 토큰
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="유저 정보 조회 성공 서울시 " %}
```javascript
{
    "img":"/uploads/image.png",
    "email":"test@naver.com",
    "address":"서울특별시 서초구 서초대로 396, 강남빌딩 20층",
    "intro":"안녕하세요. 김코딩입니다.",
    "nickname":"김코딩"
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="유저 정보 조회 실패" %}
```javascript
{
    "message":"fail"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/user/signup" baseUrl="" summary="회원가입하기" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="email" required="true" type="string" %}
유저 이메일 
{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="address" type="string" %}
유저 주소
{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="password" type="string" %}
유저 비밀번호
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="회원가입 성공" %}
```javascript
{
    "message":"ok"
}
```
{% endswagger-response %}

{% swagger-response status="409: Conflict" description="회원가입 실패 (중복된 이메일)" %}
```javascript
{
    "message":"email exists"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/user/signin" baseUrl="" summary="로그인하기" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="email" required="true" type="string" %}
유저 이메일
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" required="true" type="string" %}
유저 비밀번호
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="로그인 성공" %}
```javascript
{
    "message":"ok",
    "accesstoken":"accesstoken"
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="로그인 실패" %}
```javascript
{
    "message":"invalid user"
}
```
{% endswagger-response %}
{% endswagger %}

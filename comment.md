# Comment

{% swagger method="get" path="/comment/read" baseUrl="" summary="댓글 쓴 사람 조회" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" type="integer" required="true" name="id" %}
댓글의 아이디
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="댓글 쓴 사람의 이미지, 자기소개, 닉네임 정보를 응답으로 돌려준다." %}
```javascript
{
    "img":"uploads/image.png",
    "nickname":"김코딩",
    "intro":"안녕하세요. 김코딩입니다."
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="" %}
```javascript
{
    "message":"fail"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/comment/create" baseUrl="" summary="댓글 작성" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="userId" type="integer" required="true" %}
댓글을 작성하는 유저 아이디
{% endswagger-parameter %}

{% swagger-parameter in="body" name="contents" required="true" type="string" %}
댓글 내용
{% endswagger-parameter %}

{% swagger-parameter in="body" name="postId" type="integer" %}
댓글을 쓰고 있는 포스트의 아이디
{% endswagger-parameter %}

{% swagger-parameter in="header" name="accesstoken" required="true" type="string" %}
엑세스 토큰
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="댓글 작성 성공" %}
```javascript
{
    "message":"ok"
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

{% swagger-response status="404: Not Found" description="댓글 작성 실패" %}
```javascript
{
    "message":"fail"
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="필수 항목이 빠진 경우" %}
```javascript
{
    "message":"check parameters"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/comment/delete" baseUrl="" summary="댓글 삭제" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" type="integer" name="id" %}
댓글의 아이디
{% endswagger-parameter %}

{% swagger-parameter in="header" name="accesstoken" required="true" type="string" %}
엑세스 토큰
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="댓글 삭제 성공" %}
```javascript
{
    "message":"success to delete"
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

{% swagger-response status="404: Not Found" description="댓글 삭제 실패" %}
```javascript
{
    "message":"fail to delete"
}
```
{% endswagger-response %}
{% endswagger %}

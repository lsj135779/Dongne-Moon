# POST

{% swagger method="delete" path="/post/delete" baseUrl="" summary="게시글 삭제" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" required="true" type="integer" name="id" %}
포스트 아이디
{% endswagger-parameter %}

{% swagger-parameter in="header" name="accesstoken" required="true" type="string" %}
엑세스 토큰
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="글 삭제 성공" %}
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

{% swagger-response status="404: Not Found" description="글 삭제 실패" %}
```javascript
{
    "message":"fail"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/post/update" baseUrl="" summary="게시글 수정" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" type="integer" required="true" name="id" %}
포스트 아이디
{% endswagger-parameter %}

{% swagger-parameter in="body" name="category" required="true" type="string" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="contents" required="true" type="string" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="img" required="false" type="string" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="location" required="false" type="string" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="accesstoken" required="true" type="string" %}
엑세스 토큰
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="글 수정 성공" %}
```javascript
{
    "category":"취미",
    "contents":"족구하실 분?",
    "img":"uploads/posts/image.png",
    "location":"서울특별시 서초구 서초대로 396, 강남빌딩 20층"
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

{% swagger-response status="404: Not Found" description="글 수정 실패" %}
```javascript
{
    "message":"fail to update"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/post/create" baseUrl="" summary="게시글 작성" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="userId" type="integer" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="category" required="true" type="string" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="contents" required="true" type="string" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="img" required="false" type="string" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="location" required="false" type="string" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="accesstoken" required="true" type="string" %}
엑세스 토큰
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="게시글 작성 성공" %}
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

{% swagger-response status="404: Not Found" description="게시글 작성 실패" %}
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

{% swagger method="get" path="/post/read" baseUrl="" summary="게시글 상세 조회(댓글포함)" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" type="integer" required="true" name="id" %}
포스트 아이디
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="포스트 아이디" %}
```javascript
{
    "category":"취미",
    "contents":"족구하실 분?",
    "views":5,
    "img":"uploads/posts/image.png",
    "location":"서울특별시 서초구 서초대로 396, 강남빌딩 20층",
    "comment_cnt":2,
    "nickname":"김코딩",
    "userImg":"uploads/image.png",
    "address":"서울특별시 서초구 서초대로 396, 강남빌딩 20층",
    "createdat":"2021-11-05 08:54:14"
    "comments": [
        {
            "contents":"참여하고 싶습니다."
        },
        {
            "contents":"저도 참여할께요."
        }
    ]
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

{% swagger method="get" path="/post/:category" baseUrl="" summary="게시글 목록 조회" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="category" type="string" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="글목록 조회 성공 " %}
```javascript
{
    "posts": [
        {
            "category":"취미",
            "contents":"족구하실 분?",
            "comment_cnt":6,    
            "nickname":"김코딩",
            "address":"서울특별시 서초구 서초대로 396, 강남빌딩 20층",
            "createdat":"2021-11-05 08:54:14"
        },
        {
            "category":"취미",
            "contents":"농구하실 분?",
            "comment_cnt":3,    
            "nickname":"코딩",
            "address":"서울특별시 서초구 서초대로 123",
            "createdat":"2021-11-06 08:54:14"
        }
    ]
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="글목록 조회 실패" %}
```javascript
{
    "message":"fail"
}
```
{% endswagger-response %}
{% endswagger %}

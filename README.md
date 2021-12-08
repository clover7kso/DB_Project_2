# DB_Project_2

DB_Project_2 : Vaccine ERP


#### frontend 폴더를 visual code로 폴더열기를 한 뒤 터미널을 열고 모듈 설치

```
npm install
```

#### backend 폴더를 visual code로 폴더열기를 한 뒤 터미널을 열고 모듈 설치

```
npm install
```

#### frontend 터미널에서 서버 실행

```
npm start
```

#### backend 터미널에서 서버 실행

```
npm start
```
---------------------------

### MySQL 연동
##### Workbench에서 아래와 같은 이름, 설정으로 Connection 생성
##### backend/src/config/db.js 파일에서 MySQL 비밀번호 입력후 저장
![](https://cdn.discordapp.com/attachments/885967447918776441/894266744342982666/unknown.png)
##### SQL 파일 업로드 후 CREATE문 파일 두개 실행
![](https://cdn.discordapp.com/attachments/885967447918776441/894267361736134716/unknown.png)
##### localhost:3000/manager로 들어가서 병원정보업로드 버튼 클릭 후 일정시간 대기
##### SQL 파일중 INSERT 파일 실행

##### 코드 실행 중 문제 발생 시 연락 주시면 감사하겠습니다.
---------------------------


### 사용 API
[공공데이터활용지원센터_코로나19 예방접종 위탁의료기관 조회서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15081240)

[공공데이터활용지원센터_보건복지부 코로나19 감염 현황](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15043376)


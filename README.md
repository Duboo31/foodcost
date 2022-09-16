|🖥️ Web|📱 App|
|-|-|
|![](https://velog.velcdn.com/images/duboo/post/0b3cc2fb-7a5f-4cc1-83ce-7ab9c756a30a/image.png)|![](https://velog.velcdn.com/images/duboo/post/9e0e07e7-55cc-4194-bfa3-9e384286b823/image.png)|

>음식의 원가를 계산하는 방법은 보통 엑셀을 사용해서 어렵지 않게 할 수 있지만 주변에 엑셀을 사용할 수 없어 수기로 원가 계산을 하는걸 보고 <b>"웹이나 앱으로 음식의 원가 계산을 할 수 있으면 좋겠다"</b>라고 생각해서 만들어진 프로젝트입니다.<br><br>반응형으로 만들어 앱에서도 확인할 수 있도록 제작합니다.

[블로그](https://velog.io/@duboo/%ED%91%B8%EB%93%9C%EC%BD%94%EC%8A%A4%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)<br>
[푸드코드스 웹 페이지](https://duboo31.github.io/foodcost/foodcost.html)

---

### 프로젝트를 진행하면서
- 순수 html, css, js만 사용
- 로컬 스토리지를 이용한 데이터 저장
- 재료의 가격을 계산하는 100g 계산기
- 재료와 해당 재료의 100g당 금액을 저장
- 저장된 재료를 바탕으로 음식의 원가 계산
- 전체 음식 원가율의 평균을 확인해서 그래프 형태로 확인
- 원가 계산된 음식들의 정렬

위의 리스트를 목표로 프로젝트를 제작했습니다.

---

## 재료 g당 계산 및 출력

![](https://velog.velcdn.com/images/duboo/post/b924b2f6-597e-4afa-bfce-156b10a5558b/image.gif)

간단한 유효성 검사와 입력한 데이터를 바탕으로 재료 리스트에 추가해줍니다.

---

## 메뉴 추가
![](https://velog.velcdn.com/images/duboo/post/59fb811b-39a8-48e1-b57b-3077bae6226b/image.gif)

입력받은 재료를 바탕으로 메뉴와 판매 가격 그리고 재료들을 입력해서 재료의 원가 및 원가율을 출력합니다.

![](https://velog.velcdn.com/images/duboo/post/1eb09ea1-49d8-413d-ab7d-a73401fbb650/image.png)

첫번째 메뉴는 판매가격에 비해 재료값이 높아 다시 동일한 메뉴로 가격을 다르게 입력했습니다.

재료의 원가율에 따라서 <b color="red">상(빨)</b>, <b color="blue">중(파)</b>, <b color="green">하(초)</b>로 표시하여 보여줍니다.

![](https://velog.velcdn.com/images/duboo/post/3457da59-6b83-4f4a-84e4-59634d1e5a4a/image.gif)
출력된 메뉴들의 원가율을 바탕으로 높/낮음으로 정렬할 수 있습니다.

---
### 문제점
- 1. g단위로 재료를 계산해서 라면, 계란같은 낱개 상품은 입력이 어려움
  - 해결 방법 : 재료 입력부분에 추가로 낱개 재료 개당 가격을 입력해야함

- 2. 재료를 하나하나 입력하기가 너무 귀찮음
  - 해결 방법 :식자제 api등을 통해서 그날 식자재 가격을 받아와 재료로 사용할 수 있게해야함

- 3. +@ 로컬에 저장된 데이터로 히스토리를 삭제하면 모든 데이터가 사라짐
  - 해결 방법 : node, mysql등 서버와 DB를 이용한 기능 구현

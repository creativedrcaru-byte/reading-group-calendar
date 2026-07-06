# 모래시계 타이머

강의 중간 쉬는 시간이나 실습 시간에 화면에 띄워놓고 사용할 수 있는 웹 기반 모래시계 타이머입니다.

## 기능

- 1분, 3분, 5분, 10분 선택
- 선택 즉시 카운트다운 시작
- 시작, 일시정지, 다시 시작
- `MM:SS` 형식의 큰 남은 시간 표시
- SVG와 CSS로 구현한 모래시계 애니메이션
- 종료 시 `시간이 끝났습니다` 문구와 부드러운 알림 효과
- 별도 백엔드나 설치 과정 없음

## 실행 방법

이 폴더의 `index.html` 파일을 브라우저에서 열면 바로 실행됩니다.

PowerShell에서 열려면 아래 명령을 사용할 수 있습니다.

```powershell
Start-Process .\index.html
```

로컬 서버로 확인하고 싶다면 VS Code의 Live Server 확장이나 원하는 정적 파일 서버를 사용하면 됩니다. 이 앱은 백엔드가 필요하지 않습니다.

## 파일 구성

```text
index.html   화면 구조
styles.css   디자인과 모래시계 스타일
app.js       타이머 동작과 애니메이션 제어
```

## GitHub Pages 배포

정적 웹 앱이므로 GitHub 저장소에 `index.html`, `styles.css`, `app.js`를 올린 뒤 GitHub Pages를 켜면 사이트로 사용할 수 있습니다.

1. GitHub 저장소의 Settings로 이동합니다.
2. Pages 메뉴를 엽니다.
3. Source를 `Deploy from a branch`로 선택합니다.
4. Branch를 `main` 또는 사용하는 기본 브랜치로 선택합니다.
5. 폴더는 `/root`로 둡니다.
6. 저장 후 안내되는 GitHub Pages 주소로 접속합니다.

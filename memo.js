//시작할떄 git init 해도 stagingArea로 다 들어가고 추가로 더하고싶으면 git add .
//git add . 하면 workingDirectory에 있떤 파일들을 StagingArea로 옮겨줌 깃에 넣기전에 대기시켜두는곳
//git rm --cached node_modules -r 하면 stagingArea에 있는 것들을 지워줌
// git commit -m "또저장소에 올림" 이파일들이 git repository(Local)에 올라감 그럼 이제 stagingArea에 아무것도 없음

// client 에서 오는 정보를 Server에서 분석해서 가저올수있게해주는것이 Body-parser
// 쿠키 변수에 담기
let accessTokenCookie;
try {
  accessTokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    .split("=")[1];
} catch (e) {
  console.log(e);
}

// id 값을 주소창에서 받아온다.
const urlparams = new URLSearchParams(window.location.search);
const id = urlparams.get("id");

// fetchBoard, id값으로 board를 조회한다.
let number, title, content;
const query = `query {
  fetchBoard(id : "${id}"){
      number
      title
      content
      user{userId}
  }
}
`;

axios
  .post("http://localhost:3000/graphql", {
    query,
  })
  .then((res) => {
    const data = res.data.data.fetchBoard;
    number = data.number;
    title = data.title;
    content = data.content;
    writer = data.user.userId;

    document.title = number;
    document.getElementById("number").innerHTML = number;
    document.getElementById("title").innerHTML = title;
    document.getElementById("content").innerHTML = content;
    document.getElementById("writer").innerHTML = writer;
  });

// update-board-btn
// 해당 board의 유저 아이디 === 현재 로그인 유저 아이디 ?
document.getElementById("update-btn").addEventListener("click", async () => {
  const query = `query{
    fetchLoginUser
  }`;
  await axios
    .post(
      "http://localhost:3000/graphql",
      { query },
      //prettier-ignore
      {headers: {"Authorization": accessTokenCookie}}
    )
    .then((res) => {
      const loginUser = res.data.data.fetchLoginUser;
      // console.log(loginUser, writer);
      if (loginUser === writer) {
        window.location.href = `http://localhost:5501/frontend/board/updateBoard.html?id=${id}`;
      } else {
        alert("작성자가 아닙니다");
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

// 삭제하기 버튼
document.getElementById("delete-btn").addEventListener("click", async () => {
  // 현재 로그인 유저 확인
  const query = `query{
  fetchLoginUser
}`;
  await axios
    .post(
      "http://localhost:3000/graphql",
      { query },
      //prettier-ignore
      {headers: {"Authorization": accessTokenCookie}}
    )
    .then((res) => {
      const loginUser = res.data.data.fetchLoginUser;
      if (loginUser === writer) {
        const query = `
    mutation{
      deleteBoard(id : "${id}")
    }
  `;
        axios.post("http://localhost:3000/graphql", { query }).then((res) => {
          const data = res.data.data.deleteBoard;
          alert(data);
          window.location.href =
            "http://localhost:5501/frontend/homepage/homepage.html";
        });
      } else {
        alert("작성자가 아닙니다");
      }
    });
});

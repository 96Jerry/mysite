document.getElementById("createBoards").addEventListener("click", () => {
  const query = `query{
    isLoggedin
  }`;
  axios
    .post(
      "http://localhost:3000/graphql",
      { query },
      // prettier-ignore
      { headers: { "Authorization": document.cookie } }
    )
    .then((res) => {
      try {
        const isLoggedin = res.data.data.isLoggedin;
        if (isLoggedin)
          window.location.href =
            "http://localhost:5501/frontend/createBoard.html";
      } catch (e) {
        alert("로그인이 필요합니다");
      }
    });
});

// 홈페이지에 fetchboards를 할 때는 현재 로그인한 사람의 정보를 가져오지 않고 테이블에서 정보를 가져온다.
const getUserInfo = async () => {
  const query = `
          query {
            fetchLoginUser
          }
        `;

  try {
    const res = await axios.post(
      "http://localhost:3000/graphql",
      { query },
      // prettier-ignore
      { headers: { "Authorization": document.cookie } }
    );

    loggedInUserId = res.data.data.fetchLoginUser;
    return loggedInUserId;
  } catch (error) {
    return "로그인이 필요합니다.";
  }
};

const userInfoDiv = document.querySelector("div");
getUserInfo().then((res) => {
  userInfoDiv.textContent = `회원정보: ${res}`;
});

// 1. axios로 graphql 요청 : fetchBoards로 모든 id 값을 불러온다.
const fetchBoardsQuery = `query {
      fetchBoards
      { id } } `;
axios
  .post("http://localhost:3000/graphql", { query: fetchBoardsQuery })
  .then(async (res) => {
    const fetchBoardsData = res.data.data.fetchBoards;
    //     console.log(data[0].id);
    // 2. 모든 id 값을 돌면서 axios graphql 요청 : fetchboard로 내용을 받아온다.
    for (let i = 0; i < fetchBoardsData.length; i++) {
      const id = fetchBoardsData[i].id;
      const fetchBoardQuery = `
      query {
      fetchBoard(id : "${id}")
      { id, number, title, content, user{userId} } } `;
      await axios
        .post("http://localhost:3000/graphql", { query: fetchBoardQuery })
        .then(async (res) => {
          const fetchBoardData = res.data.data.fetchBoard;
          // console.log(fetchBoardData.user.userId);
          const writer = fetchBoardData.user.userId;
          const number = fetchBoardData.number;
          const title = fetchBoardData.title;
          const content = fetchBoardData.content;
          // 3. boardlist에 a태그를 추가한다.
          let boardList = document.querySelector(".board-list");
          const a = document.createElement("a");
          a.href = `http://localhost:5501/frontend/board.html?id=${id}`;
          a.innerHTML = `${title}`;
          const div = document.createElement("div");
          div.appendChild(a);
          boardList.appendChild(div);
          // 4. board number 추가.
          let boardNumber = document.querySelector(".board-number");
          const boardNumberDiv = document.createElement("div");
          boardNumberDiv.innerHTML = "번호";
          boardNumber.appendChild(boardNumberDiv);
          // 5. board writer 추가
          let boardWriter = document.querySelector(".board-writer");
          const boardWriterDiv = document.createElement("div");
          boardWriterDiv.innerHTML = writer;
          boardWriter.appendChild(boardWriterDiv);
          // 6. board date 추가
          let boardDate = document.querySelector(".board-date");
          const boardDateDiv = document.createElement("div");
          boardDateDiv.innerHTML = "작성일";
          boardDate.appendChild(boardDateDiv);
          // 7. board clcik 추가
          let boardClick = document.querySelector(".board-click");
          const boardClickDiv = document.createElement("div");
          boardClickDiv.innerHTML = "조회";
          boardClick.appendChild(boardClickDiv);
        });
    }
  });

// h6 tag에 로그인 남은 시간 설정
let timerId;
const timerElement = document.getElementById("timer");

function updateTimeRemaining(endTime) {
  const currentTime = new Date().getTime();
  const timeRemaining = Math.max(endTime - currentTime, 0);
  const minutes = Math.floor(timeRemaining / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  if (timeRemaining > 0) {
    timerId = setTimeout(() => updateTimeRemaining(endTime), 1000);
  } else {
    timerElement.textContent = "00:00";
  }
}

function getTimerEndTimeFromCookie() {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("timerEndTime="))
    ?.split("=")[1];
  return cookieValue ? new Date(cookieValue) : null;
}

function initTimer() {
  const endTime = getTimerEndTimeFromCookie();
  if (endTime) {
    const currentTime = new Date();
    if (currentTime < endTime) {
      updateTimeRemaining(endTime);
    } else {
      document.cookie =
        "timerEndTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      timerElement.textContent = "00:00";
    }
  }
}

// 페이지 로드 시 타이머 초기화
initTimer();

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

// graphql에 요청보낼 header 데이터 변수에 담기
const config = {
  headers: {
    //prettier-ignore
    "Authorization": `${accessTokenCookie}`,
  },
};

// 게시글 생성 버튼을 눌렀을 때
document.getElementById("create-board-btn").addEventListener("click", () => {
  const query = `query{
    isLoggedin
  }`;

  axios.post("http://localhost:3000/graphql", { query }, config).then((res) => {
    try {
      const isLoggedin = res.data.data.isLoggedin;
      if (isLoggedin) window.location.href = "/frontend/board/createBoard.html";
    } catch (e) {
      alert("로그인이 필요합니다");
    }
  });
});

// 현재 로그인된 유저 아이디 가져오기
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
      config
    );

    loggedInUserId = res.data.data.fetchLoginUser;
    return loggedInUserId;
  } catch (error) {
    return "로그인이 필요합니다.";
  }
};

const userInfoDiv = document.querySelector("div");
getUserInfo().then((res) => {
  // console.log(res);
  userInfoDiv.textContent = `회원정보: ${res}`;
});

// fetchBoards, 모든 id값을 가져오고
const fetchBoardsQuery = `query {
      fetchBoards
      { id } } `;
axios
  .post("http://localhost:3000/graphql", { query: fetchBoardsQuery })
  .then(async (res) => {
    const fetchBoardsData = res.data.data.fetchBoards;
    //     console.log(data[0].id);
    // 2. fetchboard, 그 id로 for문을 돌면서 모든 게시글 게시
    for (let i = 0; i < fetchBoardsData.length; i++) {
      const id = fetchBoardsData[i].id;
      const fetchBoardQuery = `
      query {
      fetchBoard(id : "${id}")
      { id, number, title, content, user{userId} } } `;
      await axios
        .post("http://localhost:3000/graphql", {
          query: fetchBoardQuery,
        })
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
          a.href = `/frontend/board/board.html?id=${id}`;
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

document
  .getElementById("extend-login-btn")
  .addEventListener("click", async () => {
    // 로그인이 만료되면 restore api 요청(cookie에서 refresh토큰의 유효기간을 검증한다.) 결과값으로 id, pwd를 반환
    const query2 = `mutation{
  restoreAccessToken
}`;
    await axios
      .post(
        "http://localhost:3000/graphql",
        { query: query2 },
        { withCredentials: true }
      )
      .then((res) => {
        clearTimeout(timerId);
        const currentTime = new Date();
        const endTime = new Date(currentTime.getTime() + 30 * 60 * 1000);
        document.cookie = `timerEndTime=${endTime.toISOString()}; path=/;`;
        initTimer();
      });
  });

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

document.getElementById("logout-btn").addEventListener("click", () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  deleteCookie("timerEndTime");
});

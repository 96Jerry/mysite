// 1. axios로 graphql 요청 : fetchBoards로 모든 id 값을 불러온다.
const fetchBoardsQuery = `query {
      fetchBoards
      { id, number, title, content } } `;
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
      { id, number, title, content } } `;
      await axios
        .post("http://localhost:3000/graphql", { query: fetchBoardQuery })
        .then(async (res) => {
          const fetchBoardData = res.data.data.fetchBoard;
          const number = fetchBoardData.number;
          const title = fetchBoardData.title;
          const content = fetchBoardData.content;
          // 3. boardlist에 a태그를 추가한다.
          let boardList = document.getElementById("board-list");
          const a = document.createElement("a");
          a.href = `http://localhost:5501/frontend/board.html?id=${id}`;
          a.innerHTML = `순번 : ${i + 1} / 제목 : ${title}`;
          const div = document.createElement("div");
          div.appendChild(a);
          boardList.appendChild(div);
        });
    }
  });

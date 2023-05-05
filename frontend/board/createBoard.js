// cookie 변수에 저장
const accessTokenCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("accessToken="))
  .split("=")[1];

document.getElementById("create-board-btn").addEventListener("click", () => {
  const number = document.getElementById("number").value;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const query = `
      mutation {
        createBoard(board:{
            number:${number},
            title:"${title}",
            content:"${content}"
        }){
            id,
            number,
            title,
            content
        }
      }
      `;
  const config = {
    headers:
      // prettier-ignore
      { "Authorization": accessTokenCookie},
  };

  axios.post("http://localhost:3000/graphql", { query }, config).then((res) => {
    // console.log(res.data.data.createBoard.id);
    console.log(res);
    try {
      const data = res.data.data.createBoard;
      alert("생성완료");
      window.location.href =
        "http://localhost:5501/frontend/homepage/homepage.html";
    } catch (e) {
      alert("로그인 필요");
    }
  });
});

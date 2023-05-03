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
  axios
    .post(
      "http://localhost:3000/graphql",
      { query },
      { headers: { Authorization: `${document.cookie}` } }
    )
    .then((res) => {
      // console.log(res.data.data.createBoard.id);
      alert("생성완료");
      window.location.href = "homepage.html";
    });
});

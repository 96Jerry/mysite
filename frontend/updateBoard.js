document.getElementById("update-board-btn").addEventListener("click", () => {
  const number = document.getElementById("number-update").value;
  const title = document.getElementById("title-update").value;
  const content = document.getElementById("content-update").value;
  const query = `
        mutation {
          updateBoard(id: "${id}", 
            board:{
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
  axios.post("http://localhost:3000/graphql", { query }).then((res) => {
    // console.log(res.data.data.createBoard.id);
    alert("수정완료");
    window.location.href = "homepage.html";
  });
});

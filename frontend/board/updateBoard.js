const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
// console.log(id);
const fetchBoardQuery = `query {
      fetchBoard(id :"${id}")
      { number, title, content } } `;
axios
  .post("http://192.168.219.101:3000/graphql", { query: fetchBoardQuery })
  .then((res) => {
    const data = res.data.data.fetchBoard;
    // console.log(data);
    document.getElementById("number-update").value = data.number;
    document.getElementById("title-update").value = data.title;
    document.getElementById("content-update").value = data.content;
  });

// 수정하기 클릭
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
  axios.post("http://192.168.219.101:3000/graphql", { query }).then((res) => {
    // console.log(res.data.data.createBoard.id);
    alert("수정완료");
    window.location.href = "/mysite/frontend/homepage/homepage.html";
  });
});

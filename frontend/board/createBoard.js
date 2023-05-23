// cookie 변수에 저장
const accessTokenCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("accessToken="))
  .split("=")[1];

// 생성하기 버튼 클릭
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
      window.location.href = "/frontend/homepage/homepage.html";
    } catch (e) {
      alert("로그인 필요");
    }
  });
});

// 이미지가 업로드되면 구글 클라우드에 저장
document.getElementById("img-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  // formdata 설정
  formData.append(
    "operations",
    JSON.stringify({
      query: `
      mutation ($file: Upload!) {
        uploadFile(file: $file)
      }
    `,
      variables: {
        file: null,
      },
    })
  );
  formData.append(
    "map",
    JSON.stringify({
      0: ["variables.file"],
    })
  );
  formData.append("0", file);

  // axios 요청
  axios
    .post("http://localhost:3000/graphql", formData, {
      headers: { "x-apollo-operation-name": "uploadFile" },
    })
    .then((res) => {
      const data = res.data.data.uploadFile;
      document.getElementById("user-img").src = "11";
    });
});

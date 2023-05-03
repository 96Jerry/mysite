document.getElementById("login-btn").addEventListener("click", () => {
  const userId = document.getElementById("userId").value;
  const userPwd = document.getElementById("userPwd").value;

  const query = `mutation{
    login(
        user: {userId: "${userId}", userPwd: "${userPwd}"}
    )
  }`;
  axios
    .post("http://localhost:3000/graphql", { query }, { withCredentials: true })
    .then((res) => {
      if (res.data.data.login === "fail") {
        alert("로그인 실패");
      } else {
        alert("로그인 성공");
        window.location.href = "http://localhost:5501/frontend/homepage.html";
      }
    });
});

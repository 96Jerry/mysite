// 로그인 버튼 클릭
document.getElementById("login-btn").addEventListener("click", () => {
  const userId = document.getElementById("userId").value;
  const userPwd = document.getElementById("userPwd").value;

  if ((userId === "") | (userPwd === "")) {
    alert("아이디, 패스워드 모두 입력");
    throw new Error("아이디, 패스워드 모두 입력");
  }

  const query = `mutation{
    login(
        user: {userId: "${userId}", userPwd: "${userPwd}"}
    )
  }`;
  axios
    .post("http://localhost:3000/graphql", { query }, { withCredentials: true })
    .then((res) => {
      try {
        if (res.data.data.login === "fail") {
          alert("비밀번호가 다릅니다.");
        } else {
          alert("로그인 성공");
          document.cookie = `${res.data.data.login}; path=/;`;
          window.location.href = "/frontend/homepage/homepage.html";
        }
      } catch (e) {
        alert("아이디가 없습니다");
      }
    });
});

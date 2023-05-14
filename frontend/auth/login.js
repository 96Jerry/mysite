// 타이머 쿠키 설정 함수 (x) => {x분 이후에 만료되는 쿠키 설정}
function setTimerCookie(minutes) {
  const now = new Date();
  const expires = new Date(now.getTime() + minutes * 60 * 1000);
  document.cookie = `timerEndTime=${expires.toUTCString()}; expires=${expires.toUTCString()}; path=/`;
}

// 로그인 버튼 클릭
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
      try {
        if (res.data.data.login === "fail") {
          alert("비밀번호가 다릅니다.");
        } else {
          alert("로그인 성공");
          console.log(res.data.data.login);
          setTimerCookie(30);
          window.location.href = "/frontend/homepage/homepage.html";
        }
      } catch (e) {
        alert("아이디가 없습니다");
      }
    });
});

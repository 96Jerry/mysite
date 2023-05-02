document.getElementById("login-btn").addEventListener("click", () => {
  const userId = document.getElementById("userId").value;
  const userPwd = document.getElementById("userPwd").value;

  const query = `mutation{
    login(
        user: {userId: "${userId}", userPwd: "${userPwd}"}
    )
  }`;
  axios.post("http://localhost:3000/graphql", { query }).then((res) => {
    console.log(res.data.data.login);
  });
});

document.getElementById("create-user-btn").addEventListener("click", () => {
  const userId = document.getElementById("userId").value;
  const userPwd = document.getElementById("userPwd").value;
  const query = `
  mutation {
    createUser(createUserInput:{
        userId:"${userId}",
        userPwd:"${userPwd}"
    })
  }
  `;
  axios.post("http://192.168.219.101:3000/graphql", { query }).then((res) => {
    alert(res.data.data.createUser);
    window.location.href = "/mysite/frontend/homepage/homepage.html";
  });
});

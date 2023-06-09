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
  axios.post("http://localhost:3000/graphql", { query }).then((res) => {
    alert(res.data.data.createUser);
    if (res.data.data.createUser === "success")
      window.location.href = "/frontend/homepage/homepage.html";
  });
});

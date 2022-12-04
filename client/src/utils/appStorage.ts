type UserData = {
  name: string;
  email: string;
  picture: string;
  id: string;
}

class AppStorage {
  setUser(userData: UserData) {
    localStorage.setItem(
      "user",
      JSON.stringify(userData))
  }
  getUser() {
    const user = localStorage.getItem("user");
    if(user)
    return JSON.parse(user);
  }
};

export default new AppStorage();
import { Movie } from "../models/movie";

export const registerUser = (email: string, name: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const userExists = users.some((user: any) => user.email === email);

  if (!userExists) {
    users.push({ email, name, bookmarks: [] });
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    alert("User already exists!");
  }
};

export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("loggedin_user") || "{}");
};

// Login a user
export const loginUser = (email: string, callback: () => void) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((user: any) => user.email === email);
  const loggedInUser = getLoggedInUser();
  if (loggedInUser.email) {
    alert("User already logged in , with email : " + loggedInUser.email);
  } else if (user) {
    localStorage.setItem("loggedin_user", JSON.stringify(user));
    callback();
  } else {
    alert("User not found! Please register.");
  }
};

export const logoutUser = (callback: () => void) => {
  // Remove the logged-in user from localStorage
  localStorage.removeItem("loggedin_user");
  callback();
};

// Bookmark a movie
export const bookmarkMovie = (movie: Movie) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const loggedInUser = getLoggedInUser();
  const updatedUsers = users.map((user: { email: any; bookmarks: Movie[] }) => {
    if (user.email === loggedInUser.email) {
      if (!user.bookmarks.includes(movie)) {
        user.bookmarks.push(movie);
      }
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("loggedinuser", JSON.stringify(loggedInUser));
};

// Unbookmark a movie
export const unbookmarkMovie = (movie: Movie) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const loggedInUser = getLoggedInUser();
  const updatedUsers = users.map((user: { email: any; bookmarks: Movie[] }) => {
    if (user.email === loggedInUser.email) {
      user.bookmarks = user.bookmarks.filter((b) => b !== movie);
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("loggedinuser", JSON.stringify(loggedInUser));
};

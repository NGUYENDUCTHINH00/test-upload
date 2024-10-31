import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqgb3LfUTDO__k3P0GTYcT4pLcuhiyVOk",
  authDomain: "testimage-a9444.firebaseapp.com",
  projectId: "testimage-a9444",
  storageBucket: "testimage-a9444.appspot.com",
  messagingSenderId: "362290121122",
  appId: "1:362290121122:web:898fbe1af6c60ed7568afb",
};

const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);

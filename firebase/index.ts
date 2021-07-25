import firebase from "firebase";

const env = process.env;

export const firebaseConfig = {
  backendUrl: env.REACT_APP_BASEBALL_BACKEND_URL,
};

// Firebaseを紐付け、初期化
export const firebaseApp = firebase.initializeApp(firebaseConfig);

// Firestoreのインスタンス作成
export const firebaseStore = firebaseApp.firestore();

export default firebase;

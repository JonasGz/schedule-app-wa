import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export const addTaskToFirestore = async (task) => {
  try {
    if (typeof task === "object" && !Array.isArray(task) && task !== null) {
      if (Object.keys(task).length === 0) {
        throw new Error("O objeto de tarefa está vazio.");
      }
      const stringId = String(task.id);
      const docRef = await doc(db, "tasks", stringId);
      await setDoc(docRef, task);
      console.log("Documento criado ou atualizado com ID específico.");
    } else {
      throw new Error(
        "Dados inválidos para adicionar ao Firestore. Esperado um objeto."
      );
    }
  } catch (error) {
    console.error("Erro ao adicionar o documento:", error);
  }
};

export const removeTaskFromFirestore = async (taskId) => {
  try {
    const stringId = String(taskId);
    const taskRef = doc(db, "tasks", stringId);
    await deleteDoc(taskRef);
    console.log(`Documento com ID ${taskId} removido com sucesso.`);
  } catch (error) {
    console.error("Erro ao remover o documento:", error);
  }
};

export const getTasksFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Erro ao obter tarefas do Firestore:", error);
    return [];
  }
};

export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    return user;
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao sair:", error);
    throw error;
  }
};

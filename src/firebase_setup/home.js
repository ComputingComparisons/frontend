import { firestore } from "./firebase";
import { getFirestore,addDoc, collection, getDoc, doc, updateDoc, query, where, getDocs, deleteDoc  } from "@firebase/firestore";

export const getAllAnalogies = async (userId) => {
  const collectionRef = collection(firestore, 'analogCollection')
  const q = query(collectionRef, where("uid", "==", userId))
  const querySnapshot = await getDocs(q);
  const analogies = [];
  querySnapshot.forEach((doc) => {
    //console.log(`Document ID: ${doc.id}, Data: ${JSON.stringify(doc.data())}`);
    const ref = collection(firestore, 'analogCollection', doc.id, 'individualCollection')
    
    analogies.push({ id: doc.id, data: doc.data() });
  });

  analogies.sort((a, b) => a.data.title.localeCompare(b.data.title));

  return analogies;
};

export const deleteTableById = async (userId, tableId) => {
  try {
    // Get a reference to the document
    const docRef = doc(firestore, 'analogCollection', tableId)
    // Get the document to check the user id
    const document = await getDoc(docRef);

    // Check if the user is the owner of the document
    if (!document.exists || document.data().uid !== userId) {
      throw new Error("Unauthorized or document does not exist");
    }
    // Delete the document
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error removing document: ", error);
  }
};


import { firestore } from "./firebase";
import { getFirestore,addDoc, collection, getDoc, doc, updateDoc, query, where, getDocs, deleteDoc  } from "@firebase/firestore";
import { getColor } from "./table";
/**
 * Creates a new classroom in Firebase.
 *
 * @param {string} admin - Admin's userID.
 * @returns {Promise} A promise that resolves with the classroom's document reference.
 */
export const createClassroom = async (admin, name, passcode) => {

  // Create a new classroom object
  const newClassroom = {
      name: name,
      admin: admin,
      passcode: passcode
  };

  // Add a new classroom document with a generated ID
  const classroomRef = collection(firestore, 'classrooms');
  const docref = await addDoc(classroomRef, newClassroom);

  return classroomRef;
};

/**
 * Retrieves all classrooms where the admin's ID matches the provided adminId.
 *
 * @param {string} adminId - Admin's userID to filter by.
 * @returns {Promise} A promise that resolves with an array of classroom objects.
 */
export const getClassroomsByAdmin = async (adminId) => {
    const classroomCollection = collection(firestore, 'classrooms');
    const q = query(classroomCollection, where('admin', '==', adminId));
    const querySnapshot = await getDocs(q);

    const classrooms = [];
    querySnapshot.forEach(doc => {
        const classroomData = doc.data();
        classroomData.id = doc.id; // Optionally, add the document ID to the returned object
        classrooms.push(classroomData);
    });

    return classrooms;
};

/**
 * Retrieves a single classroom given its ID.
 *
 * @param {string} classroomId - Classroom's document ID.
 * @returns {Promise} A promise that resolves with the classroom object or null if not found.
 */
export const getClassroomById = async (classroomId) => {
    const classroomDocRef = doc(firestore, 'classrooms', classroomId);
    const classroomSnapshot = await getDoc(classroomDocRef);

    if (classroomSnapshot.exists()) {
        const classroomData = classroomSnapshot.data();
        classroomData.id = classroomSnapshot.id; // Optionally, add the document ID to the returned object
        return classroomData;
    } else {
        return null; // Classroom not found
    }
};

/**
 * Retrieves all users from the "user" collection where the "classroom" field matches the given classroomId.
 *
 * @param {string} classroomId - Classroom's document ID to filter by.
 * @returns {Promise} A promise that resolves with an array of user objects.
 */
export const getUsersByClassroom = async (classroomId) => {
    const userCollectionRef = collection(firestore, 'users'); // Assuming the collection is named 'user'
    const q = query(userCollectionRef, where("classroom", "==", classroomId));
    const querySnapshot = await getDocs(q);
    
    const users = [];
    querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, data: doc.data() });
    });
    console.log(users);
    return users;
};

/**
 * Copies Analogy from Admin to a template
 * @param {*} userId 
 * @param {*} jsonData 
 * @returns 
 */
export const createTemplateAnalogy = async (classroomId, jsonData) => {

    const mainData = {
      title: jsonData.title,
      date_created: new Date(),
      uid: "",
      color: getColor()
    }
  
    const collectionRef = collection(firestore, 'classrooms', classroomId, 'templates');
      try {
        const docRef = await addDoc(collectionRef, mainData)
        const collectionRef2 = collection(firestore, 'analogCollection', docRef.id, 'individualCollection');
        jsonData.individualCollection.forEach(async (i) => {
          const title = i.data.title;
          const headers = ["header1", "header2", "header3"];
          const data = i.data.data;
          const table = {
            uid: "",
            headers: headers,
            data: data,
            title: title,
            notes: i.data.notes,
            date_created: new Date()
          }
          try {
          const docRef = await addDoc(collectionRef2, table);
          } catch (error) {
            console.error("Error adding document: ", error);
          }});
        return(docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }

    /**
 * Retrieves all templates from the "templates" subcollection within a specific classroom document.
 *
 * @param {string} classroomId - Classroom's document ID.
 * @returns {Promise} A promise that resolves with an array of template objects.
 */
export const getTemplatesByClassroom = async (classroomId) => {
    const templatesCollectionRef = collection(firestore, 'classroom', classroomId, 'templates');
    const querySnapshot = await getDocs(templatesCollectionRef);
    
    const templates = [];
    querySnapshot.forEach((doc) => {
        templates.push({ id: doc.id, data: doc.data() });
    });
    console.log(templates);
    return templates;
};

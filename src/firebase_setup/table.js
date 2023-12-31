import { firestore } from "./firebase";
import { getFirestore,addDoc, collection, getDoc, doc, updateDoc, query, where, getDocs, deleteDoc  } from "@firebase/firestore";

// Add data to your "table" (collection) with headers, 3 columns, and the user's UID
const getColor = () =>{
  const num = Math.floor(Math.random() * 6);
  if (num === 1) {
    return 'red'
  } else if(num === 2) {
    return 'green'
  } else if(num === 3) {
    return 'orange'
  } else if(num === 4) {
    return 'blue'
  } else if(num === 5) {
    return 'pink'
  } else {
    return 'cyan'
  }
}

export const addDataToFirestore = async (userId, title="") => {
  if (title == ""){
    title = "NewAnalogy"
  };
  const headers = ["header1", "header2", "header3"];

  const data = [
    {header1: "Target Header", header2: "Source Header", header3: "Nuance Header"},
    {header1: "", header2: "", header3: ""},
    {header1: "", header2: "", header3: ""},
    {header1: "", header2: "", header3: ""},
    {header1: "", header2: "", header3: ""},
    {header1: "", header2: "", header3: ""}
  ];

  const table = {
    uid: userId,
    headers: headers,
    data: data,
    title: 'NewSourceAnalogy',
    notes: "",
    date_created: new Date()
  }

  const mainData = {
    title: title,
    date_created: new Date(),
    uid: userId,
    color: getColor(),
  }

  const collectionRef = collection(firestore, 'analogCollection');
    try {
      //const docData = { ...rowData, userId }; // Include the user's UID in the document data
      const docRef = await addDoc(collectionRef, mainData)
      const collectionRef2 = collection(firestore, 'analogCollection', docRef.id, 'individualCollection');
      const docRef2 = await addDoc(collectionRef2, table)
      return(docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  ;
};

export const getTableById = async (userId, tableId) => {
  const docRef = doc(firestore, 'analogCollection', tableId)
  const document = await getDoc(docRef)
  if (document.data().uid === userId) {
    const tableData = document.data();

    return tableData;
  
  } else {
    return null;
  }
};

export const getTableById2 = async (userId, tableId, indId) => {
  const docRef = doc(firestore, 'analogCollection', tableId, 'individualCollection', indId)
  const document = await getDoc(docRef)
  if (document.data().uid === userId) {
    const tableData = document.data();

    // Create a new array of rows with the keys in the desired order
    const orderedRows = tableData.data.map(row => ({
      header1: row.header1,
      header2: row.header2,
      header3: row.header3
    }));
    tableData.data = orderedRows;

    return tableData;
  
  
  } else {
    return null;
  }
};

export const updateTableData = async (userId, tableId, indId, newData) => {
  const docRef = doc(firestore, 'analogCollection', tableId, 'individualCollection', indId)
  const headers = ["header1", "header2", "header3"];
  const dataFormat = newData.map((row) => {
    const rowData = {};
    row.forEach((value, index) => {
      rowData[headers[index]] = value;
    });
    return rowData;
  });

  try {
    const document = await getDoc(docRef);

    if (document.data().uid === userId) {
      const updatedData = { ...document.data(), data: dataFormat };
      await updateDoc(docRef, updatedData);
    } else {
      console.log("User does not have permission to update this document");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const updateTableTitle = async (userId, tableId, indId, title) => {
  const docRef = doc(firestore, 'analogCollection', tableId, 'individualCollection', indId);
  try {
    const document = await getDoc(docRef);

    if (document.data().uid === userId) {
      const updatedData = { ...document.data(), title: title };
      await updateDoc(docRef, updatedData);
    } else {
      console.log("User does not have permission to update this document");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const updateMainTitle = async (userId, tableId, title) => {
  const docRef = doc(firestore, 'analogCollection', tableId);

  try {
    const document = await getDoc(docRef);

    if (document.data().uid === userId) {
      const updatedData = { ...document.data(), title: title };
      await updateDoc(docRef, updatedData);
    } else {
      console.log("User does not have permission to update this document");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};


export const getMainTitle = async (userId, tableId) => {
  const docRef = doc(firestore, 'analogCollection', tableId);

  try {
    const document = await getDoc(docRef);

    if (document.data().uid === userId) {
      const mainTitle = document.data().title;
      return mainTitle;
    } else {
      console.log("User does not have permission to access this document");
    }
  } catch (error) {
    console.error("Error retrieving document: ", error);
  }
};

export const updateTableNotes = async (userId, tableId, indId, notes) => {
  const docRef = doc(firestore, 'analogCollection', tableId, 'individualCollection', indId);
  try {
    const document = await getDoc(docRef);

    if (document.data().uid === userId) {
      const updatedData = { ...document.data(), notes: notes };
      await updateDoc(docRef, updatedData);
    } else {
      console.log("User does not have permission to update this document");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const getIndividualAnalogies = async (userId, tableId) => {
  const collectionRef = collection(firestore, 'analogCollection', tableId, 'individualCollection')
  const q = query(collectionRef, where("uid", "==", userId))
  const querySnapshot = await getDocs(q);
  const analogies = [];
  querySnapshot.forEach((doc) => {
    const tableData = doc.data();

    // Create a new array of rows with the keys in the desired order
    const orderedRows = tableData.data.map(row => ({
      header1: row.header1,
      header2: row.header2,
      header3: row.header3
    }));
    tableData.data = orderedRows;
    analogies.push({ path: `${tableId}/${doc.id}`, id: doc.id, data: tableData });
  });
  analogies.sort(((a, b) => a.data.date_created.toDate() - b.data.date_created.toDate()));
  return analogies;
};

export const createIndividualAnalogy = async (userId, tableId, newTitle = "NewSourceAnalogy") => {
  const collectionRef = collection(firestore, 'analogCollection', tableId, 'individualCollection')
  const title = newTitle;
  const headers = ["header1", "header2", "header3"];
  const data = [
    {header1: "Target Header", header2: "Source Header", header3: "Nuance Header"},
    {header1: "", header2: "", header3: ""},
    {header1: "", header2: "", header3: ""},
    {header1: "", header2: "", header3: ""},
    {header1: "", header2: "", header3: ""},
    {header1: "", header2: "", header3: ""}
  ];
  const table = {
    uid: userId,
    headers: headers,
    data: data,
    title: title,
    notes: "",
    date_created: new Date()
  }
  try {
  const docRef = await addDoc(collectionRef, table)
  return([{ path: `${tableId}/${docRef.id}`, id: docRef.id, data: await getTableById2(userId, tableId, docRef.id) }]);
  } catch (error) {
    console.error("Error adding document: ", error);
  };
}

export const deleteIndividualById = async (userId, tableId, indId) => {
  try {
    // Get a reference to the document
    const docRef = doc(firestore, 'analogCollection', tableId, 'individualCollection', indId)
    // Get the document to check the user id
    const document = await getDoc(docRef);

    // Check if the user is the owner of the document
    if (!document.exists || document.data().uid !== userId) {
      throw new Error("Unauthorized or document does not exist");
    }

    // Delete the document
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
    return true
  } catch (error) {
    console.error("Error removing document: ", error);
    return false
  }
};

export const importAnalogy = async (userId, jsonData) => {

  const mainData = {
    title: jsonData.title,
    date_created: new Date(),
    uid: userId,
    color: getColor()
  }

  const collectionRef = collection(firestore, 'analogCollection');
    try {
      const docRef = await addDoc(collectionRef, mainData)
      const collectionRef2 = collection(firestore, 'analogCollection', docRef.id, 'individualCollection');
      jsonData.individualCollection.forEach(async (i) => {
        const title = i.data.title;
        const headers = ["header1", "header2", "header3"];
        const data = i.data.data;
        const table = {
          uid: userId,
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
      console.log(userId)
      console.error("Error adding document: ", error);
    }
  ;
};
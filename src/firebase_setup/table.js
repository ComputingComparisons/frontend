import { firestore } from "./firebase";
import { getFirestore,addDoc, collection, getDoc, doc, updateDoc, query, where, getDocs  } from "@firebase/firestore";

// Add data to your "table" (collection) with headers, 3 columns, and the user's UID

export const addDataToFirestore = async (userId, title="untitled") => {
  if (title == ""){
    title = "untitled"
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

  const table = {
    uid: userId,
    headers: headers,
    data: data,
    title: title,
    notes: "",
    color: getColor(),
  }

  const collectionRef = collection(firestore, 'analogCollection');
  

    try {
      //const docData = { ...rowData, userId }; // Include the user's UID in the document data
      const docRef = await addDoc(collectionRef, table)
      const collectionRef2 = collection(firestore, 'analogCollection', docRef.id, 'individualCollection');
      const docRef2 = await addDoc(collectionRef2, table)
      console.log(`Document added with ID: ${docRef.id}`);
      return(docRef.id);
    } catch (error) {
      console.log(userId)
      console.error("Error adding document: ", error);
    }
  ;
};

export const getTableById = async (userId, tableId) => {
  const docRef = doc(firestore, 'analogCollection', tableId)
  const document = await getDoc(docRef)
  console.log(document.data())
  if (document.data().uid === userId) {
    console.log(document.data())
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

export const getTableById2 = async (userId, tableId, indId) => {
  const docRef = doc(firestore, 'analogCollection', tableId, 'individualCollection', indId)
  const document = await getDoc(docRef)
  console.log(document.data())
  if (document.data().uid === userId) {
    console.log(document.data())
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
      console.log(`Table data updated for document ID: ${docRef.id}`);
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
      console.log(`Table data updated for document ID: ${docRef.id}`);
    } else {
      console.log("User does not have permission to update this document");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const updateTableNotes = async (userId, tableId, indId, notes) => {
  const docRef = doc(firestore, 'analogCollection', tableId, 'individualCollection', indId);
  

  try {
    const document = await getDoc(docRef);

    if (document.data().uid === userId) {
      const updatedData = { ...document.data(), notes: notes };
      await updateDoc(docRef, updatedData);
      console.log(`Table data updated for document ID: ${docRef.id}`);
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
    console.log(`Document ID: ${doc.id}, Data: ${JSON.stringify(doc.data())}`);
    analogies.push({ id: `${tableId}/${doc.id}`, data: doc.data() });
  });

  //analogies.sort((a, b) => a.data.title.localeCompare(b.data.title));

  return analogies;
};
import React, { useState } from "react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Button } from "antd";

import IssueList from "./components/IssueList/IssueList";
import AddEditModal from "./components/AddEditModal/AddEditModal";
import { issuesApi } from "./slices/apislice";

import styles from "./App.module.css";

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  return (
    <ApiProvider api={issuesApi}>
      <div className={styles.bodyWrapper}>
        <div className={styles.headingWrapper}>Issues Log</div>
        <Button
          className={styles.addButton}
          onClick={() => {
            setEditData(null);
            setModalVisible(true);
          }}
        >
          Add Issue
        </Button>
        <IssueList
          setEditData={setEditData}
          changeIsVisible={setModalVisible}
          editData={editData}
          isVisible={modalVisible}
        />
        <AddEditModal
          isVisible={modalVisible}
          changeIsVisible={setModalVisible}
          editData={editData}
          changeEditData={setEditData}
        />
      </div>
    </ApiProvider>
  );
}

export default App;

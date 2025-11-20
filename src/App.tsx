import { useState } from "react";
import { SignIn } from "./pages/SignIn";
import { GroupHome } from "./pages/GroupHome";
import { Receipts } from "./pages/Receipts";
import { NotFound } from "./pages/NotFound";
import { Requests } from "./pages/Requests";
import { Groups } from "./pages/Groups";
import { Members } from "./pages/Members";
import { Dept } from "./pages/Dept";

import { BackButton } from "./components/BackButton";
import { HomeButton } from "./components/HomeButton";

function App() {
  const [pageID, setPageID] = useState(0); // ID 0: always start on sign in screen
  const [currGroupName, setGroupName] = useState('');

  //using a single page cuz I'm too lazy right now for react router
  const getPage = () => {
    switch(pageID) {
      case 0:
        return (
          <SignIn setPageID={setPageID}/>
        );
      case 1:
        //this is kind of the home page ig
        return (
          <div className="w-100 d-flex flex-column align-items-center">
            <h1 className="display-2 fw-bold p-4">House Debt Tracker</h1>
            <Groups setPageID={setPageID} setGroupName={setGroupName}/>
          </div>
        );
      case 2:
        return (
          <>
            <GroupHome groupName={currGroupName} setPageID={setPageID}/>
            <HomeButton setPageID={setPageID}/>
          </>
        );
      case 3:
        return (
          <>
            <Receipts/>
            <BackButton onClick={()=>setPageID(2)}/>
          </>
        );
      case 4:
        return (
          <>
            <Requests groupName={currGroupName}/>
            <BackButton onClick={()=>setPageID(2)}/>
          </>
        );
      case 5:
        return (
          <>
            <Members groupName={currGroupName}/>
            <BackButton onClick={()=>setPageID(2)}/>
          </>
        );
      case 6:
        return (
          <>
            <Dept groupName={currGroupName}/>
            <BackButton onClick={()=>setPageID(2)}/>
          </>
        );
      default:
        //just in case the programmer messes up the page ID: make it very clear that they did
        return <NotFound/>;
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center pt-3">
        {getPage()}
      </div>
    </>
  );
}

export default App

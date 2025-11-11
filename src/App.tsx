import { useState } from "react";
import { SignIn } from "./pages/SignIn";
import { GroupHome } from "./pages/GroupHome";
import { Receipts } from "./pages/Receipts";
import { NotFound } from "./pages/NotFound";
import { Requests } from "./pages/Requests";
import { Groups } from "./pages/Groups";
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
          <Groups setPageID={setPageID} setGroupName={setGroupName}/>
        );
      case 2:
        return (
          <>
            <GroupHome groupName={currGroupName}/>
            <HomeButton setPageID={setPageID}/>
          </>
        );
      case 3:
        return (
          <Receipts/>
        );
      case 4:
        return (
          <Requests/>
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

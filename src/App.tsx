import { useState } from "react";
import { SignIn } from "./pages/SignIn";
import { GroupHome } from "./pages/GroupHome";
import { Receipts } from "./pages/Receipts";
import { NotFound } from "./pages/NotFound";
import { Requests } from "./pages/Requests";
import { Groups } from "./pages/Groups";

function App() {
  const [pageID, setPageID] = useState(0);

  //using a single page cuz I'm too lazy right now for react router
  const getPage = () => {
    switch(pageID) {
      case 0:
        return (
          <SignIn setPageID={setPageID}/>
        );
      case 1:
        return (
          <Groups/>
        );
      case 2:
        return (
          <GroupHome/>
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

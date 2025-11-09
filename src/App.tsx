import { useState } from "react";
import { SignIn } from "./pages/SignIn";
import { GroupHome } from "./pages/GroupHome";
import { Receipts } from "./pages/Receipts";
import { NotFound } from "./pages/NotFound";
import { Requests } from "./pages/Requests";

function App() {
  const [pageID, setPageID] = useState(0);

  const getPage = () => {
    switch(pageID) {
      case 0:
        return (
          <SignIn setPageID={setPageID}/>
        );
      case 1:
        return (
          <GroupHome/>
        );
      case 2:
        return (
          <Receipts/>
        );
      case 3:
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

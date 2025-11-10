import { useEffect, useState } from "react";
import { GroupCard } from "../components/GroupCard"

interface groupData {
  name: string;
  joined: boolean;
}

export const Groups = () => {
  const [groups, setGroups] = useState<groupData[]>();
  const [loading, setLoading] = useState(true);

  const getGroups = () => {
    let data: Array<groupData> = [];

    // TODO: get actual data from backend
    let temp: groupData = {
      name: "Test",
      joined: true
    }

    data.push(temp);
    return data;
  }

  useEffect(()=>{
    setGroups(getGroups());
    setLoading(false);
  }, []);

  return (
    <>
      <div className="modal fade" id="newGroupModal" tabIndex={-1} aria-labelledby="newGroup" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="newGroupModal">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                  </div>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary">Create</button>
            </div>
            </div>
        </div>
        </div>

      {loading ? 
        <>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </> 
        : 
        <>
          <ul className="list-group overflow-auto w-75" data-bs-spy="scroll">
            {
              groups && groups.map((item, index) => (
                <li key={index} className="list-group-item">
                  <GroupCard name={item.name} joined={item.joined}/>
                </li>
              ))
            }
          </ul>
        </>
      }

      <div className="d-flex justify-content-end p-4 fixed-bottom" data-bs-toggle="modal" data-bs-target="#newGroupModal">
        <button className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle m-2" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
          New Group
        </button>
      </div>
    </>
  )
}

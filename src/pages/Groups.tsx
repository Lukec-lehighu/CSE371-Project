import { useEffect, useRef, useState } from "react";
import { getAllGroups, addNewGroup } from "../modules/api";
import { GroupCard } from "../components/GroupCard"
import Cookies from 'js-cookie';

export interface groupData {
  name: string;
  joined: boolean;
}

interface Props {
  setPageID: (id:number) => void;
  setGroupName: (name:string) => void;
}

export const Groups = ({setPageID, setGroupName}: Props) => {
  const [groups, setGroups] = useState<groupData[]>();
  const [loading, setLoading] = useState(true);

  const closeModalRef = useRef<any>(null);

  const handleNewGroup = (formData:FormData) => {
    const name = formData.get('groupName')?.toString();
    const isPublic = formData.get('isPublic') === 'on';
    const owner = Cookies.get('email');

    if(!name || !owner) //has to be an actual name
      return;

    console.log(`${name}: ${isPublic} : ${owner}`);
    addNewGroup(name, owner, isPublic);
    closeModalRef.current?.click(); //close the modal if successful
  }

  useEffect(()=>{
    setGroups(getAllGroups());
    setLoading(false);
  }, []);

  return (
    <>
      <div className="modal fade" id="newGroupModal" tabIndex={-1} aria-labelledby="newGroup" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="newGroupModal">New Group</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeModalRef}></button>
            </div>
            <div className="modal-body">
                <form id='group-form' action={handleNewGroup}>
                  <div className="mb-3">
                    <label htmlFor="groupName" className="form-label">Group name</label>
                    <input name="groupName" type="text" className="form-control" id="groupName" aria-describedby="emailHelp"/>
                  </div>
                  <div className="mb-3 form-check">
                    <input name="isPublic" type="checkbox" className="form-check-input" id="publicCheck"/>
                    <label className="form-check-label" htmlFor="publicCheck">Public group</label>
                  </div>
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary" form="group-form">Create</button>
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
                  <GroupCard name={item.name} joined={item.joined} setPageID={setPageID} setGroupName={setGroupName}/>
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

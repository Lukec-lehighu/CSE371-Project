import { useEffect, useState } from "react";
import { RemoveableItem } from "../components/RemoveableItem";
import { addMember, getMembers, removeMember } from "../modules/api";
import Cookies from 'js-cookie';

interface Props {
    groupName: string;
}

export const Members = ({groupName}: Props) => {
  const [members, setMembers] = useState<string[]>();
  const [isOwner, setIsOwner] = useState(false);

  const load_members = async ()=>{
    const data = await getMembers(groupName);
    if(data) {
      setMembers(data.members);
      setIsOwner(data.owner===Cookies.get('email'));
    }
  }

  const add_member = (formData:FormData) => {
    const email = formData.get('username')?.toString();

    if(email)
      addMember(groupName, email).then((res)=>{
        if(res)
          load_members(); //only reload if the operation was a success
    });
  }

  useEffect(()=>{
    load_members();
  }, []);

  return (
    <>
      <div className="modal fade" id="newMemberModal" tabIndex={-1} aria-labelledby="newGroup" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="newMemberModal">Add Member</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form id='group-form' action={add_member}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">New member email</label>
                    <input name="username" type="email" className="form-control" id="username" aria-describedby="emailHelp"/>
                  </div>
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary" form="group-form" data-bs-dismiss="modal">Add</button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center w-75">
        <h1 className="display-2">{groupName} Members</h1>
        { members &&
          members.map((item, index)=>(
            <RemoveableItem key={index} title={item} removeable={isOwner} onRemove={()=>{
              removeMember(groupName, item).then(()=>load_members()); // TODO: this is inefficient: just remove from the local array and reload the page
            }}/>
          ))
        }
        {
          (members && members.length==0) && <p className="p-5">No other members</p>
        }
        {
          isOwner &&
          <button className="btn btn-warning p-3" style={{position:'fixed', bottom:20, right:20, zIndex:10}} data-bs-toggle="modal" data-bs-target="#newMemberModal">
            Add member
          </button>
        }
      </div>
    </>
  )
}

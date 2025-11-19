import { useEffect, useState } from "react";
import { RemoveableItem } from "../components/RemoveableItem";
import { getMembers } from "../modules/api";
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

  useEffect(()=>{
    load_members();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center w-75">
      <h1 className="display-2">{groupName} Members</h1>
      { members &&
        members.map((item)=>(
          <RemoveableItem title={item} removeable={isOwner} onRemove={()=>console.log("clicked")}/>
        ))
      }
      {
        (members && members.length==0) && <p className="p-5">No other members</p>
      }
    </div>
  )
}

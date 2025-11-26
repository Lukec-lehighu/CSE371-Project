import { useState } from "react";
import { joinGroup } from "../modules/api";

interface Props {
  name: string;
  joined: boolean;
  setPageID: (id:number) => void;
  setGroupName: (name:string) => void;
  id: number;
}

export const GroupCard = ({name, joined, setPageID, setGroupName, id}: Props) => {
  const [isJoined, setIsJoined] = useState<boolean>(joined);
  const [loading, setLoading] = useState(false);

  const appendAlert = (message:string, type:string) => {
    const alertPlaceholder = document.getElementById(`liveAlertPlaceholder${id}`);

    if(alertPlaceholder)
      alertPlaceholder.innerHTML  = [
      `<div id="liveAlertPlaceholder${id}" class="alert alert-${type} alert-dismissible align-self-bottom" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('');
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="align-self-center">{name}</div>
        <button type="button" className={"btn " + (isJoined ? "btn-success" : "btn-secondary")}
                onClick={(isJoined ? ()=>{
                  setGroupName(name);
                  setPageID(2);
                } : ()=>{
                  if(!loading) {
                    setLoading(true);
                    joinGroup(name).then((resp)=> {
                      if(resp) {
                        appendAlert('Unable to join! (Group is private)', 'danger');
                        setIsJoined(false);
                        console.log(resp);
                      }
                      else {
                        setIsJoined(true);
                      }
                      setLoading(false);
                    });
                  }
                })}>
          {loading ? 
            <>
              <div className="spinner-grow text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
            :
            <>
              {isJoined ? 'Select' : 'Join'}
            </>
          }
        </button>
      </div>
      <div id={`liveAlertPlaceholder${id}`}></div>
    </>
  )
}

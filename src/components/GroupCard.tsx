import { joinGroup } from "../modules/api";

interface Props {
  name: string;
  joined: boolean;
  setPageID: (id:number) => void;
  setGroupName: (name:string) => void;
}

export const GroupCard = ({name, joined, setPageID, setGroupName}: Props) => {
  const appendAlert = (message:string, type:string) => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

    if(alertPlaceholder)
      alertPlaceholder.innerHTML  = [
      `<div id="liveAlertPlaceholder" class="alert alert-${type} alert-dismissible align-self-bottom" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('');
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <p className="align-self-center">{name}</p>
        <button type="button" className={"btn " + (joined ? "btn-success" : "btn-secondary")}
                onClick={(joined ? ()=>{
                  setGroupName(name);
                  setPageID(2);
                } : ()=>{
                  if(!joinGroup(name)) {
                    appendAlert('Unable to join! (Group is private)', 'danger')
                  }
                })}>
          {joined ? 'Select' : 'Join'}
        </button>
      </div>
      <div id="liveAlertPlaceholder"></div>
    </>
  )
}

import { useEffect, useState } from "react";
import { RemoveableItem } from "../components/RemoveableItem";
import { getRequests, newRequest, removeRequest } from "../modules/api";

interface Props {
    groupName: string;
}

export const Requests = ({groupName}: Props) => {
  const [requests, setRequests] = useState<(string|number)[][]>();

  const load_requests = async ()=>{
    const data = await getRequests(groupName);
    if(data) {
      setRequests(data);
    }
  }

  const add_request = (formData:FormData) => {
    const request = formData.get('request')?.toString();

    if(request)
      newRequest(groupName, request).then((res)=>{
        if(res)
          load_requests(); //only reload if the operation was a success
      });
  }

  useEffect(()=>{
    load_requests();
  }, []);

  return (
    <>
      <div className="modal fade" id="newRequestModal" tabIndex={-1} aria-labelledby="newGroup" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="newRequestModal">New Request</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form id='group-form' action={add_request}>
                  <div className="mb-3">
                    <label htmlFor="request" className="form-label">Request</label>
                    <input name="request" type="text" className="form-control" id="request"/>
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
        <h1 className="display-2">{groupName} Requests</h1>
        { requests &&
          requests.map((item, index)=>(
            <RemoveableItem key={index} title={`${item[2]} - ${item[1]}`} removeable={true} onRemove={()=>{
              removeRequest(+item[0]);
              load_requests(); //do this no matter what for better visual feedback to user
            }}/>
          ))
        }

        {
          (requests && requests.length==0) && <p className="p-5">No requests yet</p>
        }

        <button className="btn btn-warning p-3" style={{position:'fixed', bottom:20, right:20, zIndex:10}} data-bs-toggle="modal" data-bs-target="#newRequestModal">
          Add request
        </button>
      </div>
    </>
  )
}

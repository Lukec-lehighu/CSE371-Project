interface Props {
  groupName: string;
  setPageID: (id:number) => void;
}

export const GroupHome = ({groupName, setPageID}: Props) => {
  return (
    <>
      <div className="d-flex flex-column align-items-center gap-4">
        <h1 className="display-1">{groupName}</h1>
        <div className="d-grid gap-3" style={{gridTemplateColumns: "1fr 1fr"}}>
          <button className="btn btn-primary btn-lg" onClick={()=>setPageID(3)}>Receipts</button>
          <button className="btn btn-primary btn-lg" onClick={()=>setPageID(4)}>Requests</button>
          <button className="btn btn-primary btn-lg" onClick={()=>setPageID(5)}>Members</button>
          <button className="btn btn-primary btn-lg" onClick={()=>setPageID(6)}>My Dept</button>
        </div>
      </div>
    </>
  )
}

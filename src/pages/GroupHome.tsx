interface Props {
  groupName: string;
}

export const GroupHome = ({groupName}: Props) => {
  return (
    <>
      <div className="d-flex flex-column align-items-center gap-4">
        <h1 className="display-1">{groupName}</h1>
        <div className="d-grid gap-3" style={{gridTemplateColumns: "1fr 1fr"}}>
          <button className="btn btn-primary btn-lg">Receipts</button>
          <button className="btn btn-primary btn-lg">Requests</button>
          <button className="btn btn-primary btn-lg">Members</button>
          <button className="btn btn-primary btn-lg">My Dept</button>
        </div>
      </div>
    </>
  )
}

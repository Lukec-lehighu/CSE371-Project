interface Props {
  name: string;
  joined: boolean;
}

export const GroupCard = ({name, joined}: Props) => {
  return (
    <div className="card">
        <div className="card-body d-flex justify-content-left">
          <p className="text-left">{name}</p>
          <button type="button" className={"btn " + (joined ? "btn-success" : "btn-secondary")}>{joined ? 'Select' : 'Join'}</button>
        </div>
    </div>
  )
}

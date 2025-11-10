interface Props {
  name: string;
  joined: boolean;
}

export const GroupCard = ({name, joined}: Props) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <p className="align-self-center">{name}</p>
      <button type="button" className={"btn " + (joined ? "btn-success" : "btn-secondary")}>
        {joined ? 'Select' : 'Join'}
      </button>
    </div>
  )
}

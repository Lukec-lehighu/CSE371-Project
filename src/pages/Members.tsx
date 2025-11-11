interface Props {
    groupName: string;
}

export const Members = ({groupName}: Props) => {
  return (
    <div>{groupName}</div>
  )
}

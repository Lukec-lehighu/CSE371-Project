interface Props {
    groupName: string;
}

export const Dept = ({groupName}: Props) => {
  return (
    <div>{groupName}</div>
  )
}

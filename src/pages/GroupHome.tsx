interface Props {
  groupName: string;
}

export const GroupHome = ({groupName}: Props) => {
  return (
    <>
      <div>{groupName}</div>
    </>
  )
}

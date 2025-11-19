interface Props {
    title: string;
    removeable: boolean;
    onRemove: ()=>void|null;
}

export const RemoveableItem = ({title, removeable, onRemove}: Props) => {
  return (
    <div className="d-flex flex-row justify-content-between w-75 border m-3 p-2">
        <div className="align-self-center p-2">{title}</div>

        {removeable &&
            <button className='btn btn-danger d-flex' onClick={onRemove}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-ban m-1" viewBox="0 0 16 16">
                    <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
                </svg>
            </button>
        }
    </div>
  )
}

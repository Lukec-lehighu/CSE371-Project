import { useEffect, useState } from "react"
import { getReceipts, newReceipt, getReceiptItems, newReceiptItem, getClaimedItems, toggleClaim, removeReceiptItem } from "../modules/api";
import { RemoveableItem } from "../components/RemoveableItem";
import Cookies from 'js-cookie';

interface Props {
  groupName: string;
}

export const Receipts = ({groupName}: Props) => {
  // so. many. states. why did I do this..
  const [receipts, setReceipts] = useState<any[]>();
  const [receiptData, setReceiptData] = useState<any[]>();
  const [claimedItems, setClaimedItems] = useState<string[][]|null>();
  const [viewingReceipt, setViewingReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currRecName, setCurrRecName] = useState("");
  const [currRecID, setCurrRecID] = useState(-1);
  const [currRecIsOwner, setCurrRecIsOwner] = useState(false);

  // helper function for determining whether or not a user already claimed an item
  const userClaimedItem = (itemname:string) => {
    const username = Cookies.get('email');

    //I know there's some javascript bs you can do to make this pretty, but idc I'm sick of googling
    if(claimedItems) {
      for(let i=0; i<claimedItems.length; ++i) {
        if(claimedItems[i][0] === itemname && claimedItems[i][1] === username)
          return true;
      }
    }

    return false;
  }

  const load_receipts = async ()=>{
    setLoading(true);

    //reset states
    setCurrRecID(-1);
    setCurrRecIsOwner(false);
    setClaimedItems(null);

    getReceipts(groupName).then((res)=> {
      if(res)
        setReceipts(res);
      setLoading(false);
    });
  }

  //load all receipt items for a specific rowid (receipt id) along with all of the claimed items
  const load_receipt_data = async (rid:number)=> {
    setLoading(true);
    getReceiptItems(rid).then((res)=>{
      if(res)
        setReceiptData(res);

      setViewingReceipt(true);
      setLoading(false);
    });
  }

  const load_claimed_items = async (rid:number)=> {
    setLoading(true);
    getClaimedItems(rid).then((claimed)=> {
        if(claimed)
          setClaimedItems(claimed);

        setViewingReceipt(true);
        setLoading(false);
    })
  }

  const createReceipt = async (formData:FormData)=> {
    const name = formData.get('name')?.toString();

    setLoading(true);

    if(name) {
      const res = await newReceipt(groupName, name); //res is null when newReceipt is a success
      if(!res)
        await load_receipts();
    }

    setLoading(false);
  }

  const addReceiptItem = async (formData:FormData)=> {
    const itemName = formData.get('name')?.toString();
    const costString = formData.get('cost')?.toString();

    setLoading(true);

    if(itemName && costString) {
      const res = await newReceiptItem(currRecID, itemName, parseFloat(costString));
      if(!res)
        await load_receipt_data(currRecID);
    }
  }

  //fetch receipts on first load of the page
  useEffect(()=>{
    load_receipts();
  }, []);

  return (
    loading ?
    <div className="d-flex flex-column align-items-center w-75">
      <div className="spinner-border text-primary m-5 p-1" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    :
    viewingReceipt ?
    <>
      <div className="modal fade" id="newReceiptItemModal" tabIndex={-1} aria-labelledby="newGroup" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="newReceiptItemModal">New item</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form id='group-form' action={addReceiptItem}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name="name" type="text" className="form-control" id="name"/>
                    <label htmlFor="cost" className="form-label pt-2">Cost</label>
                    <input name="cost" type="number" step="0.01" className="form-control" id="cost"/>
                  </div>
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Nevermind</button>
              <button type="submit" className="btn btn-primary" form="group-form" data-bs-dismiss="modal">Add</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="d-flex flex-column align-items-center w-75">
        <h1 className="pt-2 pb-4">{currRecName}</h1>

        {
          receiptData?.map((item, index) => (
            <RemoveableItem title={item[0] + " - $" + item[1]}
              removeable={currRecIsOwner}
              onRemove={()=>{
                setLoading(true);
                removeReceiptItem(currRecID, item[0]).then((res)=>{
                  if(res)
                    load_receipt_data(currRecID); //reload page data
                  else
                    setLoading(false);
                });
              }}
              onClaim={()=>{
                setLoading(true);
                toggleClaim(currRecID, item[0]).then((error)=>{
                  if(!error)
                    load_claimed_items(currRecID); //reload page data
                  else
                    setLoading(false);
                }); 
              }}
              claimed={userClaimedItem(item[0])}
              key={index}
            />
          ))
        }
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newReceiptItemModal">New Item</button>
      </div>
    </>
    :
    <>
      <div className="modal fade" id="newReceiptModal" tabIndex={-1} aria-labelledby="newGroup" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="newReceiptModal">New Receipt Name</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form id='group-form' action={createReceipt}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name="name" type="text" className="form-control" id="name"/>
                  </div>
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary" form="group-form" data-bs-dismiss="modal">Create</button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center w-100">
        <h1 className="display-2 p-2">{groupName} Receipts</h1>
        {
          receipts?.map((item, index) => (
            <>
              <RemoveableItem
                title={item[1]}
                removeable={item[3]===Cookies.get('email')}
                onRemove={()=>console.log('removed')}
                onView={()=>{
                  //set a billion different flags and stuff because I didn't put much thought into the design of this page. If you can't tell everything here is a rush job
                  setCurrRecName(item[1]);
                  setCurrRecID(item[0]);
                  setCurrRecIsOwner(item[3]===Cookies.get('email'));
                  load_receipt_data(item[0]).then(()=>load_claimed_items(item[0]));
                }}
                key={index}
              />
            </>
          ))
        }
        {!loading && <button className="btn btn-warning p-3" style={{position:'fixed', bottom:20, right:20, zIndex:10}} data-bs-toggle="modal" data-bs-target="#newReceiptModal">
            New Receipt
        </button>}
      </div>
    </>
  )
}

import { useEffect } from "react"
import { getReceipts } from "../modules/api";

export const Receipts = () => {
  useEffect(()=>{
    getReceipts('Test Group');
    console.log("RAN!!");
  }, []);

  return (
    <div>receipts</div>
  )
}

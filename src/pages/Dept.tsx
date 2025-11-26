import { useEffect, useState } from "react";
import { getDebt } from "../modules/api";
import { RemoveableItem } from "../components/RemoveableItem";

interface Props {
    groupName: string;
}

export const Dept = ({groupName}: Props) => {
  const [loading, setLoading] = useState(false);
  const [debtData, setDebtData] = useState<string[][]|null>();

  const loadDebt = async () => {
    getDebt(groupName).then((res) => {
      setDebtData(res);
      setLoading(false);
    });
  }

  useEffect(()=>{
    setLoading(true);
    setDebtData(null);
    loadDebt();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center w-75">
      <h1 className="pt-2 pb-4">{`Debt Owed for "${groupName}"`}</h1>

      {loading ?
        <div className="spinner-border text-primary m-5 p-1" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        :
        <>
          {(debtData && debtData.length!=0) ?
            debtData.map((item, index)=>(
              <RemoveableItem key={index} title={`${item[0]}: $${item[1]}`} removeable={false} onRemove={()=>console.log()}/>
            ))
            :
            <p>All paid up!</p>
          }
        </>
      }
    </div>
  )
}

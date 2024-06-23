//import "./styles.css";
import './Print.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import axios from "axios"
import { useReactToPrint } from "react-to-print";
import {useLocation} from 'react-router-dom';
export default function Print() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  
  });
  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {
        const response = await axios.get("http://localhost:4000/api/order/list");
      if (response.data.success){
        setOrders(response.data.data);
        console.log(response.data.data);
      }
      else{
        toast.error("Error")
      }
    }
  
    const statusHandler = async (event,orderId) => {
      const response = await axios.post(url+"/api/order/status",{
        orderId,
        status:event.target.value
      })
      if (response.data.success){
        await fetchAllOrders();
      }
    }
    const history = useNavigate();
  
    
  
  useEffect(()=>{
    fetchAllOrders();
  },[])
 
  return (
    
    <>
   
   <div  ref={componentRef} className='maindiv'>
    <h2 className="company">DLD</h2>
      <div>
        {orders.map((order,index)=>(
          
          <div key={index}>
       <div className="userinfodiv">
           <span className="username">Name:       {order.address.firstName}</span>
           <span className="userid">Table number:    {order.userId}</span>
          </div>
          <span>....................................................................................</span>
            <div className='menuheading'>
              <p>
                {order.items.map((item,index)=>{
                 
                    return( 
                  <>
                  
                
                    <div>
                    <div className="itemdiv">
                    <div className="itemdivheader"><span><h5>Name</h5>  </span>
                   
                   <h5> Price</h5>
                  
                     </div>
                     <div><h5> {item.name} </h5>
                     <span><h5>{item.price}</h5>  </span></div>
                    
                    </div>
                    <span className='dot'>.........................</span>
                    </div>
                    </>)
                  
                 
                })}
              </p>
             
            </div>
            <span>....................................................................................</span>
           <div className="footerdiv">
            <span className="totalbill">{order.amount}</span>
            <span className="billstatus">Payment:True</span>
            <span className="paymentmethod">via</span>
           </div>
            
          </div>
          
        ))}
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>

</>
  
  );
}







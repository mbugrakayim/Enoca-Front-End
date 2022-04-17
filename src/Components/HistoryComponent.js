import React from "react";
import "./Model.css";

function HistoryComponent({ closeModal, history }) {
  const a = history.length;
  let b;
  if(a - 3 < 0){
     b = 0;
  }else{
    b = a -3;
  }
 
 
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>

        {history.slice(b, a).map((hist, index) => {
          return (
            <div key={index} style={{ display: "block" }}>
              {hist}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HistoryComponent;

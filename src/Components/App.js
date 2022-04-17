import React, { useState } from "react";
import "./App.css";
import HistoryComponent from "./HistoryComponent";

export const replacement = [
  {
    reg: /\*/g,
    dest: "×",
  },
  {
    reg: /\//g,
    dest: "÷",
  },
];

function App() {
  const [thema, setThema] = useState("");
  const [result, setResult] = useState("");
  const [last, setLast] = useState("");
  const [cur, setCur] = useState("0");
  const [history, setHistory] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const buttonClick = (type) => {
    const lastLetter = cur.slice(-1);
    switch (type) {
      case "c":
        setCur("0");
        setLast("");
        setResult("");
        break;
      case "=":
        try {
          const output = eval(cur).toString();
          setLast(cur + "=");
          setResult(output);
          history.push(cur + " = " + output);
        } catch (e) {
          console.log(e);
          setLast(cur + "=");
          setCur("0");
          setResult("");
        }
        break;
      case "+":
      case "-":
      case "*":
      case "%":
      case "/":
        if (Number(cur) === 0 && type === "-") {
          setCur(type);
          break;
        }
        if (
          (lastLetter === "*" && type === "-") ||
          (lastLetter === "/" && type === "-") ||
          (lastLetter === "%" && type === "-")
        ) {
          setCur(cur + type);
          break;
        }

        if (
          lastLetter === "+" ||
          lastLetter === "-" ||
          lastLetter === "*" ||
          lastLetter === "%" ||
          lastLetter === "/"
        )
          setCur(cur.slice(0, -1) + type);
        else setCur(cur + type);
        break;
      case ".":
        if (lastLetter !== ".") {
          setCur(cur + type);
        }
        break;
      case "+/-":
        if (cur.charAt(0) === "-") {
          setCur(cur.substring(1));
        } else {
          setCur("-" + cur);
        }
        break;
      default:
        setCur(cur === "0" || cur === "00" ? type : cur + type);
        break;
    }
  };

  let finalCur = cur,
    finalLast = last;
  replacement.forEach((item) => {
    finalCur = finalCur.replace(item.reg, item.dest);
    finalLast = finalLast.replace(item.reg, item.dest);
  });

  return (
    <div className={`${thema === "dark" ? "calculateDark" : "calculate"}`}>
      <div className="top">
        <div className={`${thema === "dark" ? "topItemDark" : "topItem"}`}>
          <button
            onClick={() => {
              setThema("light");
            }}
            className={`${thema === "dark" ? "butonBirDark" : "butonBir"}`}
          >
            <i className="far fa-sun " />
          </button>
          <button
            onClick={() => {
              setThema("dark");
            }}
            className={`${thema === "dark" ? "butonIkiDark" : "butonIki"}`}
          >
            <i className="far fa-moon" />
          </button>
        </div>
        <div className="topItem2">
          <button
            className={`${thema === "dark" ? "butonbDark" : "butonb"}`}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <i className="fas fa-history" />
          </button>
          {openModal && (
            <HistoryComponent closeModal={setOpenModal} history={history} />
          )}
        </div>
      </div>
      <div className="toplam">
        <input
          type="text"
          className="toplamInput"
          value={finalCur}
          disabled
          readOnly
        />
        <i
          className={`${
            thema === "dark"
              ? "fas fa-equals faIcon1Dark"
              : "fas fa-equals faIcon1"
          }`}
        />
        <input
          type="text"
          className={`${thema === "dark" ? "toplamlariDark" : "toplamlari"}`}
          value={result === null ? "" : result}
          disabled
          readOnly
        />
      </div>
      <div className={`${thema === "dark" ? "actionsDark" : "actions"}`}>
        <div className="solRakam">
          <div className={`${thema === "dark" ? "enUstDark" : "enUst"}`}>
            <button
              className={`${thema === "dark" ? "butonCDark" : "butonC"}`}
              style={{ marginLeft: "0px" }}
              onClick={() => buttonClick("c")}
            >
              AC
            </button>
            <button
              className={`${thema === "dark" ? "butonCDark" : "butonC"}`}
              onClick={() => buttonClick("+/-")}
            >
              +/-
            </button>
            <button
              className={`${thema === "dark" ? "butonCDark" : "butonC"}`}
              style={{ paddingLeft: "20px" }}
              onClick={() => buttonClick("%")}
            >
              %
            </button>
          </div>
          <div className="rakamlar">
            <button
              className={`${
                thema === "dark" ? "butonRakamDark" : "butonRakam"
              }`}
              onClick={() => buttonClick("1")}
            >
              1
            </button>
            <button
              className={`${
                thema === "dark" ? "butonRakamDark" : "butonRakam"
              }`}
              onClick={() => buttonClick("2")}
            >
              2
            </button>
            <button
              className={`${
                thema === "dark" ? "butonRakamDark" : "butonRakam"
              }`}
              onClick={() => buttonClick("3")}
            >
              3
            </button>
          </div>
          <div className="rakamlar">
            <button
              className={`${
                thema === "dark" ? "butonRakamDark" : "butonRakam"
              }`}
              onClick={() => buttonClick("4")}
            >
              4
            </button>
            <button
              className={`${
                thema === "dark" ? "butonRakamDark" : "butonRakam"
              }`}
              onClick={() => buttonClick("5")}
            >
              5
            </button>
            <button
              className={`${
                thema === "dark" ? "butonRakamDark" : "butonRakam"
              }`}
              onClick={() => buttonClick("6")}
            >
              6
            </button>
          </div>
          <div className="rakamlar">
            <button
              className={`${
                thema === "dark" ? "butonRakamDark" : "butonRakam"
              }`}
              onClick={() => buttonClick("7")}
            >
              7
            </button>
            <button
              className={`${
                thema === "dark" ? "butonRakamDark" : "butonRakam"
              }`}
              onClick={() => buttonClick("8")}
            >
              8
            </button>
            <button
              className={`${
                thema === "dark" ? "butonRakamDark" : "butonRakam"
              }`}
              onClick={() => buttonClick("9")}
            >
              9
            </button>
          </div>
          <div className="rakamlar">
            <button
              className={`${
                thema === "dark" ? "butonRakamDark" : "butonRakam"
              }`}
              style={{ width: "50px" }}
              onClick={() => buttonClick(".")}
            >
              .
            </button>
            <button
              className={`${
                thema === "dark" ? "butonRakamDark" : "butonRakam"
              }`}
              onClick={() => buttonClick("0")}
            >
              0
            </button>
            <button
              className={`${
                thema === "dark" ? "butonRakamDark" : "butonRakam"
              }`}
              style={{ width: "50px", padding: "10px 5px" }}
              onClick={() => buttonClick("00")}
            >
              00
            </button>
          </div>
        </div>
        <div className={`${thema === "dark" ? "sagRakamDark" : "sagRakam"}`}>
          <ul style={{ listStyle: "none", margin: "0px -5px" }}>
            <li>
              <button
                className={`${thema === "dark" ? "butonDDark" : "butonD"}`}
                style={{ marginLeft: "-30px", marginBottom: "10px" }}
                onClick={() => buttonClick("/")}
              >
                <i className="fas fa-divide fa-xs" />
              </button>
            </li>
            <li>
              <button
                className={`${thema === "dark" ? "butonDDark" : "butonD"}`}
                style={{ marginLeft: "-30px", marginBottom: "10px" }}
                onClick={() => buttonClick("*")}
              >
                <i className="fas fa-times fa-xs" />
              </button>
            </li>
            <li>
              <button
                className={`${thema === "dark" ? "butonDDark" : "butonD"}`}
                style={{ marginLeft: "-30px", marginBottom: "10px" }}
                onClick={() => buttonClick("-")}
              >
                <i className="fas fa-minus fa-xs" />
              </button>
            </li>
            <li>
              <button
                className={`${thema === "dark" ? "butonDDark" : "butonD"}`}
                style={{ marginLeft: "-30px", marginBottom: "10px" }}
                onClick={() => buttonClick("+")}
              >
                <i className="fas fa-plus fa-xs" />
              </button>
            </li>
            <li>
              <button
                className={`${thema === "dark" ? "butonEDark" : "butonE"}`}
                onClick={() => buttonClick("=")}
              >
                <i className="fas fa-equals fa-xs" />
              </button>
            </li>
          </ul>
        </div>
        <hr className={`${thema === "dark" ? "hrColorDark" : "hrColor"}`} />
      </div>
    </div>
  );
}

export default App;

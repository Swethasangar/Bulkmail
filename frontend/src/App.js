import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
function App() {
  const [msg, setmsg] = useState("");
  const [status, setstatus] = useState(false);
  const [emailList, setemailList] = useState([]);

  // Handle Msg
  const handleMsg = (eve) => {
    setmsg(eve.target.value);
  };

  // Handle File
  const handlefile = (event) => {
    const file = event.target.files[0];
    // console.log(file);
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = event.target.result;
      // console.log(data);
      const workbook = XLSX.read(data, { type: "binary" });
      // console.log(workbook);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      // console.log(worksheet);
      const emaillist = XLSX.utils.sheet_to_json(worksheet, { header: "A" });
      // console.log(emailList);
      const totalemail = emaillist.map((evalue) => {
        return evalue.A;
      });
      // console.log(totalemail);
      setemailList(totalemail);
    };

    reader.readAsBinaryString(file);
  };

  const send = () => {
    setstatus(true);
    axios
      .post("http://localhost:5000/sendemail", {
        msg: msg,
        emaillist: emailList,
      })
      .then((data) => {
        // console.log(data)
        if (data.data === true) {
          alert("Email Send Successfully");
          setstatus(false);
          setmsg("");
        } else {
          alert("Failed");
        }
      });
  };

  return (
    <section>
      {/* Heading */}
      <div className="bg-teal-950 text-white">
        <h1 className="text-center px-5 py-5 text-2xl font-medium">
          Bulk Mail
        </h1>
      </div>

      {/* Text */}
      <div className="bg-teal-800 text-white">
        <h1 className="text-center px-5 py-5 font-medium">
          We Can help your business with sending multiple emails at once
        </h1>
      </div>

      {/*Text-2*/}
      <div className="bg-teal-600 text-white text-center">
        <h1 className="text-center px-5 py-5 font-medium">Drag And Drop</h1>
      </div>

      {/* TextBox */}
      <div className="bg-teal-400 flex flex-col items-center text-black px-5 py-3">
        <textarea
          onChange={handleMsg}
          value={msg}
          className="w-[80%] h-32 py-3 outline-none px-3 border border-black rounded-md"
          placeholder="Enter Your Email Text....."
        ></textarea>

        <div>
          <input
            onChange={handlefile}
            type="file"
            className="border-2 border-dashed border-black py-4 px-4 mt-5 mb-5 cursor-pointer"
          ></input>
        </div>

        <p>Total Email Files: {emailList.length}</p>

        <button
          onClick={send}
          className="bg-teal-800 text-white py-2 px-2 font-medium rounded-md w-fit mt-2"
        >
          {status ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Empty Div */}
      <div className="bg-teal-300 text-white text-center p-8"></div>

      <div className="bg-teal-200 text-white text-center p-12"></div>
    </section>
  );
}

export default App;

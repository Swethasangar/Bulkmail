const fileinput = document.getElementById("fileInput");
// console.log(fileinput)
fileinput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  // console.log(file)
  const reader = new FileReader();
  reader.onload = function (event) {
    const data = event.target.result;
    // console.log(data)
    const workbook = XLSX.read(data, { type: "binary" });
    // console.log(workbook);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    // console.log(worksheet)
    const emailList = XLSX.utils.sheet_to_json(worksheet, { header: "A" });
    console.log(emailList);
  };

  reader.readAsBinaryString(file);
});

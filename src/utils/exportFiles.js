import * as XLSX from "xlsx";
import toastr from "toastr";
import { MESSAGE } from "src/constants/content.constant";

const users = [
  {
    id: 1,
    name: "Caitlyn",
    surname: "Kerluke",
    age: 24,
  },
  {
    id: 2,
    name: "Rowan ",
    surname: "Nikolaus",
    age: 45,
  },
  {
    id: 3,
    name: "Kassandra",
    surname: "Haley",
    age: 32,
  },
  {
    id: 4,
    name: "Rusty",
    surname: "Arne",
    age: 58,
  },
];

const ExportFiles = (
  columns,
  data,
  fileType,
  fileName,
  appendName = "file"
) => {
  var rows = [...data];

  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  // XLSX example
  if (fileType === "xlsx") {
    // create data for sheet
    const compatibleData = rows.map((row) => {
      const obj = {};
      columns.forEach((col, index) => {
        obj[col] = Object.values(row)[index];
      });
      return obj;
    });

    let wb = XLSX.utils.book_new();
    let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
      columns,
    });
    XLSX.utils.book_append_sheet(wb, ws1, appendName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
    toastr.success(MESSAGE.EXPORT_SUCCESS);
    // Returning false as downloading of file is already taken care of
    return false;
  }

  // CSV example
  if (fileType === "csv") {
    downloadFile({
      data: data,
      fileName: `${fileName}.csv`,
      fileType: "text/csv",
    });
    // Returning false as downloading of file is already taken care of
    return false;
  }

  // Other formats goes here
  return false;
};

export default ExportFiles;

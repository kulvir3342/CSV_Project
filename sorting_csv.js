const fileInput = document.querySelector("#CSV");

const csvToArray = (str, delimiter = ",") => {

    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const arr1 = rows.map((row) => {
        const values = row.split(delimiter);
        const obj = headers.reduce(function(object, header, index) {
            object[header] = values[index];
            return object;
        }, {});

        return obj;
    });

    return arr1;
}

const downloadSorted = (data) => {
    const blob = new Blob([data], { text: "text/csv" });
  
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement("a");
  
    a.setAttribute("href", url);
  
    a.setAttribute("download", "users-sorted.csv");
  
    a.click();
  };

  const sortedcsvmaker = (data) => {
    csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));
  
    data.forEach((element) => {
      values = Object.values(element).join(",");
      csvRows.push(values);
    });
    return csvRows.join("\n");
  };


const readFile = () => {
    var reader = new FileReader();

    reader.onload = function(e) {
        const text = e.target.result;
        var arr = csvToArray(text);
        
        for(let i=0; i<arr.length; i++)
        {
            for(let j=i+1; j<arr.length; j++)
            {
                if(parseInt(arr[i].Id) > parseInt(arr[j].Id)) {
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }

        const csvdata = sortedcsvmaker(arr);
        downloadSorted(csvdata);
    }
    
    reader.readAsText(fileInput.files[0]);
}

fileInput.addEventListener('change', readFile);






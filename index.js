const counter = document.querySelector("#requests");
const userId = document.querySelector("#uid");
const details = document.querySelector("#details");

var count = 0;
var arr = [];
var selectedData;

const getData = async () => {
  count++;
  await fetch("https://random-data-api.com/api/v2/users")
    .then((data) => data.json())
    .then((data) => arr.push(data));
};

document.querySelector("#btn").addEventListener("click", () => {
  const intervalId = setInterval(() => {
    getData();
    counter.textContent = count-1;

    if (count == 11) {
      clearInterval(intervalId);

      selectedData = arr.map((row) => ({
        Id: row.id,
        FirstName: row.first_name,
        LastName: row.last_name,
        Username: row.username,
        Email: row.email,
        Avatar: row.avatar,
        Gender: row.gender,
        Employment: row.employment.title,
        Country: row.address.country,
      }));
      const csvdata = csvmaker(selectedData);
      download(csvdata);
    }
  }, 1000);
});

const download = (data) => {
  const blob = new Blob([data], { text: "text/csv" });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.setAttribute("href", url);

  a.setAttribute("download", "users.csv");

  a.click();
};

const csvmaker = (data) => {
  csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  data.forEach((element) => {
    values = Object.values(element).join(",");
    csvRows.push(values);
  });
  return csvRows.join("\n");
};


// Returning the details of the user

const findDetails = () => {
  const data = selectedData.filter(obj => userId.value == obj.Id);
  details.textContent = `Id: ${data[0].Id} || FirstName: ${data[0].FirstName} || LastName: ${data[0].LastName} || Username: ${data[0].Username} || Employment: ${data[0].Employment} || Country: ${data[0].Country}`;
}

userId.addEventListener('change', findDetails);
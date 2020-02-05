ulist = "/list"
udata = "/data"
col = [{ id: "User", header: "User", width: 100 },
{ id: "Time", header: "Time", width: 50 },
{ id: "Host", header: "Client Host", width: 150 },
{ id: "db", header: "Database", width: 150 },
{ id: "Info", header: "Description", width: screen.width - 850 },
{ id: "State", header: "Status", width: 200 }
]

let lgrid = {
    rows: [
        { view: "chart", type: "bar", value: "#jml#", url: udata },
        { view: "datatable", url: ulist, columns: col }]
}

let baris = [{ type: "header", template: "server status" }, lgrid]
let isi = { rows: baris }

webix.ready(function () {
    webix.ui(isi);
});
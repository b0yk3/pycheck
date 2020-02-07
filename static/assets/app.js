var ulist01 = "/list"
var ulist02 = "/list02"

function reloadData() {
    (function (v, w, x, y) {
        x.clearAll();
        x.load(v);


        y.clearAll();
        y.load(w);

        webix.message('Reloading.. ');

    })(ulist01, ulist02, $$("d01"), $$("d02"))
}

let lgclick = function (obj) {
    let notes;
    let rowid;
    if (obj == 'bt01') {
        rowid = $$("d01").getSelectedId();
        notes = $$("d01").getItem(rowid);
    } else {
        rowid = $$("d02").getSelectedId();
        notes = $$("d02").getItem(rowid);
    }

    if (rowid === null) {
        webix.message("please pick one on the list")
    } else {

        $$('logs').setHTML("<pre>" + notes.Info + " </pre>");
    }
}


let udata = "/data"

let scol01 = [{ id: "User", header: "User", width: 100 },
{ id: "Time", header: "Time", width: 50 },
{ id: "Host", header: "Client Host", width: 150 },
{ id: "db", header: "Database", width: 150 },
{ id: "Info", header: "Description", width: screen.width - 850 },
{ id: "State", header: "Status", width: 200 }
]

let scol02 = [{ id: "User", header: "User", width: 100 },
{ id: "Time", header: "Time", width: 50 },
{ id: "Host", header: "Client Host", width: 150 },
{ id: "db", header: "Database", width: 150 },
{ id: "Info", header: "Description", width: screen.width - 850 },
{ id: "State", header: "Status", width: 200 }
]

let gridcols = [{ view: "datatable", id: "d01", url: ulist01, columns: scol01, select: "row" },
{ view: "resizer" },
{ view: "datatable", id: "d02", url: ulist02, columns: scol02, select: "row" }]


let lgrid = {
    rows: [
        { view: "chart", type: "bar", value: "#jml#", url: udata, gravity: 0.3 },
        { view: "resizer" },
        { cols: gridcols },        
        { view: "resizer" },
        { gravity: 0.2, view: "template", id: "logs", scroll: true },
        {
            view: "toolbar", cols: [{ view: "button", type: "icon", icon: "mdi mdi-open-in-new", id: "bt01", click: lgclick },
            { view: "button", type: "icon", icon: "mdi mdi-open-in-new", id: "bt02", click: lgclick }]
        }]
}

let baris = [{ type: "header", template: "Server Fault Status" }, lgrid]
let isi = { rows: baris }

webix.ready(function () {
    webix.ui(isi);
    setInterval(reloadData, 30000);
});
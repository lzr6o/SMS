/* load data from local file
 */
function loadData() {
	$.get("jqueryassignmentdummydata.json", function (data) {
		localStorage.setItem("data", JSON.stringify(data));
	})
	var data = JSON.parse(localStorage.getItem("data"));
	for (var i = 0; i < data.length; i++) {
		data[i]["id"] = i;
	}
	localStorage.setItem("data", JSON.stringify(data));
	return data;
}




/* show searching result on webpage
*/
function populateData(data, quantity) {

	var tableBody = $('#data tbody');
	var columns = ["id", "firstname", "lastname", "email", "location", "phone"];

	var rows = 0;

	tableBody.empty();

	//insert data into table
	for (var rowKey in data) {
		const tr = document.createElement('tr');

		var row = data[rowKey];

		// add the rest of the fields
		for (var j in columns) {
			column = columns[j];
			const td = document.createElement('td');
			if (column != 'address' && column != 'marks') {
				td.textContent = row[column];
				tr.appendChild(td);
			}

		};

		tableBody.append(tr);

		rows += 1;
		if (rows == quantity) {
			break;
		}
	};
}





/*
 * 
 */
$(document).ready(function () {
	// load data
	var data = loadData();
	// rows
	var rows = parseInt($("#dropdown").val());

	// populate table with it
	populateData(data, rows);


	/* drop down list
	 * get user input number of rows
	 * then populate data on webpage
	 */
	$("#dropdown").change(function () {
		var newRows = $(this).children("option:selected").val();
		populateData(data, newRows);
	});






	/* details button
	 * show details based on id
	 */
	$("#details").click(function () {

		var tableBody = $('#detaildata tbody');
		// clear detail table
		tableBody.empty();
		var html = '';
		var id = parseInt($("#id").val());

		// show all users
		populateData(data, -1);

		$("#data tbody tr").filter(function () {
			$(this).toggle($(this).find("td:first").text() == id);
		});

		try {
			html += '<tr> <th>first name</th> <th>address</th> <th>marks</th> </tr>';
			html += '<td>' + data[id].firstname + '</td>';
			html += '<td >' + '<strong>Communication :</strong>' + data[id].address.communication + "<br>" + '<strong>Permanent:</strong>' + data[id].address.permanent + '</td>';
			html += '<td >' + '<strong>English : </strong>' + data[id].marks.english + "<br>" + '<strong>Science : </strong>' + data[id].marks.science +
				"<br>" + '<strong>Computers : </strong>' + data[id].marks.computers + "<br>" + '<strong>Hardware : </strong>' + data[id].marks.hardware + '</td>';
			$('#detaildata tbody').append(html);
		} catch (err) {
			alert("Student ID " + id + " not found.");
		};
	});






	// delete
	$("#delete").click(function () {
		var id = parseInt($("#id").val());
		delete data[id];
		// 3. update data in localStorage
		localStorage.setItem("data", JSON.stringify(data));
		alert("Student ID " + id + " removed");
	});






	// submit
	$("#submit").click(function () {
		var newData = {
			"firstname": $("#firstname").val(),
			"lastname": $("#lastname").val(),
			"email": $("#email").val(),
			"location": $("#location").val(),
			"phone": $("#phone").val(),
			"address": {
				"communication": $("#communication").val(),
				"permanent": $("#permanent").val(),
			},
			"marks": {
				"english": $("#english").val(),
				"science": $("#science").val(),
				"computers": $("#computers").val(),
				"hardware": $("#hardware").val()
			}
		};
		data.push(newData);
		localStorage.setItem("data", JSON.stringify(data));
	});






	// edit
	$("#edit").click(function () {

		var id = parseInt($("#id").val());
		if (id == undefined) {
			alert("need ID to edit");
		}

		var newData = {
			"firstname": $("#firstname").val(),
			"lastname": $("#lastname").val(),
			"email": $("#email").val(),
			"location": $("#location").val(),
			"phone": $("#phone").val(),
			"address": {
				"communication": $("#communication").val(),
				"permanent": $("#permanent").val(),
			},
			"marks": {
				"english": $("#english").val(),
				"science": $("#science").val(),
				"computers": $("#computers").val(),
				"hardware": $("#hardware").val()
			}
		}

		for (var key in data[id]) {
			if (typeof data[id][key] === 'string') {
				if (!!newData[key] && newData[key] != data[id][key]) {
					data[id][key] = newData[key];
				}
			} else {
				for (var subkey in data[id][key]) {
					if (!!newData[key][subkey] && newData[key][subkey] != data[id][key][subkey]) {
						data[id][key][subkey] = newData[key][subkey];
					}
				}

			}

		};
		localStorage.setItem("data", JSON.stringify(data));

	});






	// search
	$("#search").click(function () {
		localStorage.getItem("data");
		populateData(data, -1);
		var searchdata = $("#searchdata").val().toLowerCase();
		var table = $("#data tbody tr")
		table.filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(searchdata) > -1)
		});

	});
	// drag and drop
	document.addEventListener('dragstart', function (event) {
		event.dataTransfer.setData('Text', [event.target.innerHTML,]);
	});
});
var employees;
function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      employees = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');

        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)

        for (let button of document.getElementsByClassName('btn-danger')) {
          //console.log(button)
          button.addEventListener('click', deleteEmployee)
        }
      })
    })
    .catch(error => console.error(error))
}


// TODO
// add event listener to submit button
//add validations 3shan maydosh we hya fadya
document.getElementById('submit').addEventListener('click', function (event) {
  var input1 = document.getElementById('name').value;
  var input2 = document.getElementById('id').value;
  var f = 1;
  console.log(input1)
  console.log(input2)

  if (!input1 || !input2) {
    alert('Both fields must be filled out');
    event.preventDefault(); // Prevent form from submitting
  }
  else {
    employees.forEach(item => {
      if (item.id == input2) {
        f = 0;
      }
    });
    if (f == 1) {
      createEmployee(event);
    }
    else {
      alert("This ID already exsists!");
    }
  }
});


// TODO
// add event listener to delete button
//added inside the fetchemployee function


// TODO
function createEmployee(event) {

  event.preventDefault()

  // get data from input field
  //name_inp = document.getElementById('name').value
  name_inp = document.getElementById('name').value
  console.log(name_inp)
  id_inp = document.getElementById('id').value

  // send data to BE

  //save data in object to send to BE
  var data = {
    id: id_inp,
    name: name_inp
  }
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);

      // call fetchEmployees
      fetchEmployees()
    })
    .catch((error) => {
      console.error('Error:', error);

    });

}

// TODO
function deleteEmployee(event) {
  event.preventDefault()

  // get id
  row = event.target.parentElement.parentElement;
  id_inp = row.children[0].textContent;
  console.log(id_inp);

  // send id to BE
  var data = {
    id: id_inp,
  }
  fetch('http://localhost:3000/api/v1/employee/' + id_inp, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // call fetchEmployees
      fetchEmployees()
    })
    .catch((error) => {
      console.error('Error:', error);

    });

}

fetchEmployees()
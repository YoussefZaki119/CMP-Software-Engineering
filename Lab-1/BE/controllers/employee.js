const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  console.log("delete employee process started");
  
  var id_to_delete = req.params.id;
  console.log(id_to_delete);

  //filter them to remove the employee with the id
  var index = employee.findIndex(emp => emp.id === id_to_delete);
  if (index !== -1) {
    // Remove the employee if found
    employee.splice(index, 1);
    console.log("deleted");

  } 

  for (var i = 0; i < employee.length; i++) {
    console.log(employee[i]);
  }

  return res.status(201).json({
    success: true,
    data: employee,
  });

};


// TODO
exports.createEmployee = async (req, res, next) => {
  console.log("create employee process started");
  //hadd el employee el gded
  var id = req.body.id
  var name = req.body.name
  employee.push({ id, name });
  console.log("employee created");

  return res.status(201).json({
    success: true,
    data: employee,
  });

};


//byms7 awel wahed be el id dah
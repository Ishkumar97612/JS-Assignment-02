//Function for checking Name

function containsNumericOrSpecial(str) {
  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);
    if (
      (charCode < 31 || charCode > 32) &&
      (charCode < 48 || charCode > 57) &&
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122)
    ) {
      return false;
    }
  }
  return true;
}

//Function for checking valid mail
function Email_Checker(email_id) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_id);
}

//Function for checking a valid mobile number
function isValidMobileNumber(mobileNumber) {
  if (mobileNumber.length == 0) {
    return true;
  }
  var mobileNumberRegex = /^[0-9]{10}$/;
  return mobileNumberRegex.test(mobileNumber);
}

var i = null;

const button = document.querySelector("#submit");
button.addEventListener("click", function () {
  console.log("Button clicked!");

  var st_name = document.getElementById("name").value;

  var st_email = document.getElementById("email").value;

  var st_phone = document.getElementById("phone").value;

  var isValidDetail = true;

  if (st_name.length == 0) {
    isValidDetail = false;
    window.alert("Name can't be empty.");
  } else if (st_email.length == 0) {
    isValidDetail = false;
    window.alert("Email can't be empty.");
  } else if (containsNumericOrSpecial(st_name) === false) {
    isValidDetail = false;
    window.alert(
      "Please Enter Valid Name Without Numeric and Special Characters."
    );
  } else if (Email_Checker(st_email) === false) {
    isValidDetail = false;
    window.alert("Please Enter Valid Email.");
  } else if (isValidMobileNumber(st_phone) === false) {
    isValidDetail = false;
    window.alert(
      "Please Enter Valid Mobile Number i.e should be numeric and contain ten digits."
    );
  }

  if (isValidDetail === true) {
    addDataToLocalStorage(st_name, st_phone, st_email);
    updateTable();
  }
});

const resetbutton = document.querySelector("#clr");

resetbutton.addEventListener("click", function () {
  console.log("Button clicked!");

  localStorage.removeItem("itemJson");
  location.reload();
});

function addDataToLocalStorage(st_name, st_phone, st_email) {
  if (localStorage.getItem("itemJson") == null) {
    Form_Data = [];
    Form_Data.push([st_name, st_phone, st_email]);
    localStorage.setItem("itemJson", JSON.stringify(Form_Data));
  } else {
    Form_DataStr = localStorage.getItem("itemJson");
    Form_Data = JSON.parse(Form_DataStr);
    Form_Data.push([st_name, st_phone, st_email]);
    localStorage.setItem("itemJson", JSON.stringify(Form_Data));

    // submit.preventDefault();

    // document.getElementById("result").innerHTML = localStorage.getItem("itemJson");
  }
}
function updateTable() {
    Form_DataStr = localStorage.getItem("itemJson");
  Form_Data = JSON.parse(Form_DataStr);
  if (i == null) {
    i = 0;
  }
  for (i = i; i < Form_Data.length; ++i) {
    var rowCount = myTable.rows.length;
    var row = myTable.insertRow(rowCount);
    row.insertCell(0).innerHTML = i + 1;
    row.insertCell(1).innerHTML = Form_Data[i][0];
    row.insertCell(2).innerHTML = Form_Data[i][1];
    row.insertCell(3).innerHTML = Form_Data[i][2];
    i = i;
  }
}

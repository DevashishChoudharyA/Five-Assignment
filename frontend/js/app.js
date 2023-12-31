// Function to take input from form and send it backend to save it in database
async function sendSaveRequest() {
    // Get form values
  const name = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const phoneno = document.getElementById('phoneno').value;
  const hobbies = document.getElementById('hobbies').value;

  const warn = document.getElementById('warning');

    if (!validateEmail(email) &&   warn) {
      warn.innerText = "The email entered is wrong";
      console.log("Email is not valid");
      return;
    }

    if(!validatePhoneNumber(phoneno) && warn) {
      warn.innerText = "The phone number entered is wrong";
      console.log("Phone number is not valid");
      return;
    }

  // Create an object with the form data
  const formData = {
    username: name,
    email: email,
    phoneno: phoneno,
    hobbies: hobbies
  };

  // Send a POST request using the Fetch API
  const response = await fetch('https://five-nv5o.onrender.com/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (response.ok) {
    const result = await response.text();
    location.reload();
    console.log(result);
    // await fetchData();
  } else {
    console.log('Error saving data from front end to the server');
  }
}

  // This regex allows for various email formats, adjust as needed
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  // This regex allows for various phone number formats, adjust as needed
  const phoneRegex = /^[0-9()+-]*$/;
  const isValidLength = phoneNumber.length >= 10 && phoneNumber.length <= 12;
  return phoneRegex.test(phoneNumber) && isValidLength;
}



//This function is used to fetch the data from the backend and load it in frontend
async function fetchData() {
    try {
        const response = await fetch('https://five-nv5o.onrender.com/getData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 1000,
        }); 
    const data = await response.json();

    // Process the data as needed
    console.log(data);

    // Get the table body element
    const tbody = document.getElementById('dataBody');

    // Iterate over the data and create table rows
    data.forEach(row => {
    const tr = document.createElement('tr');

    // Create and append the cells to the row
    const checkboxCell = document.createElement('td');
    checkboxCell.innerHTML = '<input type="checkbox" class="row"/>';
    tr.appendChild(checkboxCell);

    const idCell = document.createElement('td');
    idCell.textContent = row._id;
    tr.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = row.username;
    tr.appendChild(nameCell);

    const phoneNumberCell = document.createElement('td');
    phoneNumberCell.textContent = row.phoneno;
    tr.appendChild(phoneNumberCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = row.email;
    tr.appendChild(emailCell);

    const hobbiesCell = document.createElement('td');
    hobbiesCell.textContent = row.hobbies;
    tr.appendChild(hobbiesCell);

    // Append the row to the table body
    tbody.appendChild(tr);
});
    } catch (error) {
      console.log('Error while loading data from the Database to the frontend',error);
    }
}
// Calling the function
fetchData();

// Function to take the number of Email ids as input and send them mails
async function sendEmail() {

    const checkedEmails = await getEmailsOfCheckedRows();

    console.log('Emails of Checked Rows:', checkedEmails);
   
    if (checkedEmails.length > 0) {
      try {
        for (let index = 0; index < checkedEmails.length; index++) {
          const response = await fetch('https://five-nv5o.onrender.com/sendEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to: checkedEmails[index] }), // Sending as JSON object
          });

          if (response.ok) {
            console.log('Emails sent successfully!');
          } else {
            console.log('Failed to send emails.');
          }
        }
      } catch (error) {
        console.error('Error sending emails:', error);
      }
    }
  } 


// Function to make an array of selected emails 
    async function getEmailsOfCheckedRows() {
      const checkedEmails = [];
      const checkboxes = document.querySelectorAll('#dataBody input.row:checked');
    
      checkboxes.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        const emailCell = row.querySelector('td:nth-child(5)'); //email is in the 5th column
        const email = emailCell.textContent;
        checkedEmails.push(email);
      });
    
      return checkedEmails;
    }
  
// Data(row/rows) to be sent to a particular mail


    // Function to take the number of Email ids as input and send them mails
async function sendRowOverMail() {

  const checkedEmail = await getDataOfRowsToSend();

  console.log('Emails of Checked Rows:', checkedEmail);
 
  if (checkedEmail.length > 0) {
    try {
      console.log(checkedEmail);
        const response = await fetch('https://five-nv5o.onrender.com/sendData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: JSON.stringify(checkedEmail) }), // Sending as JSON object
        });

        if (response.ok) {
          console.log('Emails sent successfully!');
        } else {
          console.log('Failed to send emails.');
        }
      
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  }
} 


// Function to make an array of selected emails 
  async function getDataOfRowsToSend() {
    const checkedEmail = [];
    const checkboxes = document.querySelectorAll('#dataBody input.row:checked');
  
    checkboxes.forEach((checkbox) => {
      const row = checkbox.closest('tr');

      const idCell = row.querySelector('td:nth-child(2)'); //id is in the 2nd column
      const id = idCell.textContent;

      const nameCell = row.querySelector('td:nth-child(3)'); //Name is in the 3rd column
      const name = nameCell.textContent;

      const phonenoCell = row.querySelector('td:nth-child(4)'); //Phone Number is in the 4th column
      const phoneno = phonenoCell.textContent;

      const emailCell = row.querySelector('td:nth-child(5)'); //email is in the 5th column
      const email = emailCell.textContent;

      const hobbiesCell = row.querySelector('td:nth-child(6)'); //hobies is in the 6th column
      const hobbies = hobbiesCell.textContent;

      checkedEmail.push({id,name,phoneno,email,hobbies});
    });
  
    return checkedEmail;
  }



  // Delete the selected rows from database
  async function deleteData() {

    const checkedIds = await getIdsToBeDeleted();

    console.log('Emails of Checked Rows:', checkedIds);
   
    if (checkedIds.length > 0) {
      try {
        for (let index = 0; index < checkedIds.length; index++) {
          const response = await fetch('https://five-nv5o.onrender.com/deleteData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: checkedIds[index] }), // Sending as JSON object
          });

          if (response.ok) {
            console.log('Data deleted!');
          } else {
            console.log('Failed to send emails.');
          }
        }
        location.reload();
      } catch (error) {
        console.error('Error sending emails:', error);
      }
    }
  } 


// Function to make an array of selected emails 
    async function getIdsToBeDeleted() {
      const checkedIds = [];
      const checkboxes = document.querySelectorAll('#dataBody input.row:checked');
    
      checkboxes.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        const idCell = row.querySelector('td:nth-child(2)'); //ids is in the 2nd column
        const id = idCell.textContent;
        checkedIds.push(id);
      });
    console.log(checkedIds);
      return checkedIds;
    }



    // Update all the values of a particular row
let idForUpdate ;
 async function openPopup() {
    const getTheUpdateID = await getIdsToBeDeleted();
    const updatewarn = document.getElementById('updateWarning');
    if(getTheUpdateID.length==0) {
      updatewarn.innerText = "You need to select 1 row to update";
      return;
    }else if (getTheUpdateID.length==1) {
      document.getElementById('popup').style.display = 'block';
      idForUpdate=getTheUpdateID;
    }else {
      updatewarn.innerText="You can only update one row at a time";
    } 
  }

  async function submitForm() {
    const name = document.getElementById('username1').value;
    const email = document.getElementById('email1').value;
    const phoneno = document.getElementById('phoneno1').value;
    const hobbies = document.getElementById('hobbies1').value;

    console.log(name);
    console.log(email);
    console.log(phoneno);
    console.log(hobbies);
    const warnPop = document.getElementById('warningPop');

    if (!validateEmail(email) &&   warnPop) {
      warnPop.innerText = "The email entered is wrong";
      console.log("Email is not valid");
      return;
    }

    if(!validatePhoneNumber(phoneno) && warnPop) {
      warnPop.innerText = "The phone number entered is wrong";
      console.log("Phone number is not valid");
      return;
    }

    const formData = {
      id : idForUpdate[0],
      username: name,
      email: email,
      phoneno: phoneno,
      hobbies: hobbies
    };
    console.log(formData);

    const response = await fetch('http://localhost:8080/updateRow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (response.ok) {
    const result = await response.text();
    location.reload();
    console.log(result);
    // await fetchData();
  } else {
    console.log('Error saving data from front end to the server');
  }
    // You can do further processing with the data here

    // Close the popup
    document.getElementById('popup').style.display = 'none';
    location.reload();
  }
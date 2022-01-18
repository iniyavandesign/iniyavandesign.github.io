const firebaseConfig = {
    apiKey: "AIzaSyACwfmaRt6fMEZfQ4wK_NT5YLMl81A6rxI",
    authDomain: "portfolio-hire.firebaseapp.com",
    databaseURL: "https://portfolio-hire-default-rtdb.firebaseio.com",
    projectId: "portfolio-hire",
    storageBucket: "portfolio-hire.appspot.com",
    messagingSenderId: "777481658832",
    appId: "1:777481658832:web:b82aec6052e9c5ba6f19d5"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("hireForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  var name = getElementVal("name_cp");
  var company = getElementVal("company_name");
  var msgContent = getElementVal("msg");

  saveMessages(name, company, msgContent);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 5000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, company, msgContent) => {
  var newContactForm = contactFormDB.push();
  newContactForm.set({
    name: name,
    company: company,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
import { format } from "prettier";
import { validate } from "schema-utils";
import "./style/style.css";

// DOM

const body = document.querySelector("body");
const button = document.querySelector("button");
const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const eMail = document.getElementById("mail");
const zipCode = document.getElementById("zip");
const password = document.getElementById("pWord");
const confirmPWord = document.getElementById("cPWord");
const country = document.getElementById("country");
const form = document.querySelector('form');

function checkZipCode() {
  const countryCode = country.value;
  const constraints = {
    JP: [
      "^\\d{3}-\\d{4}",
      "The pattern for the postal code of Japan is ###-####, ex: 445-6543",
    ],
    KR: [
      "^\\d{5}$",
      "The pattern for the postal code of South Korea is #####, ex: 46704",
    ],
    SG: [
      "^\\d{6}$",
      "The pattern for the postal code of Singapore is ######, ex: 798934",
    ],
  };

  const constraint = new RegExp(constraints[countryCode][0]);

  if (constraint.test(zipCode.value)) {
    zipCode.setCustomValidity("");
    return true;
  }
  zipCode.setCustomValidity(constraints[countryCode][1]);
  return false;
}

function checkPasswordPattern() {
  const passwordPattern = new RegExp(
    "^.*(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).*$"
  );
  if (passwordPattern.test(password.value)) {
    
    password.setCustomValidity("");
    return true;
  }
  password.setCustomValidity(
    "Your password must contain capital and small letters, numbers, and special characters."
  );
  return false;
}

function confirmPassword() {
  if (password.value === confirmPWord.value) {
    confirmPWord.setCustomValidity("");
    return true;
  }
  confirmPWord.setCustomValidity(
    "Please enter the same entries with your initial password."
  );
  return false;
}

function removeEntries() {
  const options = document.querySelectorAll('option');
  let selected
  options.forEach((option) => {
    if (option.selected === true) selected = option
  })
  fName.value = "";
  lName.value = "";
  eMail.value = "";
  country.selectedIndex = 0;
  zipCode.value = "";
  password.value = "";
  confirmPWord.value = "";
}

function validateForm(event) {
  event.stopPropagation();
  if (!fName.checkValidity()) {
    fName.classList.add("submitted");
    fName.reportValidity();
  } else if (!lName.checkValidity()) {
    lName.reportValidity();
  } else if (!eMail.checkValidity()) {
    eMail.reportValidity();
  } else if (!checkZipCode(zipCode)) {
    zipCode.reportValidity("");
  } else if (!checkPasswordPattern()) {
    password.reportValidity();
  } else if (!confirmPassword()) {
    confirmPWord.reportValidity();
  } else {
    removeEntries();
    alert("Yey!!!");
  }
  event.preventDefault();
}



button.addEventListener("click", validateForm);

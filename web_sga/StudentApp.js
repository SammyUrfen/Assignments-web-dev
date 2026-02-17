function validateName(){
  const nameEl = document.getElementById('name');
  const val = nameEl.value.trim();
  const re = /^[A-Za-z ]+$/;
  if(val === '' || !re.test(val)){
    alert('Name must contain only alphabets and spaces and cannot be blank.');
    nameEl.focus();
    return false;
  }
  return true;
}

function validateDOB(){
  const dobEl = document.getElementById('dob');
  const val = dobEl.value.trim();
  const re = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if(val === '' || !re.test(val)){
    alert('Date of birth must be in dd/mm/yyyy format and cannot be blank.');
    dobEl.focus();
    document.getElementById('age').value = '';
    return false;
  }
  computeAgeFromDOB(val);
  return true;
}

function computeAgeFromDOB(dobVal){
  const parts = dobVal.split('/');
  const day = parseInt(parts[0],10), month = parseInt(parts[1],10)-1, year = parseInt(parts[2],10);
  const dob = new Date(year, month, day);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  if(Number.isFinite(age) && age >= 0){
    document.getElementById('age').value = age;
  } else {
    document.getElementById('age').value = '';
  }
}

function validateMobile(){
  const el = document.getElementById('mobile');
  const v = el.value.trim();
  const re = /^[0-9]+$/;
  if(v === '' || !re.test(v) || v.charAt(0) === '0'){
    alert('Mobile number must contain only digits, cannot start with 0 and cannot be blank. Field will be cleared.');
    el.value = '';
    el.focus();
    return false;
  }
  return true;
}

function validateEmail(){
  const el = document.getElementById('email');
  const v = el.value.trim();
  if(v === '' ){
    alert('Email cannot be blank.');
    el.focus();
    return false;
  }
  if(v.charAt(0) === '@' || v.indexOf('@') === -1 || !(v.endsWith('.com') || v.endsWith('.in'))){
    alert('Email must contain "@", must not start with "@", and must end with .com or .in. Field will be cleared.');
    el.value = '';
    el.focus();
    return false;
  }
  return true;
}

document.getElementById('studentForm').addEventListener('submit', function(e){
  e.preventDefault();
  if(!validateName() || !validateDOB() || !validateMobile() || !validateEmail()){
    return;
  }

  class Student {
    constructor(name,dob,age,mobile,email){
      this.name = name;
      this.dob = dob;
      this.age = age;
      this.mobile = mobile;
      this.email = email;
    }
  }

  const name = document.getElementById('name').value.trim();
  const dob = document.getElementById('dob').value.trim();
  const age = document.getElementById('age').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const email = document.getElementById('email').value.trim();

  const student = new Student(name,dob,age,mobile,email);

  const payload = encodeURIComponent(JSON.stringify(student));
  document.cookie = `studentData=${payload};path=/;max-age=${60*60*24}`;

  alert('Form submitted and saved to cookie. Proceed to retrieve section.');

  document.getElementById('retrieveSection').style.display = 'block';
  document.getElementById('retrieveSection').scrollIntoView({behavior:'smooth'});
});

document.getElementById('retrieveBtn').addEventListener('click', function(){
  const q = document.getElementById('retrieveMobile').value.trim();
  if(!q){ alert('Please enter a mobile number to retrieve.'); return; }
  const cookies = document.cookie.split(';').map(c=>c.trim());
  const found = cookies.find(c=>c.startsWith('studentData='));
  if(!found){ alert('No student cookie found.'); return; }
  try{
    const json = decodeURIComponent(found.split('=')[1]);
    const obj = JSON.parse(json);
    if(obj.mobile === q){
      alert(`Student details:\nName: ${obj.name}\nDOB: ${obj.dob}\nAge: ${obj.age}\nMobile: ${obj.mobile}\nEmail: ${obj.email}`);
    } else {
      alert('No matching mobile number found in cookie.');
    }
  } catch(err){
    alert('Error parsing stored cookie data.');
  }
});

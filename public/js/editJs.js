
let students = [];

function getListStudent(){
    return axios.get("/users"); 
}
function getStudentByID(id){
    return axios.get(`/users/${id}`)
}

function updateStudentAPI(id,newName,newEmail,newPhone,newBirthday){
    return axios.put(`/users/${id}`,{
        id : id,
        name: newName,
        email: newEmail,
        phone: newPhone,
        birthday: newBirthday
    })
}
async function getStudents() {
    try {
        const res = await getListStudent();
        students = res.data;
    } catch (error) {
        console.log(error);
    }
}

async function updateStudent(id,newName,newEmail,newPhone,newBirthday) {
    try {
        const res = await updateStudentAPI(id,newName,newEmail,newPhone,newBirthday);
        for(let i = 0 ;i  < students.length ; i++) {
            if(students[i] == id){
                students[i].name = newName;
                students[i].email = newEmail;
                students[i].phone = newPhone;
                students[i].birthday = newBirthday
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  function validateDOB(phone) {
    var pattern =/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/;
    if (phone == null || phone == "" || !pattern.test(phone)) {
      return false;
    } else {
      return true;
    }
  }
  function validateName(name) {
    if (name.length < 8) {
      return false;
    }
    return true;
  }

  function phonenumber(inputtxt)
  {
    var phoneno = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if(!phoneno.test(inputtxt))
          {
        return true;
          }
        else
          {
          
          return false;
          }
  }
  

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

let input_name = document.getElementById('name')
let input_birthday = document.getElementById('birthday')
let input_email = document.getElementById('email')
let input_phone = document.getElementById('phone')
let btn_save = document.getElementById('btn-save')

async function tuDien(){
    try {
        let id = getUrlParameter('id')
        const res = await getStudentByID(id)
        
        input_name.value = res.data.name
        input_email.value = res.data.email
        input_phone.value = res.data.phone
        input_birthday.value = res.data.birthday
    } catch (error) {
        console.log(error)
    }
}
btn_save.addEventListener('click',function(){
   let name = input_name.value;
   let birthday = input_birthday.value;
   let email = input_email.value;
   let phone = input_phone.value;
   if (name == "" || birthday == "" || email == "" || phone == "") {
    alert("Kh??ng ???????c ????? tr???ng 1 Field nao het");
    return;
  } else if (validateEmail(email) == false) {
    alert("Email kh??ng ????ng ?????nh d???ng");
  } else if (validateDOB(birthday) == false) {
    alert("Ng??y th??ng n??m sinh kh??ng ????ng ?????nh d???ng");
  } else if (validateName(name) == false) {
    alert("T??n Ph???i D??i h??n 8 k?? t???");
  } else if (phonenumber(phone)) {
    alert("S??? ??i???n Tho???i ph???i ????ng 10 s??? v?? ?????nh d???ng s??? Vi???t Nam");
  }
  else{
    let id = getUrlParameter('id')
    updateStudent(id,name,email,phone,birthday)
    window.location.href = "index.html";
  }
  
})


let btnBack = document.getElementById('back')
btnBack.addEventListener('click',function(){
  window.location.href = "index.html";
})


window.onload = () => {
    getStudents();
    tuDien();
 };
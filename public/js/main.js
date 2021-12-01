
let tbodyTarget = document.getElementsByTagName('tbody')[0]
let students = [];

//===============API=====================
function getListStudent(){
    return axios.get("/users"); 
}
function deleteStudentAPI(id){
    return axios({
        method : "delete",
        url : `/users/${id}`
    })
}

function compare( a, b ) {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
  }

function renderUI(arr){
      tbodyTarget.innerHTML = "";
      //Kiem tra mang rong
      if(arr.length == 0 ){
          tbodyTarget.innerHTML = "Khong co sinh vien "
          return;
      }
      // TH co hoc sinh
      for (let i = 0 ; i < arr.length ; i++){
          const t = arr[i]
          tbodyTarget.innerHTML += `<tr>
          <td>${t.name}</td>
          <td>${t.birthday}</td>
          <td>${t.email}</td>
          <td>${t.phone}</td>
          <td>
              <a href="/edit.html?id=${t.id}" class="text-info"><i class="fa fa-edit"></i> Chỉnh sửa</a>
              |
              <a class="text-danger"  onclick=popup(${t.id})><i class="fa fa-trash-alt"></i> Xóa</a>
          </td>
      </tr>`
      }
     
}
// == Ham Xu ly ===

async function getStudents() {
    try {
        const res = await getListStudent();
        students = res.data;
        students.sort((a,b) => (a.id < b.id ) ? 1 : ((b.id  < a.id ) ? -1 : 0))
        console.log(students)

        // Render ra ngoài giao diện
        renderUI(students);
    } catch (error) {
        console.log(error);
    }
}

async function deleteStudent(id) {
    try {
        await deleteStudentAPI(id) // Gọi API xóa

        // Xóa todo trong mảng todos ban đầu
        students.forEach((student, index) => {
            if(student.id == id) {
                students.splice(index, 1)
            }
        })

        renderUI(students)

    } catch (error) {
        console.log(error);
    }
}

function popup(id){
var modal = document.getElementById("myModal");

let textTarget = document.getElementById('text')
textTarget.innerHTML = `Bạn có muốn xóa sinh viên id : ${id}`


// Get the <span> element that closes the modal
let btnHuy = document.getElementsByClassName("btn-light")[0];
let btnXacNhan = document.getElementById('xacNhan')


// When the user clicks the button, open the modal 
modal.style.display = "block";

btnXacNhan.onclick = function(){
    deleteStudent(id)
    modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
btnHuy.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}

window.onload = () => {
    getStudents();
 };

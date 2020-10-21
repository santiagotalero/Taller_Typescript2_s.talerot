import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { student } from './dataStudent.js';

import { Student } from './student.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

let studentTbody: HTMLElement = document.getElementById('student')!;

const btnfilterByCreds: HTMLElement = document.getElementById("button-filterByCreds")!;
const inputMinCreds: HTMLInputElement = <HTMLInputElement> document.getElementById("minCreds")!;
const inputMaxCreds: HTMLInputElement = <HTMLInputElement> document.getElementById("maxCreds")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCreds.onclick = () => applyFilterByCreds();

renderCoursesInTable(dataCourses);

renderStudentInTable(student);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInTable(student: Student): void {
  
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Codigo</td>
                           <td>${student.codigo}</td>`;
    studentTbody.appendChild(trElement);
    let trElement2 = document.createElement("tr");
    trElement2.innerHTML = `<td>Cedula</td>
                           <td>${student.cedula}</td>`;
    studentTbody.appendChild(trElement2);
    let trElement3 = document.createElement("tr");
    trElement3.innerHTML = `<td>Edad</td>
                           <td>${student.edad}</td>`;
    studentTbody.appendChild(trElement3);
    let trElement4 = document.createElement("tr");
    trElement4.innerHTML = `<td>Direccion</td>
                           <td>${student.direccion}</td>`;
    studentTbody.appendChild(trElement4);
    let trElement5 = document.createElement("tr");
    trElement5.innerHTML = `<td>Telefono</td>
                           <td>${student.telefono}</td>`;
    studentTbody.appendChild(trElement5);
   
    // trElement.innerHTML = `<tr>${student.cedula}</tr>`;
    // studentTbody.appendChild(trElement);
    // trElement.innerHTML = `<td>${student.edad}</td>`;
    // studentTbody.appendChild(trElement);
    // trElement.innerHTML = `<td>${student.direccion}</td>`;
    // studentTbody.appendChild(trElement);
    // trElement.innerHTML = `<td>${student.telefono}</td>`;
    // studentTbody.appendChild(trElement);
}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
    
btnfilterByName.onclick = () => applyFilterByName();
}
function applyFilterByCreds() { 
  let minT = inputMinCreds.value;
  let maxT = inputMaxCreds.value;
  minT = (minT == null) ? '0' : minT;
  maxT = (maxT == null) ? '10' : maxT;
  let min= +minT;
  let max= +maxT;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCreds(min,max, dataCourses);
  renderCoursesInTable(coursesFiltered);
}
function searchCourseByCreds(min: number,max:number, courses: Course[]) {
  return courses.filter( c => 
    c.credits>=min && c.credits<=max);
    
btnfilterByCreds.onclick = () => applyFilterByCreds();
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}
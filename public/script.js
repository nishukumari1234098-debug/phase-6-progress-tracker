let progressForm = document.getElementById("progressForm");
let studentName = document.getElementById("studentName")
let courseName = document.getElementById("courseName")
let completionPercentage = document.getElementById("completionPercentage")
let message = document.getElementById("message")
let progressContainer = document.getElementById("progressContainer")



progressForm.addEventListener("submit", async (event)=>{
    event.preventDefault()

    let name = studentName.value;
    let course = courseName.value;
    let percentage = completionPercentage.value


    const studentProgress = {
        studentName: name,
        courseName: course,
        percentage: Number(percentage)
    }

    const response = await fetch("/progress", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(studentProgress)
    })
    const data = await response.json()

    if(data.success){
        message.textContent = "Details Submitted Successfully!"
        getData()
    }else{
        message.textContent = data.message
    }

    studentName.value = ""
    courseName.value = ""
    completionPercentage.value = ""

})

async function getData() {
    const response = await fetch("/progress-tracker")
    const data = await response.json()

    progressContainer.innerHTML = ""

    data.data.forEach((contact) => {
        const div = document.createElement("div")

        div.innerHTML = `
        <p>Name: ${contact.studentName}</p>
        <p>Course: ${contact.courseName}</p>
        <p>Completion Percentage: ${contact.percentage}</p>
        `
        progressContainer.appendChild(div)
    });
}
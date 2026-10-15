const API_URL = "/api/students";

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const message = document.getElementById("message");

async function loadStudents() {
    studentTable.replaceChildren();

    const loadingRow = document.createElement("tr");
    const loadingCell = document.createElement("td");
    loadingCell.colSpan = 5;
    loadingCell.textContent = "Loading students...";
    loadingRow.appendChild(loadingCell);
    studentTable.appendChild(loadingRow);

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load students.");
        }

        const students = await response.json();
        studentTable.replaceChildren();

        if (students.length === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.colSpan = 5;
            cell.textContent = "No students found.";
            row.appendChild(cell);
            studentTable.appendChild(row);
            return;
        }

        students.forEach((student) => {
            const row = document.createElement("tr");

            [student.id, student.name, student.email, student.course]
                .forEach((value) => {
                    const cell = document.createElement("td");
                    cell.textContent = value ?? "";
                    row.appendChild(cell);
                });

            const actionCell = document.createElement("td");
            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.type = "button";
            deleteButton.addEventListener("click", () => {
                deleteStudent(student.id, deleteButton);
            });

            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);
            studentTable.appendChild(row);
        });
    } catch (error) {
        studentTable.replaceChildren();

        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 5;
        cell.textContent = "Unable to load students. Is the server running?";
        row.appendChild(cell);
        studentTable.appendChild(row);
    }
}

studentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = studentForm.querySelector(
        'button[type="submit"]'
    );
    submitButton.disabled = true;
    message.textContent = "";

    const student = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        course: document.getElementById("course").value.trim()
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Could not add student.");
        }

        studentForm.reset();
        message.textContent = "Student added successfully!";
        await loadStudents();
    } catch (error) {
        message.textContent = error.message || "Something went wrong.";
    } finally {
        submitButton.disabled = false;
    }
});

async function deleteStudent(id, button) {
    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    button.disabled = true;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(
                response.status === 404
                    ? "Student not found."
                    : "Could not delete student."
            );
        }

        message.textContent = "Student deleted successfully.";
        await loadStudents();
    } catch (error) {
        message.textContent = error.message;
        button.disabled = false;
    }
}

loadStudents();

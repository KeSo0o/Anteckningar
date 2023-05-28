window.addEventListener("DOMContentLoaded", function() {
    const notesContainer = document.getElementById("notes-container");
    const noteForm = document.getElementById("note-form");
    const noteTitleInput = document.getElementById("note-title");
    const noteTextInput = document.getElementById("note-text");
  
    noteForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const title = noteTitleInput.value.trim();
      const text = noteTextInput.value.trim();
  
      if (title === "" || text === "") {
        alert("Var vänlig fyll i både titel och anteckningstext.");
        return;
      }
  
      const timestamp = new Date().toLocaleString();
      const note = createNoteElement(title, text, timestamp);
      notesContainer.appendChild(note);
  
      noteTitleInput.value = "";
      noteTextInput.value = "";
    });
  
    function createNoteElement(title, text, timestamp) {
      const note = document.createElement("div");
      note.className = "note";
  
      const titleElement = document.createElement("div");
      titleElement.className = "title";
      titleElement.textContent = title;
  
      const dateElement = document.createElement("div");
      dateElement.className = "date";
      dateElement.textContent = timestamp;
  
      const textElement = document.createElement("div");
      textElement.className = "text";
      textElement.textContent = text;
  
      const actionsElement = document.createElement("div");
      actionsElement.className = "actions";
      const editButton = document.createElement("button");
      editButton.textContent = "Redigera";
      editButton.addEventListener("click", function() {
        editNoteText(textElement, text);
      });
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Radera";
      deleteButton.addEventListener("click", function() {
        deleteNoteElement(note);
      });
      actionsElement.appendChild(editButton);
      actionsElement.appendChild(deleteButton);
  
      note.appendChild(titleElement);
      note.appendChild(dateElement);
      note.appendChild(textElement);
      note.appendChild(actionsElement);
  
      return note;
    }
  
    function editNoteText(textElement, currentText) {
      const newText = prompt("Redigera anteckningstext:", currentText);
      if (newText !== null) {
        textElement.textContent = newText.trim();
      }
    }
  
    function deleteNoteElement(note) {
      if (confirm("Är du säker på att du vill radera denna anteckning?")) {
        note.parentNode.removeChild(note);
      }
    }
  
    // Återställ anteckningar från lokal lagring
    restoreNotesFromStorage();
  
    function restoreNotesFromStorage() {
      const savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        notes.forEach(function(note) {
          const noteElement = createNoteElement(note.title, note.text, note.timestamp);
          notesContainer.appendChild(noteElement);
        });
      }
    }
  
    // Spara anteckningar i lokal lagring vid uppdateringar
    window.addEventListener("beforeunload", function() {
      const noteElements = document.querySelectorAll(".note");
      const notes = [];
      noteElements.forEach(function(noteElement) {
        const title = noteElement.querySelector(".title").textContent;
        const text = noteElement.querySelector(".text").textContent;
        const timestamp = noteElement.querySelector(".date").textContent;
        notes.push({ title, text, timestamp });
      });
      localStorage.setItem("notes", JSON.stringify(notes));
    });
  });
  
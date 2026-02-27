// FORM SUBMISSION
const form = document.getElementById("itemForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const itemText = document.getElementById("itemInput").value;
  const category = document.getElementById("categoryInput").value;

  // CREATE ITEM PILL
  const pill = document.createElement("div");
  pill.className = "item-pill";
  pill.draggable = true;

  pill.innerHTML = `
    <span>${itemText}</span>
    <span class="toggle">⭐</span>
  `;

  // TOGGLE IMPORTANT
  pill.querySelector(".toggle").addEventListener("click", () => {
    pill.classList.toggle("important");
  });

  // ENABLE DRAG
  enableDrag(pill);

  // APPEND TO CORRECT COLUMN
  const list = document.querySelector(`.column.${category} .item-list`);
  list.appendChild(pill);

  // UPDATE COUNTS
  updateCounts();

  // RESET FORM
  form.reset();
});

// DRAG & DROP FUNCTION
function enableDrag(item) {
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
    updateCounts();
  });
}

// DRAG OVER EVENT FOR ALL COLUMNS
document.querySelectorAll(".item-list").forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    if (dragging) list.appendChild(dragging);
  });
});

// UPDATE ITEM COUNTS
function updateCounts() {
  document.querySelectorAll(".column").forEach((column) => {
    const count = column.querySelectorAll(".item-pill").length;
    column.querySelector(".count").innerText = count;
  });
}

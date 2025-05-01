// === State ===
let bank = []; // Numbers waiting to be sorted
let odds = []; // Sorted odd numbers
let evens = []; // Sorted even numbers

// this is the function to add a form where users submit a number
function NumberForm() {
  const $form = document.createElement("form");

  $form.innerHTML = `
      <label>
        Enter a number:
        <input name="number" type="number" required />
      </label>
      <button>Add Number</button>
    `;

  $form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData($form);
    const number = parseInt(formData.get("number"), 10);

    if (!isNaN(number)) {
      bank.push(number);
      render();
    }
  });

  return $form;
}

// this builds the bank list of numbers

function BankList() {
  const $section = document.createElement("section");
  $section.classList.add("bank");

  const $title = document.createElement("h2");
  $title.textContent = "Number Bank";
  $section.appendChild($title);

  const $list = document.createElement("ul");

  if (bank.length === 0) {
    const $empty = document.createElement("li");
    $empty.textContent = "(empty)";
    $list.appendChild($empty);
  } else {
    for (const num of bank) {
      const $item = document.createElement("li");
      $item.textContent = num;
      $list.appendChild($item);
    }
  }

  $section.appendChild($list);
  return $section;
}
// here is the function that will add the buttons and sort the numbers
function ControlPanel() {
  const $controls = document.createElement("section");
  $controls.classList.add("controls");

  const $sortOne = document.createElement("button");
  $sortOne.textContent = "Sort 1";
  $sortOne.addEventListener("click", () => {
    if (bank.length > 0) {
      const num = bank.shift(); // remove first number
      if (num % 2 === 0) {
        evens.push(num);
      } else {
        odds.push(num);
      }
      render();
    }
  });

  const $sortAll = document.createElement("button");
  $sortAll.textContent = "Sort All";
  $sortAll.addEventListener("click", () => {
    while (bank.length > 0) {
      const num = bank.shift();
      if (num % 2 === 0) {
        evens.push(num);
      } else {
        odds.push(num);
      }
    }
    render();
  });

  $controls.appendChild($sortOne);
  $controls.appendChild($sortAll);

  return $controls;
}
// here is the function to display the sorted lists
function SortedLists() {
  const $sortedLists = document.createElement("div");

  // Odd numbers section
  const $oddSection = document.createElement("section");
  $oddSection.classList.add("odd");
  $oddSection.innerHTML = `<h2>Odd Numbers</h2>`;
  const $oddList = document.createElement("ul");
  odds.forEach((num) => {
    const $li = document.createElement("li");
    $li.textContent = num;
    $oddList.appendChild($li);
  });
  $oddSection.appendChild($oddList);
  $sortedLists.appendChild($oddSection);

  // Even numbers section
  const $evenSection = document.createElement("section");
  $evenSection.classList.add("even");
  $evenSection.innerHTML = `<h2>Even Numbers</h2>`;
  const $evenList = document.createElement("ul");
  evens.forEach((num) => {
    const $li = document.createElement("li");
    $li.textContent = num;
    $evenList.appendChild($li);
  });
  $evenSection.appendChild($evenList);
  $sortedLists.appendChild($evenSection);

  return $sortedLists;
}
// render to the html file
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Events</h1>
  `;
  // Append components to the app
  $app.appendChild(NumberForm());
  $app.appendChild(BankList());
  $app.appendChild(ControlPanel());
  $app.appendChild(SortedLists());
}
render();

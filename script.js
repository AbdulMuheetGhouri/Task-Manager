let radio_btns = document.querySelectorAll(".radiobtns input");
let add_container = document.querySelector(".add-container");
let show_container = document.querySelector(".show-container");
let btn = document.getElementById("add");
let task = document.querySelector(".add-container input ");
let msg = document.querySelector(".add-container .msg");
let ol = document.querySelector("ol");
let btn2 = document.querySelector(".show-container button");
let info_div = document.querySelector(".show-container .info");
let isEditing = false;
let currentEditingLi = null;


// info div
const display_info_div = () => {
    if (ol.children.length <= 0) {
        info_div.style.display = "flex";
    } else {
        info_div.style.display = "none";
    }
}

// Automatically running code after window loading
window.addEventListener("load", () => {
    for (const radio of radio_btns) {
        if (radio.value === "add") {
            radio.checked = true;
        }
    }
    add_container.style.display = "flex";
    display_info_div();
});

// radio buttons functionality
radio_btns.forEach(e => {
    e.addEventListener("change", () => {
        if (e.value === "show") {
            add_container.style.display = "none";
            show_container.style.display = "flex";
        } else if (e.value === "add") {
            add_container.style.display = "flex";
            show_container.style.display = "none";
        }
    });
});

// Tasks Addition/Update functionality

btn.addEventListener("click", () => {
    if (task.value === "") {
        msg.style.color = "red";
        msg.innerText = `Task can't be empty!`;
    } else {
        if (isEditing) {
            
            
            
            currentEditingLi.querySelector('.task').innerText = task.value;
            msg.style.color = "green";
            msg.innerText = `Task Updated Successfully.`;
            

            isEditing = false;
            currentEditingLi = null;
            btn.textContent = "ADD";

        } 
        else {
            // Add new task
            let li = document.createElement("li");
            li.innerHTML = `
                <div class="items">
                    <span class="task ">${task.value}</span>
                    <span class="icons">
                        <abbr title = "Delete" ><i class="fa fa-trash"></i></abbr>
                        <abbr title= "Edit" ><i class="fa fa-edit"></i></abbr>
                    </span>
                </div>
            `;
            ol.appendChild(li);
            msg.style.color = "green";
            msg.innerText = `Task Added Successfully.`;
        }
        
        task.value = "";
        display_info_div();
    }

    setTimeout(() => {
        msg.style.display = "none";
    }, 1000);
    msg.style.display = "block";
});

// btn2 functionality
btn2.addEventListener("click", () => {
    for (radio of radio_btns) {
        if (radio.value === "add") {
            radio.checked = "true";
            show_container.style.display = "none";
            add_container.style.display = "flex";
        }
    }
});


// delete and edit functionality

ol.addEventListener("click", (e) => {
    let li = e.target.closest("li");
    
    if (e.target.classList.contains("fa-trash")) {
        li.remove();
        display_info_div();
        

    } 
    else if (e.target.classList.contains("fa-edit")) {
    
        btn.textContent = "Update";
        radio_btns.forEach(radio => {
            if (radio.value === "add") {
                radio.checked = true;
                add_container.style.display = "flex";
                show_container.style.display = "none";
            }
        });

        
        currentEditingLi = li;
        isEditing = true;

        task.value = li.querySelector(".task").innerText;
        task.focus();

        
    }
});


// Theme Toggle Functionality
// Better selectors (add these classes to your HTML buttons)
const themeToggle = {
  light: document.querySelector('.light-theme-btn'),
  dark: document.querySelector('.dark-theme-btn')
};

// Set initial theme from localStorage or system preference
function setInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-theme');
    themeToggle.dark.classList.add('active');
  } else {
    themeToggle.light.classList.add('active');
  }
}

// Theme switching function
function switchTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    themeToggle.dark.classList.add('active');
    themeToggle.light.classList.remove('active');
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    themeToggle.light.classList.add('active');
    themeToggle.dark.classList.remove('active');
  }
}

// Event listeners
themeToggle.light.addEventListener('click', () => switchTheme('light'));
themeToggle.dark.addEventListener('click', () => switchTheme('dark'));

setInitialTheme();
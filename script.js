const projects = {
    project1: { title: "Basics - HTML & CSS", url: "tasks/task1/task1.html", icon: "fa-desktop" },
    project2: { title: "CSS Hover", url: "tasks/task2/index.html", icon: "fa-camera" },
    project3: { title: "Welcome to JS", url: "tasks/task3/index.html", icon: "fa-brands fa-js" },
    project4: { title: "Calculator with JS", url: "tasks/task4/index.html", icon: "fa-calculator" },
    project5: { title: "String Operation", url: "tasks/task5/index.html", icon: "fa-solid fa-keyboard" },
    project6: { title: "Conditionals", url: "tasks/task6/index.html", icon: "fa-solid fa-square-poll-horizontal" },
    project7: { title: "Call-Stack with Array", url: "tasks/task7/index.html", icon: "fa-brands fa-simplybuilt" },
    project8: { title: "Pattern & Loop", url: "tasks/task8/index.html", icon: "fa-solid fa-star-of-life" },
    project9: { title: "Student Management", url: "tasks/task9/index.html", icon: "fa-solid fa-graduation-cap" },
    project10: { title: "Random Number", url: "tasks/task10/index.html", icon: "fa-solid fa-list-ol" },
    project11: { title: "Age Calculator", url: "tasks/task11/index.html", icon: "fa-regular fa-id-card" },
    project12: { title: "Bootstrap Form", url: "tasks/task12/index.html", icon: "fa-solid fa-user-pen" },
    project13: { title: "Creative Sites", url: "tasks/task13/index.html", icon: "fas fa-palette" },
  }
  
  // DOM Elements
  const sidebar = document.getElementById("sidebar")
  const mainContent = document.getElementById("mainContent")
  const toggleBtn = document.getElementById("toggleSidebar")
  const toggleIcon = document.getElementById("toggleIcon")
  const mobileToggle = document.getElementById("mobileToggle")
  const sidebarMenu = document.getElementById("sidebarMenu")
  const pageTitle = document.getElementById("pageTitle")
  const projectFrame = document.getElementById("projectFrame")
  const loading = document.querySelector(".loading")
  
  // Toggle sidebar collapse state
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed")
    mainContent.classList.toggle("expanded")
    toggleIcon.classList.toggle("fa-chevron-left")
    toggleIcon.classList.toggle("fa-chevron-right")
  })
  
  // Mobile sidebar toggle
  mobileToggle.addEventListener("click", () => {
    sidebar.classList.toggle("mobile-open")
  })
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 768 &&
      !sidebar.contains(e.target) &&
      !mobileToggle.contains(e.target) &&
      sidebar.classList.contains("mobile-open")
    ) {
      sidebar.classList.remove("mobile-open")
    }
  })
  
  // Function to dynamically create sidebar menu items
  function loadProjects() {
    // Clear existing content
    sidebarMenu.innerHTML = ""
  
    // Create the Home menu item
    const homeItem = document.createElement("li")
    homeItem.className = "menu-item"
    homeItem.innerHTML = `
          <a href="#" class="menu-link" data-url="tasks/landing.html">
              <i class="fas fa-home menu-icon"></i>
              <span class="menu-text">Home</span>
          </a>
      `
    sidebarMenu.appendChild(homeItem)
  
    // Create menu items for each project
    for (const key in projects) {
      const menuItem = document.createElement("li")
      menuItem.className = "menu-item"
      menuItem.innerHTML = `
              <a href="#" class="menu-link" data-url="${projects[key].url}">
                  <i class="fas ${projects[key].icon} menu-icon"></i>
                  <span class="menu-text">${projects[key].title}</span>
              </a>
          `
      sidebarMenu.appendChild(menuItem)
    }
  
    // Add event listeners to all menu links
    document.querySelectorAll(".menu-link").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Set active state
        document.querySelectorAll(".menu-link").forEach((l) => l.classList.remove("active"))
        this.classList.add("active")
  
        // Update page title
        const menuText = this.querySelector(".menu-text").textContent
        pageTitle.textContent = menuText
  
        // Load content in iframe
        const url = this.getAttribute("data-url")
        loadProject(url)
  
        // Close mobile sidebar after selection
        if (window.innerWidth <= 768) {
          sidebar.classList.remove("mobile-open")
        }
      })
    })
  }
  
  // Function to update the iframe source dynamically
  function loadProject(url) {
    if (projectFrame) {
      // Show loading spinner
      loading.classList.add("active")
  
      // Set iframe source
      projectFrame.src = url
      console.log(`Updated iframe source to: ${url}`)
  
      // Hide loading spinner when iframe loads
      projectFrame.onload = () => {
        loading.classList.remove("active")
      }
    } else {
      console.error("Iframe not found!")
    }
  }
  
  // Initialize when the page loads
  window.onload = () => {
    loadProjects()
  
    // Set home as active by default and load landing page
    const homeLink = document.querySelector(".menu-link")
    homeLink.classList.add("active")
    loadProject("tasks/landing.html")
  }
  
  
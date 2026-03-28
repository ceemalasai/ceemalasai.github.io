/**
 * Sai Kishore Portfolio - Project Populator
 * This script dynamically injects project data into the HTML accordion.
 */

const webProjects = [
    {
        title: "Real-time Chat Application",
        description: "A Python-Flask based chat app using Socket.IO for instant messaging and MySQL for user data.",
        tech: "Python, Flask, Socket.IO, MySQL",
        link: "#"
    },
    {
        title: "Portfolio Website",
        description: "A responsive, professional portfolio designed for SDETs, featuring clean CSS and modular JS.",
        tech: "HTML5, CSS3, JavaScript",
        link: "https://github.com/ceemalasai/ceemalasai.github.io"
    },
    {
        title: "Weather Dashboard",
        description: "Fetches real-time weather data using OpenWeatherMap API with custom UI components.",
        tech: "JavaScript, Fetch API, CSS Grid",
        link: "#"
    }
];

const softwareProjects = [
    {
        title: "Playwright-Java Framework",
        description: "Scalable E2E testing framework using Page Object Model (POM), TestNG, and Maven.",
        tech: "Java, Playwright, TestNG, Maven",
        link: "#"
    },
    {
        title: "Selenium-Python Suite",
        description: "Cross-browser automation suite with Pytest and Allure reporting for detailed test insights.",
        tech: "Python, Selenium, Pytest, Allure",
        link: "#"
    },
    {
        title: "Linux Health Monitor",
        description: "Shell script to monitor CPU, Memory, and Disk usage with automated email alerts.",
        tech: "Bash, Shell Scripting, Crontab",
        link: "#"
    },
    {
        title: "API Test Automation",
        description: "Comprehensive API validation suite using Rest-Assured and Cucumber BDD.",
        tech: "Java, Rest-Assured, Cucumber",
        link: "#"
    }
];

/**
 * Renders projects into the specified container
 * @param {Array} projectList - Array of project objects
 * @param {string} containerId - ID of the UL element
 */
function populateProjects(projectList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = projectList.map(project => `
        <li>
            <div class="project-item">
                <div class="project-info">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <span class="tech-stack"><strong>Tech:</strong> ${project.tech}</span>
                </div>
                <div class="project-link">
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer">
                        <i class="fa fa-github"></i> View
                    </a>
                </div>
            </div>
        </li>
    `).join('');
}

// Execute population when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    populateProjects(webProjects, 'web-projects');
    populateProjects(softwareProjects, 'software-projects');
});
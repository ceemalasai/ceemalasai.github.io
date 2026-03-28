/**
 * Sai Kishore Portfolio - Main Logic
 * Merged Project Populator & UI Interactions
 */
import data from './db.js';

(function () {
    'use strict';

    const populatePortfolio = () => {
        // --- About Section ---
        const aboutContainer = document.querySelector('.about-container');
        if (aboutContainer && data.bio) {
            const introPara = aboutContainer.querySelector('.about-intro');
            if (introPara && data.bio.about.text[0]) {
                introPara.innerHTML = data.bio.about.text[0];
            }

            const descPara = aboutContainer.querySelector('p:not(.about-intro):not(.list-header)');
            if (descPara && data.bio.about.text[1]) {
                descPara.innerHTML = data.bio.about.text[1];
            }

            const identityList = aboutContainer.querySelector('.identity-list');
            if (identityList && data.bio.about.text[2]) {
                const itemsStr = data.bio.about.text[2].includes('🚀 What I Do: ') 
                    ? data.bio.about.text[2].split('🚀 What I Do: ')[1] 
                    : data.bio.about.text[2];
                
                const whatIDoItems = itemsStr.split('; ');
                
                identityList.innerHTML = whatIDoItems.map(item => {
                    const parts = item.split(': ');
                    const title = parts[0] || "";
                    const desc = parts[1] || "";
                    let emoji = "🛠️";
                    if (title.toLowerCase().includes('dev')) emoji = "💻";
                    if (title.toLowerCase().includes('env') || title.toLowerCase().includes('linux')) emoji = "🐧";
                    
                    return `<li class="identity-card">${emoji} <strong>${title}:</strong> ${desc}</li>`;
                }).join('');
            }
        }

        // --- Technical Skills Section ---
        const skillCategories = document.querySelectorAll('.skill-category');
        if (skillCategories.length > 0 && data.skills) {
            data.skills.forEach((skill, index) => {
                if (skillCategories[index]) {
                    const titleEl = skillCategories[index].querySelector('h3');
                    const listEl = skillCategories[index].querySelector('ul');
                    
                    if (titleEl) titleEl.innerText = skill.title;
                    if (listEl) {
                        // Map icons to the physical order in index.html
                        const icons = ["fa-check-square-o", "fa-code", "fa-linux", "fa-github"];
                        const currentIcon = icons[index] || "fa-code";

                        listEl.innerHTML = `
                            <li><i class="fa ${currentIcon}"></i> ${skill.skillName}</li>
                            <li style="font-size: 12px; color: #888; margin-top: 5px;">
                                <div style="width: 100%; background: #eee; height: 5px; border-radius: 5px; margin-bottom: 3px;">
                                    <div style="width: ${skill.percentage}%; background: #2c98f0; height: 100%; border-radius: 5px;"></div>
                                </div>
                                Proficiency: ${skill.percentage}%
                            </li>
                        `;
                    }
                }
            });
        }

        // --- Projects Section ---
        const populateProjectList = (projectList, containerId) => {
            const container = document.getElementById(containerId);
            if (!container || !projectList) return;

            container.innerHTML = projectList.map(project => `
                <li>
                    <div class="project-item">
                        <div class="project-info">
                            <h4>${project.projectName}</h4>
                            <p>${project.summary}</p>
                            <span class="tech-stack">
                                <strong>Tech:</strong> ${Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack}
                            </span>
                        </div>
                        <div class="project-link">
                            <a href="${project.preview}" target="_blank" rel="noopener noreferrer">
                                <i class="fa fa-github"></i> View
                            </a>
                        </div>
                    </div>
                </li>
            `).join('');
        };

        populateProjectList(data.projects.web, 'web-projects');
        populateProjectList(data.projects.software, 'software-projects');

        // --- Education Section ---
        const eduBlock = document.querySelector('.education-block');
        if (eduBlock && data.education) {
            eduBlock.innerHTML = data.education.map(edu => `
                <div class="edu-item" style="margin-bottom: 25px;">
                    <table class="edu-table">
                        <tr><td class="edu-label">Degree:</td><td><strong>${edu.title}</strong></td></tr>
                        <tr><td class="edu-label">Institution:</td><td>${edu.subtitle}</td></tr>
                        <tr><td class="edu-label">Year:</td><td>${edu.duration}</td></tr>
                        <tr><td class="edu-label">Details:</td><td>${edu.details.join(' ')}</td></tr>
                    </table>
                </div>
            `).join('<hr style="border-top: 1px solid #eee; margin: 15px 0;">');
        }
    };

    const sidebarToggle = () => {
        $('.js-colorlib-nav-toggle').on('click', function(event) {
            event.preventDefault();
            if ($('body').hasClass('offcanvas')) {
                $(this).removeClass('active');
                $('body').removeClass('offcanvas');	
            } else {
                $(this).addClass('active');
                $('body').addClass('offcanvas');	
            }
        });
    };

    const accordionToggle = () => {
        $('#accordion').on('click', '.link', function() {
            const $this = $(this);
            const $next = $this.next();
            $next.slideToggle();
            $this.parent().toggleClass('open');
            $('.submenu').not($next).slideUp().parent().removeClass('open');
        });
    };

    const smoothScroll = () => {
        $('#colorlib-main-menu a[data-nav-section]').on('click', function(event) {
            const section = $(this).data('nav-section');
            if (section) {
                event.preventDefault();
                const $target = $('section[data-section="' + section + '"]');
                if ($target.length) {
                    $('html, body').animate({
                        scrollTop: $target.offset().top
                    }, 500, 'easeInOutExpo');
                }
                if ($('body').hasClass('offcanvas')) {
                    $('body').removeClass('offcanvas');
                    $('.js-colorlib-nav-toggle').removeClass('active');
                }
            }
        });
    };

    $(function() {
        populatePortfolio();
        sidebarToggle();
        accordionToggle();
        smoothScroll();
    });
}());
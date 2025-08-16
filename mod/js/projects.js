// Function to fetch and display projects
async function loadProjects() {
    try {
        // Fetch the projects data from JSON file
        const response = await fetch('./mod/json/projects.json');
        const data = await response.json();
        
        // Get the card container
        const cardContainer = document.querySelector('.card-container');
        
        // Clear existing content
        cardContainer.innerHTML = '';
        
        // Create cards for each project
        data.projects.forEach(project => {
            const projectCard = createProjectCard(project);
            cardContainer.appendChild(projectCard);
        });
        
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Function to create a project card element
function createProjectCard(project) {
    // Create the main card div
    const card = document.createElement('div');
    card.className = 'projects-card';
    
    // Create title element
    const title = document.createElement('div');
    title.className = 'projects-title';
    title.textContent = project.title;
    
    // Create embed element (iframe for embedded content)
    const embed = document.createElement('div');
    embed.className = 'projects-embed';
    
    // Create iframe for the embedded URL
    const iframe = document.createElement('iframe');
    iframe.src = project.embed_url;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.borderRadius = '25px';
    iframe.frameBorder = '0';
    iframe.loading = 'lazy';
    iframe.title = project.title;
    
    embed.appendChild(iframe);
    
    // Create description element
    const description = document.createElement('div');
    description.className = 'projects-description';
    description.textContent = project.description;
    
    // Append all elements to the card
    card.appendChild(title);
    card.appendChild(embed);
    card.appendChild(description);
    
    return card;
}

// Load projects when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadProjects);
// Modal functionality
function openModal() {
    const modal = document.getElementById('addSyllabusModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('addSyllabusModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Form submission
document.getElementById('syllabusForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get values from form
    const stream = document.getElementById('streamInput').value;
    const pattern = document.getElementById('patternInput').value;
    const year = document.getElementById('yearInput').value;
    const fileInput = document.getElementById('syllabusFile');

    if (!fileInput.files.length) {
        alert("Please select a syllabus file.");
        return;
    }

    const file = fileInput.files[0];
    const fileSize = (file.size / 1024 / 1024).toFixed(2) + " MB";

    // Create new syllabus entry
    const newSyllabus = { 
        stream, 
        pattern, 
        year, 
        size: fileSize,
        file: file  // Store the actual file object
    };
    syllabusData.push(newSyllabus);

    // Add new syllabus card to the UI
    addSyllabusCard(newSyllabus);

    // Close modal
    closeModal();
});

// Function to add a single syllabus card dynamically
function addSyllabusCard(entry) {
    const syllabusGrid = document.querySelector('.syllabus-grid');

    const syllabusCard = document.createElement('div');
    syllabusCard.classList.add('syllabus-card');
    syllabusCard.dataset.pattern = entry.pattern;
    syllabusCard.dataset.stream = entry.stream;
    syllabusCard.dataset.year = entry.year;

    syllabusCard.innerHTML = `
        <div class="syllabus-header">
            <div>
                <div class="syllabus-title">${formatStream(entry.stream)}</div>
                <div class="syllabus-pattern">${entry.pattern} Pattern • ${formatYear(entry.year)}</div>
            </div>
        </div>
        <div class="syllabus-info">
            <span class="syllabus-size">${entry.size}</span>
            <button class="download-btn">Download</button>
        </div>
    `;

    // Add download event listener
    const downloadBtn = syllabusCard.querySelector('.download-btn');
    downloadBtn.addEventListener('click', () => {
        if (entry.file) {
            const url = URL.createObjectURL(entry.file);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${formatStream(entry.stream)}_${entry.pattern}_${formatYear(entry.year)}_Syllabus.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            alert('No file available for download');
        }
    });

    syllabusGrid.appendChild(syllabusCard);
}

// Filter functionality
function filterSyllabi() {
    const pattern = document.getElementById('pattern').value.toLowerCase();
    const stream = document.getElementById('stream').value.toLowerCase();
    const year = document.getElementById('year').value.toLowerCase();

    document.querySelectorAll('.syllabus-card').forEach(card => {
        const cardPattern = card.dataset.pattern.toLowerCase();
        const cardStream = card.dataset.stream.toLowerCase();
        const cardYear = card.dataset.year.toLowerCase();

        const matchesPattern = pattern === "" || cardPattern.includes(pattern);
        const matchesStream = stream === "" || cardStream.includes(stream);
        const matchesYear = year === "" || cardYear.includes(year);

        card.style.display = (matchesPattern && matchesStream && matchesYear) ? "block" : "none";
    });
}

// Add event listeners to filters
document.getElementById('pattern').addEventListener('change', filterSyllabi);
document.getElementById('stream').addEventListener('change', filterSyllabi);
document.getElementById('year').addEventListener('change', filterSyllabi);

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target == document.getElementById('addSyllabusModal')) {
        closeModal();
    }
}

// Predefined syllabus dataset
const syllabusData = [
    { stream: "computer", pattern: "2024", year: "FE", size: "2.3 MB" },
    { stream: "computer", pattern: "2024", year: "SE", size: "2.3 MB" },
    { stream: "computer", pattern: "2024", year: "TE", size: "2.3 MB" },
    { stream: "computer", pattern: "2024", year: "BE", size: "2.3 MB" },
    { stream: "computer", pattern: "2019", year: "FE", size: "1.8 MB" },
    { stream: "computer", pattern: "2019", year: "SE", size: "1.8 MB" },
    { stream: "computer", pattern: "2019", year: "TE", size: "1.8 MB" },
    { stream: "computer", pattern: "2019", year: "BE", size: "1.8 MB" },
    { stream: "it", pattern: "2024", year: "FE", size: "2.5 MB" },
    { stream: "it", pattern: "2024", year: "SE", size: "2.5 MB" },
    { stream: "it", pattern: "2024", year: "TE", size: "2.5 MB" },
    { stream: "it", pattern: "2024", year: "BE", size: "2.5 MB" },
    { stream: "it", pattern: "2019", year: "FE", size: "2.5 MB" },
    { stream: "it", pattern: "2019", year: "SE", size: "2.5 MB" },
    { stream: "it", pattern: "2019", year: "TE", size: "2.5 MB" },
    { stream: "it", pattern: "2019", year: "BE", size: "2.5 MB" },
    { stream: "mechanical", pattern: "2024", year: "FE", size: "2.0 MB" },
    { stream: "mechanical", pattern: "2024", year: "SE", size: "2.0 MB" },
    { stream: "mechanical", pattern: "2024", year: "TE", size: "2.0 MB" },
    { stream: "mechanical", pattern: "2024", year: "BE", size: "2.0 MB" },
    { stream: "mechanical", pattern: "2019", year: "FE", size: "2.0 MB" },
    { stream: "mechanical", pattern: "2019", year: "SE", size: "2.0 MB" },
    { stream: "mechanical", pattern: "2019", year: "TE", size: "2.0 MB" },
    { stream: "mechanical", pattern: "2019", year: "BE", size: "2.0 MB" },
    { stream: "electrical", pattern: "2019", year: "FE", size: "2.1 MB" },
    { stream: "electrical", pattern: "2019", year: "SE", size: "2.1 MB" },
    { stream: "electrical", pattern: "2019", year: "TE", size: "2.1 MB" },
    { stream: "electrical", pattern: "2019", year: "BE", size: "2.1 MB" },
    { stream: "electrical", pattern: "2024", year: "FE", size: "2.1 MB" },
    { stream: "electrical", pattern: "2024", year: "SE", size: "2.1 MB" },
    { stream: "electrical", pattern: "2024", year: "TE", size: "2.1 MB" },
    { stream: "electrical", pattern: "2024", year: "BE", size: "2.1 MB" },
    { stream: "civil", pattern: "2019", year: "FE", size: "2.7 MB" },
    { stream: "civil", pattern: "2019", year: "SE", size: "2.7 MB" },
    { stream: "civil", pattern: "2019", year: "TE", size: "2.7 MB" },
    { stream: "civil", pattern: "2019", year: "BE", size: "2.7 MB" },
    { stream: "civil", pattern: "2024", year: "FE", size: "2.7 MB" },
    { stream: "civil", pattern: "2024", year: "SE", size: "2.7 MB" },
    { stream: "civil", pattern: "2024", year: "TE", size: "2.7 MB" },
    { stream: "civil", pattern: "2024", year: "BE", size: "2.7 MB" }
];

// Function to display all syllabi on page load
function displaySyllabi() {
    const syllabusGrid = document.querySelector('.syllabus-grid');
    syllabusGrid.innerHTML = ""; // Clear existing content

    syllabusData.forEach(entry => {
        addSyllabusCard(entry);
    });
}

// Helper functions for formatting
function formatStream(stream) {
    const streamNames = {
        "computer": "Computer Engineering",
        "it": "Information Technology",
        "mechanical": "Mechanical Engineering",
        "electrical": "Electronics and Telecommunication Engineering",
        "civil": "Civil Engineering"
    };
    return streamNames[stream] || stream;
}

function formatYear(year) {
    const yearNames = { "FE": "First Year", "SE": "Second Year", "TE": "Third Year", "BE": "Fourth Year" };
    return yearNames[year] || year;
}

// Add event listener to "Add New Syllabus" button when page loads
window.onload = function() {
    displaySyllabi();
    
    const addButton = document.querySelector('.add-syllabus-btn');
    if (addButton) {
        addButton.addEventListener('click', openModal);
    }
    
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('addSyllabusModal');
    if (event.target === modal) {
        closeModal();
    }
}
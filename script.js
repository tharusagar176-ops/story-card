const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

// NO button movement on hover and touch for mobile
if (noBtn) {
  // Function to move button randomly
  const moveButton = () => {
    const container = noBtn.closest('.proposal-card');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate safe movement area (within container bounds)
    const maxX = containerRect.width - btnRect.width - 40; // 40px padding
    const maxY = containerRect.height - btnRect.height - 40;
    
    const x = Math.random() * Math.min(200, maxX) - Math.min(100, maxX/2);
    const y = Math.random() * Math.min(200, maxY) - Math.min(100, maxY/2);
    
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  };

  // Desktop hover events
  noBtn.addEventListener("mouseover", moveButton);

  noBtn.addEventListener("mouseout", () => {
    noBtn.style.transform = "translate(0, 0)";
  });

  // Mobile touch events
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent default touch behavior
    noBtn.style.boxShadow = "0 0 20px rgba(231, 76, 60, 0.6)"; // Visual feedback
    moveButton();
  });

  // Reset position after touch ends (with delay for mobile)
  noBtn.addEventListener("touchend", () => {
    setTimeout(() => {
      noBtn.style.transform = "translate(0, 0)";
      noBtn.style.boxShadow = ""; // Remove visual feedback
    }, 1000);
  });
}

// YES button click
if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    goTo("page2");
    // Auto play music after YES
    const music = document.getElementById("bgMusic");
    if (music) {
      music.play().catch(err => console.log("Audio autoplay prevented:", err));
      isPlaying = true;
      musicBtn.innerHTML = "🔊"; // Sound waves icon when playing
    }
  });
}

// Navigation function
function goTo(id) {
  // Pause all videos before navigation (except autoplay videos)
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(video => {
    // Only pause videos with controls (story videos), not autoplay background videos
    if (video.hasAttribute('controls') && !video.paused) {
      video.pause();
    }
  });
  
  // Navigate to the target section
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
  const targetSection = document.getElementById(id);
  if (targetSection) {
    targetSection.classList.add("active");
    // Scroll to top
    window.scrollTo(0, 0);
  }
  
  // Small delay to ensure the new section is loaded before initializing videos
  setTimeout(() => {
    initializeVideoManagement();
  }, 100);
}

// Story navigation function
function goToStory(storyId) {
  goTo(storyId);
}

// Video management - pause all videos when one starts playing
function initializeVideoManagement() {
  // Get all video elements in the document
  const allVideos = document.querySelectorAll('video');
  
  allVideos.forEach(video => {
    video.addEventListener('play', function() {
      // Pause all other videos when this one starts playing
      allVideos.forEach(otherVideo => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });
  });
}

// Initialize video management when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeVideoManagement();
  generateGallery(); // Generate gallery on page load
});

// Function to pause all videos
function pauseAllVideos() {
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(video => {
    if (!video.paused) {
      video.pause();
    }
  });
}

// Gallery images data - all download images with Valentine's labels
const galleryImages = [
  { src: 'assets/images/download1.jpeg', label: 'Sweet Valentine', alt: 'Sweet Valentine' },
  { src: 'assets/images/download2.jpeg', label: 'Love Smile', alt: 'Love Smile' },
  { src: 'assets/images/download3.jpeg', label: 'Perfect Valentine', alt: 'Perfect Valentine' },
  { src: 'assets/images/download4.jpeg', label: 'Romantic Times', alt: 'Romantic Times' },
  { src: 'assets/images/download5.jpeg', label: 'Valentine Magic', alt: 'Valentine Magic' },
  { src: 'assets/images/download6.jpeg', label: 'Love Story', alt: 'Love Story' },
  { src: 'assets/images/download7.jpeg', label: 'Valentine Joy', alt: 'Valentine Joy' },
  { src: 'assets/images/download8.jpeg', label: 'Cupid Moments', alt: 'Cupid Moments' },
  { src: 'assets/images/download9.jpeg', label: 'Forever Love', alt: 'Forever Love' },
  // { src: 'assets/images/download10.jpeg', label: 'Heart & Soul', alt: 'Heart & Soul' },
  // { src: 'assets/images/download11.jpeg', label: 'Valentine Kiss', alt: 'Valentine Kiss' },
  // { src: 'assets/images/download12.jpeg', label: 'Eternal Valentine', alt: 'Eternal Valentine' }
];

// Function to generate gallery dynamically
function generateGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;

  // Clear existing content
  galleryGrid.innerHTML = '';

  // Generate polaroid cards for each image
  galleryImages.forEach((image, index) => {
    const polaroidDiv = document.createElement('div');
    polaroidDiv.className = 'polaroid';
    
    // Add slight rotation for variety
    const rotation = index % 2 === 0 ? -2 : 2;
    polaroidDiv.style.transform = `rotate(${rotation}deg)`;
    
    polaroidDiv.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" loading="lazy" onerror="this.style.display='none'">
      <p class="polaroid-label">${image.label}</p>
    `;
    
    galleryGrid.appendChild(polaroidDiv);
  });
}

// Music controls
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

if (musicBtn && music) {
  musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
      music.play().catch(err => console.log("Audio play prevented:", err));
      musicBtn.innerHTML = "🔊"; // Sound waves icon when music is playing
      isPlaying = true;
    } else {
      music.pause();
      musicBtn.innerHTML = "🔇"; // Muted speaker icon when music is paused
      isPlaying = false;
    }
  });
}

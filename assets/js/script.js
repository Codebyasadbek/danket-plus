document.addEventListener('DOMContentLoaded', () => {
    const burgerToggle = document.getElementById('burgerToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    function toggleMenu(open) {
        if (open) {
            mobileMenu.classList.add('is-open');
            burgerToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Disable background scroll
        } else {
            mobileMenu.classList.remove('is-open');
            burgerToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Enable background scroll
        }
    }

    burgerToggle.addEventListener('click', () => toggleMenu(true));
    menuClose.addEventListener('click', () => toggleMenu(false));
    menuBackdrop.addEventListener('click', () => toggleMenu(false));

    // Close menu when navigation link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Handle Escape key to close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
            toggleMenu(false);
        }
    });

    // File upload interaction helper
    const fileUploadContainer = document.getElementById('fileUploadContainer');
    const fileInput = document.getElementById('projectFiles');
    const fileLabel = document.getElementById('fileLabelText');

    if (fileUploadContainer && fileInput && fileLabel) {
        fileUploadContainer.addEventListener('click', () => {
            fileInput.click();
        });

        fileUploadContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInput.click();
            }
        });

        // Helper to format/truncate file name while preserving extension
        function formatFileName(name, maxLength = 28) {
            if (name.length <= maxLength) return name;
            const dotIndex = name.lastIndexOf('.');
            if (dotIndex === -1) {
                return name.slice(0, maxLength - 3) + '...';
            }
            const extension = name.slice(dotIndex);
            const baseName = name.slice(0, dotIndex);
            const maxBaseLength = maxLength - extension.length - 3;
            if (maxBaseLength <= 0) {
                return name.slice(0, maxLength - 3) + '...';
            }
            return baseName.slice(0, maxBaseLength) + '...' + extension;
        }

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const originalName = e.target.files[0].name;
                fileLabel.textContent = formatFileName(originalName, 28);
                fileLabel.style.color = '#2D323B';
            } else {
                fileLabel.textContent = 'Click to download the file';
                fileLabel.style.color = '';
            }
        });
        // Prevent form redirect error on local static server, simulating successful submit
        const contactForm = document.getElementById('projectContactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                const fileLabel = document.getElementById('fileLabel');
                if (fileLabel) {
                    fileLabel.textContent = 'Click to download the file';
                    fileLabel.style.color = '';
                }
            });
        }
    }

    // Filter Options interaction (minimal JS)
    const filterSelects = document.querySelectorAll('.filter-select');
    const clearFilterBtn = document.getElementById('clearFilterBtn');

    if (filterSelects.length > 0 && clearFilterBtn) {
        function updateFilterState() {
            let hasActiveFilter = false;
            filterSelects.forEach(select => {
                if (select.value !== 'all') {
                    hasActiveFilter = true;
                    select.style.color = '#2D323B';
                } else {
                    select.style.color = '#64748B';
                }
            });

            if (hasActiveFilter) {
                clearFilterBtn.classList.add('is-active');
            } else {
                clearFilterBtn.classList.remove('is-active');
            }
        }

        filterSelects.forEach(select => {
            select.addEventListener('change', updateFilterState);
        });

        clearFilterBtn.addEventListener('click', () => {
            filterSelects.forEach(select => {
                select.value = 'all';
            });
            updateFilterState();
        });
    }
});
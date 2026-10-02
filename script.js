// ===== PAGINATION FOR LISTINGS PAGE =====
const listingsData = [
  {
    id: 1,
    featured: true,
    img: "assets/images/home1.jpg",
    price: "C$985,000",
    beds: 4,
    baths: 2,
    sqft: 3885,
    address: "38 Frankton Cres, Toronto, ON",
    type: "sale",
    housing: "house"
  },
  {
    id: 2,
    featured: false,
    img: "assets/images/home2.jpg",
    price: "C$3,300/Mo",
    beds: 3,
    baths: 2,
    sqft: 1000,
    address: "19 Four Winds Dr UNIT 804, Toronto",
    type: "rent",
    housing: "apartment"
  },
  {
    id: 3,
    featured: true,
    img: "assets/images/home3.jpg",
    price: "C$3,800/Mo",
    beds: 3,
    baths: 4,
    sqft: 1750,
    address: "148 Hucknall Road, Toronto",
    type: "rent",
    housing: "house"
  },
  {
    id: 4,
    featured: false,
    img: "assets/images/home4.jpg",
    price: "C$2,400/Mo",
    beds: 2,
    baths: 1,
    sqft: 950,
    address: "12 Sentinel Rd, Toronto, ON",
    type: "rent",
    housing: "apartment"
  },
  // Add more fake listings to demonstrate pagination
  {
    id: 5,
    featured: false,
    img: "assets/images/home5.jpg",
    price: "C$2,200/Mo",
    beds: 2,
    baths: 2,
    sqft: 900,
    address: "24 Keele St, Toronto, ON",
    type: "rent",
    housing: "apartment"
  },
  {
    id: 6,
    featured: false,
    img: "assets/images/home6.jpg",
    price: "C$1,800/Mo",
    beds: 1,
    baths: 1,
    sqft: 650,
    address: "1 York Blvd, Toronto, ON",
    type: "rent",
    housing: "apartment"
  },
  {
    id: 7,
    featured: false,
    img: "assets/images/home7.jpg",
    price: "C$2,600/Mo",
    beds: 3,
    baths: 2,
    sqft: 1200,
    address: "11 Jane St, Toronto, ON",
    type: "rent",
    housing: "house"
  },
  {
    id: 8,
    featured: false,
    img: "assets/images/home8.jpg",
    price: "C$3,100/Mo",
    beds: 4,
    baths: 3,
    sqft: 1600,
    address: "55 Steeles Ave, Toronto, ON",
    type: "rent",
    housing: "house"
  },
  {
    id: 9,
    featured: false,
    img: "assets/images/home9.jpg",
    price: "C$2,900/Mo",
    beds: 3,
    baths: 2,
    sqft: 1100,
    address: "99 Pond Rd, Toronto, ON",
    type: "rent",
    housing: "apartment"
  },
  {
    id: 10,
    featured: false,
    img: "assets/images/home10.jpg",
    price: "C$2,500/Mo",
    beds: 2,
    baths: 2,
    sqft: 850,
    address: "33 Murray Ross Pkwy, Toronto, ON",
    type: "rent",
    housing: "apartment"
  },
  {
    id: 11,
    featured: false,
    img: "assets/images/home11.jpg",
    price: "C$1,950/Mo",
    beds: 1,
    baths: 1,
    sqft: 600,
    address: "100 The Pond Rd, Toronto, ON",
    type: "rent",
    housing: "apartment"
  },
  {
    id: 12,
    featured: false,
    img: "assets/images/home12.jpg",
    price: "C$3,700/Mo",
    beds: 4,
    baths: 3,
    sqft: 1700,
    address: "200 York Blvd, Toronto, ON",
    type: "rent",
    housing: "house"
  }
];

function renderListings(page = 1) {
  const listingsPerPage = 10;
  const listingsContainer = document.getElementById('listingsContainer');
  if (!listingsContainer) return;
  listingsContainer.innerHTML = "";
  // Calculate slice for pagination
  const startIdx = (page - 1) * listingsPerPage;
  const endIdx = startIdx + listingsPerPage;
  const pagedListings = listingsData.slice(startIdx, endIdx);
  if (pagedListings.length === 0) {
    listingsContainer.innerHTML = '<div class="col-12"><div class="alert alert-warning text-center">No listings found.</div></div>';
    renderPaginationButtons(page, 0);
    return;
  }
  pagedListings.forEach(listing => {
    const card = document.createElement('div');
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card shadow mb-4">
        <img src="${listing.img}" class="card-img-top" alt="Property">
        <div class="card-body">
          ${listing.featured ? '<span class="badge bg-warning text-dark mb-2">⭐ Featured</span>' : ''}
          <h5 class="card-title">${listing.price}</h5>
          <p class="card-text">${listing.beds} Beds | ${listing.baths} Baths | ${listing.sqft.toLocaleString()} Sq Ft</p>
          <p class="text-muted">${listing.address}</p>
          <a href="property-detail.html?id=${listing.id}" class="btn btn-danger w-100">View Details</a>
        </div>
      </div>
    `;
    listingsContainer.appendChild(card);
  });
  renderPaginationButtons(page, Math.ceil(listingsData.length / listingsPerPage));
}

function renderPaginationButtons(currentPage, totalPages) {
  const paginationDiv = document.getElementById('pagination');
  if (!paginationDiv) return;
  if (totalPages <= 1) {
    paginationDiv.innerHTML = '';
    return;
  }
  let html = '<nav aria-label="Listings Pagination"><ul class="pagination">';
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <li class="page-item${i === currentPage ? ' active' : ''}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>
    `;
  }
  html += '</ul></nav>';
  paginationDiv.innerHTML = html;
  // Add click handlers
  paginationDiv.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = parseInt(this.getAttribute('data-page'));
      renderListings(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}
document.addEventListener('DOMContentLoaded', function () {
    const pageTransitionOverlay = document.getElementById('page-transition-overlay');

    // Fade out the overlay when the new page content is loaded
    if (pageTransitionOverlay) {
        pageTransitionOverlay.classList.add('fade-out');
        pageTransitionOverlay.addEventListener('transitionend', function handler() {
            pageTransitionOverlay.removeEventListener('transitionend', handler);
            pageTransitionOverlay.style.display = 'none'; // Completely remove from layout after transition
        });
    }

    // Function to initiate page transition before navigating
    function startPageTransition(url) {
        if (pageTransitionOverlay) {
            pageTransitionOverlay.style.display = 'block'; // Make sure it's visible again
            pageTransitionOverlay.classList.remove('fade-out'); // Remove fade-out to ensure it fades back in
            // Add a small delay before navigating to allow the fade-in to be visible
            setTimeout(() => {
                window.location.href = url;
            }, 500); // This delay should match your CSS transition duration
        } else {
            // Fallback if overlay isn't found
            window.location.href = url;
        }
    }

    // Capture all internal link clicks to apply transition
    document.querySelectorAll('a[href]').forEach(link => {
        // Exclude external links and hash links for smooth scrolling (already handled)
        if (!link.href.startsWith(window.location.origin) || link.getAttribute('href').startsWith('#')) {
            return;
        }

        // Exclude JavaScript-driven links if needed (e.g., Bootstrap tabs)
        if (link.hasAttribute('data-bs-toggle') || link.hasAttribute('data-toggle')) {
            return;
        }

        link.addEventListener('click', function (e) {
            // Prevent default navigation
            e.preventDefault();
            const targetUrl = this.href;
            startPageTransition(targetUrl);
        });
    });


    // Helper function to show custom alerts
    function showAlert(message, type = 'success', duration = 3000) {
        const alertContainer = document.getElementById('alert-container');
        if (!alertContainer) {
            console.warn('Alert container not found. Falling back to native alert.', message);
            alert(message);
            return;
        }

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertContainer.appendChild(alertDiv);

        setTimeout(() => {
            if (alertDiv.parentNode) { // Check if it still exists before trying to remove
                alertDiv.classList.remove('show');
                alertDiv.classList.add('fade');
                alertDiv.addEventListener('transitionend', () => alertDiv.remove());
            }
        }, duration);
    }

    // Get references to the navigation buttons
    const logoutBtn = document.getElementById('logout-btn');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');

    // Function to update the visibility of login/logout/register buttons
    function updateNavbarButtonsVisibility() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

        if (loginBtn && registerBtn && logoutBtn) {
            if (isLoggedIn) {
                logoutBtn.classList.remove('d-none');
                loginBtn.classList.add('d-none');
                registerBtn.classList.add('d-none');
            } else {
                logoutBtn.classList.add('d-none');
                loginBtn.classList.remove('d-none');
                registerBtn.classList.remove('d-none');
            }
        }
    }

    // Call the function on page load to set initial state
    updateNavbarButtonsVisibility();

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.clear();
            showAlert('You have been logged out.', 'info');
            // Use startPageTransition for navigation
            startPageTransition('login.html');
            updateNavbarButtonsVisibility(); // Update buttons immediately
        });
    }

    // Listing Filter Functionality (Specific to listings.html)
    let allListingsData = [];

    const listingsContainer = document.getElementById('listings-container');
    const searchBar = document.getElementById('searchBar');
    const homeTypeSelect = document.getElementById('homeType');
    const housingTypeSelect = document.getElementById('housingType');
    const campusSelect = document.getElementById('campus');
    const bedsSelect = document.getElementById('beds');
    const bathsSelect = document.getElementById('baths');
    const searchButton = document.getElementById('searchButton');

    function displayListings(listingsToDisplay) {
        if (!listingsContainer) return;

        listingsContainer.innerHTML = '';

        if (listingsToDisplay.length === 0) {
            listingsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p>No listings match your criteria.</p>
                </div>
            `;
            return;
        }

        listingsToDisplay.forEach(listing => {
            const cardHtml = `
                <div class="col-md-4">
                    <div class="card shadow h-100">
                        <img src="${listing.image_url || 'placeholder.png'}" class="card-img-top" alt="${listing.title || 'Property Image'}">
                        <div class="card-body">
                            ${listing.is_featured ? '<span class="badge bg-warning text-dark mb-2">⭐ Featured</span>' : ''}
                            <h5 class="card-title">C$${parseFloat(listing.price).toLocaleString('en-CA')}${listing.listing_type === 'rent' ? '/Mo' : ''}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${listing.title}</h6>
                            <p class="card-text">
                                ${listing.bedrooms} Beds | ${listing.bathrooms} Baths | ${listing.square_footage} Sq Ft
                                <br><strong>Type:</strong> ${listing.housing_type ? listing.housing_type.charAt(0).toUpperCase() + listing.housing_type.slice(1) : 'N/A'}
                                <br><strong>Campus:</strong> ${listing.campus ? listing.campus.charAt(0).toUpperCase() + listing.campus.slice(1) : 'N/A'}
                            </p>
                            <p class="text-muted">${listing.address}, ${listing.postal_code}</p>
                            <a href="property-detail.html?id=${listing.id}" class="btn btn-danger w-100 view-details-btn">View Details</a>
                        </div>
                    </div>
                </div>
            `;
            listingsContainer.insertAdjacentHTML('beforeend', cardHtml);
        });

        document.querySelectorAll('.view-details-btn').forEach(button => {
            // Remove previous listeners to prevent duplicates if displayListings is called multiple times
            button.removeEventListener('click', handleViewDetailsClick);
            button.addEventListener('click', handleViewDetailsClick);
        });
    }

    function filterListings() {
        const searchTerm = searchBar ? searchBar.value.toLowerCase() : '';
        const selectedHomeType = homeTypeSelect ? homeTypeSelect.value : '';
        const selectedHousingType = housingTypeSelect ? housingTypeSelect.value : '';
        const selectedCampus = campusSelect ? campusSelect.value : '';
        const selectedBeds = bedsSelect ? bedsSelect.value : '';
        const selectedBaths = bathsSelect ? bathsSelect.value : '';

        const filtered = allListingsData.filter(listing => {
            const matchesSearch = searchTerm === '' ||
                                 listing.address.toLowerCase().includes(searchTerm) ||
                                 listing.postal_code.toLowerCase().includes(searchTerm) ||
                                 listing.title.toLowerCase().includes(searchTerm) ||
                                 (listing.property_description && listing.property_description.toLowerCase().includes(searchTerm));

            const matchesHomeType = selectedHomeType === '' || listing.listing_type === selectedHomeType;
            const matchesHousingType = selectedHousingType === '' || (listing.housing_type && listing.housing_type.toLowerCase() === selectedHousingType.toLowerCase());
            const matchesCampus = selectedCampus === '' || (listing.campus && listing.campus.toLowerCase() === selectedCampus.toLowerCase());
            const matchesBeds = selectedBeds === '' || (selectedBeds === '4+' ? listing.bedrooms >= 4 : listing.bedrooms === parseInt(selectedBeds));
            const matchesBaths = selectedBaths === '' || (selectedBaths === '4+' ? listing.bathrooms >= 4 : listing.bathrooms === parseFloat(selectedBaths));

            return matchesSearch && matchesHomeType && matchesHousingType && matchesCampus && matchesBeds && matchesBaths;
        });

        displayListings(filtered);
    }

    async function fetchAllAndFilterListings() {
        if (!listingsContainer) return;

        listingsContainer.innerHTML = `
            <div class="col-12 text-center">
                <p>Loading all listings...</p>
            </div>
        `;

        try {
            const response = await fetch('http://localhost:8080/listings');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allListingsData = await response.json();
            filterListings();
        } catch (error) {
            console.error('Error fetching all listings:', error);
            listingsContainer.innerHTML = `
                <div class="col-12 text-center text-danger">
                    <p>Failed to load listings. Please try again later. (Error: ${error.message})</p>
                </div>
            `;
        }
    }

    if (searchButton) {
        searchButton.addEventListener('click', filterListings);
    }
    if (searchBar) {
        searchBar.addEventListener('input', filterListings);
    }
    if (homeTypeSelect) {
        homeTypeSelect.addEventListener('change', filterListings);
    }
    if (housingTypeSelect) {
        housingTypeSelect.addEventListener('change', filterListings);
    }
    if (campusSelect) {
        campusSelect.addEventListener('change', filterListings);
    }
    if (bedsSelect) {
        bedsSelect.addEventListener('change', filterListings);
    }
    if (bathsSelect) {
        bathsSelect.addEventListener('change', filterListings);
    }

    if (window.location.pathname.includes('listings.html')) {
        fetchAllAndFilterListings();
    }

    // Form Validation and Red Gradient Glow for Forms
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const formElements = form.querySelectorAll('input[required], select[required], textarea[required]');

            // Reset validation states and glows before re-validating
            formElements.forEach(input => {
                input.classList.remove('is-invalid', 'input-red-glow');
            });
            form.classList.remove('form-red-gradient-glow');

            // General required field validation
            formElements.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid', 'input-red-glow'); // Apply individual glow
                }
            });

            const password = form.querySelector('input[name="password"]');
            const confirmPassword = form.querySelector('input[placeholder="Confirm Password"]');

            if (password && confirmPassword) {
                if (password.value !== confirmPassword.value) {
                    isValid = false;
                    showAlert('Passwords do not match!', 'danger');
                    confirmPassword.classList.add('is-invalid', 'input-red-glow');
                } else {
                    confirmPassword.classList.remove('is-invalid', 'input-red-glow');
                }
            }

            const agentPhoneInput = form.querySelector('input[name="agent_phone"]');
            if (agentPhoneInput && agentPhoneInput.hasAttribute('required')) {
                const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
                if (!phonePattern.test(agentPhoneInput.value)) {
                    isValid = false;
                    agentPhoneInput.classList.add('is-invalid', 'input-red-glow');
                    showAlert('Agent Phone must be in 123-456-7890 format.', 'danger');
                } else {
                    agentPhoneInput.classList.remove('is-invalid', 'input-red-glow');
                }
            }

            if (!isValid) {
                e.preventDefault(); // Prevent default if validation fails
                form.classList.add('form-red-gradient-glow'); // Apply gradient glow to the form
                // Only show a general alert if individual field messages are not enough
                if (!form.id.includes('login-form') && !form.id.includes('register-form')) {
                    showAlert('Please correct the highlighted fields.', 'danger');
                }
            } else {
                form.classList.remove('form-red-gradient-glow');
            }
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to Top Button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'btn btn-danger back-to-top';
    Object.assign(backToTop.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'none',
        zIndex: '1000',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        fontSize: '1.5rem',
        lineHeight: '1'
    });
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function () {
        backToTop.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Login Functionality
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Simple client-side check for empty fields before API call
            let isValid = true;
            loginForm.querySelectorAll('input[required]').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid', 'input-red-glow');
                } else {
                    input.classList.remove('is-invalid', 'input-red-glow');
                }
            });

            if (!isValid) {
                showAlert('Please fill in both email and password.', 'danger');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...`;

            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await res.json();
                if (!res.ok) throw new Error(result.error || 'Login failed');

                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userName', result.user.full_name);
                sessionStorage.setItem('userEmail', result.user.email);

                showAlert(`Welcome back, ${result.user.full_name}!`, 'success');
                updateNavbarButtonsVisibility();

                const redirect = sessionStorage.getItem('redirectAfterLogin');
                if (redirect) {
                    sessionStorage.removeItem('redirectAfterLogin');
                    startPageTransition(redirect); // Use startPageTransition
                } else {
                    startPageTransition('index.html'); // Use startPageTransition
                }

                loginForm.reset();
            } catch (error) {
                console.error('Login error:', error);
                showAlert(`Error: ${error.message}`, 'danger');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // Register Functionality
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Ensure default is prevented for async handling
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Re-run the validation for the register form specifically
            let isValid = true;
            const formElements = registerForm.querySelectorAll('input[required], select[required], textarea[required]');
            formElements.forEach(input => {
                input.classList.remove('is-invalid', 'input-red-glow');
            });
            registerForm.classList.remove('form-red-gradient-glow');

            formElements.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid', 'input-red-glow');
                }
            });

            const password = registerForm.querySelector('input[name="password"]');
            const confirmPassword = registerForm.querySelector('input[placeholder="Confirm Password"]');

            if (password && confirmPassword) {
                if (password.value !== confirmPassword.value) {
                    isValid = false;
                    showAlert('Passwords do not match!', 'danger');
                    confirmPassword.classList.add('is-invalid', 'input-red-glow');
                } else {
                    confirmPassword.classList.remove('is-invalid', 'input-red-glow');
                }
            }

            if (!isValid) {
                registerForm.classList.add('form-red-gradient-glow');
                showAlert('Please correct the highlighted fields.', 'danger');
                return; // Stop here if validation fails
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Registering...`;

            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch('http://localhost:8080/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await res.json();
                if (!res.ok) throw new Error(result.error || 'Registration failed');

                showAlert('Registration successful! Redirecting to login page...', 'success');
                setTimeout(() => {
                    startPageTransition('login.html'); // Use startPageTransition
                }, 1500);

                registerForm.reset();
            } catch (error) {
                console.error('Registration error:', error);
                showAlert(`Error: ${error.message}`, 'danger');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // Create Listing Form Functionality and Secure Access
    const createForm = document.getElementById('create-listing-form');
    const listingFormContainer = document.getElementById('listingFormContainer');

    if (window.location.pathname.includes('create-listing.html')) {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

        if (!isLoggedIn) {
            showAlert('You need to log in to create a listing!', 'warning');
            sessionStorage.setItem('redirectAfterLogin', window.location.href);
            startPageTransition('login.html'); // Use startPageTransition
        } else {
            if (listingFormContainer) {
                listingFormContainer.style.display = 'block';
            }
        }
    }

    // Handle price label change for Create Listing form (e.g., /Mo for rent)
    const listingTypeCreateFormSelect = document.getElementById('listingType');
    if (listingTypeCreateFormSelect) {
        listingTypeCreateFormSelect.addEventListener('change', function () {
            const priceLabel = document.getElementById('priceTypeLabel');
            if (priceLabel) {
                priceLabel.textContent = this.value === 'rent' ? '/Mo' : '';
            }
        });
    }

    // Handle submission of the Create Listing form
    if (createForm) {
        createForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Prevent default form submission always

            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Manual client-side validation for this form before API call
            let isValid = true;
            const formElements = form.querySelectorAll('input[required], select[required], textarea[required]');

            // Reset validation states and glows
            formElements.forEach(input => {
                input.classList.remove('is-invalid', 'input-red-glow');
            });
            form.classList.remove('form-red-gradient-glow');

            formElements.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid', 'input-red-glow');
                }
            });

            const agentPhoneInput = form.querySelector('input[name="agent_phone"]');
            if (agentPhoneInput) { // Check if the element exists on this form
                const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
                if (!phonePattern.test(agentPhoneInput.value)) {
                    isValid = false;
                    agentPhoneInput.classList.add('is-invalid', 'input-red-glow');
                    showAlert('Agent Phone must be in 123-456-7890 format.', 'danger');
                }
            }
            
            // Additional validation for numbers
            const bedroomsInput = form.querySelector('#bedrooms');
            const bathroomsInput = form.querySelector('#bathrooms');
            const squareFootageInput = form.querySelector('#squareFootage');
            const priceInput = form.querySelector('#price');

            if (bedroomsInput && (isNaN(parseInt(bedroomsInput.value)) || parseInt(bedroomsInput.value) < 1)) {
                isValid = false;
                bedroomsInput.classList.add('is-invalid', 'input-red-glow');
                showAlert('Bedrooms must be a number greater than or equal to 1.', 'danger');
            }
            if (bathroomsInput && (isNaN(parseFloat(bathroomsInput.value)) || parseFloat(bathroomsInput.value) < 1)) {
                isValid = false;
                bathroomsInput.classList.add('is-invalid', 'input-red-glow');
                showAlert('Bathrooms must be a number greater than or equal to 1.', 'danger');
            }
            if (squareFootageInput && (isNaN(parseInt(squareFootageInput.value)) || parseInt(squareFootageInput.value) < 100)) {
                isValid = false;
                squareFootageInput.classList.add('is-invalid', 'input-red-glow');
                showAlert('Square Footage must be a number greater than or equal to 100.', 'danger');
            }
            if (priceInput && (isNaN(parseFloat(priceInput.value)) || parseFloat(priceInput.value) < 1)) {
                isValid = false;
                priceInput.classList.add('is-invalid', 'input-red-glow');
                showAlert('Price must be a number greater than or equal to 1.', 'danger');
            }


            if (!isValid) {
                form.classList.add('form-red-gradient-glow');
                // General alert is sufficient as individual fields are highlighted and specific messages are shown for phone
                return; // Stop submission if validation fails
            }

            try {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Uploading...
                `;

                const formData = new FormData(form);

                const response = await fetch('http://localhost:8080/listings', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error || 'Failed to create listing');
                }

                showAlert('Great job! Your new property listing is now live.', 'success');
                form.reset();
                startPageTransition('index.html'); // Use startPageTransition
            } catch (err) {
                console.error('Listing submission error:', err);
                showAlert(`Error: ${err.message}`, 'danger');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // Secure Property-Detail Page & View Details Buttons
    function handleViewDetailsClick(event) {
        if (sessionStorage.getItem('isLoggedIn') !== 'true') {
            event.preventDefault();
            showAlert('You need to log in to view property details.', 'warning');
            sessionStorage.setItem('redirectAfterLogin', this.href);
            startPageTransition('login.html'); // Use startPageTransition
        }
    }

    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.removeEventListener('click', handleViewDetailsClick); // Prevent double listeners
        button.addEventListener('click', handleViewDetailsClick);
    });

    if (window.location.pathname.includes('property-detail.html')) {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            showAlert('You need to log in to view property details.', 'warning');
            sessionStorage.setItem('redirectAfterLogin', window.location.href);
            startPageTransition('login.html'); // Use startPageTransition
        } else {
            loadPropertyDetails();
        }
    }

    // Dynamically Load Featured Listings on Homepage (index.html)
    async function fetchAndDisplayFeaturedListings() {
        const featuredListingsContainer = document.getElementById('featured-listings-container');

        if (window.location.pathname.includes('index.html') && featuredListingsContainer) {
            featuredListingsContainer.innerHTML = `
            <div class="col-12 text-center">
              <p>Loading featured listings...</p>
            </div>
          `;

            try {
                const response = await fetch('http://localhost:8080/listings');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const listings = await response.json();

                if (listings.length === 0) {
                    featuredListingsContainer.innerHTML = `
                    <div class="col-12 text-center">
                      <p>No featured listings available yet. Want to help students find homes? <a href="create-listing.html" class="text-danger fw-bold">Create a listing now!</a></p>
                    </div>
                  `;
                    return;
                }

                featuredListingsContainer.innerHTML = '';

                // Sort by creation date, newest first
                listings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                const featuredCount = Math.min(listings.length, 3); // Display up to 3 latest listings
                for (let i = 0; i < featuredCount; i++) {
                    const listing = listings[i];
                    const cardHtml = `
                    <div class="col-md-4">
                      <div class="card h-100">
                        <img src="${listing.image_url || 'placeholder.png'}" class="card-img-top" alt="${listing.title || 'Property Image'}">
                        <div class="card-body">
                          <span class="badge bg-warning text-dark mb-2">⭐ Featured</span>
                          <h5 class="card-title">C$${parseFloat(listing.price).toLocaleString('en-CA')}${listing.listing_type === 'rent' ? '/Mo' : ''}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${listing.title}</h6>
                          <p class="card-text">
                            ${listing.bedrooms} Beds | ${listing.bathrooms} Baths | ${listing.square_footage} Sq Ft
                            <br><strong>Type:</strong> ${listing.housing_type ? listing.housing_type.charAt(0).toUpperCase() + listing.housing_type.slice(1) : 'N/A'}
                            <br><strong>Campus:</strong> ${listing.campus ? listing.campus.charAt(0).toUpperCase() + listing.campus.slice(1) : 'N/A'}
                          </p>
                          <p class="text-muted">${listing.address}, ${listing.postal_code}</p>
                          <a href="property-detail.html?id=${listing.id}" class="btn btn-danger w-100 view-details-btn">View Details</a>
                        </div>
                      </div>
                    </div>
                  `;
                    featuredListingsContainer.insertAdjacentHTML('beforeend', cardHtml);
                }

                document.querySelectorAll('.view-details-btn').forEach(button => {
                    button.removeEventListener('click', handleViewDetailsClick);
                    button.addEventListener('click', handleViewDetailsClick);
                });

            } catch (error) {
                console.error('Error fetching featured listings:', error);
                featuredListingsContainer.innerHTML = `
              <div class="col-12 text-center text-danger">
                <p>Failed to load listings. Please try again later. (Error: ${error.message})</p>
                <p>If you're a landlord or student with a listing, why not <a href="create-listing.html" class="text-danger fw-bold">create one now!</a></p>
              </div>
            `;
            }
        }
    }

    async function loadPropertyDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const listingId = urlParams.get('id');

        if (!listingId) {
            document.querySelector('main.container').innerHTML = `
            <div class="alert alert-danger" role="alert">
              No listing ID provided.
            </div>
          `;
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/listings/${listingId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    document.querySelector('main.container').innerHTML = `
                    <div class="alert alert-warning" role="alert">
                      Listing not found.
                    </div>
                  `;
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const listing = await response.json();

            document.getElementById('pageTitle').textContent = `${listing.title} | York Realty`;
            document.getElementById('propertyTitle').textContent = listing.title;
            document.getElementById('propertyImage').src = listing.image_url || 'placeholder.png';
            document.getElementById('propertyImage').alt = listing.title || 'Property Image';
            document.getElementById('propertyBeds').textContent = `${listing.bedrooms} ${listing.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`;
            document.getElementById('propertyBaths').textContent = `${listing.bathrooms} ${listing.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}`;
            document.getElementById('propertyPrice').textContent = `C$${parseFloat(listing.price).toLocaleString('en-CA')}${listing.listing_type === 'rent' ? '/Mo' : ''}`;
            document.getElementById('propertyDescription').textContent = listing.property_description;
            document.getElementById('propertyAddress').textContent = listing.address;
            document.getElementById('propertyPostalCode').textContent = listing.postal_code;
            document.getElementById('propertySqFt').textContent = listing.square_footage;

            const sqFtElement = document.getElementById('propertySqFt');
            let lastInsertedElement = sqFtElement.parentNode;

            const newHousingTypeP = document.createElement('p');
            newHousingTypeP.innerHTML = `<strong>Housing Type:</strong> ${listing.housing_type ? listing.housing_type.charAt(0).toUpperCase() + listing.housing_type.slice(1) : 'N/A'}`;
            if (lastInsertedElement) {
                lastInsertedElement.insertAdjacentElement('afterend', newHousingTypeP);
                lastInsertedElement = newHousingTypeP;
            }

            const newCampusP = document.createElement('p');
            newCampusP.innerHTML = `<strong>Campus:</strong> ${listing.campus ? listing.campus.charAt(0).toUpperCase() + listing.campus.slice(1) : 'N/A'}`;
            if (lastInsertedElement) {
                lastInsertedElement.insertAdjacentElement('afterend', newCampusP);
                lastInsertedElement = newCampusP;
            }

            document.getElementById('agentName').textContent = listing.agent_name || 'N/A';
            document.getElementById('agentEmail').textContent = listing.agent_email || 'N/A';
            document.getElementById('agentPhone').textContent = listing.agent_phone || 'N/A';

        } catch (error) {
            console.error('Error loading property details:', error);
            document.querySelector('main.container').innerHTML = `
            <div class="alert alert-danger" role="alert">
              Failed to load property details. Please try again later. (Error: ${error.message})
            </div>
          `;
        }
    }

    fetchAndDisplayFeaturedListings();

  // Automatically render listings if on Listings page
  if (document.title.includes("Listings")) {
    renderListings(1);
  }
});
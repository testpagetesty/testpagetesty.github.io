document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('cookiesAccepted')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <p>This website uses cookies to give you the best experience, mate.
                <a href="cookie-policy.html">Find out more</a>
                </p>
                <button id="acceptCookies" class="btn alazea-btn">Accept</button>
            </div>
        `;
        document.body.appendChild(cookieBanner);

        document.getElementById('acceptCookies').addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.transform = 'translateY(100%)';
            setTimeout(() => {
                cookieBanner.remove();
            }, 300);
        });
    }
}); 
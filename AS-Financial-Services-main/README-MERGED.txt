AS FINANCIAL SERVICES — MERGED WEBSITE

This package keeps the original AS Financial Services website and landing page intact.
It adds the distinct customer/admin workflows from the AT Solutions project, rebranded
to AS Financial Services and styled with the AT financial design system in an isolated
asset folder to avoid overwriting the original site's files.

Added pages:
- compare.html, lenders.html, services.html, service.html
- apply.html, login.html, register.html, forgot-password.html, otp.html, dashboard.html
- admin/login.html, admin/dashboard.html
- privacy.html, terms.html

Assets for the added workflows are under at-assets/ (separate from the original assets/).

IMPORTANT DEMO LIMITATION:
The added authentication, application, lender comparison, and admin data store run in
browser localStorage/sessionStorage. They are demonstrations, not production security
or real lender submissions. A production deployment needs a secure backend, database,
server-side authentication/authorization, and verified lender integrations.

The original AS Financial Services index.html and its existing pages are retained.

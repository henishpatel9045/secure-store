<h1 style="display: flex; align-items: center; gap: 0.5rem;"><img src="./public/icon.svg" style="max-width: 2rem"
        alt="Secure Store Logo"> Secure Store Web App</h1>
<p></p>
<p>Secure Store is a web application that allows users to store and manage documents securely. It provides features for
    both regular documents and encrypted documents, ensuring the utmost privacy and protection for your sensitive data.
</p>
<h2>Table of Contents</h2>
<ul>
    <li><a href="#introduction" target="_new">Introduction</a></li>
    <li><a href="#technologies" target="_new">Technologies</a></li>
    <li><a href="#features" target="_new">Features</a></li>
    <li><a href="#getting-started" target="_new">Getting Started</a></li>
    <li><a href="#usage" target="_new">Usage</a></li>
    <li><a href="#authentication" target="_new">Authentication</a></li>
    <li><a href="#document-management" target="_new">Document Management</a></li>
    <li><a href="#encrypted-document-management" target="_new">Encrypted Document Management</a></li>
    <li><a href="#protected-pages" target="_new">Protected Pages</a></li>
    <li><a href="#contributing" target="_new">Contributing</a></li>
    <li><a href="#license" target="_new">License</a></li>
</ul>
<h2>Introduction</h2>
<p>Welcome to the Secure Store web app repository! This project is designed to provide a secure and user-friendly
    environment for managing your documents. Whether you need to upload, edit, or share documents, Secure Store has you
    covered.</p>
<p><strong>Deployed Application:</strong> <a href="https://secure-store.vercel.app"
        target="_new">https://secure-store.vercel.app</a></p>
<h2>Technologies</h2>
<p>The Secure Store web app is built using a stack of modern technologies:</p>
<ul>
    <li><strong>Node.js</strong>: A JavaScript runtime environment.</li>
    <li><strong>Next.js</strong>: A React framework for building server-rendered applications.</li>
    <li><strong>Tailwind CSS</strong>: A utility-first CSS framework for quickly building custom designs.</li>
    <li><strong>DaisyUI</strong>: A plugin for Tailwind CSS that adds a set of utility classes.</li>
    <li><strong>Firebase Storage</strong>: A cloud storage solution for securely storing user-uploaded files.</li>
    <li><strong>Prisma</strong>: A modern database toolkit for working with databases.</li>
    <li><strong>PostgreSQL</strong>: A powerful, open-source relational database system.</li>
    <li><strong>SMTP Server</strong>: Used for sending magic link emails for authentication.</li>
</ul>
<h2>Features</h2>
<p>Secure Store offers a range of features to enhance your document management experience:</p>
<h3>Authentication</h3>
<ul>
    <li><strong>Google OAuth</strong>: Users can seamlessly sign up and log in using their Google accounts.</li>
    <li><strong>Email Magic Link</strong>: An alternative sign-up and login method using magic links sent to users'
        email addresses.</li>
</ul>
<h3>Document Management</h3>
<ul>
    <li><strong>Add New Document</strong>: Upload and store your documents securely in the app.</li>
    <li><strong>Edit Existing Document</strong>: Easily modify document details whenever needed.</li>
    <li><strong>Delete Document</strong>: Remove unwanted documents from your collection.</li>
    <li><strong>Share Documents</strong>: Generate shareable links with expiry dates for temporary document access.</li>
</ul>
<h3>Encrypted Document Management</h3>
<ul>
    <li><strong>Add Encrypted Document</strong>: Upload and manage encrypted documents with added security.</li>
    <li><strong>Edit Encrypted Document</strong>: Modify encrypted document details or passkeys.</li>
    <li><strong>Passkey Security</strong>: Passkeys provide an additional layer of protection for encrypted documents.
    </li>
    <li><strong>No Share Links</strong>: Encrypted documents cannot be shared via links for enhanced security.</li>
</ul>
<h2>Getting Started</h2>
<p>Follow these steps to get the Secure Store web app up and running on your local machine:</p>
<ol>
    <li>Clone this repository to your local machine.</li>
    <li>Install project dependencies using <code>npm install</code>.</li>
    <li>Set up your environment variables, including database connections and API keys.</li>
    <li>Run the development server using <code>npm run dev</code>.</li>
    <li>Access the web app at <code>http://localhost:3000</code>.</li>
</ol>
<h2>Usage</h2>
<p>Upon logging in, you'll have access to the main dashboard where you can manage your documents. You can upload new
    documents, edit existing ones, and generate shareable links for temporary access.</p>
<h2>Authentication</h2>
<p>Secure Store offers multiple authentication methods to ensure a secure login experience:</p>
<ul>
    <li><strong>Google OAuth</strong>: Click the "Sign in with Google" button to authenticate with your Google account.
    </li>
    <li><strong>Email Magic Link</strong>: Alternatively, enter your email address to receive a magic link that logs you
        in securely.</li>
</ul>
<h2>Document Management</h2>
<p>The document management section allows you to:</p>
<ul>
    <li>Upload new documents by clicking the "Add Document" button.</li>
    <li>Edit existing document details such as name and description.</li>
    <li>Delete unwanted documents to keep your collection organized.</li>
</ul>
<h2>Encrypted Document Management</h2>
<p>For sensitive documents, the encrypted document management feature provides:</p>
<ul>
    <li>Upload and management of encrypted documents.</li>
    <li>Option to set a passkey for each encrypted document.</li>
    <li>Enhanced security with passkey protection for document access.</li>
</ul>
<h2>Protected Pages</h2>
<p>All pages, except the login page and the share page, are protected and require user authentication to access. This
    ensures the security and privacy of your documents.</p>
<h2>Contributing</h2>
<p>Contributions to this project are welcome! If you find any issues or want to suggest improvements, please feel free
    to submit a pull request or open an issue.</p>
<h2>License</h2>
<p>This project is licensed under the <a href="LICENSE" target="_new">MIT License</a>. Feel free to use, modify, and
    distribute it as you see fit.</p>
<hr>
<p><strong>Developed with ❤️ by Henish Patel</strong></p>
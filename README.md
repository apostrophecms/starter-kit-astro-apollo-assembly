# Apollo Starter Kit for ApostropheCMS Assembly + Astro Integration (Pro Edition)

**A complete multisite platform with modern performance, streamlined development, and an editor experience your teams will enjoy using.**

> **⚠️ Note:** This starter kit requires an ApostropheCMS Assembly license, which includes all Pro features. [View Assembly pricing](https://apostrophecms.com/pricing) or [contact us](https://apostrophecms.com/contact-us) to learn more about licensing options.
>
> **Hosting option:** ApostropheCMS provides turnkey hosting for Assembly + Astro projects, managing the infrastructure so you can focus on building. [Learn more](https://apostrophecms.com/hosting) and [contact us](https://apostrophecms.com/contact-us) to get started.

This kit combines Astro’s fast frontend performance with ApostropheCMS Assembly’s powerful multisite architecture and the Apollo design system. Manage multiple websites from a single dashboard while delivering production-ready styling and in-context editing.

The template includes **all ApostropheCMS Pro modules**, plus a Bulma-based design system with rich content features.

---
<!-- omit in toc -->
## ✨ Highlights

**For Platform Owners:**

* 🏢 **Multisite Management** – Run multiple sites from one dashboard and one codebase
* 💰 **Lower Costs** – Shared resources reduce infrastructure and maintenance overhead
* 🎨 **Theme Support** – Different brands and designs without code duplication
* 🔐 **Enterprise Controls** – Permissions, workflows, and automated translations
* 📊 **Advanced Features** – Document versioning, SEO optimization, visual design tools

**For Development Teams:**

* ⚡ **Combined Stack** – Assembly multisite + Astro frontend + Apollo design system
* 🎯 **No API Boilerplate** – The `apostrophe-astro` package handles backend communication
* 🔧 **Scalable Development** – Write once, deploy across many sites
* 🚀 **Modern Frontend** – Server-side rendering, smart hydration, optimized performance
* 🎨 **Production Styling** – Apollo design system with Bulma included

**For Content Teams:**

* ✏️ **Intuitive Editing** – In-context editing with ApostropheCMS
* 🎯 **Site-Specific Control** – Each site admin manages their own content
* 📈 **Instant Previews** – See changes live
* 🛡️ **Isolated Content** – Each site’s content is independent and secure
* 🌍 **Automated Translation** – DeepL, Google Translate, or Azure support
* 🎨 **Visual Customization** – Palette extension for in-context design control

---
<!-- omit in toc -->
## What You Get

This starter kit provides a complete enterprise multisite solution:

**Multisite Foundation:**

* Assembly setup with dashboard for site management
* Astro frontend optimized for multisite delivery
* Theme system supporting multiple designs from a single codebase
* Apollo design system built on Bulma CSS

**Rich Content Features:**

* Seven custom widgets (hero, slideshow, accordion, cards, etc.)
* Article and author pieces for blog functionality
* Multiple page layouts (Minimal, Foundation, Showcase)
* Responsive design with production-ready styling

**Pro Features Pre-Installed:**

* **Advanced Permissions** – Granular access control and user groups
* **Automated Translation** – DeepL, Google Translate, and Azure integration
* **SEO Assistant** – AI-powered content optimization
* **Palette** – Visual design customization tools
* **Document Versions** – Revision history and rollback
* **Template Library** – Reusable document templates

---
<!-- omit in toc -->
## Table of Contents
* [Apollo Starter Kit for ApostropheCMS Assembly + Astro Integration (Pro Edition)](#apollo-starter-kit-for-apostrophecms-assembly--astro-integration-pro-edition)
  * [Introduction](#introduction)
  * [🚀 Getting Started](#-getting-started)
  * [⚙️ Advanced Multisite Configuration](#️-advanced-multisite-configuration)
  * [🏗️ Project Architecture](#️-project-architecture)
  * [🔧 Development Workflow](#-development-workflow)
  * [📊 Dashboard Development](#-dashboard-development)
  * [⏰ Task Scheduling](#-task-scheduling)
  * [🗄️ MongoDB Utilities](#️-mongodb-utilities)
  * [🚀 Pro Modules](#-pro-modules)
  * [🌟 Features \& Widgets](#-features--widgets)
  * [🖼️ Image Helper Functions](#️-image-helper-functions)
  * [🖌️ Theming](#️-theming)
  * [⚙️ Package Scripts](#️-package-scripts)
  * [📚 Additional Resources](#-additional-resources)
  * [⚖️ Licensing](#️-licensing)

---

## Introduction

This project combines three technologies:

* **ApostropheCMS Assembly** – The multisite backend that manages content and configuration across many sites
* **Apollo Design System** – A production-ready Bulma-based design system with rich widgets and layouts
* **Astro** – A modern, fast frontend framework with server-side rendering

What sets this apart from typical headless CMS setups is the [apostrophe-astro](https://github.com/apostrophecms/apostrophe-astro) package, which enables full use of the ApostropheCMS Admin UI with in-context editing while automating content fetching from the backend.

---

## 🚀 Getting Started

### Prerequisites

**Required:**
* Node.js v20 or later (v22 recommended)
* MongoDB v6.0 or later ([setup guide](https://docs.apostrophecms.org/guide/development-setup.html))
* ApostropheCMS Assembly license with access to `@apostrophecms-pro/multisite` and Pro modules

**Windows Users:**
* Windows Subsystem for Linux 2 (WSL2) required for ApostropheCMS development ([setup guide](https://docs.apostrophecms.org/cookbook/windows-development.html))

**For Local Testing:**
* `/etc/hosts` configuration for subdomain testing (details below)

**Optional (for Pro features):**
* OpenAI API key (for SEO Assistant)
* DeepL, Google Translate, or Azure Translator API key (for automated translation)

### Quick Start

We recommend forking this repository to your GitHub account, then cloning locally. **The Apostrophe CLI is not intended for multisite projects.**

#### 1. Clone and Install

```bash
git clone https://github.com/your-org/your-assembly-apollo-project.git
cd your-assembly-apollo-project
npm install
```

#### 2. Configure Required Settings

Before starting, you must configure several critical settings. These ensure your multisite platform works correctly in development and prevents conflicts with other Assembly projects.

##### Setting Your Shortname Prefix

**What it does:** The shortname prefix is prepended to all MongoDB database names in your Assembly project. This prevents database conflicts when running multiple Assembly projects on the same development machine.

**Why you need it:** Without a unique prefix, two different Assembly projects would try to use the same database names (like `dashboard`, `company1`, etc.), causing data conflicts and errors.

Edit `backend/app.js` and replace the default prefix with one unique to your project:

```javascript
await multisite({
  shortNamePrefix: process.env.SHORTNAME_PREFIX || 'your-project-',
  // ...
});
```

**Best practice:** Match your repo name followed by a `-` character. For example, if your repo is named `acme-sites`, use `acme-sites-`.

> **MongoDB Atlas note:** If you're using a MongoDB Atlas cluster below M10 tier, you must keep the prefix under 12 characters (before the `-`). This is due to Atlas database name length limitations. Higher-tier clusters don't have this restriction.

##### Configuring Your Domains

**What it does:** The `domains.js` file defines the base domains for your Assembly platform across different environments (development, staging, production). The `@apostrophecms-pro/multisite` module uses these to construct full URLs for each site.

**Why you need it:** Each site you create gets a subdomain of these base domains. For example, with a site shortname of `acme` and domains configured as shown below, the site automatically works at:
* `http://acme.localhost:3000` (development)
* `https://acme.staging.your-domain.com` (staging)
* `https://acme.your-domain.com` (production, before you set a custom production hostname)

Edit `domains.js` in the `backend/` directory:

```javascript
export default {
  dev: 'localhost:3000',
  staging: 'staging.your-domain.com',
  prod: 'your-domain.com'
};
```

**Environment configuration details:**

* **`dev`**: Your local development environment. Leave this as `localhost:3000` unless you have a specific reason to change it. The first environment listed is always treated as the local debugging environment.

* **`staging`**: Your staging environment domain. If you're using ApostropheCMS Assembly hosting, we configure this for you. For self-hosting, you'll need:
  * A DNS wildcard `A` record pointing `*.staging.your-domain.com` to your staging server
  * A wildcard SSL certificate for `*.staging.your-domain.com`

* **`prod`**: Your production environment domain. Similar to staging, if we're hosting for you, this is preconfigured. For self-hosting, you need:
  * A DNS wildcard `A` record pointing `*.your-domain.com` to your production server
  * A wildcard SSL certificate for `*.your-domain.com`

> **About production hostnames:** While sites initially use subdomains like `acme.your-domain.com`, you can later assign custom production domains (like `www.acme.com`) via the dashboard UI. The base domain still provides the "pre-production" hostname for early content creation.

> **Custom environment names:** You're not restricted to `dev`, `staging`, and `prod`. However, the first environment is assumed to be local development, and only the environment named `prod` serves sites under their custom production hostnames.

##### Setting Security Keys

**What they do:** These keys secure your multisite platform:

* **`disabledFileKey`**: Used when disabling access to files in the local backend. This prevents unauthorized file access between sites.
* **`secret`**: Encrypts login session data. Each Assembly project should have a unique secret.

**Why you need them:** The default `CHANGEME` values are insecure. Replace them with random strings before deploying or sharing your code.

Edit `backend/sites/index.js`:

```javascript
export default function (site) {
  const config = {
    root: import.meta,
    // Replace CHANGEME with actual random strings
    disabledFileKey: 'CHANGEME', // Generate a random string here
    secret: 'CHANGEME', // Generate a different random string here
    // ...
  };
  return config;
}
```

**Generating random strings:** Use any method to generate secure random strings:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

#### 3. Configure `/etc/hosts` (Mac/Linux)

**What it does:** Maps subdomains like `dashboard.localhost` and `company1.localhost` to your local machine (`127.0.0.1`).

**Why you need it:** While Chrome automatically resolves all subdomains of `localhost` to your computer, other browsers require explicit entries in your hosts file.

Add these lines to `/etc/hosts`:

```
127.0.0.1 dashboard.localhost company1.localhost company2.localhost
```

**Add more as needed:** Each time you create a new test site, add its subdomain to this list. For example, if you create a site with shortname `test3`, add `test3.localhost` to the line above.

**Editing `/etc/hosts`:**

```bash
# Mac/Linux
sudo nano /etc/hosts

# After editing, save with Ctrl+O, Enter, then exit with Ctrl+X
```

#### 4. Set Up Dashboard Admin

**What it does:** Creates an admin user account for the dashboard site. This user has access to create, edit, and delete all sites in your multisite platform.

**Why you need it:** The dashboard admin is your "super admin" who manages the entire platform. Individual sites will have their own separate admin accounts.

Create the dashboard admin:

```bash
cd backend
node app @apostrophecms/user:add admin admin --site=dashboard
```

You'll be prompted to enter a password. Choose a strong password and save it securely.

**Understanding the command:**
* `@apostrophecms/user:add` - The Apostrophe task name
* First `admin` - The username
* Second `admin` - The role (admin role required for dashboard access)
* `--site=dashboard` - Specifies this user belongs to the dashboard site

> **Important:** In a multisite environment, command line tasks always require the `--site` flag. For the dashboard, use `--site=dashboard`. For individual sites, use any valid hostname (e.g., `--site=company1.localhost`), or use `--all-sites` to run the task on every site except the dashboard.

#### 5. Configure Environment Variables (Optional for Pro Features)

**What they do:** Pro modules activate automatically based on environment variables. Set the appropriate API keys to enable specific features.

**For SEO Assistant:**

The SEO Assistant uses OpenAI to provide AI-powered content optimization suggestions.

```bash
export OPENAI_API_KEY=your_openai_api_key
```

**For Automated Translation:**

Choose one translation provider. The template automatically enables the appropriate translation modules based on which API key you provide:

```bash
# Option 1: DeepL (recommended for quality)
export APOS_DEEPL_API_SECRET=your_deepl_api_key

# Option 2: Google Translate
export APOS_GOOGLE_API_SECRET=your_google_api_key

# Option 3: Azure Translator
export APOS_AZURE_API_SECRET=your_azure_api_key
```

If no translation API keys are set, only the manual import/export translation module will be available.

**Making variables persistent:**

Add these to your shell profile (`.bashrc`, `.zshrc`, etc.) to persist across terminal sessions:

```bash
# Add to ~/.bashrc or ~/.zshrc
export OPENAI_API_KEY=your_openai_api_key
export APOS_DEEPL_API_SECRET=your_deepl_api_key
```

#### 6. Start Development Servers

**What this does:** Starts both the ApostropheCMS backend (Assembly) and the Astro frontend. They work together to serve your multisite platform.

Open two separate terminals:

```bash
# Terminal 1 - Backend (use WSL on Windows)
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

**What's happening:**

* The backend starts on `http://localhost:3000` and handles content, users, and all database operations
* The frontend starts on `http://localhost:4321` (Astro default) and handles rendering
* The `npm run dev` scripts automatically handle authentication between frontend and backend by setting `APOS_EXTERNAL_FRONT_KEY` to "dev"

**For production or custom commands:**

If you start the frontend or backend with different commands, you must manually set `APOS_EXTERNAL_FRONT_KEY` to the same value in both:

```bash
# Backend
APOS_EXTERNAL_FRONT_KEY=my-secret-key npm start

# Frontend
APOS_EXTERNAL_FRONT_KEY=my-secret-key npm run build && npm run preview
```

**Optional configuration:**

If running the backend on a different server or port, set the frontend's backend URL:

```bash
# In the frontend terminal only
export APOS_HOST=your-backend-url
```

#### 7. Access the Dashboard and Create Your First Site

**Access the dashboard:**

Visit `http://dashboard.localhost:4321/login` and log in with the admin credentials you created in step 4.

**Create your first site:**

1. Click "Sites" in the admin bar at the top of the page
2. Click the "+ New Site" button
3. Fill in the required fields:
   * **Shortname**: A unique identifier (e.g., `company1`). This becomes the subdomain.
   * **Theme**: Choose `default` or `demo` (you can add more themes later)
   * **Admin Password**: Set a password for this site's admin account
4. Click "Save"

**What just happened:**

When you save a site, Assembly automatically:
* Creates a new MongoDB database for the site (e.g., `your-project-company1`)
* Creates an admin user for the site with the password you specified
* Makes the site accessible at `http://company1.localhost:3000`
* Associates the site with the theme you selected

**Access your new site:**

Visit `http://company1.localhost:3000` and log in with:
* **Username**: `admin`
* **Password**: The admin password you set when creating the site

**Important distinctions:**

* **Dashboard admin**: Can access the dashboard and all sites, manages the platform
* **Site admin**: Can only access their specific site, manages content and users for that site
* Each site has completely isolated content, media, and user accounts

> **Content visibility note:** If you access sites while logged out, you won't see your content edits unless you've used the "Commit" button to make them live. Draft content is only visible to logged-in editors.

#### 8. Create Additional Sites

Repeat step 7 to create more sites (e.g., `company2`, `company3`). Each site:
* Gets its own isolated database
* Has its own admin and user accounts
* Can use a different theme
* Maintains completely separate content

**Remember:** Add each new site's subdomain to your `/etc/hosts` file for local testing:

```
127.0.0.1 dashboard.localhost company1.localhost company2.localhost company3.localhost
```

**What you can do now:**

* Log in to each site independently and create different content
* Test how themes affect appearance by creating sites with different themes
* Experience how each site operates as a completely independent CMS
* Practice managing sites from the dashboard (editing, archiving, duplicating)

---

## ⚙️ Advanced Multisite Configuration

These optional configuration settings allow you to customize how site subdomains are generated. **These options are primarily intended for self-hosted deployments** and are not currently supported by ApostropheCMS Assembly Hosting, where we apply standard naming conventions.

### Customizing Subdomain Structure

All of these options are configured in `backend/app.js` within the `multisite()` configuration.

#### Adding a Subdomain Suffix

**What it does:** The `shortNameSuffix` option adds a suffix to every site's shortname when generating subdomains.

**Why you might use it:** This can help distinguish between different environments or categories of sites within your platform, or avoid conflicts with existing subdomains in your DNS.

**Configuration:**

```javascript
await multisite({
  shortNamePrefix: 'your-project-',
  shortNameSuffix: '-assembly',
  // ...
});
```

**Example:** With a site shortname of `cars` and the configuration above:

* **Without suffix**: `http://cars.localhost:3000`, `https://cars.staging.your-domain.com`
* **With suffix**: `http://cars-assembly.localhost:3000`, `https://cars-assembly.staging.your-domain.com`

**Important notes:**

* This suffix applies only when the hostname is determined by the `shortName` field. If you configure a custom production hostname for a site, it will be used exactly as given.
* Your dashboard is also affected. With the example above, the dashboard becomes `https://dashboard-assembly.staging.your-domain.com`
* If you combine `shortNameSuffix` with `dashboardShortName` (see below), both are applied to create the complete dashboard subdomain.

> **Not supported by Assembly Hosting:** This option is not available when using ApostropheCMS Assembly Hosting. Contact us if this is important for your project.

#### Changing the Locale Separator

**What it does:** The `localeSeparator` option controls the character used to separate locale codes from site shortnames in subdomains. The default is a dot (`.`).

**Why you might use it:** Some DNS providers or corporate policies have restrictions on subdomain depth or dot usage. A dash separator creates a flatter subdomain structure.

**Configuration:**

```javascript
await multisite({
  localeSeparator: '-',
  // ...
});
```

**Example:** With a site shortname of `cars`, the `fr` locale, and "Separate Host" enabled:

* **Default (dot separator)**: `fr.cars.your-domain.com`
* **With dash separator**: `fr-cars.your-domain.com`

**Important notes:**

* This option applies only when the hostname is determined by the `shortName` field. If you configure a custom production hostname for a specific locale, it will be used exactly as given.
* Your configuration won't apply immediately to existing sites. You must update existing site records to apply the changes:

  ```bash
  node app site:touch --site=dashboard
  ```

  This command requires the `touch` task. If you don't have it, update the `apostrophe` module to the latest 3.x version.

> **Not supported by Assembly Hosting:** This option is not available when using ApostropheCMS Assembly Hosting.

#### Customizing the Dashboard Subdomain

**What it does:** The `dashboardShortName` option changes the subdomain used for your dashboard. The default is `dashboard`.

**Why you might use it:** You might prefer a different name like `admin`, `control`, or `manage` to match your organizational terminology or to avoid conflicts with existing subdomains.

**Configuration:**

```javascript
await multisite({
  dashboardShortName: 'admin',
  // ...
});
```

**Example:** With the configuration above, your dashboard becomes available at:

* `http://admin.localhost:3000` (development)
* `https://admin.staging.your-domain.com` (staging)
* `https://admin.your-domain.com` (production)

**Important notes:**

* If `shortNameSuffix` is also set, the two options are combined. For example:

  ```javascript
  await multisite({
    dashboardShortName: 'admin',
    shortNameSuffix: '-platform',
    // ...
  });
  ```

  Results in: `admin-platform.localhost:3000`, `admin-platform.staging.your-domain.com`, etc.

> **Not supported by Assembly Hosting:** This option is not available when using ApostropheCMS Assembly Hosting. Contact us if this is a concern for your project.

### Localized Domain Names

Dashboard administrators can configure multiple locales for each site from the `locales` tab of the site editor modal. This feature is enabled by default through the `localizedSites` option in the `site` module configuration.

#### Configuring Site Locales

For each locale you add to a site, you can configure:

* **Name**: The locale code (e.g., `fr`, `es`, `de`)
* **Label**: A human-readable name (e.g., "French", "Spanish", "German")
* **Prefix**: A URL path prefix (e.g., `/fr`) for distinguishing locales on the same domain
* **Separate Host**: Whether this locale should use its own subdomain
* **Separate Production Hostname**: A custom production domain for this locale (e.g., `www.example.fr`)
* **Staging Subdomain**: Optional custom staging subdomain for testing production hostname configurations

#### How Locale URLs Work

**Example: French Locale Configuration**

Let's say you create a site with shortname `company` and add a French locale with these settings:

| Field                        | Value                |
| ---------------------------- | -------------------- |
| Name                         | `fr`                 |
| Label                        | `French`             |
| Prefix                       | (empty)              |
| Separate Host                | `true`               |
| Separate Production Hostname | `www.example.fr`     |
| Staging Subdomain            | (empty)              |

**Resulting URLs:**

* **Development**: `http://fr.company.localhost:3000`
* **Staging**: `https://fr.company.staging.your-domain.com`
* **Production**: `https://fr.company.your-domain.com` and `https://www.example.fr`

#### Using Prefixes Instead of Subdomains

If you set `Separate Host` to `false` and provide a `Prefix` of `/fr`:

**Resulting URLs:**

* **Development**: `http://company.localhost:3000/fr`
* **Staging**: `https://company.staging.your-domain.com/fr`
* **Production**: `https://company.your-domain.com/fr`

**Sharing Production Domains:**

Prefixes allow multiple locales to share the same `Separate Production Hostname`. For example:

* English: `www.example.com` (no prefix, default locale)
* French: `www.example.com/fr` (prefix: `/fr`)
* German: `www.example.com/de` (prefix: `/de`)

> **Important:** You can have only one locale with no prefix **and** no separate host - this becomes the default locale for the site.

#### Testing Production Hostnames in Staging

The `Staging Subdomain` field allows you to test your production hostname configuration before going live. If you set this to `test-fr`, your staging URL becomes:

* `https://test-fr.staging.your-domain.com`

This is useful when you want to verify that DNS, SSL certificates, and hostname routing work correctly with your planned production domain structure.

### Private Locales

You can make individual locales private, restricting access to logged-in users only. This is useful for:

* Beta testing new locale content before public launch
* Providing member-only content in specific languages
* Maintaining internal documentation in different languages

#### Configuring Private Locales

Each locale has a **Private Locale** boolean field in the dashboard. When enabled, only logged-in users can access content in that locale.

#### Setting Default Privacy Behavior

You can configure whether new locales are private or public by default. Instead of setting `localizedSites: true` in your dashboard configuration, pass an object with the `privateByDefault` option:

```javascript
// backend/dashboard/index.js
import themes from '../themes.js';
import baseUrlDomains from '../domains.js';

export default {
  root: import.meta,
  privateDashboards: true,
  modules: {
    '@apostrophecms-pro/multisite-dashboard': {},
    site: {
      options: {
        themes,
        baseUrlDomains,
        localizedSites: {
          privateByDefault: true  // New locales are private by default
        }
      }
    },
    'site-page': {}
  }
};
```

**Configuration options:**

* `privateByDefault: true` - All new locales created will be private by default
* `privateByDefault: false` (or omitted) - All new locales will be public by default

The `private` setting can always be changed later through the dashboard when editing site locales, regardless of the default setting.

#### How Private Locales Work

* **Logged-out users**: Cannot access any content in private locales. Attempts to access private locale URLs result in redirects or 404 errors.
* **Logged-in users**: Can access private locales normally, subject to their regular permissions within the site.
* **Site admins**: Can toggle locales between private and public at any time through the dashboard.

This provides flexible content access control at the locale level without requiring complex permission configurations.

## 🏗️ Project Architecture

### How It Works

This project combines three powerful systems:

**Backend (ApostropheCMS Assembly):**
* Manages multiple sites from a central dashboard
* Handles all content, users, and configuration
* Provides REST API for the frontend
* No templates (Astro handles all rendering)
* Pro modules for enterprise features

**Sites (Apollo Design + Pro Features):**
* Each site created through the dashboard gets the Apollo design system
* Beautiful Bulma-based styling with custom widgets and layouts
* Pro features work independently for each site
* Themes allow different designs across sites

**Frontend (Astro):**
* Single unified codebase serves all sites
* Passes hostname to backend to fetch correct content
* Renders templates and widgets dynamically with Apollo styling
* Provides in-context editing via `apostrophe-astro` integration

### Project Structure

```
├── backend/               # ApostropheCMS Assembly project
│   ├── dashboard/         # Dashboard site configuration
│   │   └── modules/       # Dashboard-specific modules
│   ├── sites/             # Shared site configuration
│   │   └── modules/       # Modules available to all sites (widgets, pages etc.)
│   ├── themes.js          # Theme definitions
│   ├── domains.js         # Environment domains
│   └── app.js             # Main configuration with Pro modules
├── frontend/              # Astro application
│   ├── src/
│   │   ├── pages/         # Single [...slug].astro route
│   │   ├── templates/     # Page templates (Apollo design)
│   │   ├── widgets/       # Widget templates (Apollo widgets)
│   │   └── components/    # Shared Astro components
│   └── astro.config.mjs
└── package.json           # Root-level convenience scripts
```

### Key Architectural Concepts

**Single Codebase, Multiple Sites:**
The backend serves different content based on hostname, while the frontend renders that content appropriately. Each site gets the Apollo design system and Pro features, with themes allowing for design variations.

**Template Mapping:**
Instead of multiple Astro routes, one `[...slug].astro` file routes all requests. Page types map to templates in `frontend/src/templates/` as defined in an `index.js` file in that folder, and widgets map to components in `frontend/src/widgets/` as defined in an `index.js` file in that folder.

**Theme System:**
Each site selects a theme via the dashboard. Theme-specific assets and configurations live in `backend/sites/modules/theme-{name}/` modules.

For more details on the backend architecture, see the [Assembly Essentials documentation](https://github.com/apostrophecms/starter-kit-assembly-essentials). For frontend architecture details, see the [Astro Essentials documentation](https://github.com/apostrophecms/starter-kit-astro-essentials).

### For ApostropheCMS Developers

If you've worked with ApostropheCMS Assembly, the backend structure will look familiar. Custom modules for pages, pieces, and widgets are in `backend/sites/modules/`, while dashboard-specific modules are in `backend/dashboard/modules/`.

**What stays the same:**
* Module registration in `backend/sites/index.js`
* Page types added to modules
* Most module configuration settings for Admin UI, request routing, and MongoDB interaction
* Pro modules available across all sites

**Key differences from single-site ApostropheCMS:**
* **No templates in modules** - Stylesheets, templates (implemented as Astro components), and client-side JavaScript go in the Astro project instead
* **No template helpers** - Skip `helper()`, `extendHelpers()`, `components()`, and `renderRoutes()` functions
* **Command line tasks require `--site`** - Always specify which site or use `--all-sites`
* **Schema sharing** - Some widget schemas have been moved to `backend/lib/schema-mixins` for reuse

### For Astro Developers

The Astro portion follows standard conventions with components in `src` and assets in `public`. The Astro frontend treats all sites the same - it receives a hostname and fetches appropriate content from the backend.

**What stays the same:**
* Standard Astro project organization
* Normal component and template patterns
* Client-side asset management

**Key differences from typical Astro:**
* **Single route system** - One `[...slug].astro` file handles all routing for all sites
* **Template mapping** - Pages map to templates in the `templates` folder
* **Widget system** - Widgets map to components in the `widgets` folder
* **Required configuration** - The `apostrophe` integration and `output: 'server'` settings must remain

### Routing and Templates

Unlike typical Astro projects with multiple route files, this project uses a single `[...slug].astro` route that:

1. Handles all URL routing for all sites using pages from the CMS backend
2. Maps page types to corresponding templates in the `templates` folder
3. Populates template content with data from the CMS
4. Renders widgets using templates from the `widgets` folder with Apollo styling

Each page template corresponds to a registered ApostropheCMS page or piece-page type. Content is populated by data from the CMS backend and inserted into slots in the main `[...slug].astro` file. Widget data is handled through the mapped templates and added to page templates using the `AposArea` helper component.

Read more in the [`apostrophe-astro` documentation](https://github.com/apostrophecms/apostrophe-astro) or in the [Apollo tutorial series](https://docs.apostrophecms.org/tutorials/astro/apostrophecms-and-astro.html).

### Widget Flexibility

This architecture allows widget templates to be used outside specialized `area` schema fields, providing design flexibility without code repetition. However, this means widget schema fields for content must also be added to page schemas. The `backend/lib/schema-mixins` folder facilitates this by allowing schema imports in both widget modules and page templates.

### Configuration Notes

The `astro.config.mjs` includes required settings for ApostropheCMS integration:
* `apostrophe` integration in the integrations array
* `output: 'server'` for server-side rendering
* Custom preprocessor options (this project uses a different SASS compiler for [Bulma CSS framework](https://bulma.io/) compatibility)

Read more in the [`apostrophe-astro` documentation](https://github.com/apostrophecms/apostrophe-astro).

---

## 🔧 Development Workflow

### Backend Development

Site-specific modules live in `backend/sites/modules/`, while dashboard-specific modules live in `backend/dashboard/modules/`. Configuration that applies to all sites goes in `backend/sites/index.js`.

**Command line tasks always require `--site`:**

```bash
# For dashboard
node app @apostrophecms/user:list --site=dashboard

# For a specific site (use any valid hostname)
node app @apostrophecms/user:list --site=company1.localhost

# For all sites
node app @apostrophecms/migration:migrate --all-sites
```

### Frontend Development

The Astro frontend treats all sites the same - it receives a hostname and fetches appropriate content from the backend. Your custom components and styling go in the standard Astro locations:

* **Templates**: `frontend/src/templates/` (mapped to page types)
* **Widgets**: `frontend/src/widgets/` (mapped to widget types)
* **Components**: `frontend/src/components/` (shared across templates)
* **Styles**: Add to theme modules or component files

**Theme-specific assets:**
Place stylesheets in `backend/sites/modules/theme-{name}/ui/src/index.scss`. ApostropheCMS bundles these and makes them available to the Astro frontend based on the site's theme.

For JavaScript, use Astro's `<script>` tags or client directives directly in your Astro components rather than the theme module's `ui/src/index.js`. This gives you better control over loading and hydration.

### Adding a New Theme

1. Add theme definition to `themes.js` in the `backend/` directory
2. Create `backend/sites/lib/theme-{name}.js`:

```javascript
export default function(site, config) {
  config.modules = {
    ...config.modules,
    'theme-{name}': {}
  };
}
```
* Create and configure the `backend/sites/modules/theme-{name}/`

### Testing Multiple Sites

Create test sites via the dashboard with different shortnames (e.g., `test1`, `test2`, `test3`). Remember to add entries to `/etc/hosts` for each new subdomain.

Each site maintains completely separate:
* Content and media
* User accounts (except dashboard admins)
* Configuration (within theme constraints)
* Pro module settings (like Palette customizations)

## 📊 Dashboard Development

**The dashboard site has one job: managing the other sites.** As such, you don't need to worry about making this site a pretty experience for the general public, because they won't have access to it. However, you may want to dress up this experience and add extra functionality for your own customer admin team (the people who add and remove sites from the platform).

### Dashboard Features

This starter kit includes the `@apostrophecms-pro/multisite-dashboard` extension, which significantly enhances the dashboard experience beyond the basic multisite functionality.

**Enhanced Site Management:**

* **Scrollable List View** - Sites are presented as a scrollable list instead of individual cards, making it easier to manage large numbers of sites
* **Integrated Search** - A search box allows you to quickly find sites by name or other criteria
* **Direct Site Access** - Each site in the list includes:
  * A login link that takes you directly into that site's admin interface
  * A link to navigate to the site's homepage
  * Context menu access to additional actions

**Template System:**

The dashboard extension adds a powerful templating feature for creating reusable site configurations:

1. **Create Templates** - When creating or editing a site, click the "Template" control in the "Basics" tab to mark it as a template
2. **Active Templates** - Template sites remain fully active and functional, but appear in a separate "Template" tab in the dashboard
3. **Duplicate Templates** - Use the context menu on the right side of any template to create new sites based on that template
4. **Time Savings** - Templates preserve all configuration, content, and settings, allowing you to quickly spin up pre-configured sites

This is particularly useful for:
* Creating starter configurations for different client types
* Maintaining brand-specific templates with pre-loaded content
* Providing demo sites that can be quickly duplicated for testing

### How Dashboard Development Works

Dashboard development is very similar to regular site development, except that modules live in `backend/dashboard/modules`, and what normally resides in `app.js` lives in `backend/dashboard/index.js`.

**The `site` Module:**

The most important module in the dashboard is the `site` module. This is a piece type, with a piece representing each site that your dashboard admins create. The `site` module is registered automatically through the `@apostrophecms-pro/multisite-dashboard` extension.

You can extend this module at the project level by creating a `backend/dashboard/modules/@apostrophecms-pro/site/` folder and placing your code there. This follows the [standard method](https://docs.apostrophecms.org/guide/modules.html) for extending any package at project level.

**How Site Configuration Flows:**

1. Dashboard admins fill out the `site` piece schema when creating a site
2. These schema field values are passed to individual sites in the `site` object
3. Sites access these values in `backend/sites/index.js` to configure themselves

For example, the starter kit uses the `theme` field from the site piece to set the theme configuration:

```javascript
// backend/sites/index.js
export default function (site) {
  const config = {
    root: import.meta,
    theme: site.theme, // From the site piece schema
    // ...
  };
  return config;
};
```

### Allowing Dashboard Admins to Pass Configuration to Sites

You can add custom schema fields to the `site` piece type, and those fields become available on the `site` object passed to `backend/sites/index.js`. This allows dashboard admins to configure individual sites without touching code.

#### Adding Custom Fields to the Site Schema

Create or edit `backend/dashboard/modules/@apostrophecms-pro/site/index.js`:

```javascript
export default {
  fields: {
    add: {
      apiKey: {
        type: 'string',
        label: 'API Key',
        help: 'Third-party API key for this site',
        required: true
      },
      enableFeatureX: {
        type: 'boolean',
        label: 'Enable Feature X',
        def: false
      },
      customColor: {
        type: 'color',
        label: 'Brand Color'
      }
    },
    group: {
      integration: {
        label: 'Integration Settings',
        fields: ['apiKey', 'enableFeatureX', 'customColor']
      }
    }
  }
};
```

#### Passing Configuration to Site Modules

Access these values in `backend/sites/index.js` and pass them to specific modules:

```javascript
// backend/sites/index.js
export default function (site) {
  const config = {
    root: import.meta,
    theme: site.theme,
    modules: {
      'commerce-page': {
        options: {
          apiKey: site.apiKey,
          enabled: site.enableFeatureX
        }
      },
      'custom-widget': {
        options: {
          brandColor: site.customColor
        }
      }
    }
  };
  return config;
};
```

#### Making Values Globally Available

You can also add values to the `apos.options` object to make them available throughout the site:

```javascript
// backend/sites/index.js
export default function (site) {
  const config = {
    root: import.meta,
    theme: site.theme,
    apiKey: site.apiKey, // Now available as self.apos.options.apiKey
    brandColor: site.customColor, // Available as self.apos.options.brandColor
    modules: {
      // ... module configuration
    }
  };
  return config;
};
```

Any module can then access these values:

```javascript
// In any module method with access to self
const apiKey = self.apos.options.apiKey;
const color = self.apos.options.brandColor;
```

#### Passing Values to Templates

To use these values in your Astro templates, set them via the [`templateData` module option](https://docs.apostrophecms.org/reference/module-api/module-options.html#templatedata):

```javascript
// backend/sites/modules/@apostrophecms/global/index.js
export default {
  options: {
    templateData(req) {
      return {
        brandColor: req.apos.options.brandColor,
        siteName: req.apos.site.title
      };
    }
  }
};
```

Then access in your Astro templates:

```astro
---
const { brandColor, siteName } = Astro.props.data.templateData;
---

<style define:vars={{ brandColor }}>
  .hero {
    background-color: var(--brandColor);
  }
</style>

<h1>{siteName}</h1>
```

### Advanced Dashboard Customization

You can add additional functionality to the dashboard by creating custom modules in `backend/dashboard/modules/`:

**Custom Reports:**

```javascript
// backend/dashboard/modules/site-report/index.js
export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Site Report',
    // Custom logic to generate reports across all sites
  }
};
```

**Bulk Operations:**

```javascript
// backend/dashboard/modules/bulk-operations/index.js
export default {
  handlers(self) {
    return {
      'apostrophe:modulesReady': {
        async addBulkOperations() {
          // Add custom bulk operations for sites
        }
      }
    };
  }
};
```

**Custom Dashboard Widgets:**

You can add custom manager modal tabs or custom columns to the site manager by extending the `@apostrophecms-pro/site` module with custom field types and UI enhancements.

The dashboard is a full ApostropheCMS site, so all standard ApostropheCMS development patterns apply. Consult the [ApostropheCMS documentation](https://docs.apostrophecms.org/) for additional customization options.

## ⏰ Task Scheduling

When hosting with ApostropheCMS Assembly, you can schedule recurring tasks much like you would with `cron` in a single-server environment. This allows you to automate routine operations across all sites or specific sites in your platform.

### How Task Scheduling Works

Assembly task scheduling is configured in `backend/app.js` when setting up the `@apostrophecms-pro/multisite` module. The scheduler runs tasks at specified intervals (hourly or daily) and uses distributed locking to ensure each task runs only once, even when your application is deployed across multiple servers.

**Key benefits:**
* **Distributed execution** - Tasks run once per schedule even with multiple application servers
* **Site targeting** - Run tasks across all sites or just the dashboard
* **Simple configuration** - No cron syntax or external schedulers needed
* **Automatic locking** - Prevents duplicate execution when scaling horizontally

### Configuration

Add a `tasks` option to your multisite configuration in `backend/app.js`. This is a top-level option, peer to the `sites` and `dashboard` options:

```javascript
import multisite from '@apostrophecms-pro/multisite';

await multisite({
  shortNamePrefix: process.env.SHORTNAME_PREFIX || 'your-project-',
  sites: async () => {
    return (await import('./sites/index.js')).default;
  },
  dashboard: async () => {
    return (await import('./dashboard/index.js')).default;
  },
  tasks: {
    // Tasks that run for all sites
    'all-sites': {
      hourly: [
        'product:sync',
        'analytics:collect --verbose',
        'cache:clear --type=cloudflare'
      ],
      daily: [
        'backup:create',
        'report:email --recipients=admin@example.com'
      ]
    },
    // Tasks that run for the dashboard site only
    dashboard: {
      hourly: [
        'site-stats:update'
      ],
      daily: [
        'user-audit:generate',
        'license:check'
      ]
    }
  }
});
```

### Task Configuration Options

#### `all-sites` Tasks

Tasks in the `all-sites` section run for every site in your platform (except the dashboard). This is equivalent to running the task with the `--all-sites` command-line flag.

**Use cases:**
* Syncing product catalogs across all customer sites
* Collecting analytics data from each site
* Clearing caches after content updates
* Running scheduled content publications

**Example:**

```javascript
tasks: {
  'all-sites': {
    hourly: [
      'product:sync' // Runs once per hour for every site
    ]
  }
}
```

#### `dashboard` Tasks

Tasks in the `dashboard` section run only for the dashboard site. This is equivalent to running the task with `--site=dashboard`.

**Use cases:**
* Aggregating statistics across all sites
* Generating platform-wide reports
* Performing license checks
* Managing platform-level configurations

**Example:**

```javascript
tasks: {
  dashboard: {
    daily: [
      'platform-report:generate' // Runs once per day for dashboard only
    ]
  }
}
```

#### Frequency Options

Each task target (`all-sites` or `dashboard`) supports two frequencies:

* **`hourly`** - Tasks run once per hour
* **`daily`** - Tasks run once per day (at midnight UTC by default)

### Task String Format

Tasks are configured as strings that match the format you would use at the command line, but **without** the `node app` prefix.

**Basic task:**

```javascript
'module-name:task-name'
```

**Task with parameters:**

```javascript
'module-name:task-name --param1=value --param2=value'
```

**Task with flags:**

```javascript
'module-name:task-name --verbose --force'
```

**Examples:**

```javascript
tasks: {
  'all-sites': {
    hourly: [
      // Simple task
      'products:sync',

      // Task with parameters
      'cache:clear --type=api --verbose',

      // Task with multiple parameters
      'report:email --recipients=admin@example.com --subject="Hourly Report"'
    ]
  }
}
```

### Creating Tasks in Your Modules

To create tasks that can be scheduled, define them in your module's `tasks` function:

```javascript
// backend/sites/modules/product/index.js
export default {
  tasks(self) {
    return {
      'sync': {
        usage: 'Sync products from external API\n\nUsage: node app product:sync [--force]',
        async task(argv) {
          const force = argv.force;

          try {
            self.apos.util.log('Starting product sync...');

            // Your sync logic here
            const products = await self.fetchProductsFromAPI();
            await self.updateLocalProducts(products, { force });

            self.apos.util.log(`Synced ${products.length} products successfully`);
            return 0; // Success

          } catch (error) {
            self.apos.util.error('Product sync failed:', error);
            return 1; // Error code
          }
        }
      }
    };
  },

  methods(self) {
    return {
      async fetchProductsFromAPI() {
        // Implementation
      },
      async updateLocalProducts(products, options) {
        // Implementation
      }
    };
  }
};
```

### Testing Tasks Locally

You can test your scheduled tasks locally without waiting for the scheduled time:

**Test hourly tasks:**

```bash
cd backend
node app tasks --frequency=hourly
```

**Test daily tasks:**

```bash
cd backend
node app tasks --frequency=daily
```

**Important:** The task scheduler includes a guard to prevent tasks from running more than once within their scheduled interval. This means:

* Hourly tasks won't run more than once per hour
* Daily tasks won't run more than once per day

If you run a test and immediately try to run it again, the task will be skipped with a message indicating it already ran recently.

**For development testing only:** If you need to bypass this check during development, you can clear the task log from your dashboard database:

```bash
# Connect to MongoDB
mongosh

# Switch to your dashboard database
use your-project-dashboard

# Clear the task log
db.aposTaskLog.deleteMany({})
```

> **Warning:** Only do this in development. The task log guard is essential for production environments to prevent duplicate task execution when running multiple application servers.

### Understanding Task Execution

**Distributed Locking:**

When you have multiple application servers (which is common in production Assembly deployments), the task scheduler uses MongoDB to coordinate execution:

1. When a scheduled time arrives, all servers attempt to claim the task
2. Only one server successfully claims the lock and runs the task
3. Other servers see the lock and skip execution
4. The lock is released when the task completes

This ensures each task runs exactly once per schedule, regardless of how many servers you're running.

**Task Logging:**

All task executions are logged to the `aposTaskLog` collection in your dashboard database. Each log entry includes:
* Task name
* Execution timestamp
* Server that executed the task
* Exit code (0 for success, non-zero for errors)

**Error Handling:**

If a task fails:
* The error is logged to the `aposTaskLog` collection
* The task will be attempted again at the next scheduled interval
* Failed tasks don't prevent other scheduled tasks from running

### Best Practices

**1. Design tasks to be idempotent**

Tasks should be safe to run multiple times without causing problems. This protects against edge cases where a task might be executed more than once.

```javascript
// Good: Check if work is needed before doing it
async task(argv) {
  const needsUpdate = await self.checkIfUpdateNeeded();
  if (!needsUpdate) {
    self.apos.util.log('Already up to date, skipping');
    return 0;
  }
  await self.performUpdate();
}
```

**2. Use appropriate logging**

Help diagnose issues by logging task progress:

```javascript
async task(argv) {
  self.apos.util.log('Starting data import...');
  const records = await self.fetchData();
  self.apos.util.log(`Processing ${records.length} records`);
  // ... process records
  self.apos.util.log('Import completed successfully');
}
```

**3. Handle errors gracefully**

Always wrap task logic in try-catch blocks and return appropriate exit codes:

```javascript
async task(argv) {
  try {
    await self.performWork();
    return 0; // Success
  } catch (error) {
    self.apos.util.error('Task failed:', error);
    return 1; // Failure
  }
}
```

**4. Keep tasks lightweight**

Tasks that take a long time to complete can cause problems:
* They may be terminated if they exceed timeout limits
* They can delay other scheduled tasks
* They consume server resources

For heavy operations, consider:
* Breaking work into smaller chunks
* Using batch processing
* Running the task less frequently

**5. Test with actual site data**

Test tasks against your actual site structure:

```bash
# Test with specific site
node app product:sync --site=company1.localhost

# Test with all sites (careful in production!)
node app product:sync --all-sites
```

### Common Task Patterns

**Data Synchronization:**

```javascript
'all-sites': {
  hourly: ['product:sync', 'inventory:update']
}
```

**Scheduled Publishing:**

```javascript
'all-sites': {
  hourly: ['scheduled-publishing:publish']
}
```

**Cleanup and Maintenance:**

```javascript
'all-sites': {
  daily: ['media:cleanup --older-than=90', 'draft:purge --older-than=30']
}
```

**Analytics and Reporting:**

```javascript
'dashboard': {
  daily: ['analytics:aggregate', 'report:email --recipients=team@example.com']
}
```

**Cache Management:**

```javascript
'all-sites': {
  hourly: ['cache:warm --pages=high-traffic']
}
```

### Monitoring Task Execution

To monitor task execution in production:

1. **Check task logs** in the `aposTaskLog` collection
2. **Set up alerts** for tasks that return non-zero exit codes
3. **Monitor execution times** to identify tasks that are running slowly
4. **Review logs regularly** to ensure tasks are running as expected

You can create a custom dashboard module to surface this information:

```javascript
// backend/dashboard/modules/task-monitor/index.js
export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Task Monitor',
    // Custom queries against aposTaskLog collection
    // Custom reports and alerts
  }
};
```

This provides visibility into your scheduled task health across the entire platform.

## 🗄️ MongoDB Utilities

In a multisite environment, each site has its own MongoDB database. This isolation ensures that content, users, and configuration for one site never affect another site. However, this means you need special commands to access the MongoDB utilities for a specific site.

### Understanding Database Names

**How database names are constructed:**

Each site's database name is created by combining:

1. Your `shortNamePrefix` (set in `backend/app.js`)
2. The site's internal `_id` value (a unique identifier)

For example, if your prefix is `myproject-` and a site's `_id` is `company1`, the database name becomes `myproject-company1`.

**Why not just use the shortname?**

The internal `_id` value is used instead of the user-visible shortname because:
* The `_id` never changes, even if the shortname is edited
* It ensures database names remain stable throughout a site's lifetime
* It prevents naming conflicts if shortnames are reused

**The dashboard database:**

The dashboard site uses a special database name: your prefix followed by `dashboard`. For example: `myproject-dashboard`.

### Accessing MongoDB Utilities

Rather than manually looking up database names, Assembly provides utility tasks that automatically determine the correct database for a site.

#### MongoDB Shell

Access the MongoDB shell for a specific site:

```bash
# For the dashboard
cd backend
node app mongo:mongo --site=dashboard

# For an individual site (use any valid hostname)
node app mongo:mongo --site=company1.localhost

# In staging or production, use the actual hostname
node app mongo:mongo --site=company1.staging.your-domain.com
```

**What you can do in the shell:**
* Query and inspect collections
* Run database commands
* Debug data issues
* Perform manual data corrections (use with caution)

**Example queries:**

```javascript
// List all collections
show collections

// Count documents in a collection
db.aposDocs.countDocuments()

// Find a specific piece
db.aposDocs.findOne({ type: 'article', slug: 'my-article' })

// Check recent logins
db.aposUserSafes.find().sort({ lastLogin: -1 }).limit(5)
```

#### Database Backup (mongodump)

Create a backup of a specific site's database:

```bash
# Backup the dashboard
node app mongo:mongodump --site=dashboard

# Backup a specific site
node app mongo:mongodump --site=company1.localhost

# Backup with custom output directory
node app mongo:mongodump --site=company1.localhost -- --out=/backups/company1
```

**What this does:**
* Exports all collections from the site's database
* Creates BSON files that can be restored later
* Useful for migrations, testing, or disaster recovery

**Default output location:**
By default, `mongodump` creates a `dump/` directory in your current location containing the backup files.

**Passing additional options:**

Use `--` to separate Apostrophe options from `mongodump` options:

```bash
node app mongo:mongodump --site=dashboard -- --gzip --out=/backups/dashboard-$(date +%Y%m%d)
```

#### Database Restore (mongorestore)

Restore a backup to a specific site's database:

```bash
# Restore to the dashboard
node app mongo:mongorestore --site=dashboard

# Restore to a specific site
node app mongo:mongorestore --site=company1.localhost

# Restore with the --drop option (IMPORTANT)
node app mongo:mongorestore --site=company1.localhost -- --drop
```

**The `--drop` option:**

⚠️ **Always use `--drop` when restoring** to prevent doubled content:

```bash
node app mongo:mongorestore --site=company1.localhost -- --drop
```

Without `--drop`, the restore operation adds documents to existing collections, which can result in:
* Duplicate pieces and pages
* Conflicting data
* Unpredictable behavior

The `--drop` option tells `mongorestore` to drop each collection before restoring it, ensuring a clean restore.

**Restoring from a specific directory:**

```bash
node app mongo:mongorestore --site=company1.localhost -- --drop --dir=/backups/company1
```

**Note the `--` separator:**

The `--` by itself acts as an end marker for Apostrophe's options, allowing everything after it to be passed directly to the MongoDB utility. This is required for options like `--drop` and `--dir`.

### Common Use Cases

#### Backing Up Before Major Changes

Before making significant configuration changes or running migrations:

```bash
# Backup all sites
node app mongo:mongodump --site=dashboard
node app mongo:mongodump --site=company1.localhost
node app mongo:mongodump --site=company2.localhost
```

Or create a script to backup all sites:

```bash
#!/bin/bash
for site in dashboard company1.localhost company2.localhost; do
  echo "Backing up $site..."
  node app mongo:mongodump --site=$site -- --out=/backups/$(date +%Y%m%d)/$site
done
```

#### Copying a Site for Testing

Create a copy of a production site in your local development environment:

```bash
# 1. Dump from production (on production server)
node app mongo:mongodump --site=company1.your-domain.com -- --out=/tmp/company1-backup

# 2. Copy the backup to your local machine
scp -r production-server:/tmp/company1-backup /tmp/

# 3. Create a new test site in your local dashboard
# (Use the UI to create a site with shortname "company1-test")

# 4. Restore the backup to your test site
node app mongo:mongorestore --site=company1-test.localhost -- --drop --dir=/tmp/company1-backup
```

#### Debugging Data Issues

When investigating reported issues:

```bash
# Access the site's database
node app mongo:mongo --site=company1.localhost

# Then in the MongoDB shell:
# Look for the problematic document
db.aposDocs.findOne({ slug: 'problematic-page' })

# Check for orphaned documents
db.aposDocs.find({ trash: { $exists: false }, published: { $exists: false } })

# Examine recent changes
db.aposDocs.find().sort({ updatedAt: -1 }).limit(10)
```

#### Migrating Between Environments

Moving a site from one environment to another:

```bash
# 1. Export from source environment
node app mongo:mongodump --site=company1.staging.your-domain.com -- --gzip --out=/tmp/migration

# 2. Import to target environment
node app mongo:mongorestore --site=company1.localhost -- --drop --gzip --dir=/tmp/migration
```

### Important Considerations

**Database Isolation:**

Each site's database is completely isolated:
* Users in one site cannot access another site
* Content in one site never appears in another
* Database operations on one site don't affect others

**Dashboard vs. Site Databases:**

The dashboard database is special:
* It contains the `site` pieces that define all sites
* It stores dashboard-specific users and permissions
* It does NOT contain content from individual sites
* Restoring the dashboard database doesn't affect site content

**Backup Strategy:**

For production environments, establish a regular backup routine:

1. **Automated backups** - Use scheduled tasks or server-side cron jobs
2. **Multiple retention periods** - Keep daily, weekly, and monthly backups
3. **Off-site storage** - Store backups in a different location than your database
4. **Test restores** - Regularly verify that your backups can be restored

**Production Considerations:**

When working with production databases:
* ⚠️ Always create a backup before restoring
* ⚠️ Test restore procedures in a non-production environment first
* ⚠️ Coordinate with your team before making database changes
* ⚠️ Use `mongorestore` with `--drop` to prevent duplicate content

### Alternative: Direct MongoDB Access

If you need to access MongoDB directly without using the Apostrophe tasks, you can connect using the standard MongoDB connection string:

```bash
# Determine your database name first
# Prefix + site _id, e.g., "myproject-company1"

# Connect with mongosh
mongosh "mongodb://localhost/myproject-company1"

# Or with connection string
mongosh "mongodb://username:password@host:port/myproject-company1"
```

However, using the Apostrophe `mongo:*` tasks is recommended because:
* They automatically determine the correct database name
* They work consistently across all environments
* They respect your MongoDB configuration from Apostrophe
* They're easier to script and document

### Troubleshooting

**"Database not found" errors:**

If you get an error that a database doesn't exist:

1. Verify the site exists in the dashboard
2. Check that you're using a valid hostname for the `--site` flag
3. Confirm your `shortNamePrefix` matches what's configured in `app.js`

**"Command not found: mongodump":**

You need to install MongoDB Database Tools separately from MongoDB itself:
* [Installation guide](https://docs.mongodb.com/database-tools/installation/installation-linux/)
* These tools are not included with MongoDB by default in newer versions

**Permission errors:**

Ensure your MongoDB user has appropriate permissions:
* Read permissions for `mongodump`
* Write permissions for `mongorestore`
* Administrative permissions for database creation/dropping

### Scripting Database Operations

For advanced users, you can script database operations across multiple sites:

```bash
#!/bin/bash
# backup-all-sites.sh

BACKUP_DIR="/backups/$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"

# Backup dashboard
echo "Backing up dashboard..."
node app mongo:mongodump --site=dashboard -- --out="$BACKUP_DIR/dashboard"

# Backup all production sites (customize this list)
for site in company1 company2 company3; do
  echo "Backing up $site..."
  node app mongo:mongodump --site="$site.your-domain.com" -- --out="$BACKUP_DIR/$site"
done

echo "All backups complete in $BACKUP_DIR"
```

This approach is useful for:
* Regular backup schedules
* Pre-deployment procedures
* Disaster recovery planning
* Environment synchronization

## 🚀 Pro Modules

This template includes ApostropheCMS Pro modules pre-installed and ready to use. Most activate automatically based on your environment configuration.

### 💎 Available Pro Modules

#### 🔐 Advanced Permissions

**Enterprise-grade access control for teams and organizations**

Take control of your content with granular permissions that go far beyond basic user roles. Perfect for large teams, agencies, and organizations that need sophisticated access management.

* **Advanced Permission Groups** - Create custom user groups with specific permissions
* **Advanced Permissions** - Set fine-grained permissions at the document, field, and feature level
* Control who can edit, publish, delete, and manage different types of content
* Ideal for enterprise workflows with multiple stakeholders and approval processes

```javascript
'@apostrophecms-pro/advanced-permission-group': {},
'@apostrophecms-pro/advanced-permission': {}
```

[Learn more about Advanced Permissions →](https://apostrophecms.com/extensions/advanced-permission)

---

#### 🌍 Translation & Localization Suite

**Automated translation and localization management for global content**

While ApostropheCMS includes built-in content localization for managing multilingual sites, these Pro modules supercharge your international workflow with automated translation capabilities. Perfect for international businesses and organizations serving diverse audiences who need to scale their multilingual content efficiently.

* **Automatic Translation** - AI-powered translation with support for DeepL, Google Translate, and Azure Translator
* **Import/Export Translations** - Manage translation workflows with professional translators
* Seamless integration with your existing content workflow

**Configuration**: These modules are automatically activated based on your environment variables. Set the appropriate API key for your preferred translation provider:

```bash
# For DeepL (recommended)
export APOS_DEEPL_API_SECRET=your_deepl_api_key

# For Google Translate
export APOS_GOOGLE_API_SECRET=your_google_api_key

# For Azure Translator
export APOS_AZURE_API_SECRET=your_azure_api_key
```

The template will automatically enable the appropriate translation modules and configure the provider based on which API key you provide. If no translation API keys are set, only the manual import/export translation module will be available.

[Learn more about Automatic Translation →](https://apostrophecms.com/extensions/automatic-translation)

---

#### 🎨 Visual Design & Customization

**In-context design tools for real-time visual customization**

Empower content editors and designers to customize the visual appearance of your site without touching code. Perfect for agencies, white-label solutions, and sites that need flexible theming capabilities.

* **Palette** - In-context interface for changing CSS properties in real-time
* Create custom color schemes, spacing, typography, and visual effects
* Group controls into intuitive tabs and sections for organized editing
* Support for CSS custom properties and media queries
* Changes render instantly with browser-side caching for performance

```javascript
'@apostrophecms-pro/palette': {}
```

[Learn more about Palette →](https://apostrophecms.com/extensions/palette-extension)

---

#### 🔍 SEO & Performance Optimization

**Automated SEO optimization for better search visibility**

Enhance your content's search engine performance with intelligent optimization tools that work across all languages and content types.

* **SEO Assistant** - AI-powered content optimization for search engines
* Works seamlessly with multilingual content for comprehensive international SEO
* Automated suggestions and improvements for better rankings

**Configuration**: The SEO Assistant is automatically activated when you provide an OpenAI API key:

```bash
# Required for SEO Assistant
export OPENAI_API_KEY=your_openai_api_key
```

The template will automatically enable the SEO Assistant modules and configure the OpenAI provider when this environment variable is set.

[Learn more about SEO Assistant →](https://apostrophecms.com/extensions/seo-assistant)

---

#### 📚 Document Management & Versioning

**Professional document lifecycle management**

Maintain complete control over your content lifecycle with enterprise-grade versioning and template management. Essential for organizations with strict content governance requirements.

* **Document Versions** - Track changes, compare revisions, and restore previous versions
* **Document Template Library** - Create reusable templates for consistent content creation
* Audit trails for compliance and accountability
* Perfect for content teams with review and approval workflows

```javascript
'@apostrophecms-pro/document-versions': {},
'@apostrophecms-pro/doc-template-library': {}
```

[Learn more about Document Versions →](https://apostrophecms.com/extensions/document-version) and the [Template Library →](https://apostrophecms.com/extensions/template-library)

---

#### 👥 User Registration & Management

**Self-service user registration and account management**

Enable public user registration and self-service account management for member sites, communities, and customer portals.

* **Self-Service Signup** - Allow users to create their own accounts
* Customizable registration forms and validation
* Email verification and password reset flows
* Integration with existing permission systems
* Perfect for membership sites, customer portals, and community platforms

```javascript
'@apostrophecms-pro/signup': {}
```

[Learn more about User Management →](https://apostrophecms.com/extensions/account-signup)

---

### ⚡ Getting Started with Pro Modules

Most Pro modules are automatically activated based on your environment configuration. Simply add any required API keys or configuration settings as environment variables, then restart your application.

For detailed configuration options and requirements, refer to the documentation for each individual module.

---

## 🌟 Features & Widgets

This project is more opinionated than some of our other starter kits and uses the [Bulma CSS framework](https://bulma.io/) for styling.

### Widgets

This project provides the core ApostropheCMS widgets, plus seven additional custom widgets:

**Layout Widgets:**
* **rows-widget**: Adds rows with varying numbers of columns for responsive content layout
* **grid-layout-widget**: Adds custom or predefined CSS grid-based layouts

**Content Widgets:**
* **hero-widget**: A customizable hero section with options for color gradient, image, or video backgrounds
* **slideshow-widget**: A customizable slideshow widget powered by Swiper.js
* **accordion-widget**: Adds an accordion for organizing content into collapsible sections
* **card-widget**: Allows for the creation of multiple different customizable card types
* **link-widget**: Adds links that can be styled as text or a highly customizable button

### Pieces

This project creates two piece types:

* **Article Piece**: For creating content pieces like blog posts or news articles
* **Author Piece**: Used in relationship with article pieces to attribute content

### Pages

This project creates core `default` and `@apostrophecms/home-page` pages, plus two pages for displaying article pieces.

**Home Page Layouts:**
The home page has three potential layouts selected from the utility menus on the right side of the page manager:
* **Minimal**: Inherits the header and footer components added to all project pages, with a single area that can take any of the project widgets
* **Foundation**: Adds a hero section at the top of the page
* **Showcase**: Adds a slideshow section

**Default Page:**
The default page has a layout identical to the 'Minimal' home page layout.

**Piece-Type Pages:**
Piece-type pages in ApostropheCMS projects are used to either display multiple pieces (`index.html`) or individual pieces (`show.html`). This project has both types:
* **Article Index Page**: Maps to the `ArticleIndexPage.astro` template, demonstrating pagination handling
* **Article Show Page**: Maps to the `ArticleShowPage.astro` template

Both page types have three layouts to select from, with three or four additional areas for adding widgets with content before and after the piece content.

---

## 🖼️ Image Helper Functions

### Overview

These helper functions are designed to work with images in your Astro frontend that come from ApostropheCMS through relationships or attachment fields. If you're using the image widget within an area, you should use the `AposArea` helper instead - these utilities are specifically for handling images that are part of your content model.

**Important:** These helpers expect a single attachment object, not an array. When working with relationships or array fields, make sure to pass a single image object (e.g., `page.relationship._image[0]`) rather than the full array.

### Working with Image Relationships

When you have a relationship field to `@apostrophecms/image` in your content type, you'll typically need to:

1. Get the image URL (potentially at different sizes for responsive images)
2. Handle focal points if configured
3. Get the image dimensions including any cropping that should be applied
4. Set up proper alt text

Here's a typical example:

```js
---
import {
  getAttachmentUrl,
  getAttachmentSrcset,
  getFocalPoint,
  getWidth,
  getHeight
} from '../lib/attachments.js';

// Get first image from relationship
const image = relationshipField._image[0];
---

<img
  src={getAttachmentUrl(image, { size: 'full' })}
  srcset={getAttachmentSrcset(image)}
  sizes="(max-width: 800px) 100vw, 800px"
  alt={image.alt || image.title || 'Image description'}
  width={getWidth(image)}
  height={getHeight(image)}
  style={`object-position: ${getFocalPoint(image)};`}
/>
```

### Working with Direct Attachments

For attachment fields (like logo fields), the pattern is similar:

```js
<img 
  src={getAttachmentUrl(attachmentField)}
  width={getWidth(attachmentField)}
  height={getHeight(attachmentField)}
  alt="Logo"
/>
```

### Image Cropping and Sizes

**Automatic Crop Handling**

If you set a crop region for an image in the ApostropheCMS Admin UI, all the helper methods will automatically respect that crop. You don't need to do anything special in your code - the cropped version will be used when generating URLs and srcsets.

**Size Variants**

The default size variants are:
* `one-sixth` (190×350px)
* `one-third` (380×700px)
* `one-half` (570×700px)
* `two-thirds` (760×760px)
* `full` (1140×1140px)
* `max` (1600×1600px)

These sizes will be used to generate the srcset and can be selected by name for the `getAttachmentUrl()` method:

```javascript
getAttachmentUrl(image, { size: 'full' })
```

You can use custom size names in both `getAttachmentUrl()` and the srcset options. For example:

```js
const customUrl = getAttachmentUrl(image, { size: 'custom-banner' });

// Custom srcset configuration
const srcset = getAttachmentSrcset(image, {
  sizes: [
    { name: 'small', width: 300 },
    { name: 'medium', width: 600 },
    { name: 'large', width: 900 },
  ]
});
```

> Important: These helpers don't generate the image sizes - they just reference sizes that already exist. To use custom sizes, you must configure the [`@apostrophecms/attachment` module](https://docs.apostrophecms.org/reference/modules/attachment.html#configuration) to create those sizes when images are uploaded. You can do this in your backend configuration:

```javascript
// modules/@apostrophecms/attachment/index.js
export default {
  options: {
    // Define what sizes should be created on upload
    imageSizes: {
      'custom-banner': { width: 1200, height: 400 },
      'square-thumb': { width: 300, height: 300 },
      'small': { width: 300 },
      'medium': { width: 600 },
      'large': { width: 900 }
    }
  }
};
```

See the [attachment module documentation](https://docs.apostrophecms.org/reference/modules/attachment.html#configuration) for complete configuration options.

### Working with Focal Points

When using focal points set in the ApostropheCMS admin UI, you'll need to:

1. Use `object-position` with the focal point value
2. Set appropriate Bulma image classes (like `is-fullwidth`)

```js
<figure class="image">
  <img
    src={getAttachmentUrl(image)}
    style={`object-position: ${getFocalPoint(image)}; object-fit: cover;`}
    class="is-fullwidth"
    width={getWidth(image)}
    height={getHeight(image)}
    alt="Image with focal point"
  />
</figure>
```

The `getFocalPoint()` function returns coordinates in the format "X% Y%" (e.g., "50% 50%" for center). If no focal point is set, it returns the default value (default is "center center").

### Core Functions Reference

Key functions available (see JSDoc comments in source for detailed documentation):
* `getAttachmentUrl(attachmentObject, options?)`: Get URL for an image with optional size (defaults to 'full')
* `getAttachmentSrcset(attachmentObject, options?)`: Generate responsive srcset string
* `getWidth(imageObject)`: Get image width, respecting crops
* `getHeight(imageObject)`: Get image height, respecting crops
* `getFocalPoint(attachmentObject, defaultValue?)`: Get focal point coordinates for styling

---

## 🖌️ Theming

Customizing the theme in this project is straightforward and leverages Bulma's powerful theming capabilities. You can override Bulma's default variables to match your brand or design requirements by editing the `frontend/src/styles/main.scss` file. This is done **before importing Bulma** so that your customizations are applied throughout the project.

### Steps to Customize

1. Navigate to the `frontend/src/styles/main.scss` file.
2. Locate the section for overriding Bulma variables.
3. Uncomment and modify the variables you wish to customize. You can define colors, typography, spacing, and more.
4. Save your changes, and the updated theme will automatically apply when you rebuild the project.

### Example: Overriding Common Variables

Here's an example of how to customize some of Bulma's common variables. These variables are commented out by default. Uncomment and modify them as needed:

```scss
@use 'bulma/sass/utilities/initial-variables' as * with (
  // Colors
  $turquoise: hsl(171, 100%, 41%),   // Primary color
  $cyan: hsl(204, 86%, 53%),         // Info color
  $green: hsl(141, 71%, 48%),        // Success color
  $yellow: hsl(48, 100%, 67%),       // Warning color
  $red: hsl(348, 100%, 61%),         // Danger color

  // Typography
  $family-sans-serif: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif,
  $family-monospace: monospace,
  $size-1: 3rem,
  $size-2: 2.5rem,
  $size-3: 2rem,
  $size-4: 1.5rem,
  $size-5: 1.25rem,
  $size-6: 1rem
);
```

### Full List of Variables

For a comprehensive list of all customizable variables, refer to the [Bulma documentation](https://bulma.io/documentation/customize/list-of-sass-variables/) on variables. This resource provides details on all available options for customization, including advanced options for responsive breakpoints, spacing, and more.

### Notes

* **Order matters**: Ensure your variable overrides are declared before importing Bulma to avoid conflicts.
* **SASS compatibility**: This setup uses the modern SASS syntax with @use and @forward. If you are unfamiliar with these concepts, refer to the SASS documentation for more information.
* **Theme consistency**: To maintain a cohesive design, consider defining your core color palette and typography styles at the beginning of your project.

### Troubleshooting

If your changes are not reflected:

* Ensure your variables are correctly uncommented and modified.
* Check for any caching issues by clearing your browser cache or restarting the build process.

---

## ⚙️ Package Scripts

### Root `package.json` scripts

The root of the project has several useful scripts located in the `package.json` file. Running `npm install` in the root directory will trigger the `postinstall` script, which installs dependencies for both the ApostropheCMS and Astro projects. Similarly, `npm run update` will update dependencies for both the `frontend` and `backend` folders. The rest of the scripts in this file are primarily used for project deployment to ApostropheCMS Assembly hosting.

### Backend folder scripts

Typically, you will only use the `dev` script in the backend folder outside of deployment:

```bash
cd backend && npm run dev
```

For command line tasks, always include the `--site` flag:

```bash
# Dashboard tasks
node app @apostrophecms/user:list --site=dashboard

# Individual site tasks
node app @apostrophecms/user:list --site=company1.localhost

# All sites
node app @apostrophecms/migration:migrate --all-sites
```

You can consult the [ApostropheCMS hosting](https://docs.apostrophecms.org/guide/hosting.html) recipes to see how the other scripts should be used for deployment.

### Frontend folder scripts

The main scripts for the Astro project located in the frontend folder are:

* **`dev`** - Start Astro development server
* **`build`** - Build for production
* **`preview`** - Preview production build locally

Run the `build` script before starting the server in preview mode. The remainder of the scripts are for deployment and may need to be altered to fit your hosting solution.

> **Note:** Before deployment, always run `npm run build` followed by `npm run preview` in the `frontend` folder to test production behavior. We don't recommend using the root `npm run serve-frontend` script during development - it's used for ApostropheCMS hosting.

---

## 📚 Additional Resources

**Detailed Documentation:**
* [Assembly Essentials Starter Kit](https://github.com/apostrophecms/starter-kit-assembly-essentials) - Backend multisite architecture details
* [Astro Essentials Starter Kit](https://github.com/apostrophecms/starter-kit-astro-essentials) - Frontend integration and image helpers
* [Apollo Starter Kit](https://github.com/apostrophecms/apollo) - Open source version without Assembly or Pro features

**Official Documentation:**
* [ApostropheCMS Documentation](https://docs.apostrophecms.org/) - Complete CMS guide
* [Astro Documentation](https://docs.astro.build/) - Astro framework guide
* [apostrophe-astro Package](https://github.com/apostrophecms/apostrophe-astro) - Integration package details
* [Pro Extensions](https://apostrophecms.com/extensions?license=pro) - Pro module documentation

**Community & Support:**
* **Community Support**: Join our [Discord community](https://discord.com/invite/HwntQpADJr) for help from other developers
* **Professional Support**: Dedicated support packages available - [Contact us](https://apostrophecms.com/contact-us) to learn more
* **Training**: Professional training and consultation services available

**Tutorials:**
* [Building with Apollo + Astro](https://docs.apostrophecms.org/tutorials/astro/apostrophecms-and-astro.html) - Step-by-step site building

---

## ⚖️ Licensing

This project code is MIT licensed. Using this starter kit requires an active ApostropheCMS Assembly license, which includes all Pro features. [View pricing](https://apostrophecms.com/pricing) or [contact us](https://apostrophecms.com/contact-us) to discuss licensing options.

---

*Built with ❤️ by the ApostropheCMS team. Managing enterprise multisite platforms? [Star us on GitHub](https://github.com/apostrophecms) and [explore Assembly](https://apostrophecms.com/assembly)!*

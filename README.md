# Angular Setup

This project is an Angular application setup with SSR (Server-Side Rendering), reusable components, custom services, utility functions, and environment-based configuration. It also includes modern development tools such as ESLint, Prettier, Husky, and TailwindCSS.

## Requirements

- **Node.js**: v23.6.0 or higher
- **Angular CLI**: 15.1.2 or higher
- **pnpm**: Recommended package manager

## Installation

### 1. Clone the repository

```bash
git clone <repository_url>
cd angular_setup
```

### 2. Install dependencies

It’s recommended to use **pnpm** for faster and more efficient package management.

- Install **pnpm** globally (if you don’t have it already):

  ```bash
  npm install -g pnpm
  ```

- Install the project dependencies:

  ```bash
  pnpm install
  ```

### 3. Setup Husky (Git Hooks)

Husky is installed for linting before commits. Run the following command to set it up:

```bash
pnpm run prepare
```

## Available Scripts

- **`pnpm start`**: Runs the application in development mode.

  ```bash
  pnpm start
  ```

- **`pnpm build`**: Builds the application for production.

  ```bash
  pnpm build
  ```

- **`pnpm watch`**: Builds the project with watch mode enabled, helpful during development.

  ```bash
  pnpm watch
  ```

- **`pnpm test`**: Runs the unit tests.

  ```bash
  pnpm test
  ```

- **`pnpm lint`**: Runs ESLint to lint the codebase.

  ```bash
  pnpm lint
  ```

- **`pnpm format`**: Automatically formats the code using Prettier.

  ```bash
  pnpm format
  ```

- **`pnpm serve:ssr:angular_setup`**: Runs the SSR server for Angular.

  ```bash
  pnpm run serve:ssr:angular_setup
  ```

## Development Setup

### 1. TailwindCSS Setup

This project includes **TailwindCSS** for utility-first styling. Customize your Tailwind configuration as needed in `tailwind.config.js`.

### 2. Linting & Formatting

- **ESLint**: Linting is configured using `@angular-eslint/eslint-plugin`. Make sure to follow the linting rules defined in the `.eslintrc.json` file.
- **Prettier**: Prettier is used to ensure consistent code formatting. You can run it manually via the `pnpm format` command or set up your IDE to run it on save.

### 3. Husky & lint-staged

Husky is used to ensure code quality before commits with `lint-staged`. Make sure that linting and formatting are applied to staged files before you commit.

### 4. Testing

This project uses **Karma** and **Jasmine** for unit testing. Unit tests can be run with:

```bash
pnpm test
```

## Folder Structure

Here’s the general folder structure of the project:

```
src/
|-- app/
|   |-- components/                 # Reusable UI components
|   |   |-- header/                 # Header component
|   |   |   |-- header.component.ts
|   |   |   |-- header.component.html
|   |   |   |-- header.component.scss
|   |   |
|   |   |-- footer/                 # Footer component
|   |   |   |-- footer.component.ts
|   |   |   |-- footer.component.html
|   |   |   |-- footer.component.scss
|   |   |
|   |   |-- custom-button/           # Custom button component
|   |   |   |-- custom-button.component.ts
|   |   |   |-- custom-button.component.html
|   |   |   |-- custom-button.component.scss
|   |
|   |-- pages/                      # Page-level components
|   |   |-- home/                    # Home page component
|   |   |   |-- home.component.ts
|   |   |   |-- home.component.html
|   |   |   |-- home.component.scss
|   |   |
|   |   |-- about/                   # About page component
|   |   |   |-- about.component.ts
|   |   |   |-- about.component.html
|   |   |   |-- about.component.scss
|   |
|   |-- services/                   # Services for API calls and business logic
|   |   |-- api.service.ts
|   |   |-- auth.service.ts
|   |   |-- user.service.ts
|   |
|   |-- utils/                      # Utility functions and helper classes
|   |   |-- string-utils.ts
|   |   |-- date-utils.ts
|   |
|   |-- config/                     # Environment-based configurations
|   |   |-- app.config.ts           # Default config
|   |   |-- app.config.server.ts    # Production-specific config
|   |
|   |-- pipes/                      # Custom pipes for transforming data
|   |   |-- string-transform.pipe.ts
|   |
|   |-- routes/                     # Routing setup for components
|   |   |-- app.routes.ts           # Main routing configuration
|   |   |-- app.routes.server.ts    # Server-specific routing (if needed)
|   |
|   |-- app.component.ts            # Root component of the app
|   |-- app.component.html          # Root component template
|   |-- app.component.scss          # Root component styles
|   |-- app.component.spec.ts       # Unit tests for the root component
|   |
|   |-- main.ts                     # Entry point for bootstrapping the app
|
|-- assets/                         # Static assets (images, fonts, etc.)
|   |-- images/
|   |   |-- logo.png
|   |
|   |-- fonts/
|   |   |-- custom-font.ttf
|
|-- environments/                   # Environment-specific configuration files
|   |-- environment.ts              # Default (development) environment settings
|   |-- environment.prod.ts         # Production environment settings
|
|-- styles/                          # Global styles and themes
|   |-- _variables.scss             # SCSS variables (e.g., colors, fonts)
|   |-- _mixins.scss                # Reusable SCSS mixins
|   |-- global-styles.scss          # Global styles for the app
|
|-- index.html                      # Main HTML template for the app
|-- styles.scss                     # Global styles entry point
```

## Technologies Used

- **Angular**: ^19.1.0 (for frontend)
- **@ngrx/store**: State management
- **Express**: For SSR server-side rendering
- **TailwindCSS**: Utility-first CSS framework
- **Prettier**: Code formatting
- **ESLint**: Code linting
- **Husky**: Git hooks for pre-commit checks
- **pnpm**: Fast and efficient package manager

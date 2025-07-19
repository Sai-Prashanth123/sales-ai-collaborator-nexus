# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/89a85c75-ee88-4683-a25b-833043b7740b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/89a85c75-ee88-4683-a25b-833043b7740b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start both frontend and backend servers with auto-reloading.
npm run dev
```

## Development Workflow

This project includes both frontend and backend components that run concurrently:

### Quick Start (Recommended)
```sh
# Install all dependencies (frontend + backend)
npm install

# Start both frontend and backend servers
npm run dev
```

### Available Scripts

- `npm install` - Installs frontend dependencies and automatically installs backend dependencies
- `npm run dev` - Starts both frontend (port 5173) and backend servers concurrently
- `npm run dev:frontend` - Runs only the frontend development server
- `npm run dev:backend` - Runs only the backend development server  
- `npm run start` - Alias for `npm run dev`
- `npm run build` - Builds the frontend for production
- `npm run build:all` - Builds both frontend and backend

### Project Structure

- `/src` - Frontend React application
- `/api` - Backend Express.js server with LiveKit integration
- `/public` - Static assets

The development server will automatically:
- Install backend dependencies when you run `npm install`
- Start both frontend (Vite) and backend (Express) servers
- Auto-reload both servers when files change
- Display logs with color-coded prefixes for easy debugging

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/89a85c75-ee88-4683-a25b-833043b7740b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

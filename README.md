# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/526782c6-36af-4ca5-8735-bd3aaa122177

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/526782c6-36af-4ca5-8735-bd3aaa122177) and start prompting.

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

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

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

## Features

### Exit Intent Popup

The application includes a popup that appears when users press the "8" key after viewing the page for more than 10 seconds. The popup includes:

- **Trigger**: Pressing the "8" key on the keyboard
- **Timing**: Only activates after 10 seconds of page viewing
- **Content**: Features company branding, CEO information, and market statistics
- **Actions**: Two buttons - "Zamknij" (Close) and "Umów konsultację" (Book Consultation)
- **Navigation**: Clicking "Book Consultation" scrolls to the contact section or navigates to the home page contact section

**Components:**
- `ExitIntentPopup.tsx` - Main popup component
- `use-exit-intent.tsx` - Custom hook for tracking exit intent behavior

**Configuration:**
- Minimum time on page: 10 seconds (configurable)
- Can be enabled/disabled via props
- Customizable callbacks for close and consultation booking actions

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/526782c6-36af-4ca5-8735-bd3aaa122177) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

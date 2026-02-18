<div align="center">
  <h1>Finance Tracker</h1>
  <p>A modern and intuitive application to manage your personal finances with ease.</p>
</div>

## ✨ Features

- **Dashboard:** Get a quick overview of your financial status.
- **Transaction Management:** Add, edit, and delete income and expense transactions.
- **Categorization:** Organize your transactions into customizable categories.
- **Budgeting:** Set monthly budgets to keep your spending in check.
- **User Authentication:** Secure your financial data with two-factor authentication.
- **Appearance:** Switch between light, dark, and system themes.
- **PDF Reports:** Generate and download PDF reports of your transactions.

## 🛠️ Tech Stack

### Backend
- [**Laravel**](https://laravel.com/) - The PHP framework for web artisans.
- [**Inertia.js**](https://inertiajs.com/) - Creates single-page apps, without building an API.
- [**Laravel Fortify**](https://laravel.com/docs/fortify) - Backend authentication.
- [**barryvdh/laravel-dompdf**](https://github.com/barryvdh/laravel-dompdf) - PDF generation.

### Frontend
- [**React**](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [**TypeScript**](https://www.typescriptlang.org/) - Typed JavaScript at any scale.
- [**Vite**](https://vitejs.dev/) - Next-generation frontend tooling.
- [**Tailwind CSS**](https://tailwindcss.com/) - A utility-first CSS framework.
- [**Shadcn/ui**](https://ui.shadcn.com/) - UI components.
- [**Lucide React**](https://lucide.dev/) - Icon library.
- [**Ziggy**](https://github.com/tighten/ziggy) - Use your Laravel routes in JavaScript.

## 🚀 Installation and Setup

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js & npm
- A database (MySQL, PostgreSQL, or SQLite)

### 1. Clone the repository
```bash
git clone https://github.com/FarhanGits/finance_tracker_portfolio.git
cd finance_tracker_portfolio
```

### 2. Install dependencies
```bash
composer install
npm install
```

### 3. Setup environment
```bash
# Copy the example .env file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Configure your `.env` file
Open the `.env` file and set your database credentials (`DB_*` variables) and other environment variables.

```env
DB_CONNECTION=<database_options>
DB_HOST=<host>
DB_PORT=<port>
DB_DATABASE=<your_database>
DB_USERNAME=<username>
DB_PASSWORD=<password>
```

### 5. Run database migrations
```bash
php artisan migrate
```

### 6. (Optional) Seed the database
To populate the database with some initial data:
```bash
php artisan db:seed
```

### 7. 🏃 Running the Application
To start the development server with Vite hot-reloading:
```bash
npm run dev
```

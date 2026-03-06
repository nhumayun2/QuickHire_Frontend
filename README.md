# QuickHire - Job Board Frontend

A modern, responsive mini job board application built with Next.js and Tailwind CSS.This project serves as the frontend interface for the QuickHire platform, allowing users to discover jobs and admins to manage listings. 

## 🚀 Features

### For Job Seekers
* **Job Listings Page:** Browse all available jobs in a clean, responsive layout.
* **Search & Filter:** Search jobs by keywords and filter results by category and location.
* **Job Details:** View full job descriptions, responsibilities, and requirements.
* **Apply Now:** Submit applications directly through the platform with name, email, resume link, and a cover note.

### For Administrators
* **Basic Admin View:** Secure admin dashboard for platform management.
* **Manage Jobs:** Add new job listings or delete existing ones.
* **Review Applications:** View all submitted candidate applications.

## 🛠️ Tech Stack

* **Framework:** Next.js (React.js) 
* **Styling:** Tailwind CSS (v4)
* **Fonts:** Clash Display (Local) & Epilogue (Google Fonts)

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your local machine:
* (https://nodejs.org/) (v18 or higher recommended)
* npm or yarn package manager
* The **QuickHire Backend** must be running locally to supply data to this frontend.

## 🔐 Environment Variables

To run this project, you will need to add the following environment variable to your `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

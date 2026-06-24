# 🏋️‍♂️ Wellness & Fitness AI Tracker

Welcome to the frontend segment of the **Wellness & Fitness Application**—a data-driven platform designed to help individuals exercise smarter, optimize their training, and track their fitness development in real time. 

This entire frontend interface was rapidly prototyped and generated using **Lovable.dev**, translating natural language prompts into a production-ready user experience.

---

## 🚀 The Lovable Prompt

The foundation of this frontend was built using the following core prompt instructions provided to Lovable:

> "Build a modern, highly intuitive frontend dashboard for a data-driven personal wellness and fitness application. The application should empower users to create customized exercise training plans and visualize their fitness development over time. 
> 
> Key features must include:
> 1. **Interactive Dashboard:** Displaying key health metrics, daily caloric/activity progress, and upcoming workouts.
> 2. **Workout Planner:** An interface to log exercises, sets, reps, and weights, utilizing data insights to suggest progressions.
> 3. **Analytics Suite:** Clean, readable data visualizations (charts and graphs) tracking weight, strength gains, and endurance metrics over weeks/months.
> 4. **User Profiles & Goals:** A section to input personal biometrics, target goals, and fitness levels to drive the personalization engine.
> 
> The UI should feel clean, motivating, and modern, utilizing a dark mode aesthetic with vibrant accent colors (e.g., neon green or electric blue) to emphasize health and energy."

---

## 🛠️ Tech Stack

The frontend architecture leverages modern web technologies generated and structured by Lovable for optimal performance, responsiveness, and clean code maintainability.

* **Framework:** [React.js](https://react.dev/) (with Vite for lightning-fast bundling)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (ensuring type safety for complex fitness data models)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (for a fully responsive, utility-first design)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) (for accessible, polished, and customizable primitives)
* **Data Visualization:** [Recharts](https://recharts.org/) (powering the dynamic fitness progression graphs and biometric tracking charts)
* **Icons:** [Lucide React](https://lucide.dev/) (clean, modern iconography)

---

## 📊 Data-Driven Features

This frontend is designed to handle and visualize complex user data to drive actual fitness results:

* **Progressive Overload Tracking:** Visualizes volume load (Sets $\times$ Reps $\times$ Weight) over time so users know exactly when to increase intensity.
* **Biometric Aggregation:** Displays daily trends in resting heart rate, active calories burned, and sleep quality to calculate readiness scores.
* **Goal Forecasting:** Uses linear trends based on historical workout logs to project when a user is likely to hit their specific weight or strength goals.

---

## ⚡ Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/wellness-fitness-frontend.git](https://github.com/your-username/wellness-fitness-frontend.git)
   cd wellness-fitness-frontend

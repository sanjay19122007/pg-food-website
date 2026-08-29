import { StrictMode, useMemo, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, Coffee, Moon, Sun, UtensilsCrossed } from 'lucide-react';
import './styles.css';

type MealKey = 'breakfast' | 'lunch' | 'dinner';

const meals: Array<{
  key: MealKey;
  name: string;
  time: string;
  menu: string;
  icon: typeof Coffee;
}> = [
  {
    key: 'breakfast',
    name: 'Breakfast',
    time: '7:30–9:00 AM',
    menu: 'Poha, boiled eggs, banana & chai',
    icon: Coffee,
  },
  {
    key: 'lunch',
    name: 'Lunch',
    time: '12:30–2:00 PM',
    menu: 'Dal tadka, jeera rice, roti & salad',
    icon: Sun,
  },
  {
    key: 'dinner',
    name: 'Dinner',
    time: '7:30–9:15 PM',
    menu: 'Paneer masala, pulao, roti & curd',
    icon: Moon,
  },
];

function App() {
  const [attendance, setAttendance] = useState<Record<MealKey, boolean>>({
    breakfast: true,
    lunch: true,
    dinner: false,
  });

  const selectedCount = useMemo(
    () => Object.values(attendance).filter(Boolean).length,
    [attendance],
  );

  const today = useMemo(
    () => new Intl.DateTimeFormat('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(new Date()),
    [],
  );

  const toggleMeal = (meal: MealKey) => {
    setAttendance((current) => ({ ...current, [meal]: !current[meal] }));
  };

  return (
    <main className="app-shell">
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="PG Mess home">
          <span className="brand-mark"><UtensilsCrossed size={20} /></span>
          <span>PG Mess</span>
        </a>
        <div className="date-chip">{today}</div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">TODAY’S FOOD COUNT</p>
          <h1>Good food starts with an accurate headcount.</h1>
          <p className="intro">
            Mark the meals you are joining today. Your response helps the kitchen
            prepare enough food without unnecessary waste.
          </p>
        </div>
        <aside className="summary-card" aria-label="Meal selection summary">
          <span className="summary-label">Your day</span>
          <strong>{selectedCount}<small>/3</small></strong>
          <span className="summary-note">meals confirmed</span>
          <div className="summary-track">
            <span style={{ transform: `scaleX(${selectedCount / 3})` }} />
          </div>
        </aside>
      </section>

      <section className="meal-section" aria-labelledby="meal-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR RESPONSE</p>
            <h2 id="meal-heading">Which meals are you having?</h2>
          </div>
          <p>Selections update instantly.</p>
        </div>

        <div className="meal-list">
          {meals.map((meal, index) => {
            const Icon = meal.icon;
            const selected = attendance[meal.key];

            return (
              <button
                className={`meal-card ${selected ? 'selected' : ''}`}
                key={meal.key}
                onClick={() => toggleMeal(meal.key)}
                type="button"
                aria-pressed={selected}
                style={{ '--delay': `${index * 90}ms` } as CSSProperties}
              >
                <span className="meal-icon"><Icon size={22} /></span>
                <span className="meal-details">
                  <span className="meal-title-row">
                    <strong>{meal.name}</strong>
                    <span>{meal.time}</span>
                  </span>
                  <span className="menu">{meal.menu}</span>
                </span>
                <span className="check" aria-hidden="true">
                  {selected && <Check size={18} strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <footer>
        <span>Response window closes at 10:30 PM</span>
        <span>Less waste · better planning</span>
      </footer>
    </main>
  );
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

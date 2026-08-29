import { useMemo, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, ChefHat, Clock3, Leaf, Minus, Plus, UsersRound } from 'lucide-react';
import './styles.css';

type MealId = 'breakfast' | 'lunch' | 'dinner';

type Meal = {
  id: MealId;
  name: string;
  time: string;
  menu: string;
  accent: string;
};

const meals: Meal[] = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    time: '7:30 – 9:00',
    menu: 'Masala dosa, coconut chutney, filter coffee',
    accent: 'saffron',
  },
  {
    id: 'lunch',
    name: 'Lunch',
    time: '12:30 – 2:00',
    menu: 'Jeera rice, dal tadka, beans poriyal, curd',
    accent: 'leaf',
  },
  {
    id: 'dinner',
    name: 'Dinner',
    time: '7:30 – 9:00',
    menu: 'Phulka, paneer masala, cucumber salad',
    accent: 'clay',
  },
];

function App() {
  const [selectedMeals, setSelectedMeals] = useState<MealId[]>(['lunch', 'dinner']);
  const [guestCount, setGuestCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const dateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }).format(new Date()),
    [],
  );

  const toggleMeal = (mealId: MealId) => {
    setSubmitted(false);
    setSelectedMeals((current) =>
      current.includes(mealId)
        ? current.filter((selectedId) => selectedId !== mealId)
        : [...current, mealId],
    );
  };

  return (
    <main className="page-shell">
      <div className="grain" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="PG Mess home">
          <span className="brand-mark"><ChefHat size={22} strokeWidth={1.8} /></span>
          <span>
            <strong>PG Mess</strong>
            <small>Kitchen count</small>
          </span>
        </a>
        <div className="resident-chip">
          <span className="resident-avatar">AS</span>
          <span><strong>Arjun S.</strong><small>Room 204</small></span>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><Leaf size={15} /> {dateLabel}</p>
          <h1>Good food starts with an <em>honest count.</em></h1>
          <p className="hero-intro">
            Mark the meals you plan to have today. Your response helps the kitchen cook enough—without wasting a plate.
          </p>
          <div className="deadline"><Clock3 size={17} /> Update today’s count before 10:30 AM</div>
        </div>

        <aside className="count-card" aria-label="Today's kitchen count">
          <div className="count-heading"><span>Today’s kitchen count</span><UsersRound size={20} /></div>
          <div className="count-number">47</div>
          <p>residents have responded</p>
          <div className="count-track"><span /></div>
          <small>12 responses still pending</small>
        </aside>
      </section>

      <section className="meal-section" aria-labelledby="meal-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Your plate</p>
            <h2 id="meal-heading">Which meals are you having?</h2>
          </div>
          <span className="selection-count">{selectedMeals.length} selected</span>
        </div>

        <div className="meal-grid">
          {meals.map((meal, index) => {
            const isSelected = selectedMeals.includes(meal.id);
            return (
              <button
                className={`meal-card ${meal.accent} ${isSelected ? 'selected' : ''}`}
                key={meal.id}
                type="button"
                onClick={() => toggleMeal(meal.id)}
                aria-pressed={isSelected}
                style={{ '--delay': `${index * 90}ms` } as CSSProperties}
              >
                <span className="meal-check">{isSelected && <Check size={17} strokeWidth={2.5} />}</span>
                <span className="meal-time">{meal.time}</span>
                <strong>{meal.name}</strong>
                <span className="meal-menu">{meal.menu}</span>
                <span className="meal-action">{isSelected ? 'On my plate' : 'Add meal'}</span>
              </button>
            );
          })}
        </div>

        <div className="response-panel">
          <div className="guest-control">
            <div>
              <strong>Bringing a guest?</strong>
              <span>Add them to the kitchen count.</span>
            </div>
            <div className="stepper" aria-label="Guest count">
              <button type="button" onClick={() => { setSubmitted(false); setGuestCount((count) => Math.max(0, count - 1)); }} aria-label="Remove guest"><Minus size={17} /></button>
              <output>{guestCount}</output>
              <button type="button" onClick={() => { setSubmitted(false); setGuestCount((count) => Math.min(4, count + 1)); }} aria-label="Add guest"><Plus size={17} /></button>
            </div>
          </div>

          <button className="submit-button" type="button" onClick={() => setSubmitted(true)}>
            {submitted ? <><Check size={19} /> Count updated</> : 'Confirm today’s meals'}
          </button>
          <p className={`confirmation ${submitted ? 'visible' : ''}`} role="status">
            Thanks—your selection is included in today’s kitchen count.
          </p>
        </div>
      </section>

      <footer><span>Cooked with care at your PG</span><span>Less waste. Better meals.</span></footer>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);

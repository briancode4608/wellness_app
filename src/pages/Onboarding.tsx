import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, ArrowLeft, Check } from "lucide-react";

const steps = [
  { id: "welcome", title: "Welcome", subtitle: "Let's personalize your health journey" },
  { id: "basics", title: "About You", subtitle: "Tell us a bit about yourself" },
  { id: "health", title: "Health Info", subtitle: "Help us understand your needs" },
  { id: "lifestyle", title: "Lifestyle", subtitle: "Your daily habits matter" },
];

const conditions = ["Diabetes", "Heart Disease", "Hypertension", "Autoimmune", "Recovering", "Elderly Care", "None"];
const diets = ["No Restrictions", "Low Sugar", "Low Sodium", "Gluten Free", "Dairy Free", "Vegetarian"];
const activityLevels = ["Sedentary", "Light", "Moderate", "Active"];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    conditions: [] as string[],
    diet: [] as string[],
    activity: "",
  });

  const toggleArray = (field: "conditions" | "diet", value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const finish = () => {
    localStorage.setItem("healthProfile", JSON.stringify(form));
    localStorage.setItem("onboarded", "true");
    navigate("/");
  };

  const canNext = () => {
    if (step === 1) return form.name.trim().length > 0;
    if (step === 2) return form.conditions.length > 0;
    if (step === 3) return form.activity.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Progress */}
      <div className="px-6 pt-6 flex gap-1.5">
        {steps.map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: i <= step ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="flex-1 px-6 pt-8 pb-6 flex flex-col"
        >
          {step === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Heart size={36} className="text-primary" />
              </div>
              <h1 className="text-display mb-3">VitalCare</h1>
              <p className="text-body-lg text-muted-foreground max-w-xs">
                Your gentle companion for daily health management. Simple, supportive, and made for you.
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="flex-1">
              <h2 className="text-heading mb-1">{steps[1].title}</h2>
              <p className="text-body text-muted-foreground mb-6">{steps[1].subtitle}</p>
              <div className="space-y-4">
                <div>
                  <label className="text-caption font-semibold text-muted-foreground mb-1.5 block">Your Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-body-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-caption font-semibold text-muted-foreground mb-1.5 block">Age</label>
                    <input
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-body-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="30"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="text-caption font-semibold text-muted-foreground mb-1.5 block">Weight (kg)</label>
                    <input
                      value={form.weight}
                      onChange={(e) => setForm({ ...form, weight: e.target.value })}
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-body-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="70"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="text-caption font-semibold text-muted-foreground mb-1.5 block">Height (cm)</label>
                    <input
                      value={form.height}
                      onChange={(e) => setForm({ ...form, height: e.target.value })}
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-body-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="170"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1">
              <h2 className="text-heading mb-1">{steps[2].title}</h2>
              <p className="text-body text-muted-foreground mb-6">{steps[2].subtitle}</p>
              <p className="text-caption font-semibold text-muted-foreground mb-3">Health Conditions</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {conditions.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleArray("conditions", c)}
                    className={`px-4 py-2.5 rounded-lg text-caption font-semibold transition-all ${
                      form.conditions.includes(c)
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <p className="text-caption font-semibold text-muted-foreground mb-3">Dietary Restrictions</p>
              <div className="flex flex-wrap gap-2">
                {diets.map((d) => (
                  <button
                    key={d}
                    onClick={() => toggleArray("diet", d)}
                    className={`px-4 py-2.5 rounded-lg text-caption font-semibold transition-all ${
                      form.diet.includes(d)
                        ? "bg-health-green text-health-green-foreground"
                        : "bg-card border border-border text-foreground"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1">
              <h2 className="text-heading mb-1">{steps[3].title}</h2>
              <p className="text-body text-muted-foreground mb-6">{steps[3].subtitle}</p>
              <p className="text-caption font-semibold text-muted-foreground mb-3">Activity Level</p>
              <div className="space-y-3">
                {activityLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setForm({ ...form, activity: level })}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-lg text-body-lg font-semibold transition-all ${
                      form.activity === level
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground"
                    }`}
                  >
                    {level}
                    {form.activity === level && <Check size={18} />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom buttons */}
      <div className="px-6 pb-8 flex gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <button
          onClick={() => (step < 3 ? setStep(step + 1) : finish())}
          disabled={!canNext()}
          className="flex-1 h-12 bg-primary text-primary-foreground rounded-lg font-bold text-body-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-40"
        >
          {step === 0 ? "Get Started" : step === 3 ? "Complete Setup" : "Continue"}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;

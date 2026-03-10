import { useState } from "react";
import { User, Heart, UtensilsCrossed, Dumbbell, Edit3, Save } from "lucide-react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import HealthCard from "@/components/HealthCard";

const Profile = () => {
  const stored = JSON.parse(localStorage.getItem("healthProfile") || "{}");
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: stored.name || "User",
    age: stored.age || "30",
    weight: stored.weight || "70",
    height: stored.height || "170",
    conditions: stored.conditions || ["Diabetes"],
    diet: stored.diet || ["Low Sugar"],
    activity: stored.activity || "Light",
  });

  const save = () => {
    localStorage.setItem("healthProfile", JSON.stringify(profile));
    setEditing(false);
  };

  return (
    <PageLayout title="Profile" subtitle="Your health information">
      {/* Avatar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <User size={36} className="text-primary" />
        </div>
        {editing ? (
          <input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="text-heading text-center bg-transparent border-b-2 border-primary focus:outline-none"
          />
        ) : (
          <h2 className="text-heading">{profile.name}</h2>
        )}
      </motion.div>

      {/* Basic Info */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <HealthCard className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-subheading">Basic Info</p>
            <button onClick={() => (editing ? save() : setEditing(true))} className="text-primary">
              {editing ? <Save size={18} /> : <Edit3 size={18} />}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-caption text-muted-foreground">Age</p>
              {editing ? (
                <input type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} className="w-full text-center text-subheading bg-background border border-border rounded-md py-1" />
              ) : (
                <p className="text-subheading">{profile.age}</p>
              )}
            </div>
            <div>
              <p className="text-caption text-muted-foreground">Weight</p>
              {editing ? (
                <input type="number" value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: e.target.value })} className="w-full text-center text-subheading bg-background border border-border rounded-md py-1" />
              ) : (
                <p className="text-subheading">{profile.weight} kg</p>
              )}
            </div>
            <div>
              <p className="text-caption text-muted-foreground">Height</p>
              {editing ? (
                <input type="number" value={profile.height} onChange={(e) => setProfile({ ...profile, height: e.target.value })} className="w-full text-center text-subheading bg-background border border-border rounded-md py-1" />
              ) : (
                <p className="text-subheading">{profile.height} cm</p>
              )}
            </div>
          </div>
        </HealthCard>
      </motion.div>

      {/* Health Conditions */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <HealthCard className="mb-4">
          <p className="text-subheading flex items-center gap-2 mb-3">
            <Heart size={16} className="text-health-pink" /> Health Conditions
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.conditions.map((c: string) => (
              <span key={c} className="bg-health-pink/10 text-health-pink text-caption font-semibold px-3 py-1.5 rounded-lg">
                {c}
              </span>
            ))}
          </div>
        </HealthCard>
      </motion.div>

      {/* Dietary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <HealthCard className="mb-4">
          <p className="text-subheading flex items-center gap-2 mb-3">
            <UtensilsCrossed size={16} className="text-health-green" /> Dietary Restrictions
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.diet.map((d: string) => (
              <span key={d} className="bg-health-green/10 text-health-green text-caption font-semibold px-3 py-1.5 rounded-lg">
                {d}
              </span>
            ))}
          </div>
        </HealthCard>
      </motion.div>

      {/* Activity */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <HealthCard>
          <p className="text-subheading flex items-center gap-2 mb-3">
            <Dumbbell size={16} className="text-health-blue" /> Activity Level
          </p>
          <span className="bg-health-blue/10 text-health-blue text-caption font-semibold px-3 py-1.5 rounded-lg">
            {profile.activity}
          </span>
        </HealthCard>
      </motion.div>
    </PageLayout>
  );
};

export default Profile;

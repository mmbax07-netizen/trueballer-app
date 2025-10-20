import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Clock, Dumbbell, Target, Upload, Sparkles, Video, TrendingUp } from 'lucide-react';

const WORKOUTS = [
  {
    id: 1,
    name: "Shooting Form Fundamentals",
    category: "Shooting",
    duration: 20,
    difficulty: "Easy",
    drills: [
      { name: "Form shooting (5 feet)", reps: "20 makes", time: 5, instructions: "Stand 5 feet from the basket. Focus on proper hand placement - shooting hand under the ball, guide hand on the side. Keep your elbow aligned under the ball and pointed at the rim. Follow through completely, holding your follow-through until the ball hits the net. Your wrist should be fully flexed with fingers pointing down. This close-range work builds perfect mechanics." },
      { name: "Free throws", reps: "25 shots", time: 5, instructions: "Shoot from the free throw line using a consistent routine every time. Line up your feet, dribble 2-3 times, take a deep breath, and focus on the front of the rim. Bend your knees for power, shoot with confidence. Keep the same form on every shot - consistency is key. Track your makes - aim for 70%+ and improve from there." },
      { name: "Mid-range (10 feet)", reps: "15 makes", time: 5, instructions: "Move back to 10 feet from the basket (around the free throw line area). Keep your shooting form exactly the same as your close-range shots - this is critical. You'll need slightly more leg power, but don't change your upper body mechanics. Focus on proper arc - the ball should go up and come down, not shoot in a flat line. Watch the rotation of the ball - it should have consistent backspin." },
      { name: "3-point corners", reps: "10 makes each", time: 5, instructions: "Stand in each corner behind the 3-point line (shortest 3-point shots on the court). Plant your feet square to the basket - don't shoot at an angle. Use proper leg drive by bending your knees and exploding upward. The power comes from your legs, not your arms. Shoot with the same form as before, just with more force. Make 10 from the right corner, then switch to the left corner and make 10 more." }
    ]
  },
  {
    id: 2,
    name: "Ball Handling Basics",
    category: "Ball Handling",
    duration: 15,
    difficulty: "Easy",
    drills: [
      { name: "Stationary pound dribbles", reps: "30 each hand", time: 3, instructions: "Stand in an athletic stance with your feet shoulder-width apart. Dribble hard into the ground with one hand, keeping the ball below your waist level at all times. The harder you pound the ball, the more control you develop. Don't look at the ball - focus straight ahead. Do 30 aggressive dribbles with your right hand, then switch to your left. Your palm should never touch the ball - use your fingertips for control." },
      { name: "Figure 8s", reps: "20 reps", time: 3, instructions: "Spread your legs about shoulder-width apart and bend at the waist slightly. Hold the ball in front of you. Weave the ball in a figure-8 pattern: between your legs going backwards, around your right leg, between your legs going forward, around your left leg, and repeat. Move the ball from hand to hand smoothly - no dribbling in this drill. Focus on speed and fluidity. Keep your head up and feel the ball movement." },
      { name: "Between the legs", reps: "30 reps", time: 3, instructions: "Start in an athletic stance with feet staggered. Dribble the ball with your right hand, then bounce it between your legs from front to back. Your left hand should catch it behind your legs. Then dribble with your left, bounce between legs, catch with your right in front. Alternate legs - right leg forward, then left leg forward. Keep your head up and maintain a rhythm. The ball should bounce hard and come up to about waist height." },
      { name: "Behind the back", reps: "30 reps", time: 3, instructions: "Dribble on your right side, then wrap the ball behind your back to your left hand using a smooth sweeping motion across your lower back. Don't just throw it - maintain control. Practice going both directions - right to left and left to right. Start slow and focus on feeling where the ball is. As you improve, add speed. This move is about misdirection and keeping the ball away from defenders." },
      { name: "Full court dribbling", reps: "5 trips", time: 3, instructions: "Dribble from baseline to baseline using a different move or combination each trip. Trip 1: Crossovers every 3 dribbles. Trip 2: Between the legs. Trip 3: Behind the back. Trip 4: Spin moves. Trip 5: Hesitation moves with changes of pace. Focus on explosive movements and quick changes of direction. Keep your eyes up, not on the ball. Push yourself to go game speed." }
    ]
  },
  {
    id: 3,
    name: "Conditioning Sprint Work",
    category: "Conditioning",
    duration: 12,
    difficulty: "Medium",
    drills: [
      { name: "Baseline to baseline", reps: "10 sprints", time: 4, instructions: "Sprint full speed from one baseline to the other. Touch the line with your hand each time. Walk back to recover between sprints. Push through fatigue." },
      { name: "Suicide runs", reps: "5 sets", time: 4, instructions: "Sprint to free throw line and back, half court and back, far free throw and back, far baseline and back. Touch each line. Rest 60 seconds between sets." },
      { name: "Defensive slides", reps: "4 full courts", time: 4, instructions: "Get in defensive stance (low hips, arms out). Slide from sideline to sideline going down the court. Don't cross your feet. Keep your chest up and move explosively." }
    ]
  },
  {
    id: 4,
    name: "Advanced Shooting Circuit",
    category: "Shooting",
    duration: 25,
    difficulty: "Hard",
    drills: [
      { name: "Around the world", reps: "3 makes each spot", time: 7, instructions: "Set up 7 shooting spots in an arc around the 3-point line: both corners, both wings (45-degree angles), both elbows, and top of the key. Start at the right corner. You must make 3 shots from each spot before moving to the next." },
      { name: "Off-dribble pull-ups", reps: "20 makes", time: 6, instructions: "Start at the 3-point line. Take 2-3 hard dribbles toward the basket. Plant your inside foot, gather the ball into your shot pocket, and pull up for a mid-range jumper." },
      { name: "Catch and shoot", reps: "25 makes", time: 6, instructions: "Pass the ball to yourself off the backboard or wall. As the ball comes to you, have your hands ready in shooting position. Your feet should be set before you catch the ball." },
      { name: "Game speed 3s", reps: "15 makes", time: 6, instructions: "Shoot 3-pointers exactly as if you're in a game. Move without the ball like you're coming off a screen. Sprint to get your rebound every time." }
    ]
  },
  {
    id: 5,
    name: "Finishing Package",
    category: "Finishing",
    duration: 18,
    difficulty: "Medium",
    drills: [
      { name: "Layup series", reps: "10 each", time: 5, instructions: "Practice layups from both sides. Right hand on right side, left hand on left side. Start under the basket, then add a dribble." },
      { name: "Reverse layups", reps: "10 each side", time: 4, instructions: "Drive to the basket, go under the rim, and finish on the opposite side with a reverse layup." },
      { name: "Euro steps", reps: "15 reps", time: 4, instructions: "Drive to the basket, take a long step in one direction, then quickly step in the opposite direction for the finish." },
      { name: "Floaters", reps: "20 makes", time: 5, instructions: "Drive into the paint, jump off one foot, and shoot a high-arcing shot over imaginary defenders." }
    ]
  }
];

const RANKS = [
  { title: "Rookie", xp: 0, color: "text-gray-600" },
  { title: "Bench Player", xp: 100, color: "text-blue-600" },
  { title: "Starter", xp: 250, color: "text-green-600" },
  { title: "The Shooter", xp: 500, color: "text-purple-600" },
  { title: "All-Star", xp: 800, color: "text-yellow-600" },
  { title: "Pro", xp: 1200, color: "text-orange-600" },
  { title: "MVP", xp: 1800, color: "text-red-600" },
  { title: "Legend", xp: 2500, color: "text-pink-600" }
];

export default function App() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [currentDrillIndex, setCurrentDrillIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [completedDrills, setCompletedDrills] = useState([]);
  const [totalXP, setTotalXP] = useState(0);
  const [activeTab, setActiveTab] = useState('workouts');

  const getCurrentRank = () => {
    for (let i = RANKS.length - 1; i >= 0; i--) {
      if (totalXP >= RANKS[i].xp) {
        return RANKS[i];
      }
    }
    return RANKS[0];
  };

  const getNextRank = () => {
    const currentRank = getCurrentRank();
    const currentIndex = RANKS.findIndex(r => r.title === currentRank.title);
    return currentIndex < RANKS.length - 1 ? RANKS[currentIndex + 1] : null;
  };

  const calculateXP = (workout) => {
    return workout.duration * 5 + workout.drills.length * 10;
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  const startWorkout = (workout) => {
    setSelectedWorkout(workout);
    setCurrentDrillIndex(0);
    setCompletedDrills([]);
    setTimeRemaining(workout.drills[0].time * 60);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    if (selectedWorkout) {
      setTimeRemaining(selectedWorkout.drills[currentDrillIndex].time * 60);
      setIsTimerRunning(false);
    }
  };

  const completeDrill = () => {
    const newCompleted = [...completedDrills, currentDrillIndex];
    setCompletedDrills(newCompleted);
    
    if (currentDrillIndex < selectedWorkout.drills.length - 1) {
      const nextIndex = currentDrillIndex + 1;
      setCurrentDrillIndex(nextIndex);
      setTimeRemaining(selectedWorkout.drills[nextIndex].time * 60);
      setIsTimerRunning(false);
    } else {
      const xpEarned = calculateXP(selectedWorkout);
      setTotalXP(prev => prev + xpEarned);
      const now = new Date().toLocaleString();
      setCompletedWorkouts([...completedWorkouts, { 
        workout: selectedWorkout, 
        date: now,
        xp: xpEarned 
      }]);
      setSelectedWorkout(null);
    }
  };

  const exitWorkout = () => {
    setSelectedWorkout(null);
    setCurrentDrillIndex(0);
    setCompletedDrills([]);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Shooting': return <Target className="w-5 h-5" />;
      case 'Ball Handling': return <Dumbbell className="w-5 h-5" />;
      case 'Conditioning': return <Clock className="w-5 h-5" />;
      case 'Finishing': return <Target className="w-5 h-5" />;
      case 'Footwork': return <TrendingUp className="w-5 h-5" />;
      default: return <Dumbbell className="w-5 h-5" />;
    }
  };

  if (selectedWorkout) {
    const currentDrill = selectedWorkout.drills[currentDrillIndex];
    const progress = ((currentDrillIndex + 1) / selectedWorkout.drills.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 via-cyan-500 to-blue-500 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedWorkout.name}</h2>
              <button
                onClick={exitWorkout}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Exit
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{currentDrillIndex + 1} / {selectedWorkout.drills.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{currentDrill.name}</h3>
            <p className="text-xl text-gray-600 mb-4">{currentDrill.reps}</p>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 mb-6 text-left border-2 border-orange-200">
              <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                <span className="text-lg">📋</span> How to do this drill:
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">{currentDrill.instructions}</p>
            </div>
            
            <div className="mb-8">
              <div className="text-6xl font-bold text-cyan-600 mb-4">
                {formatTime(timeRemaining)}
              </div>
              <p className="text-gray-500">Suggested time: {currentDrill.time} min</p>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={toggleTimer}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition flex items-center gap-2 text-lg font-semibold"
              >
                {isTimerRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={resetTimer}
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 text-lg"
              >
                <RotateCcw className="w-6 h-6" />
                Reset
              </button>
            </div>

            <button
              onClick={completeDrill}
              className="w-full px-6 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2 text-lg font-semibold"
            >
              <CheckCircle className="w-6 h-6" />
              Complete Drill
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-cyan-500 to-blue-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-xl">TB</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-black bg-gradient-to-r from-orange-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    TrueBaller
                  </h1>
                  <p className="text-sm text-gray-500 font-semibold tracking-wide">TRAIN LIKE A PRO</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 via-cyan-50 to-blue-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className={`text-2xl font-bold ${getCurrentRank().color}`}>
                  {getCurrentRank().title}
                </h2>
                <p className="text-gray-600">Total XP: {totalXP}</p>
              </div>
              <div className="text-right">
                {getNextRank() && (
                  <p className="text-sm text-gray-500">
                    Next: {getNextRank().title} ({getNextRank().xp} XP)
                  </p>
                )}
              </div>
            </div>
            {getNextRank() && (
              <div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${((totalXP - getCurrentRank().xp) / (getNextRank().xp - getCurrentRank().xp)) * 100}%` 
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {getNextRank().xp - totalXP} XP to next rank
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('workouts')}
              className={`flex-1 min-w-[100px] py-2 px-4 rounded-lg font-semibold transition ${
                activeTab === 'workouts' 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Workouts
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {WORKOUTS.map(workout => (
            <div key={workout.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600">
                  {getCategoryIcon(workout.category)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{workout.name}</h3>
                  <p className="text-sm text-gray-500">{workout.category}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {workout.duration} minutes • {workout.drills.length} drills
                </p>
                <p className="text-sm font-semibold text-cyan-600">
                  +{calculateXP(workout)} XP
                </p>
              </div>

              <button
                onClick={() => startWorkout(workout)}
                className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition font-semibold"
              >
                Start Workout
              </button>
            </div>
          ))}
        </div>

        {completedWorkouts.length > 0 && (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Workouts</h2>
            <div className="space-y-3">
              {completedWorkouts.slice(-5).reverse().map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-800">{item.workout.name}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+{item.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import {
  Heart,
  HeartCrack,
  Scaling,
  Goal,
  IceCream,
  Coffee,
  Pizza,
  Utensils,
  ArrowLeft,
  Popcorn,
  Palette,
  Music,
  Trees,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const activities = [
  { id: 'bowling', label: 'Bowling', icon: Scaling },
  { id: 'topgolf', label: 'TopGolf', icon: Goal },
  { id: 'iceskating', label: 'Ice Skating', icon: IceCream },
  { id: 'coffee', label: 'Coffee & Walk', icon: Coffee },
  { id: 'movie', label: 'Movie Night', icon: Popcorn },
  { id: 'painting', label: 'Paint & Sip', icon: Palette },
  { id: 'concert', label: 'Live Music', icon: Music },
  { id: 'hiking', label: 'Winter Hike', icon: Trees },
];

const foods = [
  { id: 'italian', label: 'Italian', icon: Pizza },
  { id: 'sushi', label: 'Sushi', icon: Utensils },
  { id: 'korean', label: 'Korean BBQ', icon: Coffee },
  { id: 'american', label: 'American', icon: Utensils },
  { id: 'mexican', label: 'Mexican', icon: Utensils },
  { id: 'thai', label: 'Thai', icon: Utensils },
  { id: 'mediterranean', label: 'Mediterranean', icon: Utensils },
  { id: 'indian', label: 'Indian', icon: Utensils },
];

const sadImages = [
  'https://images.unsplash.com/photo-1522632449199-ffbe5b931b03?q=80&w=500',
  'https://images.unsplash.com/photo-1515472071456-47b72fb3caff?q=80&w=500',
  'https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf?q=80&w=500',
];

const happyImages = [
  'https://images.unsplash.com/photo-1518828822343-6e2f5c4869da?q=80&w=500',
  //'https://images.unsplash.com/photo-1624887009213-040347b804c1?q=80&w=500',
];

export default function Home() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [activity, setActivity] = useState<string>('');
  const [food, setFood] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getRandomImage = (images: string[]) => {
    return images[Math.floor(Math.random() * images.length)];
  };

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleAnswer = (value: string) => {
    setAnswer(value);
    if (value === 'yes') {
      triggerConfetti();
    }
  };

  const handleBack = () => {
    setAnswer(null);
    setActivity('');
    setFood('');
    setDate(undefined);
    setNotes('');
    setSubmitted(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = {
        answer,
        activity,
        food,
        date: date?.toISOString(),
        notes,
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      alert('Something went wrong. Please try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100 p-4">
      <div className="max-w-md mx-auto space-y-8 pt-12">
        {(answer !== null || submitted) && (
          <Button
            variant="ghost"
            className="mb-4 hover:bg-pink-200"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Start
          </Button>
        )}

        {answer === null && !submitted && (
          <Card className="p-8 text-center space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-pink-600">
              Will you be my Valentine? 💝
            </h1>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleAnswer('yes')}
                className={`bg-pink-500 hover:bg-pink-600 transform transition-all duration-200 hover:scale-105 active:scale-95 ${
                  answer === 'yes' ? 'ring-4 ring-pink-300 scale-105' : ''
                }`}
                size="lg"
              >
                <Heart className="mr-2" /> Yes!
              </Button>
              <Button
                onClick={() => handleAnswer('no')}
                variant="outline"
                className={`border-pink-300 hover:bg-pink-50 transform transition-all duration-200 hover:scale-105 active:scale-95 ${
                  answer === 'no' ? 'ring-4 ring-pink-300 scale-105' : ''
                }`}
                size="lg"
              >
                <HeartCrack className="mr-2" /> No
              </Button>
            </div>
          </Card>
        )}

        {answer === 'no' && (
          <Card className="p-8 text-center animate-bounce-once">
            <img
              src={getRandomImage(sadImages)}
              alt="Sad reaction"
              className="rounded-lg mx-auto mb-4"
            />
            <p className="mt-4 text-xl text-gray-600">Maybe next time... 😢</p>
          </Card>
        )}

        {submitted && answer === 'yes' && (
          <Card className="p-8 text-center animate-fade-in">
            <img
              src={getRandomImage(happyImages)}
              alt="Happy reaction"
              className="rounded-lg mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              Yay! Can't wait! 🎉
            </h2>
            <p className="text-lg text-gray-600">
              I'll get everything planned and get back to you soon! 💖
            </p>
          </Card>
        )}

        {answer === 'yes' && !submitted && (
          <div className="space-y-8">
            <Card className="p-8 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4 text-pink-600">
                What would you like to do?
              </h2>
              <RadioGroup value={activity} onValueChange={setActivity}>
                <div className="grid grid-cols-2 gap-4">
                  {activities.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.id}>
                        <RadioGroupItem
                          value={item.id}
                          id={item.id}
                          className="peer hidden"
                        />
                        <Label
                          htmlFor={item.id}
                          className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-pink-300 hover:bg-pink-50/50 ${
                            activity === item.id
                              ? 'border-pink-500 bg-pink-50 shadow-lg scale-105 ring-2 ring-pink-300'
                              : ''
                          }`}
                        >
                          <Icon
                            className={`h-8 w-8 mb-2 ${
                              activity === item.id ? 'text-pink-500' : ''
                            }`}
                          />
                          {item.label}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </Card>

            {activity && (
              <Card className="p-8 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4 text-pink-600">
                  What type of food do you prefer?
                </h2>
                <RadioGroup value={food} onValueChange={setFood}>
                  <div className="grid grid-cols-2 gap-4">
                    {foods.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.id}>
                          <RadioGroupItem
                            value={item.id}
                            id={`food-${item.id}`}
                            className="peer hidden"
                          />
                          <Label
                            htmlFor={`food-${item.id}`}
                            className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-pink-300 hover:bg-pink-50/50 ${
                              food === item.id
                                ? 'border-pink-500 bg-pink-50 shadow-lg scale-105 ring-2 ring-pink-300'
                                : ''
                            }`}
                          >
                            <Icon
                              className={`h-8 w-8 mb-2 ${
                                food === item.id ? 'text-pink-500' : ''
                              }`}
                            />
                            {item.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </Card>
            )}

            {food && (
              <Card className="p-8 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4 text-pink-600">
                  When are you available?
                </h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="mx-auto rounded-lg border shadow-lg p-3"
                />
              </Card>
            )}

            {date && (
              <Card className="p-8 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4 text-pink-600">
                  Any additional notes?
                </h2>
                <Textarea
                  placeholder="Any dietary restrictions, preferred time, or other details..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button
                  className="w-full mt-4 bg-pink-500 hover:bg-pink-600 disabled:opacity-50"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Confirm Date Plans 💝'}
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

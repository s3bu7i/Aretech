import {useState, useContext} from "react";
import { Leaf } from 'lucide-react';

const streakDays: number = 10;

export default function Streak({streakDays} : {streakDays:number}) {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  
    return (
      <div className="flex flex-col items-center bg-white rounded-lg p-6 mb-6">
        <div className="relative mb-4">
          <div className="bg-green-500 rounded-full w-24 h-24 flex items-center justify-center">
            <Leaf className="text-white w-16 h-16" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-black text-5xl font-black">{streakDays}</span>
          </div>
        </div>
        <div className="flex justify-center space-x-2 mb-4">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-green-800 text-xs font-semibold">{day}</span>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">{streakDays} Day Streak!</h2>
        <p className="text-green-600 text-center">
            {streakDays === 0 ? "We haven't seen any recent activity. Time to pick up the pace!" :
          "You're making a positive impact on the environment. Keep it up!"}
        </p>
      </div>
    )
  }
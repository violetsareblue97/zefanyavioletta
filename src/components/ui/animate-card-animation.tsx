"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const cardData = {
  1: {
    title: "Web Development",
    description: "Built using Javascript and modern frameworks.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  2: {
    title: "System Analysis",
    description: "Technical workflow and database management.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  3: {
    title: "UI/UX Research",
    description: "Focusing on user-centric design principles.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
}

// ... (keep the rest of the logic from your provided code for positionStyles, enter/exit animations)

export default function AnimatedCardStack() {
  const [cards, setCards] = useState([{ id: 1, contentType: 1 }, { id: 2, contentType: 2 }, { id: 3, contentType: 3 }])
  // ... rest of the logic
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto text-center mb-12">
         <h2 className="text-4xl font-bold tracking-tight">Featured Projects</h2>
      </div>
      {/* Integrated Stack Logic Here */}
    </section>
  )
}
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Testimonial {
  id: number
  image: string
  customerName: string
  carModel: string
  rating: number
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      image: "/images/avaliacao-viabrasil.jpg",
      customerName: "Rodrigo E Barbara",
      carModel: "Renegade 2020",
      rating: 5,
    },
    {
      id: 2,
      image: "/images/avaliacao-viabrasil.jpg",
      customerName: "Rodrigo E Barbara",
      carModel: "Renegade 2020",
      rating: 5,
    },
    {
      id: 3,
      image: "/images/avaliacao-viabrasil.jpg",
      customerName: "Rodrigo E Barbara",
      carModel: "Renegade 2020",
      rating: 5,
    },
    {
      id: 4,
      image: "/images/avaliacao-viabrasil.jpg",
      customerName: "Rodrigo E Barbara",
      carModel: "Renegade 2020",
      rating: 5,
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-4 sm:py-20 bg-[#00020C]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block px-4 py-2 bg-[#3B4055] text-white text-sm font-semibold rounded-[11px] mb-6 border border-[#3B4055]/50">
            AVALIAÇÃO
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Faça parte da nossa história.
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-all shadow-lg"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-black" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-all shadow-lg"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-black" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                >
                  <div className="bg-[#00020C] border-2 border-white/10 rounded-[22px] overflow-hidden hover:border-yellow-500/50 transition-all">
                    {/* Image */}
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.customerName}
                        fill
                        quality={100}
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-white font-bold text-xl md:text-2xl mb-2">
                        {testimonial.customerName}
                      </h3>
                      <p className="text-white/60 text-base md:text-lg mb-4">
                        {testimonial.carModel}
                      </p>

                      {/* Stars */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-white/20"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center my-6 sm:mt-12">
          <Link
            href="/avaliacoes"
            className="px-6 py-3 md:px-8 md:py-4 bg-yellow-500 hover:bg-yellow-600 text-black rounded-[27px] font-bold text-base md:text-xl transition-all shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40"
          >
            SAIBA MAIS
          </Link>
        </div>
      </div>
    </section>
  )
}


import React from 'react'
const cardsContent = [
    {
        id: 1,
        title: "join us!",
        description: "Join one of our weekly group runs and workouts. Regular early training boosts your daily energy, strengthens your muscles, spirit, and brains..."
    },
    {
        id: 2,
        title: "challenge yourself!",
        description: "Train hard and achieve your goals. Be consistent with your workouts and don't be afraid to take risks. Life's too short to not push yourself..."
    },
    {
        id:3,
        title: "stay motivated!",
        description: "Take breaks, practice mindfulness, and celebrate your successes. Life's too short to not enjoy your journey..."
    },
    {
        id:4,
        title: "get inspired!",
        description: "Share your stories, tips, and experiences. Your voice matters, and inspiring others makes you stronger..."
    }
]
const CardContainer1 = () => {
  return (
    <div className='my-10 flex items-center justify-center'>
        <div className='max-w-7xl h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-center'>
            {cardsContent.map(card => {
                return (
                    <div key={card.id} className='flex border p-12 w-72 h-72 hover:bg-emerald-400/30 cursor-crosshair duration-200 flex-col items-center justify-center space-y-4'>
                        <div className='text-2xl font-bold'>{card.title}</div>
                        <div className='text-sm'>{card.description}</div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default CardContainer1
import { useState, useEffect } from 'react'
import { Leaf, Sparkles, ChevronRight, Receipt, ChevronDown, ChevronUp, ShoppingBag, Calendar, Leaf as CO2Leaf } from 'lucide-react'
import { Button } from "~/components/ui/button"
import IReceiptData from "~/types/IReceiptData"

export default function Result({ receiptData, onClose, className }: { receiptData: IReceiptData, onClose: () => void, className?: string }) {
  const [animate, setAnimate] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <div className={`flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-200 p-4 text-green-800 ${className}`}>
      <div className={`w-full max-w-md transform ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} transition-all duration-500 ease-out`}>
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <Leaf className="w-24 h-24 mx-auto mb-4 text-green-500" />
            <Receipt className="w-12 h-12 absolute bottom-0 right-0 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Eco-tastic!</h1>
          <p className="text-xl mb-4">You've earned</p>
          <div className="flex items-center justify-center">
            <Sparkles className="w-6 h-6 mr-2 text-green-500" />
            <span className="text-5xl font-bold text-green-600">{receiptData.points.toLocaleString()}</span>
            <Sparkles className="w-6 h-6 ml-2 text-green-500" />
          </div>
          <p className="text-xl mt-2">green points!</p>
        </div>
        
        <Button 
          className="w-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 mb-4"
          onClick={() => {onClose()}}
        >
          Go back to main menu
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        <div className="bg-white rounded-lg shadow-md overflow-auto">
          <button
            className="w-full px-4 py-3 flex justify-between items-center bg-green-50 text-green-800 hover:bg-green-100 transition-colors duration-200"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span className="font-semibold">More Details</span>
            {showDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {showDetails && (
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-green-600" />
                <span className="font-semibold">{receiptData.storeName}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                <span>{receiptData.date}</span>
              </div>
              <div className="flex items-center">
                <CO2Leaf className="w-5 h-5 mr-2 text-green-600" />
                <span>Carbon Footprint: {receiptData.co2} kg CO2</span>
              </div>
              <div>
                <p className="font-semibold mb-1">Items Purchased:</p>
                <ul className="list-disc list-inside pl-2">
                  {receiptData.items.map((item, index) => (
                    <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
                  ))}
                </ul>
              </div>
              <div className="font-semibold">
                Total Cost: ${receiptData.totalCost.toFixed(2)}
              </div>
              {receiptData.generic && receiptData.sponsoredProducts && receiptData.sponsoredCost && receiptData.sponsoredProducts.length > 0 && (
                <div>
                  <p className="font-semibold mb-1">Eco-Partner Products:</p>
                  <ul className="list-disc list-inside pl-2">
                    {receiptData.sponsoredProducts.map((product, index) => (
                      <li key={index}>{product.name} - ${product.price.toFixed(2)}</li>
                    ))}
                  </ul>
                  <p className="mt-1 font-semibold">
                    Eco-Partner Total: ${receiptData.sponsoredCost.toFixed(2)}
                  </p>
                </div>
              )}
              <div className="font-semibold text-green-600">
                Points Earned: {receiptData.points}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-400 opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animation: `float ${Math.random() * 3 + 2}s linear infinite`
            }}
          />
        ))}
      </div>
      
      {/* <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-100vh); }
        }
      `}</style> */}
    </div>
  )
}
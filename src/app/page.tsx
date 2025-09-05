"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AIChat } from "@/components/ai-chat"
import { ShoppingCart, MessageCircle, Sparkles, Star, User, Menu, X, Heart, Shield, Truck } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  type: "normal" | "oversized"
  rating: number
  reviews: number
  colors: string[]
  sizes: string[]
}

const products: Product[] = [
  {
    id: 1,
    name: "Camiseta Básica Premium",
    price: 89.90,
    image: "/api/placeholder/300/400",
    type: "normal",
    rating: 4.8,
    reviews: 124,
    colors: ["Branco", "Preto", "Cinza"],
    sizes: ["P", "M", "G", "GG"]
  },
  {
    id: 2,
    name: "Oversized Street Style",
    price: 119.90,
    image: "/api/placeholder/300/400",
    type: "oversized",
    rating: 4.9,
    reviews: 89,
    colors: ["Preto", "Branco", "Bege"],
    sizes: ["M", "G", "GG", "XGG"]
  },
  {
    id: 3,
    name: "Camiseta Minimalista",
    price: 79.90,
    image: "/api/placeholder/300/400",
    type: "normal",
    rating: 4.7,
    reviews: 156,
    colors: ["Branco", "Preto", "Azul Marinho"],
    sizes: ["P", "M", "G", "GG"]
  },
  {
    id: 4,
    name: "Oversized Urban",
    price: 129.90,
    image: "/api/placeholder/300/400",
    type: "oversized",
    rating: 4.9,
    reviews: 203,
    colors: ["Preto", "Cinza", "Verde Militar"],
    sizes: ["M", "G", "GG", "XGG"]
  },
  {
    id: 5,
    name: "Camiseta Comfort Fit",
    price: 94.90,
    image: "/api/placeholder/300/400",
    type: "normal",
    rating: 4.6,
    reviews: 78,
    colors: ["Branco", "Preto", "Rosa"],
    sizes: ["P", "M", "G", "GG"]
  },
  {
    id: 6,
    name: "Oversized Relaxed",
    price: 139.90,
    image: "/api/placeholder/300/400",
    type: "oversized",
    rating: 4.8,
    reviews: 145,
    colors: ["Preto", "Branco", "Roxo"],
    sizes: ["M", "G", "GG", "XGG"]
  }
]

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)
  const [cart, setCart] = useState<Product[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentDesign, setCurrentDesign] = useState<string | null>(null)

  const addToCart = (product: Product) => {
    setCart([...cart, product])
  }

  const handleDesignCreated = (design: string) => {
    setCurrentDesign(design)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Hyvlyn
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#produtos" className="hover:text-purple-300 transition-colors">Produtos</a>
              <a href="#sobre" className="hover:text-purple-300 transition-colors">Sobre</a>
              <a href="#contato" className="hover:text-purple-300 transition-colors">Contato</a>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Chat IA Button */}
              <Dialog open={chatOpen} onOpenChange={setChatOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">IA Designer</span>
                    <span className="sm:hidden">IA</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg bg-gray-900 border-gray-700 max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                      Designer IA - Crie sua Estampa
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Descreva sua ideia e nossa IA criará uma estampa única para você!
                    </DialogDescription>
                  </DialogHeader>
                  
                  <AIChat onDesignCreated={handleDesignCreated} />
                </DialogContent>
              </Dialog>

              {/* Cart */}
              <Button variant="outline" className="relative border-white/20 text-white hover:bg-white/10">
                <ShoppingCart className="w-4 h-4" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu */}
              <Button 
                variant="ghost" 
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2">
              <a href="#produtos" className="block py-2 hover:text-purple-300 transition-colors">Produtos</a>
              <a href="#sobre" className="block py-2 hover:text-purple-300 transition-colors">Sobre</a>
              <a href="#contato" className="block py-2 hover:text-purple-300 transition-colors">Contato</a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Vista sua Personalidade
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Camisetas premium com estampas criadas por IA. Transforme suas ideias em arte vestível.
          </p>
          
          {currentDesign && (
            <div className="mb-8 p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg max-w-md mx-auto">
              <p className="text-green-300 font-medium">✨ Última criação:</p>
              <p className="text-white">{currentDesign}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
              onClick={() => setChatOpen(true)}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Criar Estampa com IA
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Ver Coleção
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Nossa Coleção
          </h3>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/20 border border-white/10">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600">
                Todos
              </TabsTrigger>
              <TabsTrigger value="normal" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600">
                Normais
              </TabsTrigger>
              <TabsTrigger value="oversized" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600">
                Oversized
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="normal">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.type === 'normal').map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="oversized">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.type === 'oversized').map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="container mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white">
            Por que escolher a Hyvlyn?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-2">IA Designer</h4>
              <p className="text-gray-300">Crie estampas únicas com nossa inteligência artificial avançada. Suas ideias ganham vida!</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-2">Qualidade Premium</h4>
              <p className="text-gray-300">Tecidos de alta qualidade, impressão durável e acabamento perfeito em cada peça.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-2">Entrega Rápida</h4>
              <p className="text-gray-300">Produção sob demanda e entrega expressa. Sua camiseta personalizada em casa rapidamente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/40">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Hyvlyn
                </h1>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Vista sua personalidade com estilo único. Camisetas premium personalizadas com tecnologia de IA.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#produtos" className="hover:text-purple-300 transition-colors">Produtos</a></li>
                <li><a href="#sobre" className="hover:text-purple-300 transition-colors">Sobre Nós</a></li>
                <li><a href="#contato" className="hover:text-purple-300 transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-300 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Trocas e Devoluções</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Rastreamento</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-500 text-sm">© 2024 Hyvlyn. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProductCard({ product, onAddToCart }: { product: Product, onAddToCart: (product: Product) => void }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[1])

  return (
    <Card className="bg-black/20 border-white/10 hover:bg-black/30 transition-all duration-300 group overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-8 h-8" />
              </div>
              <p className="text-sm">Imagem do Produto</p>
            </div>
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                onClick={() => onAddToCart(product)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border-purple-500/20">
              {product.type === 'oversized' ? 'Oversized' : 'Normal'}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-300">{product.rating}</span>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-white mb-2">{product.name}</h3>
          
          {/* Colors */}
          <div className="mb-3">
            <p className="text-xs text-gray-400 mb-1">Cores:</p>
            <div className="flex space-x-1">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color ? 'border-purple-400' : 'border-gray-600'
                  } ${
                    color === 'Branco' ? 'bg-white' :
                    color === 'Preto' ? 'bg-black' :
                    color === 'Cinza' ? 'bg-gray-500' :
                    color === 'Azul Marinho' ? 'bg-blue-900' :
                    color === 'Rosa' ? 'bg-pink-400' :
                    color === 'Roxo' ? 'bg-purple-600' :
                    color === 'Bege' ? 'bg-yellow-200' :
                    color === 'Verde Militar' ? 'bg-green-700' :
                    'bg-gray-400'
                  }`}
                  title={color}
                />
              ))}
            </div>
          </div>
          
          {/* Sizes */}
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-1">Tamanhos:</p>
            <div className="flex space-x-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-1 text-xs rounded border ${
                    selectedSize === size 
                      ? 'border-purple-400 bg-purple-600/20 text-purple-300' 
                      : 'border-gray-600 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-purple-400">
              R$ {product.price.toFixed(2)}
            </span>
            <Button 
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
import { useState } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthForm } from '@/components/AuthForm'
import { Dashboard } from '@/components/Dashboard'
import { useToast } from '@/hooks/use-toast'

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { toast } = useToast()

  const handleAuth = (data: { email: string; password: string; name?: string }) => {
    // Mock authentication - in real app this would call API
    console.log('Auth data:', data)
    setIsAuthenticated(true)
    toast({
      title: "Welcome!",
      description: data.name ? "Account created successfully!" : "Logged in successfully!",
    })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="linktree-theme">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <AuthForm onAuth={handleAuth} />
      )}
    </ThemeProvider>
  )
}

export default Index
